export type RouteLocale = 'fr' | 'en';

export const FR_TO_EN_CALCULATOR_SLUG: Record<string, string> = {
  'budget-mensuel': 'monthly-budget',
  'epargne-automatique': 'automatic-savings',
  'interets-composes': 'compound-interest',
  'impot-revenu': 'income-tax',
  'economies-petites-depenses': 'small-expense-savings',
  'pourboire': 'tip-calculator',
  'partage-addition': 'split-bill',
  'taux-endettement': 'debt-ratio',
  'mensualite-credit': 'loan-payment',
  'pret-personnel': 'personal-loan',
  'salaire-brut-net': 'gross-to-net-salary',
  'salaire-net-brut': 'net-to-gross-salary',
  'tva-ht-ttc': 'vat-calculator',
  'capacite-epargne-mensuelle': 'monthly-savings-capacity',
  'objectif-epargne-temps': 'savings-goal-timeline',
  'calcul-imc': 'bmi-calculator',
  'besoin-calorique-journalier': 'daily-calorie-needs',
  'poids-ideal': 'ideal-weight',
  'besoin-eau-quotidien': 'daily-water-needs',
  'rythme-cardiaque-cible': 'target-heart-rate',
  'depense-calorique-activite': 'calories-burned',
  'capacite-emprunt-immobilier': 'mortgage-borrowing-capacity',
  'frais-notaire': 'notary-fees',
  'rentabilite-locative-brute': 'gross-rental-yield',
  'rendement-locatif-net': 'net-rental-yield',
  'difference-entre-deux-dates': 'date-difference',
  'age-exact': 'exact-age',
  'consommation-carburant': 'fuel-consumption',
  'quantite-peinture': 'paint-quantity',
  'surface-piece': 'room-area',
  'moyenne-scolaire': 'grade-average',
};

export const EN_TO_FR_CALCULATOR_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(FR_TO_EN_CALCULATOR_SLUG).map(([frSlug, enSlug]) => [enSlug, frSlug]),
);

export function getLocalizedCalculatorSlug(slug: string, locale: RouteLocale): string {
  if (locale === 'fr') return EN_TO_FR_CALCULATOR_SLUG[slug] ?? slug;
  return FR_TO_EN_CALCULATOR_SLUG[slug] ?? slug;
}

export function getCanonicalCalculatorSlug(slug: string, locale: RouteLocale): string {
  if (locale === 'fr') return slug;
  return EN_TO_FR_CALCULATOR_SLUG[slug] ?? slug;
}
