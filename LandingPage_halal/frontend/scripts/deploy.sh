#!/usr/bin/env bash
# Déploie l'export statique (out/) sur l'hébergement OVHcloud via SFTP (chiffré).
#
#   npm run deploy                 contrôles + build + sauvegarde distante + envoi + vérification
#   npm run deploy -- --dry-run    montre ce qui serait envoyé, sans rien modifier
#   npm run deploy -- --prune      supprime aussi les fichiers distants absents de out/
#                                  (dans le dossier cible uniquement, sauvegarde faite avant)
#   npm run deploy -- --skip-checks   saute lint/typecheck/tests (déconseillé)
#
# Configuration (voir DEPLOYMENT.md) :
#   .env.production   URLs publiques NEXT_PUBLIC_* (lues par le build)
#   .env.deploy       OVH_SFTP_HOST, OVH_SFTP_USER, OVH_REMOTE_DIR (non secrets)
#   OVH_SFTP_PASSWORD secret GitHub Codespaces / variable d'environnement, jamais dans un fichier
set -euo pipefail

cd "$(dirname "$0")/.."

DRY_RUN=0 PRUNE=0 SKIP_CHECKS=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --prune) PRUNE=1 ;;
    --skip-checks) SKIP_CHECKS=1 ;;
    *) echo "Option inconnue : $arg" >&2; exit 2 ;;
  esac
done

step() { printf '\n\033[1;32m▶ %s\033[0m\n' "$*"; }
fail() { printf '\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

# ── 1. Configuration ─────────────────────────────────────────────────────────
step "Configuration"
[[ -f .env.production ]] || fail ".env.production absent (copier .env.production.example)."
[[ -f .env.deploy ]] || fail ".env.deploy absent (copier .env.deploy.example)."
set -a; source .env.production; source .env.deploy; set +a

: "${OVH_SFTP_HOST:?OVH_SFTP_HOST manquant dans .env.deploy}"
: "${OVH_SFTP_USER:?OVH_SFTP_USER manquant dans .env.deploy}"
: "${OVH_REMOTE_DIR:?OVH_REMOTE_DIR manquant dans .env.deploy}"
[[ -n "${OVH_SFTP_PASSWORD:-}" ]] || fail "OVH_SFTP_PASSWORD absent : ajoutez-le en secret Codespaces puis rechargez le codespace."
[[ "$OVH_REMOTE_DIR" != "/" && "$OVH_REMOTE_DIR" != "." && -n "$OVH_REMOTE_DIR" ]] || fail "OVH_REMOTE_DIR doit désigner un sous-dossier (ex. www)."

for v in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_API_URL NEXT_PUBLIC_FOOD_URL NEXT_PUBLIC_BEAUTY_URL; do
  val="${!v:-}"
  [[ -n "$val" ]] || fail "$v vide dans .env.production."
  [[ "$val" != *localhost* && "$val" != *127.0.0.1* ]] || fail "$v pointe vers localhost : $val"
done
[[ "$NEXT_PUBLIC_SITE_URL" == https://* || "$NEXT_PUBLIC_SITE_URL" == http://* ]] || fail "NEXT_PUBLIC_SITE_URL doit commencer par http(s)://"
command -v lftp >/dev/null || fail "lftp absent : sudo apt-get install -y lftp"
echo "Site     : $NEXT_PUBLIC_SITE_URL"
echo "Cible    : sftp://$OVH_SFTP_USER@$OVH_SFTP_HOST/$OVH_REMOTE_DIR"

# ── 2. Qualité + build ───────────────────────────────────────────────────────
if [[ $SKIP_CHECKS -eq 0 ]]; then
  step "Contrôles (lint, typecheck, tests)"
  npm run check
fi

step "Build de production"
rm -rf out
npm run build

step "Vérification du dossier out/"
for f in index.html 404.html .htaccess fr/index.html en/index.html ar/index.html robots.txt sitemap.xml; do
  [[ -f "out/$f" ]] || fail "Fichier attendu absent du build : out/$f"
done
if grep -rIlE 'localhost:[0-9]+|127\.0\.0\.1' out >/dev/null; then
  grep -rIlE 'localhost:[0-9]+|127\.0\.0\.1' out | head >&2
  fail "Le build contient encore des URL localhost."
fi
BUILD_ID="$(cat .next/BUILD_ID)"
echo "OK : $(find out -type f | wc -l) fichiers, $(du -sh out | cut -f1), build $BUILD_ID"

# ── 3. Transfert SFTP ────────────────────────────────────────────────────────
mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
export LFTP_PASSWORD="$OVH_SFTP_PASSWORD"
lftp_run() {
  lftp -c "
    set cmd:fail-exit yes
    set net:max-retries 3
    set net:timeout 30
    set sftp:auto-confirm yes
    set sftp:connect-program 'ssh -a -x -o StrictHostKeyChecking=accept-new'
    open --env-password -u '$OVH_SFTP_USER' 'sftp://$OVH_SFTP_HOST'
    $1"
}

BACKUP_DIR="$HOME/ovh-backups/$(date +%Y%m%d-%H%M%S)"
MIRROR_OPTS="--reverse --verbose=1 --parallel=4 --no-perms"
[[ $DRY_RUN -eq 1 ]] && MIRROR_OPTS="$MIRROR_OPTS --dry-run"

if [[ $DRY_RUN -eq 0 ]]; then
  step "Sauvegarde du dossier distant $OVH_REMOTE_DIR → $BACKUP_DIR"
  mkdir -p "$BACKUP_DIR"
  lftp_run "mirror --verbose=0 --parallel=4 '$OVH_REMOTE_DIR' '$BACKUP_DIR'"
  echo "Sauvegarde : $(find "$BACKUP_DIR" -type f | wc -l) fichiers"
fi

step "Envoi des ressources statiques (_next/) puis des pages"
# Les fichiers hashés d'abord : une page n'est jamais en ligne avant ses JS/CSS.
lftp_run "mirror $MIRROR_OPTS out/_next '$OVH_REMOTE_DIR/_next'"
EXCL="--exclude-glob _next/"
lftp_run "mirror $MIRROR_OPTS $EXCL out '$OVH_REMOTE_DIR'"

if [[ $PRUNE -eq 1 ]]; then
  step "Suppression des fichiers distants absents du build (--prune)"
  lftp_run "mirror $MIRROR_OPTS --delete out '$OVH_REMOTE_DIR'"
fi

[[ $DRY_RUN -eq 1 ]] && { step "Simulation terminée (aucun fichier modifié)"; exit 0; }

# ── 4. Vérification en ligne ─────────────────────────────────────────────────
step "Vérification de $NEXT_PUBLIC_SITE_URL"
ok=1
for path in / /fr/ /en/ /ar/ /fr/legal/ /robots.txt /sitemap.xml /fr/opengraph-image /page-inexistante/; do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$NEXT_PUBLIC_SITE_URL$path" || echo 000)"
  expected=200; [[ "$path" == /page-inexistante/ ]] && expected=404
  printf '  %-24s %s\n' "$path" "$code"
  [[ "$code" == "$expected" ]] || ok=0
done
if curl -s --max-time 20 "$NEXT_PUBLIC_SITE_URL/fr/" | grep -q "$BUILD_ID"; then
  echo "  build $BUILD_ID bien servi"
else
  echo "  ⚠ le HTML servi ne contient pas le build $BUILD_ID (cache, DNS ou mauvais dossier ?)"; ok=0
fi
[[ $ok -eq 1 ]] && step "Déploiement vérifié ✔" || fail "Déploiement envoyé, mais des vérifications échouent (voir ci-dessus)."
