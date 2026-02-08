# Audit SEO On-Page Blog - Calcery

Date: 2026-02-08
Scope: `src/content/blog/*.md` + template `src/pages/blog/[slug].astro`

## 1) Vérifications automatiques

- H1 unique par article: OK (`1` H1 par page dans `dist/blog/*/index.html`)
- Hiérarchie H2/H3: OK (aucun article ne commence par un H3)
- Cohérence SEO:
  - `title` HTML = `H1` (via `post.data.title`)
  - `meta description` = `post.data.description`
  - canonical/OG/Twitter gérés via `SEO.astro`
- Longueur meta description cible 120–160: OK sur les 12 articles FR après correction

## 2) Articles modifiés (avant/après)

| Article | Title avant | Title après |
|---|---|---|
| `budget-couple-methode-simple.md` | Budget couple simple et efficace sans conflit | Budget couple : méthode simple pour gérer les finances à deux sans conflit |
| `budget-mensuel-mode-emploi.md` | Budget mensuel mode d'emploi pour mieux gérer son argent | Budget mensuel : guide pratique pour mieux gérer son argent au quotidien |
| `calcul-impot-revenu-sans-stress.md` | Calcul impôt sur le revenu méthode simple sans stress | Calcul impôt sur le revenu : méthode simple pour anticiper sereinement |
| `epargne-automatique-strategies.md` | Épargne automatique stratégie progressive pour atteindre ses objectifs | Épargne automatique : stratégie progressive pour atteindre vos objectifs |
| `fonds-urgence-combien-mettre.md` | Fonds d'urgence combien épargner selon sa situation | Fonds d'urgence : combien épargner selon votre situation financière |
| `interets-composes-erreurs-a-eviter.md` | Intérêts composés les erreurs qui freinent votre croissance | Intérêts composés : les erreurs qui freinent la croissance de votre capital |
| `investissement-progressif-dca.md` | Investissement progressif DCA pour lisser le risque | Investissement progressif DCA : lisser le risque avec une méthode régulière |
| `methode-50-30-20.md` | La méthode 50/30/20 pour gérer son budget | La méthode 50/30/20 : guide simple pour équilibrer budget et épargne |
| `optimiser-quotient-familial-legalement.md` | Optimiser son quotient familial légalement les bons réflexes | Quotient familial : les bons réflexes pour optimiser son impôt légalement |
| `partage-addition-entre-amis-guide.md` | Partage addition entre amis méthode simple et équitable | Partage d'addition entre amis : méthode simple et équitable |
| `petites-depenses-qui-comptent.md` | Les petites dépenses qui comptent : comment les maîtriser | Petites dépenses du quotidien : comment les réduire et économiser plus |
| `pourboire-regles-pratiques-voyage.md` | Pourboire en pratique repères utiles en France et en voyage | Pourboire en France et à l'étranger : repères pratiques pour bien calculer |

| Article | Meta description avant | Meta description après |
|---|---|---|
| `budget-couple-methode-simple.md` | Comment organiser un budget à deux, répartir les charges équitablement et garder une vision commune des objectifs financiers. | Découvrez une méthode claire pour organiser vos finances de couple, répartir les charges équitablement et avancer ensemble vers vos objectifs. |
| `budget-mensuel-mode-emploi.md` | Méthode pas à pas pour construire un budget mensuel réaliste, éviter les découverts et augmenter votre taux d'épargne. | Apprenez à construire un budget mensuel réaliste, éviter les découverts et augmenter votre épargne avec une méthode simple à appliquer chaque mois. |
| `calcul-impot-revenu-sans-stress.md` | Apprenez à estimer votre impôt sur le revenu avec une méthode claire pour mieux anticiper votre trésorerie annuelle. | Suivez une méthode claire pour estimer votre impôt sur le revenu, prévoir votre trésorerie annuelle et réduire les mauvaises surprises fiscales. |
| `epargne-automatique-strategies.md` | Méthode concrète pour automatiser son épargne, augmenter progressivement les versements et rester constant toute l'année. | Découvrez comment automatiser votre épargne, augmenter vos versements progressivement et tenir votre plan financier toute l'année sans pression. |
| `fonds-urgence-combien-mettre.md` | Guide pour déterminer un fonds d'urgence adapté à vos charges fixes, votre stabilité de revenu et votre niveau de risque. | Calculez un fonds d'urgence adapté à vos charges fixes, à la stabilité de vos revenus et à votre niveau de risque pour sécuriser votre budget. |
| `interets-composes-erreurs-a-eviter.md` | Découvrez les erreurs les plus fréquentes avec les intérêts composés et comment améliorer vos résultats sur le long terme. | Identifiez les erreurs courantes avec les intérêts composés et appliquez de meilleurs réflexes pour faire progresser votre capital sur le long terme. |
| `investissement-progressif-dca.md` | Comprendre la stratégie DCA, ses avantages, ses limites et comment l'appliquer avec régularité pour investir plus sereinement. | Comprenez la stratégie DCA, ses avantages et ses limites pour investir de façon plus sereine grâce à des versements réguliers et disciplinés. |
| `methode-50-30-20.md` | Découvrez comment appliquer la règle 50/30/20 pour équilibrer vos finances personnelles. | Appliquez la règle 50/30/20 pour mieux répartir vos revenus entre besoins, envies et épargne, et reprendre le contrôle de votre budget mensuel. |
| `optimiser-quotient-familial-legalement.md` | Repères pratiques pour comprendre le quotient familial, éviter les erreurs de déclaration et mieux anticiper son impôt. | Comprenez le quotient familial, évitez les erreurs de déclaration et anticipez votre impôt avec des repères fiscaux simples et concrets. |
| `partage-addition-entre-amis-guide.md` | Comment partager une addition de manière transparente, gérer le pourboire et éviter les tensions en groupe. | Apprenez à partager une addition de manière transparente, gérer le pourboire et éviter les tensions grâce à une méthode claire en groupe. |
| `petites-depenses-qui-comptent.md` | Découvrez l'impact des petites dépenses répétées et comment les réduire efficacement. | Découvrez l'impact réel des petites dépenses répétées et mettez en place des actions simples pour économiser davantage sans frustration. |
| `pourboire-regles-pratiques-voyage.md` | Guide pratique pour estimer un pourboire cohérent selon le contexte, le service et le pays, sans se tromper. | Utilisez des repères simples pour estimer un pourboire cohérent selon le service, le contexte et le pays, sans vous tromper au moment de payer. |

## 3) Maillage interne

Déjà en place et vérifié sur toutes les pages article via template:

- Section **Outils utiles** (3 liens internes vers `/calculateurs/...`)
- Section **Articles liés** (2 liens internes vers d'autres articles)

Soit 5 liens internes contextuels en bas de chaque article.

## 4) Composant SEO standardisé

Composant réutilisable confirmé: `src/components/SEO.astro`.

Il gère automatiquement:
- title
- meta description
- canonical
- OpenGraph (title, description, image, locale, type)
- Twitter Cards (summary_large_image + title/description/image)

Utilisation confirmée sur les articles via `src/pages/blog/[slug].astro`.

## 5) Contrôle technique (automatisé)

| article | desc_len | h1_dans_markdown | h2 | h3 |
|---|---:|---:|---:|---:|
| budget-couple-methode-simple.md | 142 | 0 | 7 | 0 |
| budget-mensuel-mode-emploi.md | 147 | 0 | 6 | 0 |
| calcul-impot-revenu-sans-stress.md | 144 | 0 | 6 | 0 |
| epargne-automatique-strategies.md | 144 | 0 | 6 | 0 |
| fonds-urgence-combien-mettre.md | 142 | 0 | 6 | 0 |
| interets-composes-erreurs-a-eviter.md | 149 | 0 | 7 | 0 |
| investissement-progressif-dca.md | 141 | 0 | 6 | 0 |
| methode-50-30-20.md | 143 | 0 | 8 | 4 |
| optimiser-quotient-familial-legalement.md | 136 | 0 | 5 | 0 |
| partage-addition-entre-amis-guide.md | 137 | 0 | 6 | 0 |
| petites-depenses-qui-comptent.md | 136 | 0 | 9 | 12 |
| pourboire-regles-pratiques-voyage.md | 143 | 0 | 6 | 0 |

Note: les articles Markdown n'ont pas de `# H1` volontairement, car le H1 unique est rendu dans le template `src/pages/blog/[slug].astro`.
