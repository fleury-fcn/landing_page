# Déploiement : landing sur OVHcloud (hébergement mutualisé Perso)

## Architecture

| Élément | Hébergement | Remarque |
|---|---|---|
| Landing (`frontend/`, Next.js en export statique) | OVHcloud hosting-perso, Apache | HTML/CSS/JS pré-générés, aucun serveur Node requis |
| API Django (`backend/`) | **pas sur hosting-perso** | l'offre Perso n'exécute ni Python ni de processus permanent. À héberger ailleurs (VPS, PaaS…), puis renseigner `NEXT_PUBLIC_API_URL` |
| Domaine | registrar externe | on garde ses serveurs DNS, on ajoute seulement des enregistrements |

Sans API joignable, la landing reste fonctionnelle : chiffres de repli (`src/lib/stats-snapshot.json`) et message d'indisponibilité pour la recherche.

## Transfert : SFTP (chiffré)

Le serveur FTP d'OVH refuse `AUTH TLS` : **FTPS n'est pas disponible**. Le FTP simple envoie le mot de passe en clair, on ne l'utilise donc pas. OVH fournit en revanche **SFTP sur le port 22**, avec les mêmes identifiants que le FTP (shell SSH non inclus dans l'offre Perso). Le script utilise `lftp` en SFTP.

## Configuration initiale (une seule fois)

1. **Mot de passe** : GitHub → Settings → Codespaces → *Secrets* → `OVH_SFTP_PASSWORD`, avec accès à ce dépôt. Recharger ensuite le codespace pour que la variable soit disponible.
2. Dans `frontend/` :
   ```bash
   cp .env.production.example .env.production   # URL publiques réelles
   cp .env.deploy.example .env.deploy           # hôte, identifiant et dossier SFTP
   sudo apt-get install -y lftp                 # si absent du codespace
   ```
   Ces deux fichiers sont ignorés par Git.
3. `OVH_REMOTE_DIR` doit être le **dossier racine** associé au domaine dans OVH Manager → Web Cloud → Hébergements → *Multisite*.

## Associer le domaine externe

### Côté OVH Manager

Web Cloud → Hébergements → *votre hébergement* → **Multisite** → *Ajouter un domaine ou sous-domaine* → **Ajouter un nom de domaine externe** :
- domaine : `exemple.com`, avec l'option pour ajouter aussi `www.exemple.com` ;
- dossier racine : celui de `OVH_REMOTE_DIR` (par ex. `www`) ;
- cocher **SSL** (certificat Let's Encrypt gratuit).

OVH affiche alors un **enregistrement TXT `ovhcontrol`** à créer pour prouver que le domaine vous appartient. Les IP de l'hébergement sont visibles dans l'onglet *Informations générales*.

### Côté registrar : zone DNS

Ne **pas** changer les serveurs DNS. Ajouter ou modifier uniquement ces enregistrements :

| Type | Nom | Valeur |
|---|---|---|
| A | `@` (racine) | IPv4 de l'hébergement (Informations générales) |
| A | `www` | même IPv4 (ou `CNAME www → exemple.com.`) |
| AAAA | `@` et `www` | IPv6 de l'hébergement, **seulement si elle est affichée dans le Manager** |
| TXT | `ovhcontrol` | valeur donnée par OVH à l'étape Multisite |

Supprimer les anciens A/AAAA/CNAME de `@` et `www` qui pointent ailleurs (page parking du registrar, par exemple). Ne pas toucher à **MX**, **SPF/DKIM/DMARC** (TXT) ni aux autres sous-domaines : ils font fonctionner la messagerie.

Vérifier la propagation :
```bash
getent ahosts exemple.com ; getent ahosts www.exemple.com
```

### HTTPS

1. Attendre que le Multisite affiche le SSL **Actif** (souvent moins d'une heure après la propagation DNS).
2. Vérifier : `curl -sI https://exemple.com/fr/ | head -1` → `HTTP/… 200`.
3. Seulement à ce moment-là, décommenter le bloc **HTTPS** dans `frontend/public/.htaccess` (et éventuellement le domaine canonique et HSTS), puis redéployer.

## Déployer une mise à jour

```bash
cd LandingPage_halal/frontend
npm run dev            # 1. modifier et tester localement
npm run deploy:dry     # 2. (optionnel) voir ce qui serait envoyé
npm run deploy         # 3. contrôles + build + sauvegarde + envoi + vérification
```

`npm run deploy` :
1. refuse de partir si une URL de `.env.production` contient `localhost` ou si le mot de passe manque ;
2. lance `npm run check` (lint, typecheck, tests), puis `npm run build` ;
3. vérifie la présence des pages clés et l'absence de `localhost` dans `out/` ;
4. **sauvegarde** le dossier distant dans `~/ovh-backups/<date>/` (hors dépôt) ;
5. envoie `_next/` (JS/CSS hashés) d'abord, puis les pages ;
6. teste les URL publiques (200, 404 attendu, build servi).

Options : `--prune` supprime côté serveur les fichiers absents du build (anciens chunks), une sauvegarde étant faite avant. `--skip-checks` est déconseillé.

## Restaurer une version

```bash
ls ~/ovh-backups/
# renvoyer une sauvegarde : même commande lftp que le script, en mirror --reverse <sauvegarde> <dossier distant>
```
Les sauvegardes vivent dans le codespace : elles disparaissent si le codespace est supprimé.

## Dépannage

| Symptôme | Piste |
|---|---|
| « Site en construction » OVH | mauvais dossier racine (Multisite) ou envoi dans le mauvais `OVH_REMOTE_DIR` |
| Erreur 500 | `.htaccess` : revenir à la version précédente et redéployer |
| Certificat invalide | SSL pas encore actif dans Multisite, ou AAAA pointant ailleurs |
| Chiffres non mis à jour, recherche « indisponible » | API non joignable ou CORS : ajouter le domaine à `CORS_ALLOWED_ORIGINS` côté Django |
| Mot de passe refusé | le régénérer : Manager → Hébergement → FTP-SSH → modifier le mot de passe, puis mettre à jour le secret |
