# CALCERY2 — Contexte Claude Code

## Stack
- Framework : Astro (astro.config.mjs)
- Langage : TypeScript + JavaScript (.mjs)
- CSS : Tailwind CSS
- Contenu : Collections Astro (dossier collections/)
- Build output : dist/

## Déploiement
- Git remote : GitHub
- CI/CD : Cloudflare Pages (déclenchement automatique sur push main)
- Workflow : modifier → build local → commit → push → Cloudflare déploie

## Commandes essentielles
```bash
npm run dev          # serveur local
npm run build        # build production → dist/
npm run preview      # prévisualiser le build
git add -A && git commit -m "..." && git push origin main  # déployer
```

## Structure clé
- collections/        → contenu des pages (modules, assets)
- scripts/            → scripts de vérification SEO (.mjs)
- src/                → composants Astro/TS
- public/             → assets statiques
- dist/               → build (ne jamais modifier manuellement)

## Scripts SEO disponibles
- check-adsense-dev.mjs
- check-analytics-dev.mjs
- test-new-calculators.mjs
- verify-calculator-pages.mjs
- verify-sitemap.mjs

## Règles absolues
1. Ne jamais modifier dist/ directement
2. Toujours vérifier `npm run build` passe avant de commiter
3. Les fichiers .mjs dans scripts/ sont des outils de vérification — ne pas les supprimer
4. Conserver la structure des collections Astro (content-assets.mjs, content-modules.mjs)

## Objectif du projet
Site SEO + calculateurs piloté par IA.
Chaque modification doit être propre, buildable, et déployable sans intervention manuelle.
