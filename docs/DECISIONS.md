# Décisions durables

Ce registre contient uniquement les décisions dont la remise en cause aurait un coût structurel. Les états temporaires et priorités courantes appartiennent à [STATUS.md](STATUS.md).

## 24 septembre 2026 — Organisation du travail

- `calcery/calcery2` est l'unique dépôt local actif pour le travail courant sur Calcery.
- Le dépôt parent historique `calcery` reste hors périmètre et ne doit pas être modifié.
- ChatGPT Chat pilote la réflexion, le SEO, la stratégie, l'analyse, le contenu, la priorisation et la préparation des tâches.
- Codex exécute localement dans le dépôt applicatif.
- Work est réservé aux interactions externes réelles et ponctuelles.

## 24 septembre 2026 — Architecture et qualité

- L'architecture reste un site statique Astro.
- Le modèle bilingue FR/EN conserve ses routes dédiées, ses canonicals auto-référentes et ses hreflang FR/EN avec `x-default`.
- Le sitemap reste un fichier XML direct.
- Les redirections sont pilotées par une source unique, `redirects.config.mjs`, puis générées dans `public/_redirects`.
- Les contrôles pertinents doivent passer avant intégration d'une modification.
- Analytics et AdSense restent conditionnés au consentement.

## 24 septembre 2026 — Documentation

- Les audits historiques sont conservés sans réécriture et ne constituent pas automatiquement l'état courant.
- [STATUS.md](STATUS.md) est la source de vérité pour l'état opérationnel courant.
- Un plan ou un audit ne constitue jamais à lui seul une autorisation d'exécution.

## 25 septembre 2026 — Périmètre des calculateurs YMYL

- Les calculateurs YMYL de Calcery privilégient un périmètre limité, explicite, sourcé et maintenable plutôt qu’une simulation exhaustive difficile à garantir.
- Le calculateur d’impôt sur le revenu est limité au barème progressif français 2026 sur les revenus 2025, appliqué au revenu net imposable et aux parts saisies ; ses mécanismes exclus et ses sources officielles restent visibles dans l’interface FR et EN.
