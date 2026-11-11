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

## 11 novembre 2026 — Différence calendaire entre deux dates

- La différence utilise des dates civiles à minuit UTC. Le total en jours mesure l’écart entre ces deux dates, sans ajout d’un jour pour inclure les deux bornes.
- La décomposition conserve la soustraction historique des champs années/mois/jours : si les jours sont négatifs, emprunter successivement la longueur réelle des mois précédant la date de fin, puis normaliser les mois entre 0 et 11. Il n’y a pas de rabattement automatique en fin de mois.
- Ainsi, du 31 janvier au 28 février 2025 : 0 an, 0 mois, 28 jours ; du 31 janvier au 1er mars 2025 : 0 an, 0 mois, 29 jours. Les résultats auparavant non négatifs sont conservés. Cette convention de soustraction ne définit pas une durée à réappliquer par addition de mois avec rabattement.
- Périmètre validé : corriger uniquement le calculateur de différence entre dates. Le calculateur d’âge conserve strictement son emprunt unique historique, avec tests de compatibilité, même lorsqu’il produit encore des jours négatifs (par exemple naissance le 31 janvier 2025 et référence au 1er mars 2025 : 0 an, 1 mois, -2 jours). Cette anomalie résiduelle exige un lot distinct. Les attentes négatives sont une caractérisation temporaire du défaut connu, à remplacer lors de sa correction ; elles ne définissent pas un comportement métier souhaitable.

## 11 novembre 2026 — Alignement du calculateur d’âge sur la différence calendaire

- Ce lot distinct lève la restriction temporaire du lot dates `0bae40a` : l’âge appelle désormais `calculateDateDifference` et reprend ses composantes années/mois/jours, avec emprunts successifs en UTC et sans rabattement en fin de mois.
- Le comportement du calculateur de dates reste inchangé. Les âges auparavant non négatifs sont conservés ; du 31 janvier au 1er mars 2025, l’âge devient 0 an, 0 mois, 29 jours.
- Les tests temporaires caractérisant les âges négatifs sont remplacés par des régressions positives. Une référence antérieure à la naissance reste rejetée ; une paire de dates futures reste autorisée si la référence n’est pas antérieure à la naissance, conformément aux règles existantes.
