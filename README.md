# Calcery

Site bilingue de calculateurs pratiques construit avec Astro 6, React 19 et Tailwind CSS.

État fonctionnel au 21 juin 2026 :

- 31 calculateurs disponibles en français et en anglais ;
- 52 articles de blog ;
- 140 URLs indexables dans un sitemap XML direct ;
- redirections HTTP Cloudflare pour les anciennes routes ;
- données structurées, canonicals et hreflang vérifiés au build ;
- Google Analytics et AdSense chargés uniquement après consentement.

## Prérequis

- Node.js 22.12 ou supérieur, conformément à `.nvmrc` ;
- npm.

```bash
nvm use
npm ci
npm run dev
```

## Contrôles

```bash
npm run lint
npm run typecheck
npm run check
```

`npm run check` exécute le lint, les contrôles Astro/TypeScript, les tests des calculateurs et le build complet. Le build vérifie aussi :

- le sitemap et ses dates de modification ;
- les pages et données structurées des calculateurs ;
- les redirections Cloudflare et l’absence de pages de redirection HTML ;
- les canonicals, titres, descriptions, directives d’indexation et garde-fous AdSense.

## Déploiement Cloudflare Pages

- Framework preset : `Astro`
- Build command : `npm run build`
- Build output directory : `dist`
- Version Node : lue depuis `.nvmrc`

Les redirections sont déclarées dans `redirects.config.mjs`, puis générées dans `public/_redirects` par `npm run generate:redirects`.

Le sitemap est généré par `src/pages/sitemap.xml.ts` à l’adresse :

`https://calcery.com/sitemap.xml`

## Structure

- `src/pages/` : routes Astro ;
- `src/components/calculators/` : interfaces de calcul React ;
- `src/content/` : articles Markdown ;
- `src/content.config.ts` : collections Astro ;
- `src/lib/calculator-taxonomy.ts` : catégories, routes et métadonnées ;
- `scripts/` : tests de cohérence SEO et build ;
- `SEARCH_CONSOLE_RUNBOOK.md` : procédure post-déploiement.

## Contact

contact@calcery.com
