export const FR_TO_EN_BLOG_SLUG: Record<string, string> = {
  'comment-faire-budget-mensuel-quand-on-gagne-peu': 'monthly-budget-on-low-income',
  'budget-mensuel-etudiant-modele-simple': 'student-monthly-budget-simple-template',
  'budget-mensuel-famille-nombreuse': 'monthly-budget-large-family',
  'budget-mensuel-revenu-irregulier': 'monthly-budget-irregular-income',
  'budget-mensuel-inflation-comment-sadapter': 'monthly-budget-and-inflation-adaptation',
  'reduire-depenses-mensuelles-intelligemment': 'reduce-monthly-expenses-smartly',
  'erreurs-invisibles-budget-mensuel': 'hidden-mistakes-in-a-monthly-budget',
  'augmenter-capacite-epargne-rapidement': 'increase-savings-capacity-quickly',
  'budget-mensuel-vs-methode-50-30-20': 'monthly-budget-vs-50-30-20-method',
  'budget-mensuel-en-couple-organisation-optimale': 'monthly-budget-for-couples-best-setup',
  'budget-mensuel-preparer-achat-immobilier': 'monthly-budget-before-buying-a-home',
  'budget-mensuel-et-fonds-durgence': 'monthly-budget-and-emergency-fund',
  'comment-faire-budget-mensuel-efficace': 'how-to-build-an-effective-monthly-budget',
  'guide-budget-mensuel-complet': 'complete-monthly-budget-guide',
};

export const EN_TO_FR_BLOG_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN_BLOG_SLUG).map(([frSlug, enSlug]) => [enSlug, frSlug]),
);

export function getTranslatedBlogSlug(slug: string, locale: 'fr' | 'en'): string {
  if (locale === 'fr') return EN_TO_FR_BLOG_SLUG[slug] ?? slug;
  return FR_TO_EN_BLOG_SLUG[slug] ?? slug;
}
