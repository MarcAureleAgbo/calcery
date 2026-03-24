export const FR_TO_EN_BLOG_SLUG: Record<string, string> = {
  'augmenter-capacite-epargne-rapidement': 'increase-savings-capacity-quickly',
  'budget-couple-methode-simple': 'couple-budget-simple-method',
  'budget-mensuel-en-couple-organisation-optimale': 'monthly-budget-for-couples-best-setup',
  'budget-mensuel-et-fonds-durgence': 'monthly-budget-and-emergency-fund',
  'budget-mensuel-etudiant-modele-simple': 'student-monthly-budget-simple-template',
  'budget-mensuel-famille-nombreuse': 'monthly-budget-large-family',
  'budget-mensuel-inflation-comment-sadapter': 'monthly-budget-and-inflation-adaptation',
  'budget-mensuel-mode-emploi': 'monthly-budget-step-by-step-guide',
  'budget-mensuel-preparer-achat-immobilier': 'monthly-budget-before-buying-a-home',
  'budget-mensuel-revenu-irregulier': 'monthly-budget-irregular-income',
  'budget-mensuel-vs-methode-50-30-20': 'monthly-budget-vs-50-30-20-method',
  'calcul-impot-revenu-sans-stress': 'income-tax-estimate-guide',
  'comment-faire-budget-mensuel-efficace': 'how-to-build-an-effective-monthly-budget',
  'comment-faire-budget-mensuel-quand-on-gagne-peu': 'monthly-budget-on-low-income',
  'epargne-automatique-strategies': 'automatic-savings-strategy',
  'erreurs-invisibles-budget-mensuel': 'hidden-mistakes-in-a-monthly-budget',
  'fonds-urgence-combien-mettre': 'emergency-fund-guide',
  'guide-budget-mensuel-complet': 'complete-monthly-budget-guide',
  'interets-composes-erreurs-a-eviter': 'compound-interest-mistakes',
  'investissement-progressif-dca': 'dca-investing-guide',
  'methode-50-30-20': '50-30-20-budget-rule',
  'optimiser-quotient-familial-legalement': 'family-tax-shares-guide',
  'partage-addition-entre-amis-guide': 'split-bill-with-friends',
  'petites-depenses-qui-comptent': 'small-expenses-that-add-up',
  'pourboire-regles-pratiques-voyage': 'tipping-guide-home-and-travel',
  'reduire-depenses-mensuelles-intelligemment': 'reduce-monthly-expenses-smartly',
};

export const EN_TO_FR_BLOG_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN_BLOG_SLUG).map(([frSlug, enSlug]) => [enSlug, frSlug]),
);

export function getTranslatedBlogSlug(slug: string, locale: 'fr' | 'en'): string {
  if (locale === 'fr') return EN_TO_FR_BLOG_SLUG[slug] ?? slug;
  return FR_TO_EN_BLOG_SLUG[slug] ?? slug;
}
