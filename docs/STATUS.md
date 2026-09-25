# État opérationnel de Calcery

Date de référence : 25 septembre 2026

Commit applicatif de référence : `59667d7` — `fix: clean SEO content and legacy 404 handling`

Cet état décrit ce qui est prouvé localement. Il ne vaut ni confirmation de déploiement ni validation dans Search Console ou Cloudflare.

## Validé localement

- **P1.3 — Redirections historiques** : les deux anciennes URLs de blog disposent de redirections 301 directes, avec variantes slash/non-slash ; les cibles existent et les contrôles ne détectent ni chaîne ni boucle.
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
- fiabiliser et cadrer le calculateur fiscal ;
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
