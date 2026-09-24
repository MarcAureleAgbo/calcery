# Plan d’action Calcery — 21 septembre 2026

Ce plan découle de `audits/AUDIT_COMPLET_CALCERY_2026-09-21.md`. Il ne constitue pas une autorisation de modification ou de déploiement.

## Priorisation

- **P0** : bloque ou peut bloquer globalement le crawl/indexation.
- **P1** : impact SEO, confiance ou sécurité important.
- **P2** : optimisation utile.
- **P3** : amélioration secondaire.

### P0 — aucun blocage global confirmé

Le site répond, robots autorise le crawl, aucune directive `noindex` actuelle n’a été détectée, les canonicals sont cohérentes et 114 pages sont indexées. Créer un P0 artificiel serait contraire aux preuves.

## P1 — actions prioritaires

### P1.1 — Rafraîchir l’état du sitemap dans Search Console, après accord explicite

- **Problème** : Search Console conserve l’ancien sitemap sous forme d’index, 0 URL découverte, avec `sitemap-0.xml` inaccessible.
- **Preuve** : rapport Sitemaps, dernière lecture 24 mars 2026 ; production `/sitemap.xml` = `urlset` valide de 140 URLs.
- **Correction proposée** : après validation humaine, supprimer l’ancienne entrée si nécessaire puis soumettre uniquement `https://calcery.com/sitemap.xml`. Ne demander aucune indexation en masse.
- **Fichiers probablement concernés** : aucun si le sitemap public ne change pas. Conserver `src/pages/sitemap.xml.ts` et `public/robots.txt`.
- **Risque de régression** : faible ; une mauvaise manipulation pourrait toutefois dupliquer les entrées ou masquer l’historique de suivi.
- **Vérification** : Search Console doit relire la ressource comme sitemap d’URLs, afficher un nombre découvert proche de 140 et ne plus dépendre de `sitemap-0.xml`. Aucune garantie d’indexation.

### P1.2 — Nettoyer et différencier les contenus à faible valeur différentielle

- **Problème** : paragraphes identiques entre 8 articles FR et 12 articles EN, textes de calculateurs largement gabarités, 12 notes de production publiées, 10 articles canoniques explorés/non indexés.
- **Preuve** : 36 paragraphes longs répétés côté FR, 32 côté EN ; `src/content/blogEn/*:130` ; `src/lib/calculator-seo-content.ts:1620-1659` ; données Search Console.
- **Correction proposée** : supprimer immédiatement les notes de production et formulations parlant de SEO ; auditer les intentions page par page ; fusionner les pages qui se concurrencent ; réécrire les pages conservées avec exemples, données, sources et décisions réellement propres au sujet. Commencer par les 10 URLs explorées/non indexées.
- **Fichiers probablement concernés** : `src/content/blog/**/*.md`, `src/content/blogEn/**/*.md`, `src/lib/calculator-seo-content.ts` et éventuellement `src/lib/calculator-taxonomy.ts`.
- **Risque de régression** : changement de sens, perte accidentelle de liens ou de FAQ, réduction excessive de contenu ; risque de casser des paires hreflang en cas de suppression non coordonnée.
- **Vérification** : build complet ; détection automatique des phrases interdites et paragraphes identiques ; contrôle des liens/hreflang ; comparaison Search Console à J+14/J+28 après recrawl naturel.

### P1.3 — Restaurer les anciennes URLs de blog qui renvoient 404

- **Problème** : anciennes URLs encore connues de Google sans redirection ; l’une a généré un clic vers une 404.
- **Preuve** : `/blog/calcul-impot-revenu-sans-stress/` = 404 et 1 clic/8 impressions sur six mois ; `/blog/optimiser-quotient-familial-legalement/` figure dans les 404 Search Console.
- **Correction proposée** : ajouter des redirections 301 directes vers les routes FR canoniques correspondantes.
- **Fichiers probablement concernés** : `redirects.config.mjs`, puis fichier généré `public/_redirects`.
- **Risque de régression** : faible ; vérifier l’absence de boucle ou chaîne et la bonne destination éditoriale.
- **Vérification** : `npm run check` ; `curl -I` sur les deux variantes avec et sans slash ; une seule réponse 301 vers une cible 200 ; suivi des 404 Search Console sans lancer de validation avant accord.

### P1.4 — Fiabiliser le calculateur fiscal et cadrer la version EN

- **Problème** : l’année sélectionnée n’influence pas le calcul, les années proposées sont 2024/2025, les barèmes sont non sourcés et la version EN réutilise un système fiscal français sans cadrage clair.
- **Preuve** : `src/components/calculators/IncomeCalculator.tsx:9-15`, `:82-127`, `:188-200`.
- **Correction proposée** : définir des barèmes versionnés par année à partir d’une source officielle, afficher la juridiction et la date d’effet, intégrer l’année au calcul, supprimer l’option trompeuse ou la mettre à jour, clarifier/retirer la version EN générique si elle ne cible pas une juridiction réelle.
- **Fichiers probablement concernés** : `src/components/calculators/IncomeCalculator.tsx`, `src/lib/calculator-taxonomy.ts`, `src/lib/calculator-seo-content.ts`, tests de formules.
- **Risque de régression** : élevé sur le résultat financier ; nécessite jeux de tests de référence et revue métier.
- **Vérification** : tests unitaires par tranche/année/parts, comparaison à des cas officiels, revue FR/EN, date et sources visibles dans le HTML.

### P1.5 — Ajouter une gouvernance de sources pour les contenus finance/santé/immobilier

- **Problème** : formules et conseils sensibles sans références primaires ni propriétaire de mise à jour suffisamment visibles.
- **Preuve** : disclaimers génériques dans `src/layouts/CalculatorLayout.astro:64-89`, mais absence de citations structurées sur plusieurs pages ; barèmes codés en dur.
- **Correction proposée** : ajouter pour chaque outil sensible source primaire, juridiction, hypothèses, date d’effet, date de revue et responsable éditorial ; éviter les conseils personnalisés non justifiés.
- **Fichiers probablement concernés** : `src/lib/calculator-seo-content.ts`, `src/lib/calculator-taxonomy.ts`, `src/layouts/CalculatorLayout.astro`, pages légales/à-propos.
- **Risque de régression** : faible techniquement, moyen éditorialement si les sources ne correspondent pas exactement à la formule.
- **Vérification** : matrice de contrôle des 31 calculateurs ; liens accessibles ; cohérence formule/source ; revue périodique planifiée.

### P1.6 — Mettre à niveau les dépendances vulnérables par lot contrôlé

- **Problème** : 25 paquets signalés, dont 1 critique et 13 élevés ; Astro 6 est concerné par plusieurs avis récents.
- **Preuve** : `npm audit --json` du 21 septembre 2026 ; `package.json:26-67`.
- **Correction proposée** : créer une branche dédiée ; tester d’abord les mises à jour compatibles, puis planifier la migration Astro majeure nécessaire pour fermer l’avis critique ; ne pas utiliser `--force` sans revue.
- **Fichiers probablement concernés** : `package.json`, `package-lock.json`, configuration Astro et éventuelles intégrations.
- **Risque de régression** : moyen à élevé (Astro, React, build Markdown, génération sitemap et assets).
- **Vérification** : `npm ci`, `npm audit`, `npm run check`, comparaison des 142 sorties, smoke tests FR/EN, redirections et données structurées.

## P2 — optimisations utiles

### P2.1 — Supprimer la route `/en/404/` indexable ou la rendre explicitement non indexable

- **Problème** : page technique 200, canonical auto-référente, hreflang vers une page d’erreur et aucun lien entrant.
- **Preuve** : `src/pages/en/404.astro:1-38`, observation production.
- **Correction proposée** : privilégier une seule vraie page 404 localisée selon le chemin/requête, servie avec statut 404 et `noindex`; à défaut, exclure explicitement `/en/404/` de l’indexation et retirer ses alternates.
- **Fichiers probablement concernés** : `src/pages/en/404.astro`, `src/pages/404.astro`, `src/layouts/BaseLayout.astro` ou props SEO.
- **Risque de régression** : comportement Cloudflare spécifique des fichiers 404 ; tester en preview et production.
- **Vérification** : URL inexistante FR/EN = 404 ; aucune canonical/hreflang technique incohérente ; `/en/404/` non indexable ou absent.

### P2.2 — Garantir un seul H1 par article

- **Problème** : 21 articles ont un H1 du template et un H1 Markdown.
- **Preuve** : `src/pages/[lang]/blog/[slug].astro:275-307` et 21 fichiers commençant par `#`.
- **Correction proposée** : retirer les H1 Markdown des contenus, puisque le titre est déjà rendu par le template ; ajouter un contrôle au build.
- **Fichiers probablement concernés** : 21 fichiers dans `src/content/blog/` et `src/content/blogEn/`, `scripts/verify-site-output.mjs`.
- **Risque de régression** : faible ; attention aux ancres automatiques et au premier paragraphe.
- **Vérification** : exactement un `<h1>` par page HTML ; `npm run check`.

### P2.3 — Réduire le coût d’hydratation des calculateurs

- **Problème** : React est hydraté avec `client:load` sur chaque page calculateur ; bundle partagé ~58 Ko gzip plus composant.
- **Preuve** : routes calculateurs `:69-76` ; analyse de `dist/_astro`.
- **Correction proposée** : profiler avant changement ; tester `client:visible`, `client:idle` ou une initialisation plus légère selon l’expérience attendue ; conserver le contenu SEO statique.
- **Fichiers probablement concernés** : `src/pages/fr/[category]/[slug].astro`, `src/pages/en/[category]/[slug].astro`, composants React.
- **Risque de régression** : retard d’interactivité, problème d’accessibilité clavier ou de calcul initial.
- **Vérification** : Lighthouse local/CI, INP/LCP/CLS, tests d’interaction mobile, absence de décalage, Core Web Vitals terrain lorsqu’ils deviennent disponibles.

### P2.4 — Maîtriser les polices et ressources tierces

- **Problème** : CSS Google Fonts externe et scripts publicitaires/analytics après consentement peuvent affecter le rendu réel.
- **Preuve** : `src/layouts/BaseLayout.astro:193-195`, `src/components/Analytics.astro`, `src/components/Adsense.astro`.
- **Correction proposée** : évaluer l’auto-hébergement des fontes, `font-display`, sous-ensembles et poids réellement utilisés ; mesurer AdSense après consentement.
- **Fichiers probablement concernés** : `src/layouts/BaseLayout.astro`, styles et assets de fontes.
- **Risque de régression** : changement typographique, licences, cache ou poids transféré.
- **Vérification** : waterfall réseau, rendu mobile, LCP/CLS, poids gzip/brotli.

### P2.5 — Développer des signaux d’autorité légitimes

- **Problème** : Search Console ne détecte qu’un lien externe.
- **Preuve** : rapport Liens Search Console au 21 septembre 2026.
- **Correction proposée** : publier des ressources réellement citables (méthodologie, données, exemples), nouer des partenariats éditoriaux pertinents, obtenir des mentions naturelles ; aucune campagne artificielle de liens.
- **Fichiers probablement concernés** : contenus éditoriaux et pages méthodologiques, pas nécessairement le code.
- **Risque de régression** : pratiques de liens artificiels ou contenus hors positionnement.
- **Vérification** : nouveaux domaines référents qualifiés, trafic référent, évolution des requêtes et positions sur plusieurs mois.

### P2.6 — Vérifier la chaîne Cloudflare et son alignement avec Git

- **Problème** : les sources documentent Cloudflare Pages mais ne prouvent ni la branche ni le SHA actuellement déployé.
- **Preuve** : `README.md:40-47`; absence de configuration Cloudflare exportée ; remote Git confirmé.
- **Correction proposée** : audit lecture seule du projet Cloudflare, puis documenter dépôt, branche, commande, sortie, Node, règles et SHA du dernier déploiement.
- **Fichiers probablement concernés** : documentation dans `calcery-pilotage`; aucune configuration Cloudflare sans accord.
- **Risque de régression** : nul en lecture ; élevé si des règles sont modifiées sans plan.
- **Vérification** : SHA production = commit attendu ; paramètres concordants ; redirections et en-têtes testés.

## P3 — améliorations secondaires

### P3.1 — Ajouter des contrôles qualité éditoriale au build

- **Problème** : le build vérifie titles/descriptions/noindex mais laisse passer doubles H1, phrases de production et paragraphes copiés.
- **Preuve** : build vert malgré les constats confirmés.
- **Correction proposée** : détecter plusieurs H1, marqueurs `draft`, formulations interdites, duplications exactes au-dessus d’un seuil et liens internes cassés.
- **Fichiers probablement concernés** : `scripts/verify-site-output.mjs` ou nouveau script, `package.json`.
- **Risque de régression** : faux positifs bloquant le build.
- **Vérification** : tests positifs/négatifs du script, seuils documentés, CI verte.

### P3.2 — Clarifier les métadonnées et profils sociaux

- **Problème** : `twitter:site` vaut `@calcery` sans preuve de propriété/usage actuel ; OG global générique.
- **Preuve** : `src/components/SEO.astro:41-53`.
- **Correction proposée** : vérifier le compte, retirer l’attribut s’il n’est pas exploité et produire des images OG spécifiques pour les pages stratégiques si cela apporte une valeur réelle.
- **Fichiers probablement concernés** : `src/components/SEO.astro`, assets OG, métadonnées de contenu.
- **Risque de régression** : faible.
- **Vérification** : validateurs Open Graph/Twitter et aperçus de partage.

## Séquence recommandée

1. Valider le présent audit et geler toute nouvelle production de pages gabaritées.
2. Corriger les deux redirections 404 et la page `/en/404/`.
3. Nettoyer les marqueurs de production et doubles H1.
4. Revoir les 10 articles explorés/non indexés, puis les 16 autres URLs absentes de la liste indexée.
5. Corriger et sourcer le calculateur fiscal, puis établir la gouvernance YMYL.
6. Mettre à niveau les dépendances dans une branche dédiée.
7. Avec accord explicite, rafraîchir le sitemap dans Search Console et relever un état de référence.
8. Mesurer à J+14 et J+28 sans promettre de délai d’indexation.
9. Profiler la performance et n’optimiser l’hydratation qu’à partir de mesures.

## Première correction proposée

Commencer par un lot court et vérifiable dans `calcery2` : ajouter les deux redirections 301 historiques, neutraliser la route `/en/404/` indexable, puis ajouter les tests correspondants. Ce lot restaure immédiatement les parcours cassés et nettoie une page technique sans refonte éditoriale. Il devra être réalisé uniquement après validation explicite.
