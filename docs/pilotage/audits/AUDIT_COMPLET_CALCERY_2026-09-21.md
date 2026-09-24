# Audit complet Calcery — 21 septembre 2026

## 1. Objet et périmètre

Cet audit couvre l’architecture, le crawl, l’indexabilité, les sitemaps, le SEO on-page, le multilingue, la qualité éditoriale, la performance et la chaîne de production de Calcery.

Sources distinguées dans ce rapport :

- **Dépôt** : faits vérifiés dans `calcery/calcery2` ou dans sa sortie de build locale.
- **Production** : réponses HTTP et HTML observées sur `https://calcery.com` le 21 septembre 2026.
- **Search Console** : données lues dans la propriété de domaine `sc-domain:calcery.com`, sans aucune action d’écriture.
- **Hypothèse** : interprétation qui devra être confirmée par une mesure, un nouveau crawl ou une donnée externe.

Aucune modification n’a été apportée à `calcery2`, aucune configuration Google ou Cloudflare n’a été modifiée et aucun déploiement, push, envoi de sitemap, demande d’indexation ou validation de correction n’a été lancé.

## 2. Références Git et vérifications exécutées

### État initial

| Dépôt | HEAD | État initial |
|---|---|---|
| `calcery-pilotage` | `2cacc056408d86618561fd4d2e0fdd4a45439d9e` | propre |
| `calcery/calcery2` | `708d5cdd83bb9c2dc081fe290b78cf21cbd53432` | propre |

Remote applicatif constaté : `origin https://github.com/MarcAureleAgbo/calcery.git`.

Le dossier parent historique `calcery` n’a pas été modifié.

### Contrôles locaux

`npm ci` puis `npm run check` ont été exécutés dans `calcery2` :

- ESLint : succès, aucune alerte ;
- Astro/TypeScript : 0 erreur, 0 avertissement, 0 hint ;
- tests des nouveaux calculateurs : succès ;
- build statique : succès, 142 pages HTML générées ;
- sitemap : 140 URLs vérifiées ;
- 12 pages de catégories, 62 pages de calculateurs et 54 URLs de blog vérifiées ;
- redirections et garde-fous de sortie : succès ;
- aucune duplication de `title` ou de meta description signalée par le vérificateur ;
- aucune page `noindex` ni meta-refresh dans la sortie.

Le build a régénéré `public/_redirects` à l’identique. `calcery2` est resté propre.

## 3. Synthèse exécutive

### État général

Calcery dispose d’une base technique solide : site statique, URLs canoniques stables, redirections de variantes, `robots.txt` ouvert, sitemap actuel valide, hreflang réciproques, maillage interne dense et contrôles de build utiles. Google peut crawler et indexer le site : Search Console déclare 114 pages indexées et aucun problème manuel ou de sécurité.

Il n’existe pas de **P0 confirmé** bloquant globalement le crawl ou l’indexation. Les difficultés sont sélectives : 26 URLs du sitemap actuel ne figurent pas dans la liste des 114 URLs indexées. Dix d’entre elles sont explicitement « explorées, actuellement non indexées ». Le principal faisceau de preuves pointe vers :

1. un état de sitemap obsolète dans Search Console, resté sur l’ancien format d’index et son enfant inaccessible ;
2. des contenus éditoriaux et des blocs de calculateurs fortement répétitifs, dont certains exposent des formulations de production ;
3. quelques défauts techniques ciblés, dont une ancienne URL de blog encore visible dans la recherche mais renvoyant 404, et une page `/en/404/` indexable en 200 ;
4. un déficit de signaux d’autorité externe et des contenus sensibles insuffisamment sourcés ou actualisés.

### Niveau de preuve des causes d’indexation

| Niveau | Constat |
|---|---|
| **Confirmé** | 114 pages indexées, 55 non indexées parmi les URLs connues ; 19 « explorées, actuellement non indexées » ; 26 URLs canoniques du sitemap absentes de la liste indexée ; sitemap Search Console encore interprété comme un index ancien avec 0 URL découverte et un enfant `sitemap-0.xml` impossible à récupérer ; contenus publiés très répétitifs ; URL historique de blog en 404 malgré impressions/clic ; `/en/404/` répond 200 et est indexable. |
| **Probable** | La similarité éditoriale élevée et les formulations industrielles réduisent la valeur différentielle de plusieurs pages et contribuent au groupe « explorée, actuellement non indexée ». L’état obsolète du sitemap réduit la qualité du signal de découverte des URLs récentes. |
| **Possible** | Faible autorité externe, rendu/hydratation React plus lourd que nécessaire, manque de sources et d’actualisation sur les sujets financiers et santé. Ces éléments peuvent influencer la priorité de crawl, la confiance ou les performances, sans constituer seuls une cause prouvée de non-indexation. |
| **Non vérifiable actuellement** | Canonique réellement choisie par Google pour chacune des pages exclues, logs Googlebot Cloudflare, configuration exacte du projet Cloudflare Pages, métriques Core Web Vitals terrain faute de données CrUX suffisantes. |

## 4. Architecture et build

### Faits dépôt

- Astro `6.4.8`, React `19.2.3`, Tailwind `3.4.19` : `package.json:26-45`.
- Génération statique Astro, `site` fixé à `https://calcery.com` et `trailingSlash: 'always'` : `astro.config.mjs:7-8`, `astro.config.mjs:51-61`, `site.config.mjs:1`.
- Les liens Markdown internes sont normalisés avec slash terminal pendant le build : `astro.config.mjs:11-48`.
- 31 calculateurs existent en FR et EN via deux routes statiques : `src/pages/fr/[category]/[slug].astro:25-76` et `src/pages/en/[category]/[slug].astro:25-76`.
- 26 articles FR et 26 articles EN sont publiés dans les collections `src/content/blog/` et `src/content/blogEn/`.
- Le build produit 142 pages HTML : 140 URLs indexables du sitemap, la page d’erreur standard et `/en/404/`.
- Les calculateurs sont hydratés avec `client:load` : `src/pages/fr/[category]/[slug].astro:69-76` et équivalent EN.
- Le workflow GitHub Actions exécute `npm ci` puis `npm run check` sur push `main` et pull request : `.github/workflows/quality.yml:1-25`.

### Éléments sains à préserver

- Génération statique prévisible et contrôlable.
- Contrôles de build dédiés au sitemap, aux calculateurs, aux redirections et à la sortie SEO : `package.json:8-24`.
- Route unique pilotée par une taxonomie centrale pour chaque calculateur et chaque langue.
- Pas de page de redirection HTML ni de meta-refresh.
- Pas de lien interne sans slash terminal observé dans la sortie construite.

### Risque dépendances

`npm audit` signale au 21 septembre 2026 : 25 paquets vulnérables (1 faible, 10 modérés, 13 élevés, 1 critique). Le risque critique remonte notamment à Astro `<7.2.8` via l’optimisation AVIF ; d’autres alertes concernent `sharp`, `postcss`, `js-yaml`, `browserslist`, `fast-uri` et des outils de build.

Le site est statique et n’accepte pas de téléversement d’images utilisateur : cela réduit l’exposition en production, mais ne supprime pas le risque de build et de chaîne d’approvisionnement. Une montée de version doit être testée, pas appliquée automatiquement par `npm audit fix --force`.

## 5. Indexabilité technique

### Robots et directives

**Dépôt** : `public/robots.txt:1-17` autorise Googlebot, Googlebot Image/Video et tous les agents, puis déclare `https://calcery.com/sitemap.xml`.

**Production** :

- `/robots.txt` : 200, `text/plain`, `X-Robots-Tag: all` ;
- `/sitemap.xml` : 200, `application/xml`, `X-Robots-Tag: all` ;
- aucune meta `noindex` dans les 142 sorties HTML locales.

Il n’existe donc pas de blocage robots/noindex actuel démontré dans le dépôt ou sur les pages testées.

### Canonicals et hreflang

- Canonical auto-référente et normalisée : `src/components/SEO.astro:15-25`, `src/components/SEO.astro:35-47`.
- Alternates FR, EN et `x-default` vers la version FR : `src/layouts/BaseLayout.astro:164-198`.
- Les routes calculateurs passent explicitement les paires FR/EN réciproques : `src/pages/fr/[category]/[slug].astro:46-50` et `src/pages/en/[category]/[slug].astro:46-50`.
- Un échantillon production FR/EN confirme des canonicals et hreflang cohérents.

### Statuts et redirections

Observations production :

- `https://calcery.com/` : 200 ;
- `http://calcery.com/` : 301 vers HTTPS ;
- `https://www.calcery.com/` : 301 vers l’apex HTTPS ;
- une URL canonique sans slash, par exemple `/fr/finance/impot-revenu`, répond 308 vers la version avec slash ;
- les routes héritées testées répondent 301 vers leur cible finale ;
- une URL inexistante ordinaire répond 404.

Les 152 règles Cloudflare Pages sont générées à partir de 76 paires dans `redirects.config.mjs`, avec contrôle anti-chaîne : `scripts/generate-cloudflare-redirects.mjs:5-31`.

### Problèmes confirmés

#### 5.1 Page technique EN exposée en 200

`src/pages/en/404.astro` devient une vraie route `/en/404/`. En production elle répond 200, possède une canonical auto-référente, un hreflang EN et un x-default vers `/404/`, sans `noindex`. Elle est absente du sitemap mais constitue la seule page HTML sans lien entrant observée dans le graphe interne.

Preuve : `src/pages/en/404.astro:1-38`, comportement par défaut de `src/components/SEO.astro:15-25`, production `https://calcery.com/en/404/`.

Impact : page technique indexable, signal hreflang incohérent puisque la cible FR est une page d’erreur, dilution marginale du crawl.

#### 5.2 Ancienne URL de blog en 404

`https://calcery.com/blog/calcul-impot-revenu-sans-stress/` répond 404 alors que la page canonique existe sous `/fr/blog/calcul-impot-revenu-sans-stress/`. Search Console a enregistré 8 impressions et 1 clic sur l’ancienne URL sur six mois. Cette route n’est pas dans `redirects.config.mjs`.

Une seconde ancienne URL, `/blog/optimiser-quotient-familial-legalement/`, figure dans le groupe 404 Search Console et n’a pas non plus de redirection dédiée.

Impact : perte de l’utilisateur et des signaux historiques ; ce n’est pas un blocage global.

### Pages orphelines et duplication d’URL

- Graphe construit à partir de la sortie : toutes les pages canoniques du sitemap reçoivent au moins un lien interne.
- Seule `/en/404/` a zéro lien entrant.
- Les variantes sans slash, HTTP, `www` et anciens slugs sont redirigées ; aucune variante redirigée n’est incluse dans le sitemap actuel.
- Aucune pagination n’est présente.
- Les collections excluent les brouillons du sitemap : `src/pages/sitemap.xml.ts:46-50`.

## 6. Sitemap

### État actuel sain dans le dépôt et en production

`src/pages/sitemap.xml.ts:19-100` génère directement un `<urlset>` :

- 14 pages statiques/hubs ;
- 12 catégories ;
- 62 pages calculateurs ;
- 52 articles ;
- total : 140 URLs canoniques.

Toutes répondent par des routes statiques attendues ; aucune route de redirection, page 404 ou brouillon n’est incluse. Le sitemap local et le sitemap public comptent 140 `<loc>`.

### État Search Console confirmé obsolète

Dans Search Console, l’entrée soumise `https://calcery.com/sitemap.xml` est encore classée comme **Index de sitemaps**, dernière lecture le 24 mars 2026, avec 0 page découverte. Son enfant `https://calcery.com/sitemap-0.xml` est marqué « Impossible de récupérer le sitemap » et contient 0 URL découverte.

Ce diagnostic ne décrit plus la ressource publique actuelle, qui est un `urlset` valide de 140 URLs. Il démontre que Search Console n’a pas actualisé l’ancien état de soumission au moment de l’audit.

Important : un sitemap facilite la découverte mais ne garantit jamais l’indexation. L’état obsolète est un problème opérationnel P1, pas la preuve d’un blocage absolu puisque 114 pages sont déjà indexées.

## 7. Données Search Console croisées avec le dépôt

### Couverture au 18 septembre 2026

- 114 pages indexées ;
- 55 pages non indexées ;
- 169 URLs connues au total.

Raisons des 55 exclusions :

| Raison Search Console | Nombre | Lecture audit |
|---|---:|---|
| Page avec redirection | 30 | Majoritairement attendu : variantes sans slash, HTTP/WWW et anciens slugs. |
| Exclue par `noindex` | 3 | Anciennes routes EN avec slugs FR, dernier crawl avril/juin ; le dépôt actuel les redirige et ne contient plus ce `noindex`. État historique. |
| Introuvable (404) | 3 | Deux routes sont désormais redirigées ; `/blog/optimiser-quotient-familial-legalement/` reste sans redirection. |
| Explorée, actuellement non indexée | 19 | 10 URLs canoniques actuelles et 9 variantes/anciennes routes. |

### Croisement exhaustif des URLs indexées avec le sitemap actuel

- Les 114 URLs déclarées indexées par Search Console sont toutes présentes dans le sitemap actuel.
- 26 des 140 URLs du sitemap ne sont pas dans la liste indexée.
- 10 de ces 26 figurent explicitement dans « explorée, actuellement non indexée ».
- Les 16 autres ne figurent ni dans la liste indexée ni parmi les 19 exemples complets de ce groupe. Sans inspection individuelle, leur statut exact ne doit pas être inventé.

#### 10 URLs canoniques explorées et non indexées

1. `/en/blog/small-expenses-that-add-up/`
2. `/en/blog/split-bill-with-friends/`
3. `/en/blog/family-tax-shares-guide/`
4. `/en/blog/tipping-guide-home-and-travel/`
5. `/fr/blog/fonds-urgence-combien-mettre/`
6. `/fr/blog/budget-mensuel-inflation-comment-sadapter/`
7. `/en/blog/50-30-20-budget-rule/`
8. `/en/blog/monthly-budget-and-inflation-adaptation/`
9. `/en/blog/dca-investing-guide/`
10. `/en/blog/monthly-budget-irregular-income/`

Ce groupe est exclusivement éditorial. Plusieurs de ces pages font partie des contenus les plus courts ou des clusters très répétitifs relevés dans le dépôt, ce qui rend le facteur qualité **probable**, sans prouver l’algorithme de Google.

#### 16 autres URLs du sitemap absentes de la liste indexée

- `/en/a-propos/`
- `/en/blog/couple-budget-simple-method/`
- `/en/blog/emergency-fund-guide/`
- `/en/blog/how-to-build-an-effective-monthly-budget/`
- `/en/blog/increase-savings-capacity-quickly/`
- `/en/blog/monthly-budget-before-buying-a-home/`
- `/en/blog/monthly-budget-for-couples-best-setup/`
- `/en/blog/monthly-budget-step-by-step-guide/`
- `/en/finance/vat-calculator/`
- `/en/health/target-heart-rate/`
- `/fr/blog/budget-mensuel-en-couple-organisation-optimale/`
- `/fr/blog/budget-mensuel-revenu-irregulier/`
- `/fr/blog/comment-faire-budget-mensuel-efficace/`
- `/fr/blog/interets-composes-erreurs-a-eviter/`
- `/fr/blog/reduire-depenses-mensuelles-intelligemment/`
- `/fr/finance/tva-ht-ttc/`

### Performances de recherche

Période 20 mars–19 septembre 2026 :

- 32 clics ;
- 7 790 impressions ;
- CTR 0,4 % ;
- position moyenne 38,8.

Sur trois mois : 27 clics, 6 850 impressions, CTR 0,4 %, position moyenne 38,3.

Le blog, filtré par `/blog/` sur six mois, totalise 2 clics, 447 impressions, CTR 0,4 % et position moyenne 26,6. Le trafic est donc encore très faible ; les données ne permettent pas d’isoler un effet statistique robuste page par page.

### Signaux complémentaires Search Console

- Actions manuelles : aucune.
- Problèmes de sécurité : aucun.
- HTTPS : 82 URLs HTTPS valides, 0 non-HTTPS, aucun problème déclaré.
- Fil d’Ariane : 72 éléments valides, 0 invalide.
- Core Web Vitals : données insuffisantes sur mobile et ordinateur pendant les 90 derniers jours.
- Liens externes : 1 lien détecté, depuis `reducmiz.com`, vers l’accueil.
- Liens internes : 4 463, avec les pages principales fortement reliées via la navigation.

## 8. SEO on-page et données structurées

### Éléments sains

- Titles et descriptions distincts selon le vérificateur de sortie.
- Canonicals auto-référentes et absolues.
- Un H1 explicite sur les pages calculateurs : `src/layouts/CalculatorLayout.astro:127-157`.
- `WebApplication` JSON-LD sur les calculateurs : `src/layouts/CalculatorLayout.astro:95-128`.
- `Article` et `FAQPage` JSON-LD sur les articles : `src/pages/[lang]/blog/[slug].astro:253-263`.
- Breadcrumbs reconnus dans Search Console sans erreur.
- Articles reliés à des outils utiles et à d’autres articles : `src/pages/[lang]/blog/[slug].astro:312-330` et suite.

### Problèmes confirmés

#### 8.1 Doubles H1 sur 21 articles

Le template rend un H1 à partir du frontmatter (`src/pages/[lang]/blog/[slug].astro:275-281`) puis `<Content />` (`:305-307`). Vingt-et-un fichiers Markdown commencent aussi par `#`, ce qui produit deux H1 dans le HTML public : 8 FR et 13 EN.

Ce n’est pas un blocage d’indexation, mais cela affaiblit la hiérarchie sémantique et révèle une incohérence éditoriale automatisable.

#### 8.2 Contenu de production publié dans 12 articles EN

Douze articles EN contiennent à la ligne 130 la phrase :

> This draft includes a structured `faq` field in frontmatter so the existing blog template can output one valid FAQPage schema automatically when the post is published (`draft: false`).

Exemples : `src/content/blogEn/student-monthly-budget-simple-template.md:130`, `src/content/blogEn/hidden-mistakes-in-a-monthly-budget.md:130`, `src/content/blogEn/monthly-budget-and-inflation-adaptation.md:130`.

La phrase est effectivement publiée dans la sortie HTML et décrit le mécanisme de génération plutôt que le sujet utilisateur.

#### 8.3 Formulations SEO internes publiées sur les calculateurs

Le générateur partage des paragraphes longs entre de nombreuses pages. Exemple FR publié sur 27 pages :

> L’intérêt SEO et pédagogique est double…

Source : `src/lib/calculator-seo-content.ts:1620-1631`.

Exemple EN publié sur les 31 pages :

> From a content-quality perspective…

Source : `src/lib/calculator-seo-content.ts:1634-1640`.

Ces formulations parlent de SEO et de qualité de contenu, pas du besoin de l’utilisateur. Elles constituent un signal clair de contenu fabriqué à grande échelle.

## 9. Qualité, originalité et utilité

### Valeur réelle

Les 31 calculateurs sont fonctionnels, produisent un résultat côté client et les tests de formules des nouveaux calculateurs passent. Les pages expliquent généralement les entrées, la formule, les scénarios, les limites et proposent un maillage vers des ressources connexes. Cette base produit est utile et ne doit pas être supprimée globalement.

### Répétitivité confirmée

Analyse des paragraphes Markdown de 120 caractères ou plus :

- 36 paragraphes FR sont répétés à l’identique entre plusieurs articles, avec un maximum de 8 fichiers pour un même paragraphe ;
- 32 paragraphes EN sont répétés à l’identique, avec un maximum de 12 fichiers ;
- les blocs introductifs et méthodologiques des calculateurs sont générés à partir de gabarits presque identiques.

Le comptage du texte HTML complet des 52 articles donne une médiane d’environ 1 274 mots, mais les articles EN les plus courts se situent autour de 495–563 mots. La longueur seule n’est pas un critère de qualité ; le problème est la combinaison de textes courts, répétitifs et peu différenciés.

### Contenus sensibles et confiance

Le calculateur d’impôt est un défaut concret :

- barèmes codés en dur dans `src/components/calculators/IncomeCalculator.tsx:9-15` ;
- sélection 2024/2025 : `:188-200` ;
- la variable `year` n’est pas utilisée dans le calcul et ne figure pas dans les dépendances `useMemo` : `:82-127` ;
- prélèvements sociaux fixés uniformément à 8 % : `:108-109` ;
- la version EN réutilise le système français de parts et l’euro, sans cadrage juridictionnel clair : `:49-79`.

Au 21 septembre 2026, proposer 2025 comme « estimation » sans millésime 2026 et sans source officielle crée un risque de résultat trompeur. Les disclaimers génériques dans `src/layouts/CalculatorLayout.astro:64-89` limitent la portée mais ne remplacent pas l’exactitude, les sources et la date d’effet.

Les calculateurs santé/finance/immobilier utilisent aussi des règles ou formules sans références visibles suffisantes. Pour les sujets YMYL, l’auteur, les sources primaires, la méthode et la date de révision doivent être explicites.

### Risque « low value content »

Le risque est **élevé sur certains clusters**, pas sur le site entier :

- pages fonctionnelles mais longues sections textuelles partagées ;
- paragraphes identiques entre 8 à 12 articles ;
- texte interne de production publié ;
- thématiques budgétaires très proches sans angle unique suffisamment marqué ;
- 10 URLs éditoriales canoniques déjà explorées mais non indexées selon Google.

Il est préférable de consolider, réécrire ou différencier ces pages plutôt que d’en produire davantage au même format.

## 10. Multilingue

### Sain

- Routes FR et EN distinctes et stables.
- Slugs EN localisés pour les calculateurs et les articles.
- Hreflang réciproques FR/EN et `x-default` vers FR sur les pages normales.
- Canonical de chaque langue vers elle-même.
- Anciennes routes EN avec slugs FR redirigées en 301 : `redirects.config.mjs:20-77`.

### Risques

- Le calculateur fiscal EN est une traduction d’un modèle français, pas un outil fiscal international ; le chemin `/en/finance/income-tax/` peut créer une promesse ambiguë.
- Certaines paires éditoriales sont des variantes très proches et non une localisation approfondie.
- `/en/404/` reçoit automatiquement une paire hreflang invalide sur le plan fonctionnel.

## 11. Performance, mobile et accessibilité SEO

### Faits dépôt

- HTML statique disponible sans exécution JavaScript pour le contenu SEO principal.
- Les calculateurs nécessitent React et sont hydratés au chargement.
- Bundle partagé React : environ 186 Ko brut / 58 Ko gzip ; `UnifiedCalculator` : environ 26,5 Ko brut / 7,5 Ko gzip ; CSS global : environ 50,5 Ko brut / 10,2 Ko gzip.
- Les images locales sont légères ; la plus grosse image de contenu observée pèse environ 21 Ko.
- Les images d’article ont largeur/hauteur explicites, ce qui limite le CLS : `src/pages/[lang]/blog/[slug].astro:284-286`.
- Les polices Google sont chargées dans le `<head>` avec preconnect : `src/layouts/BaseLayout.astro:193-195`.
- Analytics et AdSense ne sont chargés qu’après consentement : `src/components/Analytics.astro:22-62`, `src/components/Adsense.astro:20-78`.
- Lien d’évitement, viewport mobile et structure de titres sont présents ; les 21 doubles H1 restent à corriger.

### Risques et limites de mesure

- `client:load` hydrate immédiatement chaque calculateur, même avant interaction. `client:visible` ou une architecture plus légère pourrait réduire le coût initial, à mesurer avant modification.
- Le bundle React partagé est le principal coût JS local.
- La feuille Google Fonts est une dépendance réseau bloquante potentielle.
- Search Console ne dispose pas de données Core Web Vitals suffisantes.
- PageSpeed Insights n’a pas pu fournir de test laboratoire pendant l’audit : quota API journalier dépassé. Aucun score ne doit être inventé.

## 12. Chaîne de production

### Cartographie prouvée ou documentée

```text
calcery/calcery2
  ├─ origin GitHub: MarcAureleAgbo/calcery
  ├─ GitHub Actions: npm ci → npm run check
  └─ documentation Cloudflare Pages:
       preset Astro
       build npm run build
       sortie dist
             ↓
       calcery.com
```

Preuves : remote Git local, `.github/workflows/quality.yml:1-25`, `README.md:40-47`.

### Non vérifiable depuis les sources

- Projet et branche réellement connectés dans Cloudflare Pages.
- Commit actuellement déployé en production.
- Historique des builds et éventuels échecs.
- Règles de redirection de zone HTTP/WWW.
- Transform Rules, cache rules, WAF/Bot Management et logs Googlebot.
- En-têtes ajoutés au niveau Cloudflare.

Les réponses publiques confirment néanmoins les redirections HTTP et WWW attendues. Aucun HSTS n’a été observé dans l’échantillon de réponses ; c’est un point sécurité à confirmer dans Cloudflare, sans lien direct démontré avec l’indexation.

## 13. Problèmes confirmés, risques et éléments à conserver

### Problèmes confirmés

1. Search Console conserve un ancien état de sitemap index avec enfant inaccessible et 0 URL découverte.
2. 26 URLs du sitemap actuel ne figurent pas dans la liste des 114 pages indexées ; 10 sont explicitement explorées/non indexées.
3. 12 articles EN publient une note de production sur le statut `draft` et le schema FAQ.
4. 21 articles ont deux H1.
5. Des dizaines de paragraphes éditoriaux sont identiques entre pages ; les calculateurs publient des formulations parlant de SEO/qualité de contenu.
6. Deux anciennes URLs de blog n’ont pas de redirection ; l’une a encore généré impressions et clic.
7. `/en/404/` est une page 200 indexable et orpheline.
8. Le calculateur fiscal ignore l’année sélectionnée et n’est pas à jour pour 2026.
9. `npm audit` signale 25 paquets vulnérables, dont un risque critique dans la chaîne Astro/image.

### Risques importants

- Pages proches perçues comme redondantes ou de faible valeur.
- Confiance insuffisante sur les contenus financiers, fiscaux et santé.
- Autorité externe extrêmement faible.
- Performance réelle inconnue faute de données terrain.
- Décalage possible entre GitHub et le déploiement Cloudflare non démontrable depuis le dépôt.

### Éléments sains à ne pas modifier sans raison mesurée

- Architecture statique Astro.
- Convention de slash terminal et redirections associées.
- Canonicals auto-référentes.
- Paires hreflang normales et x-default FR.
- Sitemap direct actuel à 140 URLs.
- Exclusion des brouillons du sitemap.
- Maillage global et liens contextuels articles ↔ calculateurs.
- Chargement Analytics/AdSense conditionné au consentement.
- Contrôles de build SEO et redirections.

## 14. Données externes encore nécessaires

### Search Console

L’accès actuel a permis le diagnostic de couverture, sitemap, performances, liens, HTTPS, actions manuelles, sécurité et Core Web Vitals. Pour confirmer les 16 URLs du sitemap absentes des listes observées, il faudrait ultérieurement, toujours avec accord :

- effectuer une inspection individuelle en lecture seule sur un petit échantillon ;
- relever pour chacune « URL connue ? », dernière exploration, canonical déclarée et canonical choisie par Google ;
- réexaminer le rapport sitemap après une action de resoumission explicitement autorisée et après un délai d’observation, sans promettre d’indexation.

### Cloudflare

À fournir ou ouvrir en lecture :

- paramètres du projet Pages : dépôt, branche de production, commande de build, dossier de sortie, version Node ;
- dernier déploiement réussi et SHA Git associé ;
- Redirect Rules de zone HTTP/WWW ;
- éventuelles Transform/Cache Rules touchant HTML, sitemap ou robots ;
- si disponible, échantillon de logs Googlebot pour les 26 URLs non indexées.

## 15. Conclusion

Le dépôt n’étaye pas l’hypothèse d’un blocage technique généralisé : Google peut accéder au site, 114 pages sont indexées, les canonicals/hreflang sont cohérents et le sitemap public est sain. Les difficultés actuelles viennent plus probablement d’un mélange de découverte imparfaite (état Search Console non rafraîchi), de qualité éditoriale trop industrielle sur certains clusters, de signaux d’autorité faibles et de quelques défauts techniques ciblés.

La priorité n’est pas d’ajouter massivement des pages ni de multiplier les demandes d’indexation. Elle est de nettoyer les erreurs historiques, restaurer un signal sitemap lisible, différencier et fiabiliser les contenus, puis mesurer l’évolution dans Search Console.
