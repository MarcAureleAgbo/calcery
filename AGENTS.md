# Instructions permanentes pour Codex

## Identité

- `calcery2` est l'unique dépôt applicatif actif de Calcery.
- Calcery est un site evergreen bilingue français/anglais centré sur des calculateurs pratiques.
- Le blog accompagne les outils au moyen de clusters éditoriaux.

## Rôles

- ChatGPT Chat pilote la réflexion, le SEO, la stratégie, l'analyse, le contenu, la priorisation et la préparation des tâches.
- Codex exécute localement dans ce dépôt : code, fichiers, tests, build et Git.
- Work est réservé aux interactions externes réelles et ponctuelles.

## Git

- Inspecter `git status` avant toute mission et préserver les changements de l'utilisateur.
- Produire des commits ciblés ; ne jamais mélanger des sujets indépendants.
- Ne jamais réinitialiser ou supprimer destructivement des changements sans instruction explicite.
- Ne jamais pousser, déployer ou modifier le remote sans instruction explicite.
- Ne jamais intervenir sur le dépôt parent historique `calcery`.

## Architecture à préserver

- génération statique Astro ;
- routes FR/EN et convention de slash terminal ;
- canonicals auto-référentes ;
- hreflang FR/EN et `x-default` ;
- sitemap XML direct ;
- redirections définies dans `redirects.config.mjs` et générées dans `public/_redirects` ;
- Analytics et AdSense chargés uniquement après consentement.

Toute modification de ces invariants exige une mission explicite, une justification et des contrôles ciblés.

## Qualité

- Distinguer clairement fait, observation, hypothèse et décision.
- Un audit ou un plan n'est jamais une autorisation d'exécution.
- Exécuter les contrôles pertinents après toute modification.
- Ne jamais présenter un état Search Console, Cloudflare ou production comme vérifié sans l'accès réel correspondant.
- Consulter `docs/STATUS.md` pour l'état opérationnel et `docs/DECISIONS.md` pour les décisions durables.

## Commandes

```bash
nvm use
npm ci
npm run lint
npm run typecheck
npm run check
```

`npm ci` réinstalle `node_modules/`, qui est ignoré. `npm run check` lance le lint, les contrôles Astro/TypeScript, les tests de calculateurs et le build complet. Le build génère ou régénère notamment `public/_redirects` et `dist/`; certains fichiers de `dist/` sont historiquement suivis et peuvent donc apparaître dans le diff.
