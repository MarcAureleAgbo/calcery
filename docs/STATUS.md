# État opérationnel de Calcery

Date de référence : 11 novembre 2026

Repère Git avant le lot de correction de l’âge : branche `main`, HEAD `0bae40a`, en avance d’un commit sur la référence locale `origin/main`. Le lot dates `0bae40a` partait de `ed70be2`. Les travaux P1.4 sont déjà commités et poussés. La modification préexistante de `.nvmrc` vers `22.23.4` reste hors de ce lot et hors commit.

Cet état décrit ce qui est prouvé localement. Il ne vaut ni confirmation de déploiement ni validation dans Search Console ou Cloudflare.

## Validé localement

- **P1.3 — Redirections historiques** : les deux anciennes URLs de blog disposent de redirections 301 directes, avec variantes slash/non-slash ; les cibles existent et les contrôles ne détectent ni chaîne ni boucle.
- **P1.4 — Calculateur fiscal** : travaux commités et poussés, incluant `ed70be2`. Le calculateur FR/EN est limité à l’estimation de l’impôt brut français 2026 sur les revenus 2025, pour les résidents fiscaux français. Ce statut Git ne confirme pas son déploiement.
- **Correction du calculateur de différence entre deux dates** : commit local `0bae40a`, pas encore déployé. Les emprunts successifs corrigent les jours négatifs tout en conservant les résultats auparavant valides ; ce premier lot avait laissé l’âge inchangé. Les tests ciblés dates/âge, les tests des calculateurs, le lint, le typecheck, le build statique et ses contrôles SEO passent. Cela ne constitue pas une confirmation de présence en production.
- **Correction du calculateur d’âge** : validée localement, non déployée. L’âge utilise désormais la différence calendaire corrigée, sans rabattement en fin de mois. Les assertions négatives temporaires sont remplacées par des régressions positives. Comparaison avec `0bae40a` sur 87 060 intervalles : 548 résultats d’âge auparavant négatifs corrigés, 86 512 résultats valides conservés, aucun résultat du calculateur de dates modifié. Les tests ciblés sous quatre fuseaux, les tests des calculateurs, le lint, le typecheck et le build avec ses contrôles SEO passent.
- **P2.1 — Route `/en/404/`** : la route statique indexable a été supprimée, la 404 racine ne publie plus de hreflang et le build empêche son retour.
- **P2.2 — H1 uniques** : les 52 articles générés possèdent exactement un H1.
- Le lot applicatif de référence passe le lint, le typecheck, les tests des calculateurs, le build et les vérifications du sitemap, des pages, des redirections et de la sortie SEO.
- **P1.2 — Différenciation éditoriale, premier lot budget/épargne** : les deux pages généralistes FR et leurs homologues EN ont été consolidés vers les guides piliers avec redirections directes. Neuf articles spécialisés FR et leurs homologues EN ont été réécrits autour d’intentions, d’exemples chiffrés et de maillage propres. Les contenus des calculateurs de capacité d’épargne et de délai d’objectif ont reçu des parcours éditoriaux distincts dans les deux langues.

## Partiellement traité

- **P1.2 — Nettoyage éditorial ciblé** : les notes de production FAQ et deux formulations internes ont été retirées ; le premier lot budget mensuel/épargne est terminé localement. Restent les autres clusters répétitifs et une revue éditoriale ciblée avant tout nouveau contenu.
- **P3.1 — Garde-fous éditoriaux** : des contrôles ciblés couvrent les H1, les formulations connues et la route 404 anglaise. La détection générique des duplications et un contrôle permanent exhaustif des liens restent ouverts.

## À faire

- différencier ou consolider les contenus éditoriaux trop proches hors premier lot budget mensuel/épargne ;
- définir et appliquer une gouvernance YMYL fondée sur des sources primaires ;
- étendre progressivement la gouvernance de sources aux autres calculateurs YMYL ;
- traiter les vulnérabilités et mises à niveau de dépendances par lots contrôlés ;
- mesurer puis traiter les sujets de performance ;
- développer des signaux d'autorité externe légitimes ;
- décider séparément de la politique Git concernant les fichiers de `dist/` historiquement suivis.

## Nécessite validation externe

- état réel de l'indexation et du sitemap dans Search Console ;
- branche, SHA, paramètres et règles réellement actifs dans Cloudflare ;
- statut du déploiement du commit applicatif de référence ;
- performances terrain et signaux d'autorité observables hors du dépôt.

## Prochaine priorité

Prochaine priorité à décider dans le projet ChatGPT Calcery — Pilotage & SEO.
