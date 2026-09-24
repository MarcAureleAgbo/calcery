# Revue du worktree applicatif Calcery

Date : 24 septembre 2026

Dépôt : `/home/maa/Documents/projets_git/Business/calcery/calcery2`

Périmètre : lot applicatif non commité relatif aux actions P1.2, P1.3, P2.1, P2.2 et P3.1 du plan du 21 septembre 2026

## 1. Conclusion

**Statut : `READY_TO_COMMIT`**

Le lot est cohérent, les changements sont reliés entre eux et tous les contrôles locaux passent. Il peut être conservé et commité comme un lot applicatif unique, à condition que le message de commit décrive précisément sa portée : corrections ciblées de contenu et de 404, redirections historiques et garde-fous associés.

Ce statut ne signifie pas que P1.2 ou P3.1 sont entièrement achevés dans leur définition large du plan du 21 septembre. Le lot réalise une tranche ciblée et valide : retrait des formulations internes identifiées, correction des doubles H1, ajout des redirections, suppression de la route `/en/404/` et ajout de contrôles empêchant leur régression.

Aucune action externe, aucun déploiement et aucun push n'ont été effectués.

## 2. État initial

### Git

| Élément | Valeur observée |
|---|---|
| Branche | `main` |
| Upstream | `origin/main` |
| Écart local/distant | aucun ahead/behind signalé avant le commit |
| Remote | `origin` → `https://github.com/MarcAureleAgbo/calcery.git` |
| HEAD initial | `708d5cdd83bb9c2dc081fe290b78cf21cbd53432` |
| Dernier commit | `docs: add CHANGELOG with 2026-06-21 session summary` |
| Date du dernier commit | 21 juin 2026, 12:28:42 +02:00 |
| État initial | 27 fichiers modifiés et 1 fichier supprimé |

Le dépôt parent historique `calcery` n'a pas été inspecté ou modifié en tant que dépôt.

### Diff initial

Le diff initial comptait 28 chemins, 44 insertions et 108 suppressions :

- 2 fichiers de redirection : `redirects.config.mjs`, `public/_redirects` ;
- 1 script de vérification : `scripts/verify-site-output.mjs` ;
- 8 articles FR ;
- 13 articles EN ;
- `src/lib/calculator-seo-content.ts` ;
- `src/pages/404.astro` ;
- suppression de `src/pages/en/404.astro` ;
- sortie générée historiquement suivie `dist/404.html`.

## 3. Changements trouvés

### Redirections

Deux mappings ont été ajoutés dans la source de vérité `redirects.config.mjs` :

- `/blog/calcul-impot-revenu-sans-stress` → `/fr/blog/calcul-impot-revenu-sans-stress/` ;
- `/blog/optimiser-quotient-familial-legalement` → `/fr/blog/optimiser-quotient-familial-legalement/`.

Le générateur produit quatre règles dans `public/_redirects`, une variante avec et sans slash pour chaque ancienne URL.

### 404

- `src/pages/en/404.astro` a été supprimé ;
- `src/pages/404.astro` passe explicitement `fr`, `en` et `xDefault` à `null` dans `alternatePaths` ;
- la sortie ne génère plus `dist/en/404/index.html` ;
- `dist/404.html` ne contient plus de hreflang.

### Titres H1 des articles

Les H1 Markdown redondants ont été retirés de 21 articles : 8 FR et 13 EN. Le titre principal reste rendu par le template à partir du frontmatter.

### Notes et formulations internes

- les blocs `FAQ JSON-LD readiness` et leur note de production ont été retirés de 12 articles EN ;
- les phrases « L’intérêt SEO et pédagogique est double… » et « From a content-quality perspective… » ont été supprimées du générateur de contenu des calculateurs ;
- les exemples numériques utiles sont conservés.

### Garde-fous

`scripts/verify-site-output.mjs` vérifie désormais :

- l'absence de sortie `/en/404/` ;
- exactement un H1 sur chaque route d'article FR/EN ;
- l'absence des quatre formulations internes ciblées ;
- l'absence de hreflang sur la 404 racine.

## 4. Correspondance avec le plan du 21 septembre

### P1.2 — `IMPLEMENTED_PARTIAL`

Preuves :

- `src/lib/calculator-seo-content.ts` retire les deux formulations internes publiées sur les pages calculateurs ;
- 12 fichiers de `src/content/blogEn/` retirent la note de production FAQ ;
- `scripts/verify-site-output.mjs` bloque le retour exact de ces formulations ;
- le build confirme zéro occurrence des textes interdits ciblés.

Pourquoi l'action reste partielle :

- aucune différenciation éditoriale page par page n'est réalisée dans ce lot ;
- aucun regroupement de pages proches n'est effectué ;
- l'analyse locale trouve encore 36 paragraphes longs répétés côté FR, avec un maximum de 8 fichiers, et 31 côté EN, avec un maximum de 12 fichiers ;
- la détection générale des paragraphes répétés n'est pas ajoutée au build ;
- le badge public `Guide SEO` de la page d'accueil FR existe toujours, mais il était hors des fichiers et formulations ciblés par le lot existant et n'a pas été réécrit dans cette mission.

Le lot est donc complet pour son sous-périmètre de nettoyage ciblé, mais ne ferme pas la priorité P1.2 globale.

### P1.3 — `IMPLEMENTED_COMPLETE`

Preuves :

- les deux mappings sont présents dans `redirects.config.mjs` ;
- les quatre variantes générées sont présentes dans `public/_redirects` ;
- les deux cibles existent dans la sortie statique ;
- `verify:redirects` confirme 78 mappings et 156 règles HTTP 301 ;
- aucune source du tableau ne pointe vers une autre source : aucune chaîne détectée ;
- aucune duplication ou boucle n'est détectée.

### P2.1 — `IMPLEMENTED_COMPLETE`

Preuves :

- suppression de `src/pages/en/404.astro` ;
- 141 pages construites au lieu des 142 de la photographie précédente ;
- absence de `dist/en/404/index.html` ;
- absence de `/en/404/` dans le sitemap ;
- la 404 racine contient un H1 et aucun hreflang ;
- le garde-fou échoue si la route anglaise revient ou si la 404 racine retrouve des alternates.

Limite documentée : la page 404 statique restante est en français. Le comportement HTTP réel d'une URL inexistante sous `/en/` dépend de Cloudflare Pages et n'a pas été testé, conformément à l'interdiction des tests externes. La suppression de la route indexable `/en/404/` est néanmoins complète pour le périmètre du lot.

### P2.2 — `IMPLEMENTED_COMPLETE`

Preuves :

- retrait des 21 H1 Markdown identifiés : 8 FR et 13 EN ;
- aucun H1 Markdown de niveau 1 ne reste dans les deux collections ;
- les 52 pages d'article générées possèdent exactement un H1 ;
- les titres du frontmatter continuent d'alimenter le H1 du template ;
- aucun lien interne vers les anciennes ancres de titre n'a été trouvé ;
- le nouveau contrôle couvre toutes les routes d'article actuelles à slug simple.

### P3.1 — `IMPLEMENTED_PARTIAL`

Preuves :

- contrôle exact du nombre de H1 ;
- contrôle des quatre marqueurs/formulations internes identifiés ;
- contrôle de la route `/en/404/` ;
- contrôle des hreflang de la 404 ;
- intégration dans `npm run build`, donc dans `npm run check` et la CI existante.

Pourquoi l'action reste partielle :

- aucun détecteur générique de duplication éditoriale n'est ajouté ;
- aucun contrôle persistant de tous les liens internes n'est ajouté au build ;
- les textes interdits sont des sous-chaînes exactes et sensibles à la casse : une reformulation pourrait les contourner ;
- le motif H1 vise les routes actuelles `/fr/blog/<slug>/` et `/en/blog/<slug>/`, pas d'éventuelles routes imbriquées futures.

Les faux positifs sont peu probables dans le contenu actuel, car les quatre chaînes correspondent à des formulations de production très spécifiques. Une future page consacrée au fonctionnement éditorial pourrait néanmoins les déclencher ; dans ce cas, la liste devra être revue consciemment, pas contournée.

## 5. Éléments complets

- les deux redirections historiques et leurs variantes slash/non-slash ;
- absence de chaîne, boucle et destination manquante pour ces redirections ;
- suppression de la route statique et indexable `/en/404/` ;
- retrait des hreflang de la 404 racine ;
- correction des 21 doubles H1 identifiés ;
- suppression des 12 notes de production FAQ identifiées ;
- suppression des deux formulations internes identifiées dans les contenus calculateurs ;
- garde-fous ciblés correspondants ;
- conservation des canonicals, hreflang et du sitemap des 140 URLs indexables ;
- conservation des liens internes : 10 945 liens `<a>` internes vérifiés, aucune cible cassée.

## 6. Éléments incomplets ou hors périmètre

- différenciation de fond des articles répétitifs : P1.2 reste ouverte ;
- détection automatique des paragraphes dupliqués : P3.1 reste ouverte ;
- intégration permanente du contrôle exhaustif des liens internes : P3.1 reste ouverte ;
- localisation dynamique de la 404 selon le chemin : non mise en œuvre ;
- validation du statut HTTP réel des pages inexistantes en production : test externe interdit ;
- réécriture d'autres formulations publiques éventuellement trop orientées SEO : non engagée ;
- toutes les autres priorités du plan : explicitement hors périmètre.

Ces éléments ne bloquent pas le commit du lot ciblé actuel. Ils ne doivent simplement pas être présentés comme réalisés par ce commit.

## 7. Corrections effectuées pendant la mission

Aucune correction applicative supplémentaire n'a été nécessaire. Le lot initial a passé les contrôles sans modification de son contenu.

La seule création de la mission est le présent rapport, demandé explicitement.

`npm ci` a réinstallé les dépendances dans `node_modules/`, répertoire ignoré. Le build a régénéré `public/_redirects` et `dist/`; il n'a introduit aucun nouveau changement suivi au-delà du diff initial attendu.

## 8. Tests exécutés et résultats

Environnement : Node `v22.12.0` via `.nvmrc` et nvm, npm `10.9.0`.

| Contrôle | Résultat |
|---|---|
| `npm ci` | succès |
| `npm run lint` | succès, 0 avertissement |
| `npm run typecheck` | succès, Astro : 0 erreur, 0 avertissement, 0 hint ; TypeScript succès |
| `npm run check` | succès |
| tests des nouveaux calculateurs | succès |
| build Astro | succès, 141 pages |
| `verify:sitemap` | succès, 140 URLs, 12 catégories, 62 calculateurs, 54 URLs de blog |
| `verify:calculator-pages` | succès, 62 pages, JSON-LD valide, headings et hreflang valides |
| `verify:redirects` | succès, 78 mappings, 156 règles, 0 redirection HTML Astro |
| `verify:site-output` | succès, 141 HTML, 140 canonicals correspondant au sitemap, 0 titre/description dupliqué, 0 noindex/meta-refresh, 0 chargement AdSense avant consentement |
| contrôle H1 complémentaire | succès, 52 articles, exactement un H1 chacun |
| contrôle formulations ciblées | succès, aucune occurrence publique ciblée |
| contrôle 404 complémentaire | succès, aucune sortie `/en/404/`, 0 hreflang, 1 H1 |
| contrôle liens internes complémentaire | succès, 10 945 liens `<a>` internes, 0 cible cassée |
| contrôle hreflang complémentaire | succès, 420 alternates sur 140 URLs, toutes les cibles existent et chaque page possède son alternate propre |
| `git diff --check` | succès, aucune erreur d'espace ou de marqueur de conflit |

Aucun test externe n'a été effectué.

## 9. Traitement recommandé pour `dist/404.html`

`dist/` est ignoré globalement par `.gitignore`, mais 11 fichiers qui y étaient déjà suivis restent suivis par Git. Une règle d'ignore n'affecte pas les fichiers déjà indexés ; c'est pourquoi `dist/404.html` apparaît dans le diff.

Le changement de `dist/404.html` est la conséquence exacte de `alternatePaths={{ fr: null, en: null, xDefault: null }}` dans `src/pages/404.astro` : les trois balises hreflang disparaissent. Le build l'a régénéré avec le même diff.

Recommandation pour ce lot : **inclure `dist/404.html` dans le commit**. L'omettre laisserait un fichier généré historiquement suivi incohérent avec sa source et recréerait immédiatement un worktree sale au prochain build.

Recommandation à plus long terme : traiter séparément la dette de suivi partiel de `dist/`. Cette mission ne doit ni désindexer les 11 fichiers suivis ni modifier `.gitignore`, car ce choix demande une décision de politique de dépôt distincte.

## 10. Risques résiduels

- P1.2 reste largement ouverte sur la répétitivité et la différenciation des contenus ;
- P3.1 ne couvre que les régressions connues, pas une analyse éditoriale générale ;
- la 404 commune est en français, y compris pour un chemin anglais inconnu ;
- le statut HTTP réellement servi par Cloudflare n'a pas été vérifié ;
- le canonical de la sortie 404 reste `https://calcery.com/404/`, comportement préexistant non modifié par le lot ;
- le badge public `Guide SEO` de l'accueil FR reste présent, hors sous-périmètre modifié ;
- la dette Git autour de `dist/` demeure ;
- aucune conclusion ne doit être tirée sur Search Console, Cloudflare ou la production à partir des seuls tests locaux.

## 11. Périmètre recommandé du commit

Le commit doit contenir :

- les 28 chemins applicatifs présents dans le diff initial ;
- `CALCERY_CURRENT_WORKTREE_REVIEW.md`, livrable demandé de cette mission.

Il ne doit contenir aucun fichier de `calcery-pilotage`, aucune migration documentaire, aucun fichier de dépendance ou cache, aucune configuration externe et aucun autre sujet du plan SEO.

Message recommandé :

```text
fix: clean SEO content and legacy 404 handling
```

La classification finale reste `READY_TO_COMMIT` sous ce périmètre précis.
