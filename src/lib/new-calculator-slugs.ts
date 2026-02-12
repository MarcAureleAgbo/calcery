export const NEW_CALCULATOR_SLUGS = [
  'taux-endettement',
  'mensualite-credit',
  'pret-personnel',
  'salaire-brut-net',
  'salaire-net-brut',
  'tva-ht-ttc',
  'capacite-epargne-mensuelle',
  'objectif-epargne-temps',
  'calcul-imc',
  'besoin-calorique-journalier',
  'poids-ideal',
  'besoin-eau-quotidien',
  'rythme-cardiaque-cible',
  'depense-calorique-activite',
  'capacite-emprunt-immobilier',
  'frais-notaire',
  'rentabilite-locative-brute',
  'rendement-locatif-net',
  'difference-entre-deux-dates',
  'age-exact',
  'consommation-carburant',
  'quantite-peinture',
  'surface-piece',
  'moyenne-scolaire',
] as const;

export type NewCalculatorSlug = (typeof NEW_CALCULATOR_SLUGS)[number];

export function isNewCalculatorSlug(slug: string): slug is NewCalculatorSlug {
  return (NEW_CALCULATOR_SLUGS as readonly string[]).includes(slug);
}
