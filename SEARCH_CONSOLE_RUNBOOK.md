# Procédure Google Search Console

Cette procédure doit être exécutée après le déploiement de la version du 21 juin 2026.

## 1. Vérifier le déploiement

Contrôler publiquement :

- `https://calcery.com/sitemap.xml` répond en `200` et contient 140 URLs ;
- `https://www.calcery.com/` et `http://calcery.com/` redirigent en `301` vers `https://calcery.com/` ;
- une ancienne route redirige directement vers sa destination finale, sans chaîne ;
- les nouvelles pages renvoient `200` sans `noindex`.

Les redirections de domaine ne peuvent pas être déclarées dans le fichier Pages `_redirects`. Si les variantes `http` et `www` ne redirigent pas déjà, créer une **Redirect Rule** Cloudflare au niveau de la zone pour conserver le chemin et envoyer un `301` vers `https://calcery.com`.

## 2. Sitemaps

Dans **Indexation > Sitemaps** :

1. supprimer les anciennes entrées `sitemap-index.xml` ou `sitemap-0.xml` si elles apparaissent encore ;
2. envoyer `sitemap.xml` ;
3. vérifier après la prochaine lecture que le nombre d’URLs découvertes n’est plus zéro.

## 3. Validations à relancer

Relancer la validation pour :

- **Exclue par la balise noindex** ;
- **Introuvable (404)**.

Ne pas relancer comme erreur la catégorie **Page avec redirection** pour les variantes `http`, `www` et les anciennes routes : leur redirection permanente est intentionnelle.

## 4. URLs prioritaires à inspecter

Utiliser **Inspection de l’URL**, tester l’URL publiée, puis demander l’indexation pour un échantillon limité :

- les pages d’accueil FR et EN ;
- les six pages de catégories dans chaque langue ;
- `/fr/finance/budget-mensuel/` et `/en/finance/monthly-budget/` ;
- deux pages santé ;
- deux articles récemment modifiés.

Éviter de demander manuellement l’indexation des 140 URLs : le sitemap et le maillage interne doivent assurer leur découverte.

## 5. « Explorée, actuellement non indexée »

Exporter la liste complète des URLs concernées après le nouveau crawl. Pour chacune :

1. confirmer un statut `200` ;
2. confirmer que l’URL canonique déclarée et choisie par Google est la même ;
3. vérifier qu’elle figure dans le sitemap ;
4. vérifier qu’elle reçoit au moins un lien interne contextuel ;
5. fusionner ou enrichir les pages réellement trop proches, au lieu de multiplier les demandes d’indexation.

Les anciennes URLs anglaises contenant encore des slugs français doivent désormais répondre en `301`. Elles ne doivent pas être considérées comme de nouvelles pages à indexer.

## 6. Suivi

Relever les chiffres à J+7, J+14 et J+28 :

- pages indexées ;
- pages « explorées, actuellement non indexées » ;
- erreurs 404 ;
- sitemap : URLs découvertes ;
- impressions et clics par page.

Une validation Search Console peut prendre plusieurs jours ou semaines. La comparaison utile est l’évolution entre ces trois relevés, pas le statut immédiatement après le déploiement.
