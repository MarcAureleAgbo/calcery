# Changelog — Calcery2

Journal des modifications et déploiements. Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/).
Le site est déployé automatiquement par **Cloudflare Pages** à chaque push sur `main`.

---

## 2026-06-21

### Environnement
- ⚠️ **Node ≥ 22.12.0 requis** par Astro (le build échoue sur Node 20).
  Fichier `.nvmrc` ajouté (22.12.0) → faire `nvm use` avant tout build.
  Penser à régler `NODE_VERSION=22.12.0` dans les variables d'env Cloudflare Pages.

### Ajouté
- Génération automatique des redirections Cloudflare : `redirects.config.mjs`
  + `scripts/generate-cloudflare-redirects.mjs` (lancé via `prebuild`, génère `public/_redirects`).
- Configuration ESLint : `eslint.config.mjs`.
- Workflows GitHub Actions (dossier `.github/`).
- Nouveaux scripts de vérification SEO : `scripts/verify-redirects.mjs`,
  `scripts/verify-site-output.mjs`.
- Runbook Search Console : `SEARCH_CONSOLE_RUNBOOK.md`.
- `CLAUDE.md` (contexte projet pour Claude Code).

### Modifié
- Migration `src/content/config.ts` → `src/content.config.ts` (mise à jour Astro).
- Mise à jour des calculateurs (Budget, CompoundInterest, Income, SavingsGoal,
  SmallExpensesSavings, SplitBill, Tip), layouts, composants UI et pages FR/EN.
- Rebuild complet de `dist/`.

### Vérifications (build OK)
- Sitemap : 140 URLs, 12 catégories, 62 calculateurs, 54 articles blog.
- Pages calculateurs : 62 vérifiées, JSON-LD/hreflang/headings OK.
- Redirections : 76 mappings canoniques, 152 règles HTTP statiques.
- Site output : 142 pages, 0 doublon titre/description, 0 noindex.

### Déploiement
- Commit `fb91624` poussé sur `main` → déploiement Cloudflare automatique.
