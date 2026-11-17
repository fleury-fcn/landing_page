# Halal Open Facts : landing page

Landing commune à **halalopenfoodfacts** (aliments) et **halalopenbeautyfacts** (cosmétiques).

```
LandingPage_halal/
├── frontend/   Next.js 15 (App Router, export statique), TypeScript strict, Tailwind v4
└── backend/    Django 6 + Django REST Framework (API en lecture seule)
```

## Démarrage rapide

### 1. API Django (port 8000)

```bash
cd backend
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements-dev.txt
export DJANGO_DEBUG=true                 # ou copier .env.example et l'exporter
python manage.py migrate
python manage.py seed_demo               # données fictives (idempotent)
python manage.py runserver 8000
```

### 2. Landing (port 3000)

```bash
cd frontend
npm install
cp .env.example .env.local               # adapter les URL si besoin
npm run dev                              # http://localhost:3000 → redirige vers /fr/
```

Sans API, la page fonctionne quand même : chiffres de repli, et la recherche affiche un message d'indisponibilité.

## Scripts

| Où | Commande | Rôle |
|---|---|---|
| frontend | `npm run check` | lint + typecheck + tests (Vitest) |
| frontend | `npm run build` | export statique dans `out/` (lance `snapshot:stats` avant) |
| frontend | `npm run snapshot:stats` | met à jour les chiffres de repli depuis l'API (seulement si `NEXT_PUBLIC_API_URL` est défini) |
| backend | `ruff check . && ruff format --check .` | lint Python |
| backend | `python manage.py test` | tests API et modèles |

## API

Toutes les routes sont en `GET`, publiques, paginées (20 par page) et limitées à 120 req/min par IP.

| Route | Description |
|---|---|
| `/api/stats/` | `{ products: {food, beauty, total}, ingredients, contributors, updated_at }`, mis en cache 5 min |
| `/api/products/?project=food\|beauty` | liste des produits |
| `/api/products/search/?q=…&project=…` | recherche par nom, marque ou code-barres exact (`q` ≥ 2 caractères) |
| `/api/products/popular/?project=…&limit=6` | produits les plus consultés (max 24) |
| `/api/products/{barcode}/` | fiche détaillée avec ingrédients ordonnés, verdict et source |
| `/api/ingredients/`, `/api/ingredients/{slug}/` | fiches ingrédients et additifs |

CORS : seules les origines listées dans `CORS_ALLOWED_ORIGINS` sont autorisées, en `GET`/`OPTIONS`, sur `/api/*`.

## Choix techniques

- **Export statique** : HTML pré-rendu par langue (`/fr/`, `/en/`, `/ar/`) pour le SEO et le temps de chargement. Les données vivantes (stats, recherche) sont chargées côté client depuis Django.
- **Zéro dépendance UI** : icônes SVG maison, scroll reveal en CSS (`animation-timeline: view()`, désactivé si `prefers-reduced-motion`), maquette d'app en HTML/CSS (aucune image à charger).
- **Verdicts** : couleur + icône + libellé, jamais la couleur seule. Le statut global est le plus prudent des ingrédients (la même règle côté front `lib/verdict.ts` et côté back `catalog/models.py`).
- **i18n** : dictionnaires typés (`src/i18n/types.ts`), un test vérifie que les trois langues ont la même structure. RTL via `dir="rtl"` et propriétés logiques (`ms-`, `ps-`, `start-`…).
- **Thème vert** : la couleur de marque est le vert (`--brand` dans `globals.css`). Les accents Food (vert) et Beauty (prune) restent distincts.
- **Téléphones** : `components/phone/` contient un cadre CSS (`Phone`) et 7 écrans d'app (scanner, analyse, résultat, détail, recherche, historique, contribution), réutilisés dans le hero, les étapes, les projets, la galerie et la section contribuer. Ils ne chargent aucune image et sont traduits automatiquement.
- **Animations** : apparition du hero en cascade, téléphones flottants, laser du scanner, pastilles qui apparaissent, fonds animés, galerie défilante (pause au survol), compteurs animés et apparition au scroll (CSS natif, avec un fallback IntersectionObserver). Tout est coupé si `prefers-reduced-motion: reduce`.
- **Dark mode** : automatique via `prefers-color-scheme`. Tous les couples de couleurs respectent WCAG AA.

## Déploiement (points d'attention)

Procédure complète OVHcloud (SFTP, DNS, HTTPS, `npm run deploy`) : voir [DEPLOYMENT.md](DEPLOYMENT.md).

- Servir `frontend/out/` avec n'importe quel serveur statique ou CDN.
- En-têtes recommandés :
  - `/_next/static/*` → `Cache-Control: public, max-age=31536000, immutable`
  - `/*/opengraph-image` (fichier sans extension) → `Content-Type: image/png`

  Exemple Nginx :

  ```nginx
  location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location ~ ^/[a-z]{2}/opengraph-image$ { default_type image/png; }
  ```
- Backend en production : `DJANGO_DEBUG=false`, `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, et une base PostgreSQL à la place de SQLite.
