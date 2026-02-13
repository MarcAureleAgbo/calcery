import {
  CALCULATORS,
  getCalculatorBySlug,
  getCalculatorRoute,
  type CalculatorDefinition,
  type CalculatorSlug,
  type CategoryKey,
  type Locale,
} from './calculator-taxonomy';
import type { FAQItem, RelatedLink } from './types';

type Localized<T> = { fr: T; en: T };

type BlogSlug =
  | 'budget-couple-methode-simple'
  | 'budget-mensuel-mode-emploi'
  | 'calcul-impot-revenu-sans-stress'
  | 'epargne-automatique-strategies'
  | 'fonds-urgence-combien-mettre'
  | 'interets-composes-erreurs-a-eviter'
  | 'investissement-progressif-dca'
  | 'methode-50-30-20'
  | 'optimiser-quotient-familial-legalement'
  | 'partage-addition-entre-amis-guide'
  | 'petites-depenses-qui-comptent'
  | 'pourboire-regles-pratiques-voyage';

interface CalculatorDetail {
  variables: Localized<string[]>;
  formula: Localized<string>;
  numericExample: Localized<string>;
  decisionScenario: Localized<string>;
  contextualCase: Localized<string>;
  thresholds: Localized<string[]>;
  riskNotice: Localized<string>;
  relatedCalculators?: CalculatorSlug[];
  relatedBlogs?: BlogSlug[];
}

interface ResolvedCalculatorDetail {
  variables: string[];
  formula: string;
  numericExample: string;
  decisionScenario: string;
  contextualCase: string;
  thresholds: string[];
  riskNotice: string;
}

export interface CalculatorSeoScenario {
  title: string;
  text: string;
}

export interface CalculatorSeoContent {
  introduction: string[];
  howItWorks: string[];
  interpretation: string[];
  formula: string;
  thresholds: string[];
  riskNotice: string;
  scenarios: CalculatorSeoScenario[];
  relatedCalculators: RelatedLink[];
  relatedBlogPosts: RelatedLink[];
  faqs: FAQItem[];
}

const BLOG_METADATA: Record<BlogSlug, Localized<{ title: string; path: string }>> = {
  'budget-couple-methode-simple': {
    fr: {
      title: 'Budget couple : méthode simple pour gérer les finances à deux sans conflit',
      path: '/blog/budget-couple-methode-simple',
    },
    en: {
      title: 'Couple Budget Guide: Simple Method to Manage Money Together Without Conflict',
      path: '/en/blog/budget-couple-methode-simple',
    },
  },
  'budget-mensuel-mode-emploi': {
    fr: {
      title: 'Budget mensuel : guide pratique pour mieux gérer son argent au quotidien',
      path: '/blog/budget-mensuel-mode-emploi',
    },
    en: {
      title: 'Monthly Budget Guide: Step-by-Step Method to Manage Money and Save More',
      path: '/en/blog/budget-mensuel-mode-emploi',
    },
  },
  'calcul-impot-revenu-sans-stress': {
    fr: {
      title: 'Calcul impôt sur le revenu : méthode simple pour anticiper sereinement',
      path: '/blog/calcul-impot-revenu-sans-stress',
    },
    en: {
      title: 'Income Tax Estimate Guide: Plan Cash Flow and Reduce Tax Stress',
      path: '/en/blog/calcul-impot-revenu-sans-stress',
    },
  },
  'epargne-automatique-strategies': {
    fr: {
      title: 'Épargne automatique : stratégie progressive pour atteindre vos objectifs',
      path: '/blog/epargne-automatique-strategies',
    },
    en: {
      title: 'Automatic Savings Strategy: Build Consistent Savings All Year',
      path: '/en/blog/epargne-automatique-strategies',
    },
  },
  'fonds-urgence-combien-mettre': {
    fr: {
      title: "Fonds d'urgence : combien épargner selon votre situation financière",
      path: '/blog/fonds-urgence-combien-mettre',
    },
    en: {
      title: 'Emergency Fund Guide: How Much to Save for Financial Security',
      path: '/en/blog/fonds-urgence-combien-mettre',
    },
  },
  'interets-composes-erreurs-a-eviter': {
    fr: {
      title: 'Intérêts composés : les erreurs qui freinent la croissance de votre capital',
      path: '/blog/interets-composes-erreurs-a-eviter',
    },
    en: {
      title: 'Compound Interest Mistakes: 5 Errors That Hurt Long-Term Growth',
      path: '/en/blog/interets-composes-erreurs-a-eviter',
    },
  },
  'investissement-progressif-dca': {
    fr: {
      title: 'Investissement progressif DCA : lisser le risque avec une méthode régulière',
      path: '/blog/investissement-progressif-dca',
    },
    en: {
      title: 'DCA Investing Guide: Progressive Investing Without Market Timing',
      path: '/en/blog/investissement-progressif-dca',
    },
  },
  'methode-50-30-20': {
    fr: {
      title: 'La méthode 50/30/20 : guide simple pour équilibrer budget et épargne',
      path: '/blog/methode-50-30-20',
    },
    en: {
      title: '50/30/20 Budget Rule: Practical Guide to Balance Spending and Savings',
      path: '/en/blog/methode-50-30-20',
    },
  },
  'optimiser-quotient-familial-legalement': {
    fr: {
      title: 'Quotient familial : les bons réflexes pour optimiser son impôt légalement',
      path: '/blog/optimiser-quotient-familial-legalement',
    },
    en: {
      title: 'Family Tax Shares: Legal Ways to Optimize Household Tax Planning',
      path: '/en/blog/optimiser-quotient-familial-legalement',
    },
  },
  'partage-addition-entre-amis-guide': {
    fr: {
      title: "Partage d'addition entre amis : méthode simple et équitable",
      path: '/blog/partage-addition-entre-amis-guide',
    },
    en: {
      title: 'Split Bill with Friends: Fair Method to Share Costs and Tips',
      path: '/en/blog/partage-addition-entre-amis-guide',
    },
  },
  'petites-depenses-qui-comptent': {
    fr: {
      title: 'Petites dépenses du quotidien : comment les réduire et économiser plus',
      path: '/blog/petites-depenses-qui-comptent',
    },
    en: {
      title: 'Small Expenses That Add Up: How to Cut Daily Money Leaks',
      path: '/en/blog/petites-depenses-qui-comptent',
    },
  },
  'pourboire-regles-pratiques-voyage': {
    fr: {
      title: "Pourboire en France et à l'étranger : repères pratiques pour bien calculer",
      path: '/blog/pourboire-regles-pratiques-voyage',
    },
    en: {
      title: 'Tipping Guide: Practical Rules for Home and Travel',
      path: '/en/blog/pourboire-regles-pratiques-voyage',
    },
  },
};

const DEFAULT_BLOGS_BY_CATEGORY: Record<CategoryKey, BlogSlug[]> = {
  finance: ['budget-mensuel-mode-emploi', 'epargne-automatique-strategies', 'calcul-impot-revenu-sans-stress'],
  health: ['fonds-urgence-combien-mettre', 'methode-50-30-20', 'petites-depenses-qui-comptent'],
  realEstate: ['budget-mensuel-mode-emploi', 'calcul-impot-revenu-sans-stress', 'fonds-urgence-combien-mettre'],
  dailyLife: ['partage-addition-entre-amis-guide', 'pourboire-regles-pratiques-voyage', 'petites-depenses-qui-comptent'],
  home: ['budget-mensuel-mode-emploi', 'petites-depenses-qui-comptent', 'fonds-urgence-combien-mettre'],
  education: ['methode-50-30-20', 'budget-mensuel-mode-emploi', 'epargne-automatique-strategies'],
};

const CROSS_CATEGORY_FALLBACKS: Record<CategoryKey, CalculatorSlug[]> = {
  finance: ['budget-mensuel', 'capacite-epargne-mensuelle', 'objectif-epargne-temps'],
  health: ['calcul-imc', 'besoin-calorique-journalier', 'depense-calorique-activite'],
  realEstate: ['capacite-emprunt-immobilier', 'mensualite-credit', 'taux-endettement'],
  dailyLife: ['difference-entre-deux-dates', 'consommation-carburant', 'budget-mensuel'],
  home: ['surface-piece', 'quantite-peinture', 'budget-mensuel'],
  education: ['moyenne-scolaire', 'difference-entre-deux-dates', 'budget-mensuel'],
};

const CALCULATOR_DETAILS: Record<CalculatorSlug, CalculatorDetail> = {
  'budget-mensuel': {
    variables: {
      fr: ['revenu net mensuel', 'charges fixes', 'dépenses variables'],
      en: ['net monthly income', 'fixed costs', 'variable spending'],
    },
    formula: {
      fr: 'Reste à vivre = Revenu net - (Charges fixes + Dépenses variables). Taux d’épargne = Reste à vivre / Revenu net x 100.',
      en: 'Remaining balance = Net income - (Fixed costs + Variable spending). Savings rate = Remaining balance / Net income x 100.',
    },
    numericExample: {
      fr: 'Exemple : avec 2 600 € de revenus, 1 450 € de charges fixes et 700 € de dépenses variables, le reste à vivre est de 450 €, soit 17,3 % de taux d’épargne.',
      en: 'Example: with €2,600 income, €1,450 fixed costs, and €700 variable spending, remaining balance is €450, i.e. a 17.3% savings rate.',
    },
    decisionScenario: {
      fr: 'Décision : si votre reste à vivre descend sous 250 € deux mois de suite, vous bloquez temporairement une catégorie loisir et réallouez 100 € vers l’épargne de précaution.',
      en: 'Decision: if your remaining balance falls below €250 for two consecutive months, pause one leisure category and redirect €100 to emergency savings.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un jeune couple en location compare un budget “normal” et un budget “naissance” pour anticiper les six premiers mois après l’arrivée d’un enfant.',
      en: 'Contextualized case: a renting couple compares a “standard” versus “new baby” budget to prepare the first six months after childbirth.',
    },
    thresholds: {
      fr: ['Zone confortable : taux d’épargne >= 15 %.', 'Zone à surveiller : taux d’épargne entre 5 % et 15 %.', 'Zone critique : taux d’épargne < 5 % ou reste à vivre négatif.'],
      en: ['Comfort zone: savings rate >= 15%.', 'Watch zone: savings rate between 5% and 15%.', 'Critical zone: savings rate < 5% or negative remaining balance.'],
    },
    riskNotice: {
      fr: 'Le risque principal est d’oublier les dépenses annuelles (assurance, entretien, impôts locaux) : elles doivent être mensualisées pour éviter une lecture trop optimiste.',
      en: 'Main risk: forgetting annual expenses (insurance, maintenance, local taxes). Monthly allocation is required to avoid an overly optimistic result.',
    },
    relatedCalculators: ['capacite-epargne-mensuelle', 'objectif-epargne-temps', 'taux-endettement'],
  },
  'epargne-automatique': {
    variables: {
      fr: ['objectif d’épargne', 'durée en mois', 'capital initial'],
      en: ['savings target', 'duration in months', 'initial capital'],
    },
    formula: {
      fr: 'Versement mensuel cible ≈ (Objectif - Capital initial) / Durée, puis ajustement si un taux de rendement est appliqué.',
      en: 'Target monthly contribution ≈ (Goal - Initial capital) / Duration, then adjusted when a yield assumption is used.',
    },
    numericExample: {
      fr: 'Exemple : objectif 12 000 € sur 24 mois avec 1 200 € déjà disponibles. Sans rendement, l’effort est de 450 € par mois.',
      en: 'Example: €12,000 target over 24 months with €1,200 already saved. Without yield, required monthly contribution is €450.',
    },
    decisionScenario: {
      fr: 'Décision : si l’effort mensuel dépasse 20 % de votre capacité d’épargne, allongez la durée de 6 à 12 mois avant de réduire l’objectif.',
      en: 'Decision: if required contribution exceeds 20% of your monthly savings capacity, extend timeline by 6–12 months before cutting the goal.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un freelance met en place deux virements automatiques, 300 € les mois faibles et 600 € les mois forts, pour lisser la saisonnalité.',
      en: 'Contextualized case: a freelancer sets two automatic tiers, €300 in low months and €600 in strong months, to absorb seasonality.',
    },
    thresholds: {
      fr: ['Plan stable : effort <= 15 % du revenu net.', 'Plan tendu : effort entre 15 % et 25 %.', 'Plan fragile : effort > 25 % sans marge de sécurité.'],
      en: ['Stable plan: contribution <= 15% of net income.', 'Tight plan: contribution between 15% and 25%.', 'Fragile plan: contribution > 25% without safety buffer.'],
    },
    riskNotice: {
      fr: 'Un objectif trop ambitieux crée des abandons. Privilégiez un montant soutenable et augmentez-le par paliers trimestriels.',
      en: 'An overly aggressive target often leads to drop-off. Start with a sustainable amount and increase in quarterly steps.',
    },
    relatedCalculators: ['objectif-epargne-temps', 'interets-composes', 'capacite-epargne-mensuelle'],
    relatedBlogs: ['epargne-automatique-strategies', 'fonds-urgence-combien-mettre'],
  },
  'interets-composes': {
    variables: {
      fr: ['capital initial', 'taux annuel', 'durée de placement'],
      en: ['initial capital', 'annual rate', 'investment duration'],
    },
    formula: {
      fr: 'Montant final = Capital initial x (1 + taux / fréquence)^(fréquence x durée).',
      en: 'Final amount = Initial capital x (1 + rate / frequency)^(frequency x duration).',
    },
    numericExample: {
      fr: 'Exemple : 10 000 € à 5 % pendant 15 ans (capitalisation mensuelle) donnent environ 21 170 €.',
      en: 'Example: €10,000 at 5% for 15 years (monthly compounding) grows to about €21,170.',
    },
    decisionScenario: {
      fr: 'Décision : si l’écart entre un scénario à 4 % et un scénario à 6 % dépasse 30 %, vous basez votre plan sur l’hypothèse basse.',
      en: 'Decision: if the gap between 4% and 6% scenarios exceeds 30%, anchor planning to the lower-return case.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : une salariée de 32 ans compare un versement unique et un versement mensuel automatique pour préparer son apport immobilier à 45 ans.',
      en: 'Contextualized case: a 32-year-old employee compares lump sum versus recurring monthly investing to prepare a home down payment at age 45.',
    },
    thresholds: {
      fr: ['Horizon efficace : au moins 8 ans.', 'Rendement prudent : 3 % à 5 % net de frais.', 'Alerte : projections fondées sur un rendement > 8 % sans justification.'],
      en: ['Effective horizon: at least 8 years.', 'Prudent return assumption: 3% to 5% net of fees.', 'Warning: projections based on >8% return without clear rationale.'],
    },
    riskNotice: {
      fr: 'Le calcul ne modélise pas la volatilité des marchés ni la fiscalité réelle du support. Utilisez-le pour cadrer une trajectoire, pas pour promettre un résultat.',
      en: 'The tool does not model market volatility or full tax reality of the investment vehicle. Use it for trajectory planning, not guaranteed outcomes.',
    },
    relatedCalculators: ['epargne-automatique', 'objectif-epargne-temps', 'pret-personnel'],
    relatedBlogs: ['interets-composes-erreurs-a-eviter', 'investissement-progressif-dca'],
  },
  'impot-revenu': {
    variables: {
      fr: ['revenu imposable', 'parts fiscales', 'situation du foyer'],
      en: ['taxable income', 'tax shares', 'household status'],
    },
    formula: {
      fr: 'Estimation par tranches progressives puis ajustement via quotient familial.',
      en: 'Estimate based on progressive tax brackets, then adjusted through household share logic.',
    },
    numericExample: {
      fr: 'Exemple : un revenu imposable de 38 000 € avec 2 parts donne un impôt estimé inférieur au même revenu avec 1 part.',
      en: 'Example: €38,000 taxable income with 2 shares yields lower estimated tax than the same income with 1 share.',
    },
    decisionScenario: {
      fr: 'Décision : si l’impôt estimé dépasse 1,5 mois de salaire net, vous mettez en place une provision mensuelle dédiée dès le mois suivant.',
      en: 'Decision: if estimated tax exceeds 1.5 months of net salary, set a dedicated monthly tax reserve immediately.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un couple avec garde alternée compare deux hypothèses de parts pour anticiper son budget fiscal annuel.',
      en: 'Contextualized case: a co-parenting household compares two share assumptions to anticipate annual tax cash flow.',
    },
    thresholds: {
      fr: ['Confort : provision mensuelle >= impôt annuel / 12.', 'Vigilance : provision inférieure de 20 % à la cible.', 'Alerte : aucune provision alors que l’impôt estimé est significatif.'],
      en: ['Comfort: monthly provision >= annual tax estimate / 12.', 'Watch: provision sits 20% below target.', 'Alert: no reserve while estimated tax is material.'],
    },
    riskNotice: {
      fr: 'Cette estimation n’intègre pas toutes les niches ou cas complexes. Validez toujours la déclaration finale avec les documents fiscaux officiels.',
      en: 'This estimate does not include every advanced tax case. Final filing must be validated against official tax documentation.',
    },
    relatedCalculators: ['budget-mensuel', 'taux-endettement', 'capacite-epargne-mensuelle'],
    relatedBlogs: ['calcul-impot-revenu-sans-stress', 'optimiser-quotient-familial-legalement'],
  },
  'economies-petites-depenses': {
    variables: {
      fr: ['coût unitaire', 'fréquence', 'horizon de projection'],
      en: ['unit cost', 'frequency', 'projection horizon'],
    },
    formula: {
      fr: 'Économie potentielle = Coût unitaire x Fréquence x Période.',
      en: 'Potential savings = Unit cost x Frequency x Period.',
    },
    numericExample: {
      fr: 'Exemple : 4 € de snack quotidien représentent environ 1 460 € sur un an.',
      en: 'Example: a €4 daily snack represents about €1,460 over one year.',
    },
    decisionScenario: {
      fr: 'Décision : si la somme annuelle dépasse 1 000 €, vous définissez un plafond hebdomadaire et une règle de substitution simple.',
      en: 'Decision: if annual total exceeds €1,000, set a weekly cap and a simple substitution rule.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un étudiant réduit trois dépenses impulsives et redirige 80 € par mois vers son loyer et ses manuels.',
      en: 'Contextualized case: a student cuts three impulse spending habits and reallocates €80/month to rent and textbooks.',
    },
    thresholds: {
      fr: ['Impact faible : < 300 €/an.', 'Impact modéré : 300 à 1 000 €/an.', 'Impact fort : > 1 000 €/an.'],
      en: ['Low impact: < €300/year.', 'Moderate impact: €300 to €1,000/year.', 'High impact: > €1,000/year.'],
    },
    riskNotice: {
      fr: 'Le risque est de viser une restriction excessive non tenable. Préférez 2 à 3 ajustements réalistes plutôt qu’un plan radical.',
      en: 'Main risk is over-restriction that cannot be sustained. Prefer 2–3 realistic adjustments over a radical plan.',
    },
    relatedCalculators: ['budget-mensuel', 'capacite-epargne-mensuelle', 'objectif-epargne-temps'],
    relatedBlogs: ['petites-depenses-qui-comptent', 'methode-50-30-20'],
  },
  pourboire: {
    variables: {
      fr: ['montant de la note', 'taux de pourboire', 'nombre de personnes'],
      en: ['bill amount', 'tip rate', 'number of people'],
    },
    formula: {
      fr: 'Pourboire = Note x Taux. Total final = Note + Pourboire. Part individuelle = Total final / Nombre de personnes.',
      en: 'Tip = Bill x Rate. Final total = Bill + Tip. Per-person share = Final total / Number of people.',
    },
    numericExample: {
      fr: 'Exemple : pour une note de 84 € avec 10 % de pourboire, le total est 92,40 € ; à 3 personnes, cela fait 30,80 € chacun.',
      en: 'Example: on an €84 bill with a 10% tip, final total is €92.40; split by 3 gives €30.80 each.',
    },
    decisionScenario: {
      fr: 'Décision : en déplacement, vous appliquez un barème simple (5 %, 10 %, 15 %) selon la qualité de service pour rester cohérent.',
      en: 'Decision: while traveling, apply a simple 5%/10%/15% rule by service quality for consistency.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un groupe d’amis au restaurant utilise le calculateur pour éviter les arrondis incohérents au moment de payer.',
      en: 'Contextualized case: a group of friends uses the tool to avoid inconsistent rounding when paying the bill.',
    },
    thresholds: {
      fr: ['Service standard : 5 %.', 'Bon service : 8 % à 12 %.', 'Service premium : 15 % et plus selon pays.'],
      en: ['Standard service: 5%.', 'Good service: 8% to 12%.', 'Premium service: 15%+ depending on country norms.'],
    },
    riskNotice: {
      fr: 'Les usages varient fortement selon le pays. Vérifiez toujours les pratiques locales et si le service est déjà inclus.',
      en: 'Tipping norms vary significantly by country. Always check local practice and whether service is already included.',
    },
    relatedCalculators: ['partage-addition', 'budget-mensuel', 'economies-petites-depenses'],
    relatedBlogs: ['pourboire-regles-pratiques-voyage', 'partage-addition-entre-amis-guide'],
  },
  'partage-addition': {
    variables: {
      fr: ['montant total', 'participants', 'règle de répartition'],
      en: ['total amount', 'participants', 'split rule'],
    },
    formula: {
      fr: 'Part individuelle = (Montant total + pourboire) / Participants, ou répartition pondérée si consommation différente.',
      en: 'Per-person share = (Total + tip) / Participants, or weighted split if consumption differs.',
    },
    numericExample: {
      fr: 'Exemple : une note de 126 € à 6 personnes donne 21 € chacun en partage égal.',
      en: 'Example: a €126 bill split across 6 people equals €21 each with equal sharing.',
    },
    decisionScenario: {
      fr: 'Décision : si l’écart entre une répartition égale et pondérée dépasse 15 %, vous passez en mode pondéré pour éviter les tensions.',
      en: 'Decision: if gap between equal and weighted split exceeds 15%, switch to weighted mode to reduce conflict.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : après un dîner d’équipe, les participants valident la part de chacun en moins de 2 minutes avant remboursement instantané.',
      en: 'Contextualized case: after a team dinner, participants validate each share in under 2 minutes before instant repayments.',
    },
    thresholds: {
      fr: ['Répartition simple : groupes homogènes.', 'Répartition pondérée : consommations très différentes.', 'Alerte : arrondis non explicités qui créent des litiges.'],
      en: ['Simple split: homogeneous groups.', 'Weighted split: highly uneven consumption.', 'Alert: unexplained rounding that creates disputes.'],
    },
    riskNotice: {
      fr: 'Le principal risque est un montant de base erroné (service, remise, taxes). Validez toujours le total final avant de diviser.',
      en: 'Main risk is an incorrect base amount (service, discount, taxes). Validate final total before splitting.',
    },
    relatedCalculators: ['pourboire', 'budget-mensuel', 'economies-petites-depenses'],
    relatedBlogs: ['partage-addition-entre-amis-guide', 'pourboire-regles-pratiques-voyage'],
  },
  'taux-endettement': {
    variables: {
      fr: ['revenus mensuels', 'charges mensuelles de crédit'],
      en: ['monthly income', 'monthly debt charges'],
    },
    formula: {
      fr: 'Taux d’endettement = Charges de crédit / Revenus mensuels x 100.',
      en: 'Debt ratio = Debt charges / Monthly income x 100.',
    },
    numericExample: {
      fr: 'Exemple : 1 050 € de charges pour 3 300 € de revenus donnent 31,8 % de taux d’endettement.',
      en: 'Example: €1,050 debt charges over €3,300 income gives a 31.8% debt ratio.',
    },
    decisionScenario: {
      fr: 'Décision : au-delà de 35 %, vous reportez un nouveau financement et priorisez la baisse des charges fixes.',
      en: 'Decision: above 35%, postpone new financing and prioritize fixed-cost reduction.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un couple prépare un achat immobilier et compare son ratio actuel avec et sans crédit auto.',
      en: 'Contextualized case: a couple planning a home purchase compares debt ratio with and without a car loan.',
    },
    thresholds: {
      fr: ['Zone cible : <= 33 %.', 'Zone de vigilance : 33 % à 35 %.', 'Zone risquée : > 35 %.'],
      en: ['Target zone: <= 33%.', 'Watch zone: 33% to 35%.', 'Risk zone: > 35%.'],
    },
    riskNotice: {
      fr: 'Ce ratio ne suffit pas seul : la stabilité des revenus et le reste à vivre réel doivent être analysés en parallèle.',
      en: 'This ratio alone is not enough: income stability and real remaining cash must be assessed in parallel.',
    },
    relatedCalculators: ['mensualite-credit', 'capacite-emprunt-immobilier', 'budget-mensuel'],
  },
  'mensualite-credit': {
    variables: {
      fr: ['montant emprunté', 'taux annuel', 'durée du prêt'],
      en: ['loan principal', 'annual rate', 'loan term'],
    },
    formula: {
      fr: 'Mensualité calculée via formule d’annuité constante ; à taux 0 %, mensualité = capital / nombre de mois.',
      en: 'Payment computed with constant-annuity formula; at 0% rate, payment = principal / months.',
    },
    numericExample: {
      fr: 'Exemple : 180 000 € sur 20 ans à 3,2 % donne une mensualité proche de 1 017 €.',
      en: 'Example: €180,000 over 20 years at 3.2% gives a monthly payment near €1,017.',
    },
    decisionScenario: {
      fr: 'Décision : si la mensualité dépasse 30 % de votre revenu net, vous testez soit une durée plus longue, soit un apport supérieur.',
      en: 'Decision: if payment exceeds 30% of net income, test a longer term or higher down payment.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un primo-accédant compare trois durées (15, 20, 25 ans) pour équilibrer coût total et effort mensuel.',
      en: 'Contextualized case: a first-time buyer compares 15, 20, and 25-year terms to balance total cost and monthly affordability.',
    },
    thresholds: {
      fr: ['Effort prudent : <= 30 % du revenu net.', 'Effort élevé : 30 % à 35 %.', 'Effort critique : > 35 %.'],
      en: ['Prudent burden: <= 30% of net income.', 'High burden: 30% to 35%.', 'Critical burden: > 35%.'],
    },
    riskNotice: {
      fr: 'Le calcul n’intègre pas automatiquement assurance emprunteur, frais bancaires et coûts annexes. Ajoutez une marge de 8 % à 15 % selon votre dossier.',
      en: 'The model does not automatically include borrower insurance, bank fees, and ancillary costs. Add an 8%–15% buffer depending on profile.',
    },
    relatedCalculators: ['pret-personnel', 'taux-endettement', 'capacite-emprunt-immobilier'],
  },
  'pret-personnel': {
    variables: {
      fr: ['capital', 'taux annuel', 'durée'],
      en: ['principal', 'annual rate', 'duration'],
    },
    formula: {
      fr: 'Le calcul dérive mensualité, montant total remboursé et coût total du crédit.',
      en: 'Computation derives monthly payment, total repaid amount, and total borrowing cost.',
    },
    numericExample: {
      fr: 'Exemple : 12 000 € sur 5 ans à 5,9 % donne une mensualité proche de 232 € et un coût total d’environ 1 920 €.',
      en: 'Example: €12,000 over 5 years at 5.9% gives a monthly payment near €232 and total cost around €1,920.',
    },
    decisionScenario: {
      fr: 'Décision : si le coût du crédit dépasse 20 % du capital emprunté, vous comparez au moins deux offres avant signature.',
      en: 'Decision: if borrowing cost exceeds 20% of principal, compare at least two offers before signing.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un indépendant finance du matériel professionnel et arbitre entre location et prêt personnel.',
      en: 'Contextualized case: a self-employed professional funds equipment and compares leasing versus personal loan.',
    },
    thresholds: {
      fr: ['Coût modéré : < 15 % du capital.', 'Coût élevé : 15 % à 25 %.', 'Coût excessif : > 25 %.'],
      en: ['Moderate cost: < 15% of principal.', 'High cost: 15% to 25%.', 'Excessive cost: > 25%.'],
    },
    riskNotice: {
      fr: 'Un crédit “petit montant” peut rester coûteux si la durée est longue. Vérifiez systématiquement le coût total, pas seulement la mensualité.',
      en: 'A “small loan” can still be expensive if stretched too long. Always review total cost, not only the monthly payment.',
    },
    relatedCalculators: ['mensualite-credit', 'budget-mensuel', 'capacite-epargne-mensuelle'],
  },
  'salaire-brut-net': {
    variables: {
      fr: ['salaire brut', 'ratio net estimé'],
      en: ['gross salary', 'estimated net ratio'],
    },
    formula: {
      fr: 'Net estimé = Brut x ratio net.',
      en: 'Estimated net = Gross x net ratio.',
    },
    numericExample: {
      fr: 'Exemple : un brut de 3 000 € avec un ratio de 0,78 donne un net estimé de 2 340 €.',
      en: 'Example: €3,000 gross with a 0.78 ratio gives an estimated net of €2,340.',
    },
    decisionScenario: {
      fr: 'Décision : pour une négociation, vous simulez trois ratios (0,75 ; 0,78 ; 0,80) afin d’éviter une attente nette irréaliste.',
      en: 'Decision: for salary negotiation, model three ratios (0.75, 0.78, 0.80) to avoid unrealistic net expectations.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : une salariée en mobilité compare deux offres brutes et retient celle qui maintient son budget logement sous 35 %.',
      en: 'Contextualized case: an employee comparing two offers chooses the one keeping housing costs under 35% of net income.',
    },
    thresholds: {
      fr: ['Lecture prudente : utiliser un ratio conservateur.', 'Vérification : comparer au bulletin de paie réel.', 'Alerte : écarts supérieurs à 8 % entre estimation et réel.'],
      en: ['Prudent reading: use a conservative ratio.', 'Check: compare against actual payslip.', 'Alert: >8% gap between estimate and reality.'],
    },
    riskNotice: {
      fr: 'Le ratio varie selon statut, convention collective et avantages. Cette simulation sert de cadrage rapide, pas de simulation de paie exhaustive.',
      en: 'Ratio varies by employment status, agreements, and benefits. This is a fast framing tool, not a full payroll simulation.',
    },
    relatedCalculators: ['salaire-net-brut', 'budget-mensuel', 'taux-endettement'],
  },
  'salaire-net-brut': {
    variables: {
      fr: ['objectif net', 'ratio net estimé'],
      en: ['target net salary', 'estimated net ratio'],
    },
    formula: {
      fr: 'Brut estimé = Net / ratio net.',
      en: 'Estimated gross = Net / net ratio.',
    },
    numericExample: {
      fr: 'Exemple : viser 2 500 € net avec un ratio de 0,78 implique un brut proche de 3 205 €.',
      en: 'Example: targeting €2,500 net with a 0.78 ratio implies gross salary near €3,205.',
    },
    decisionScenario: {
      fr: 'Décision : si l’offre brute proposée reste 10 % sous votre cible calculée, vous négociez soit le fixe, soit un variable contractuel.',
      en: 'Decision: if offered gross is 10% below your target estimate, negotiate fixed pay or a contractual variable component.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un consultant en reconversion fixe un objectif brut réaliste avant de candidater sur un nouveau marché.',
      en: 'Contextualized case: a career-switching consultant sets a realistic gross target before applying in a new market.',
    },
    thresholds: {
      fr: ['Écart acceptable : <= 5 %.', 'Écart à discuter : 5 % à 10 %.', 'Écart critique : > 10 %.'],
      en: ['Acceptable gap: <= 5%.', 'Discussable gap: 5% to 10%.', 'Critical gap: > 10%.'],
    },
    riskNotice: {
      fr: 'Ne confondez pas brut contractuel et package global. Les primes et avantages peuvent modifier significativement le net réellement perçu.',
      en: 'Do not confuse contractual gross with total compensation package. Bonuses and benefits can materially change effective net pay.',
    },
    relatedCalculators: ['salaire-brut-net', 'budget-mensuel', 'capacite-epargne-mensuelle'],
  },
  'tva-ht-ttc': {
    variables: {
      fr: ['montant de base', 'taux de TVA', 'sens de conversion'],
      en: ['base amount', 'VAT rate', 'conversion direction'],
    },
    formula: {
      fr: 'TTC = HT x (1 + TVA). HT = TTC / (1 + TVA).',
      en: 'Tax-included = Pre-tax x (1 + VAT). Pre-tax = Tax-included / (1 + VAT).',
    },
    numericExample: {
      fr: 'Exemple : 120 € HT à 20 % donnent 144 € TTC ; 144 € TTC à 20 % redonnent 120 € HT.',
      en: 'Example: €120 pre-tax at 20% equals €144 tax-included; €144 tax-included at 20% returns €120 pre-tax.',
    },
    decisionScenario: {
      fr: 'Décision : pour un devis, vous validez systématiquement HT et TTC afin d’éviter une marge incorrecte au moment de facturer.',
      en: 'Decision: for quotations, always validate both pre-tax and tax-included values to avoid margin errors when invoicing.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un micro-entrepreneur compare deux tarifs client en conservant le même niveau de revenu net après taxes.',
      en: 'Contextualized case: a small business owner compares two client prices while preserving net revenue after taxes.',
    },
    thresholds: {
      fr: ['Contrôle de cohérence : recalcul aller-retour HT/TTC.', 'Vigilance : taux de TVA différent selon activité.', 'Alerte : confusion entre taux 10 % et 20 %.'],
      en: ['Consistency check: perform forward/backward VAT conversion.', 'Watch: VAT rate differs by activity.', 'Alert: confusion between 10% and 20% rates.'],
    },
    riskNotice: {
      fr: 'Une erreur de taux de TVA impacte immédiatement la marge et la conformité. Vérifiez les taux applicables par catégorie de produit ou service.',
      en: 'Wrong VAT rate directly impacts margin and compliance. Validate applicable rates by product/service category.',
    },
    relatedCalculators: ['budget-mensuel', 'impot-revenu', 'capacite-epargne-mensuelle'],
  },
  'capacite-epargne-mensuelle': {
    variables: {
      fr: ['revenus mensuels', 'dépenses mensuelles'],
      en: ['monthly income', 'monthly expenses'],
    },
    formula: {
      fr: 'Capacité d’épargne = Revenus mensuels - Dépenses mensuelles.',
      en: 'Savings capacity = Monthly income - Monthly expenses.',
    },
    numericExample: {
      fr: 'Exemple : 2 900 € de revenus et 2 250 € de dépenses donnent une capacité d’épargne de 650 €.',
      en: 'Example: €2,900 income and €2,250 expenses give a €650 monthly savings capacity.',
    },
    decisionScenario: {
      fr: 'Décision : si la capacité passe sous 300 €, vous reportez un achat non essentiel et sécurisez d’abord le fonds d’urgence.',
      en: 'Decision: if capacity drops below €300, postpone non-essential purchases and secure emergency fund first.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un parent solo ajuste ses dépenses variables pour conserver au moins 400 € de marge chaque mois.',
      en: 'Contextualized case: a single parent adjusts variable spending to preserve at least €400 monthly buffer.',
    },
    thresholds: {
      fr: ['Confort : >= 20 % du revenu.', 'Correct : 10 % à 20 %.', 'Fragile : < 10 %.'],
      en: ['Comfort: >= 20% of income.', 'Acceptable: 10% to 20%.', 'Fragile: < 10%.'],
    },
    riskNotice: {
      fr: 'Une capacité positive ponctuelle ne suffit pas. Vérifiez sa stabilité sur 3 à 6 mois pour éviter les décisions trop optimistes.',
      en: 'A one-month positive capacity is not enough. Check stability over 3–6 months before making commitments.',
    },
    relatedCalculators: ['budget-mensuel', 'objectif-epargne-temps', 'epargne-automatique'],
  },
  'objectif-epargne-temps': {
    variables: {
      fr: ['objectif de capital', 'versement mensuel', 'capital initial'],
      en: ['target capital', 'monthly contribution', 'initial capital'],
    },
    formula: {
      fr: 'Projection mois par mois jusqu’à atteindre la cible, avec ou sans capitalisation.',
      en: 'Month-by-month projection until target is reached, with or without compounding.',
    },
    numericExample: {
      fr: 'Exemple : avec 5 000 € d’objectif, 150 € par mois et 500 € de départ, la cible est atteinte en environ 30 mois sans rendement.',
      en: 'Example: with a €5,000 target, €150/month contribution, and €500 initial amount, target is reached in about 30 months without yield.',
    },
    decisionScenario: {
      fr: 'Décision : si l’horizon dépasse 36 mois, vous augmentez le versement de 10 % ou réduisez l’objectif intermédiaire.',
      en: 'Decision: if timeline exceeds 36 months, increase contribution by 10% or set an intermediate reduced target.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : une alternante planifie un achat de véhicule en répartissant son effort entre épargne régulière et prime annuelle.',
      en: 'Contextualized case: an apprentice plans a vehicle purchase by combining recurring savings and annual bonus allocation.',
    },
    thresholds: {
      fr: ['Horizon court : <= 18 mois.', 'Horizon moyen : 18 à 36 mois.', 'Horizon long : > 36 mois.'],
      en: ['Short horizon: <= 18 months.', 'Medium horizon: 18 to 36 months.', 'Long horizon: > 36 months.'],
    },
    riskNotice: {
      fr: 'Un horizon trop long sans ajustement réduit la motivation. Découpez la cible en paliers avec revues trimestrielles.',
      en: 'Very long timelines can reduce execution discipline. Split target into milestones with quarterly reviews.',
    },
    relatedCalculators: ['epargne-automatique', 'capacite-epargne-mensuelle', 'interets-composes'],
  },
  'calcul-imc': {
    variables: {
      fr: ['poids (kg)', 'taille (cm)'],
      en: ['weight (kg)', 'height (cm)'],
    },
    formula: {
      fr: 'IMC = Poids / (Taille en mètre)^2.',
      en: 'BMI = Weight / (Height in meters)^2.',
    },
    numericExample: {
      fr: 'Exemple : 72 kg pour 1,75 m donnent un IMC d’environ 23,5.',
      en: 'Example: 72 kg at 1.75 m results in a BMI around 23.5.',
    },
    decisionScenario: {
      fr: 'Décision : si l’IMC évolue de plus de 2 points en 3 mois, vous croisez ce signal avec un avis médical et vos habitudes réelles.',
      en: 'Decision: if BMI moves by more than 2 points in 3 months, combine this signal with medical advice and lifestyle review.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un sportif amateur suit l’IMC en complément de son tour de taille pour éviter une lecture isolée.',
      en: 'Contextualized case: an amateur athlete tracks BMI alongside waist measurement to avoid isolated interpretation.',
    },
    thresholds: {
      fr: ['Repère général : 18,5 à 24,9.', 'Vigilance : < 18,5 ou 25 à 29,9.', 'Alerte : >= 30, avec évaluation médicale recommandée.'],
      en: ['General benchmark: 18.5 to 24.9.', 'Watch: <18.5 or 25 to 29.9.', 'Alert: >=30, with recommended medical evaluation.'],
    },
    riskNotice: {
      fr: 'L’IMC ne distingue pas masse grasse et masse musculaire. Il doit être interprété avec d’autres indicateurs de santé.',
      en: 'BMI does not separate fat mass from lean mass. It should be interpreted with additional health indicators.',
    },
    relatedCalculators: ['poids-ideal', 'besoin-calorique-journalier', 'besoin-eau-quotidien'],
  },
  'besoin-calorique-journalier': {
    variables: {
      fr: ['âge', 'sexe', 'poids', 'taille', 'activité'],
      en: ['age', 'sex', 'weight', 'height', 'activity'],
    },
    formula: {
      fr: 'BMR estimé (Mifflin-St Jeor) puis multiplié par un facteur d’activité.',
      en: 'Estimated BMR (Mifflin-St Jeor) multiplied by activity factor.',
    },
    numericExample: {
      fr: 'Exemple : une femme de 30 ans, 62 kg, 168 cm, activité modérée, obtient un maintien proche de 2 000 kcal/jour.',
      en: 'Example: a 30-year-old woman, 62 kg, 168 cm, moderate activity, gets maintenance near 2,000 kcal/day.',
    },
    decisionScenario: {
      fr: 'Décision : pour une perte de poids progressive, vous testez un déficit de 300 à 400 kcal plutôt qu’une restriction extrême.',
      en: 'Decision: for gradual fat loss, test a 300–400 kcal deficit rather than extreme restriction.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un salarié sédentaire adapte ses apports à ses jours d’entraînement et ses jours de repos.',
      en: 'Contextualized case: a sedentary employee adjusts intake between training days and rest days.',
    },
    thresholds: {
      fr: ['Maintien : autour de la valeur estimée.', 'Déficit prudent : -10 % à -20 %.', 'Alerte : déficit > 25 % sans suivi professionnel.'],
      en: ['Maintenance: around estimated value.', 'Prudent deficit: -10% to -20%.', 'Alert: >25% deficit without professional monitoring.'],
    },
    riskNotice: {
      fr: 'Le besoin énergétique évolue avec le sommeil, le stress et le niveau d’activité réel. Réévaluez vos paramètres toutes les 4 à 6 semaines.',
      en: 'Energy needs change with sleep, stress, and actual activity levels. Reassess inputs every 4–6 weeks.',
    },
    relatedCalculators: ['calcul-imc', 'depense-calorique-activite', 'besoin-eau-quotidien'],
  },
  'poids-ideal': {
    variables: {
      fr: ['taille', 'sexe'],
      en: ['height', 'sex'],
    },
    formula: {
      fr: 'Estimation basée sur une formule de référence (type Devine) selon taille et sexe.',
      en: 'Estimate based on a reference formula (Devine-like) using height and sex.',
    },
    numericExample: {
      fr: 'Exemple : pour 170 cm, la formule donne un poids indicatif autour de 65 kg selon le sexe.',
      en: 'Example: at 170 cm, formula gives an indicative weight around 65 kg depending on sex.',
    },
    decisionScenario: {
      fr: 'Décision : vous utilisez le poids idéal comme intervalle de repère, puis vous ajustez vos objectifs avec des mesures de composition corporelle.',
      en: 'Decision: use ideal weight as a benchmark range, then adjust targets with body-composition metrics.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : une personne en reprise d’activité se fixe d’abord un objectif de forme et d’endurance avant un objectif de poids strict.',
      en: 'Contextualized case: someone returning to exercise sets fitness and endurance goals before strict scale targets.',
    },
    thresholds: {
      fr: ['Repère : valeur indicative, non absolue.', 'Vigilance : écart important avec IMC et tour de taille.', 'Alerte : objectifs extrêmes non soutenables.'],
      en: ['Benchmark: indicative, not absolute.', 'Watch: large gap versus BMI and waist data.', 'Alert: extreme, unsustainable weight goals.'],
    },
    riskNotice: {
      fr: 'Le “poids idéal” n’est pas une prescription médicale. Évitez les décisions rapides sans contexte de santé global.',
      en: '“Ideal weight” is not a medical prescription. Avoid rapid decisions without broader health context.',
    },
    relatedCalculators: ['calcul-imc', 'besoin-calorique-journalier', 'rythme-cardiaque-cible'],
  },
  'besoin-eau-quotidien': {
    variables: {
      fr: ['poids', 'minutes d’activité'],
      en: ['weight', 'activity minutes'],
    },
    formula: {
      fr: 'Hydratation de base (≈ 33 ml/kg) + bonus selon la durée d’activité.',
      en: 'Base hydration (≈ 33 ml/kg) + activity-duration adjustment.',
    },
    numericExample: {
      fr: 'Exemple : 70 kg avec 45 minutes d’activité donnent environ 2,7 L/jour.',
      en: 'Example: 70 kg with 45 minutes of activity gives around 2.7 L/day.',
    },
    decisionScenario: {
      fr: 'Décision : en période chaude, vous ajoutez 300 à 500 ml et répartissez les prises sur la journée.',
      en: 'Decision: in hot conditions, add 300–500 ml and spread intake throughout the day.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un télétravailleur utilise un volume repère par tranche horaire pour éviter les oublis.',
      en: 'Contextualized case: a remote worker uses hourly hydration checkpoints to prevent under-drinking.',
    },
    thresholds: {
      fr: ['Hydratation de base : 2,0 à 2,5 L selon profil.', 'Activité soutenue : +0,5 L ou plus.', 'Alerte : apport très faible avec symptômes de fatigue.'],
      en: ['Base hydration: 2.0 to 2.5 L depending on profile.', 'Sustained activity: +0.5 L or more.', 'Alert: very low intake with fatigue symptoms.'],
    },
    riskNotice: {
      fr: 'Le calcul est une estimation générale. Pathologies rénales, traitements ou chaleur extrême nécessitent une adaptation médicale.',
      en: 'This is a general estimate. Kidney conditions, medication, or extreme heat require personalized medical adjustment.',
    },
    relatedCalculators: ['besoin-calorique-journalier', 'calcul-imc', 'depense-calorique-activite'],
  },
  'rythme-cardiaque-cible': {
    variables: {
      fr: ['âge', 'intensité visée'],
      en: ['age', 'target intensity'],
    },
    formula: {
      fr: 'FC max estimée = 220 - âge ; zone cible calculée sur ce maximum.',
      en: 'Estimated max HR = 220 - age; target zone computed from that maximum.',
    },
    numericExample: {
      fr: 'Exemple : à 40 ans, FC max estimée 180 bpm ; une intensité de 70 % vise environ 126 bpm.',
      en: 'Example: at age 40, estimated max HR is 180 bpm; 70% intensity targets around 126 bpm.',
    },
    decisionScenario: {
      fr: 'Décision : pour l’endurance, vous restez en zone 60 % à 75 % et réservez les intensités > 85 % à des séances encadrées.',
      en: 'Decision: for endurance, stay mostly in 60%–75% zone and reserve >85% efforts for supervised sessions.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un coureur débutant suit sa zone cible sur montre connectée pour éviter de partir trop vite.',
      en: 'Contextualized case: a beginner runner follows target zone on a smartwatch to avoid starting too hard.',
    },
    thresholds: {
      fr: ['Zone récupération : 50 % à 60 %.', 'Zone endurance : 60 % à 75 %.', 'Zone élevée : > 85 % à limiter selon profil.'],
      en: ['Recovery zone: 50% to 60%.', 'Endurance zone: 60% to 75%.', 'High zone: >85%, to be limited based on profile.'],
    },
    riskNotice: {
      fr: 'La formule 220 - âge reste approximative. En cas d’antécédents cardio, la validation d’un professionnel de santé est indispensable.',
      en: 'The 220-age formula is approximate. With cardiovascular history, professional medical validation is essential.',
    },
    relatedCalculators: ['depense-calorique-activite', 'besoin-calorique-journalier', 'calcul-imc'],
  },
  'depense-calorique-activite': {
    variables: {
      fr: ['poids', 'durée', 'MET de l’activité'],
      en: ['weight', 'duration', 'activity MET'],
    },
    formula: {
      fr: 'Calories dépensées = MET x poids x durée (en heures).',
      en: 'Calories burned = MET x weight x duration (hours).',
    },
    numericExample: {
      fr: 'Exemple : 68 kg, 50 minutes de vélo (MET 7) donnent environ 397 kcal.',
      en: 'Example: 68 kg, 50 minutes of cycling (MET 7) burns about 397 kcal.',
    },
    decisionScenario: {
      fr: 'Décision : si la dépense d’une séance reste faible, vous augmentez d’abord la durée de 10 minutes avant d’augmenter l’intensité.',
      en: 'Decision: if session expenditure is low, first increase duration by 10 minutes before raising intensity.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un salarié en reprise sportive compare marche rapide, rameur et natation pour choisir l’activité la plus soutenable.',
      en: 'Contextualized case: a returning exerciser compares brisk walking, rowing, and swimming to pick the most sustainable option.',
    },
    thresholds: {
      fr: ['Séance légère : < 250 kcal.', 'Séance modérée : 250 à 500 kcal.', 'Séance intense : > 500 kcal.'],
      en: ['Light session: < 250 kcal.', 'Moderate session: 250 to 500 kcal.', 'Intense session: > 500 kcal.'],
    },
    riskNotice: {
      fr: 'Les valeurs MET sont des moyennes. La dépense réelle dépend de la technique, du niveau d’entraînement et de l’intensité effective.',
      en: 'MET values are averages. Real burn depends on technique, training level, and effective intensity.',
    },
    relatedCalculators: ['besoin-calorique-journalier', 'rythme-cardiaque-cible', 'besoin-eau-quotidien'],
  },
  'capacite-emprunt-immobilier': {
    variables: {
      fr: ['revenus', 'charges', 'taux', 'durée', 'ratio maximal'],
      en: ['income', 'existing charges', 'rate', 'term', 'max ratio'],
    },
    formula: {
      fr: 'Mensualité max = revenus x ratio - charges ; capacité = actualisation de cette mensualité sur la durée du prêt.',
      en: 'Max payment = income x ratio - charges; capacity = discounted value of that payment over loan term.',
    },
    numericExample: {
      fr: 'Exemple : 4 200 € de revenus, 500 € de charges, ratio 35 %, taux 3,5 %, 25 ans donnent une capacité de financement proche de 250 000 €.',
      en: 'Example: €4,200 income, €500 charges, 35% ratio, 3.5% rate, 25-year term yields borrowing capacity near €250,000.',
    },
    decisionScenario: {
      fr: 'Décision : si le projet visé dépasse la capacité estimée de plus de 10 %, vous augmentez l’apport ou revoyez la zone géographique.',
      en: 'Decision: if target property exceeds estimated capacity by more than 10%, increase down payment or adjust location target.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un ménage primo-accédant compare deux durées de prêt pour conserver une marge de sécurité mensuelle de 400 €.',
      en: 'Contextualized case: first-time buyers compare two loan terms to keep a €400 monthly safety margin.',
    },
    thresholds: {
      fr: ['Projet aligné : prix <= capacité estimée.', 'Zone tendue : dépassement de 0 % à 10 %.', 'Zone risquée : dépassement > 10 %.'],
      en: ['Aligned project: price <= estimated capacity.', 'Tight zone: 0% to 10% above capacity.', 'Risk zone: >10% above capacity.'],
    },
    riskNotice: {
      fr: 'La capacité calculée n’intègre pas toujours les critères bancaires qualitatifs (stabilité pro, apport minimum, scoring).',
      en: 'Calculated capacity may miss qualitative bank criteria (employment stability, minimum down payment, lender scoring).',
    },
    relatedCalculators: ['mensualite-credit', 'taux-endettement', 'frais-notaire'],
  },
  'frais-notaire': {
    variables: {
      fr: ['prix du bien', 'taux de frais'],
      en: ['property price', 'fee rate'],
    },
    formula: {
      fr: 'Frais de notaire = Prix x taux ; coût total d’acquisition = Prix + frais.',
      en: 'Notary fees = Price x rate; total acquisition cost = Price + fees.',
    },
    numericExample: {
      fr: 'Exemple : pour 280 000 € et un taux de 7,5 %, les frais sont environ 21 000 € ; coût total 301 000 €.',
      en: 'Example: for €280,000 and 7.5% fee rate, notary fees are around €21,000; total cost €301,000.',
    },
    decisionScenario: {
      fr: 'Décision : si les frais font passer l’apport sous le minimum bancaire, vous ajustez immédiatement le prix cible ou l’échéancier d’achat.',
      en: 'Decision: if fees push down payment below lender minimum, immediately adjust target price or purchase timeline.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un couple compare ancien et neuf pour mesurer l’impact des frais annexes sur son enveloppe globale.',
      en: 'Contextualized case: a couple compares old versus new property to quantify acquisition-cost impact on total budget.',
    },
    thresholds: {
      fr: ['Frais usuels ancien : ~7 % à 8 %.', 'Frais usuels neuf : plus faibles.', 'Alerte : budget sans ligne dédiée aux frais.'],
      en: ['Typical existing-property fees: ~7% to 8%.', 'Typical new-property fees: lower.', 'Alert: no dedicated budget line for acquisition fees.'],
    },
    riskNotice: {
      fr: 'Sous-estimer ces frais fragilise le plan de financement dès la promesse. Vérifiez systématiquement les frais annexes avant offre.',
      en: 'Underestimating these costs weakens financing from the first offer stage. Validate all ancillary costs upfront.',
    },
    relatedCalculators: ['capacite-emprunt-immobilier', 'mensualite-credit', 'rentabilite-locative-brute'],
  },
  'rentabilite-locative-brute': {
    variables: {
      fr: ['loyer annuel', 'prix d’acquisition'],
      en: ['annual rent', 'purchase price'],
    },
    formula: {
      fr: 'Rendement brut = Loyer annuel / Prix d’acquisition x 100.',
      en: 'Gross yield = Annual rent / Purchase price x 100.',
    },
    numericExample: {
      fr: 'Exemple : 12 600 € de loyer annuel pour un achat à 210 000 € donnent un rendement brut de 6,0 %.',
      en: 'Example: €12,600 annual rent on a €210,000 purchase gives a 6.0% gross yield.',
    },
    decisionScenario: {
      fr: 'Décision : si deux biens ont un rendement brut similaire, vous arbitrerez ensuite avec le rendement net et le risque locatif.',
      en: 'Decision: if two properties show similar gross yield, arbitrate next using net yield and vacancy risk.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un investisseur débutant trie dix annonces en 30 minutes grâce à un seuil minimal de rendement brut.',
      en: 'Contextualized case: a beginner investor filters ten listings in 30 minutes using a minimum gross-yield threshold.',
    },
    thresholds: {
      fr: ['Filtre initial faible : < 4 %.', 'Filtre intermédiaire : 4 % à 6 %.', 'Filtre dynamique : > 6 % selon zone et risque.'],
      en: ['Initial weak filter: <4%.', 'Intermediate filter: 4% to 6%.', 'Dynamic filter: >6% depending on area and risk.'],
    },
    riskNotice: {
      fr: 'Le brut ignore charges, fiscalité et vacance. Il sert uniquement de premier tri avant une analyse complète.',
      en: 'Gross yield ignores charges, taxes, and vacancy. Use it as first-pass screening before full analysis.',
    },
    relatedCalculators: ['rendement-locatif-net', 'frais-notaire', 'capacite-emprunt-immobilier'],
  },
  'rendement-locatif-net': {
    variables: {
      fr: ['loyer annuel', 'charges annuelles', 'prix + coûts d’acquisition'],
      en: ['annual rent', 'annual charges', 'price + acquisition costs'],
    },
    formula: {
      fr: 'Rendement net = (Loyer annuel - Charges annuelles) / (Prix + coûts d’acquisition) x 100.',
      en: 'Net yield = (Annual rent - Annual charges) / (Price + acquisition costs) x 100.',
    },
    numericExample: {
      fr: 'Exemple : 14 400 € de loyer, 3 000 € de charges, coût global 260 000 € donnent un net d’environ 4,4 %.',
      en: 'Example: €14,400 rent, €3,000 charges, €260,000 total cost gives net yield around 4.4%.',
    },
    decisionScenario: {
      fr: 'Décision : si le net est inférieur à votre coût de financement, vous renégociez le prix ou écartez l’opération.',
      en: 'Decision: if net yield is below financing cost, renegotiate price or reject the deal.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un investisseur compare deux studios, l’un plus cher mais faiblement chargé, l’autre moins cher mais très coûteux en copropriété.',
      en: 'Contextualized case: an investor compares two studios, one pricier but low charges, one cheaper but high co-ownership costs.',
    },
    thresholds: {
      fr: ['Seuil de viabilité : net > coût du crédit.', 'Zone à surveiller : net proche du coût du crédit.', 'Zone fragile : net inférieur au coût de financement.'],
      en: ['Viability threshold: net yield > borrowing cost.', 'Watch zone: net yield close to borrowing cost.', 'Fragile zone: net yield below financing cost.'],
    },
    riskNotice: {
      fr: 'Ne pas intégrer vacance, travaux lourds ou fiscalité réelle peut fausser fortement le résultat net projeté.',
      en: 'Ignoring vacancy, major renovation, or real tax impact can materially distort projected net yield.',
    },
    relatedCalculators: ['rentabilite-locative-brute', 'frais-notaire', 'capacite-emprunt-immobilier'],
  },
  'difference-entre-deux-dates': {
    variables: {
      fr: ['date de début', 'date de fin'],
      en: ['start date', 'end date'],
    },
    formula: {
      fr: 'Différence calendaire détaillée en années, mois, jours, plus total en jours.',
      en: 'Calendar difference decomposed into years, months, days, plus total days.',
    },
    numericExample: {
      fr: 'Exemple : du 15/01/2023 au 02/10/2025, la différence inclut 2 ans, 8 mois, 17 jours et 991 jours au total.',
      en: 'Example: from 2023-01-15 to 2025-10-02, difference includes 2 years, 8 months, 17 days and 991 total days.',
    },
    decisionScenario: {
      fr: 'Décision : pour un contrat, vous retenez le total en jours pour la facturation et la décomposition Y/M/J pour le suivi opérationnel.',
      en: 'Decision: for contract work, use total days for billing and Y/M/D breakdown for operational tracking.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : une cheffe de projet calcule la durée réelle d’un chantier afin de recalibrer planning et pénalités.',
      en: 'Contextualized case: a project manager computes true construction duration to recalibrate schedule and penalties.',
    },
    thresholds: {
      fr: ['Usage administratif : privilégier Y/M/J.', 'Usage financier : privilégier le total jours.', 'Alerte : inversion des dates de début/fin.'],
      en: ['Administrative use: prefer Y/M/D.', 'Financial use: prefer total days.', 'Alert: start/end date inversion.'],
    },
    riskNotice: {
      fr: 'Les fuseaux horaires et dates saisies manuellement peuvent créer des écarts. Vérifiez toujours le format ISO et la cohérence des bornes.',
      en: 'Timezones and manual date entry may create discrepancies. Validate ISO format and boundary consistency.',
    },
    relatedCalculators: ['age-exact', 'moyenne-scolaire', 'budget-mensuel'],
  },
  'age-exact': {
    variables: {
      fr: ['date de naissance', 'date de référence'],
      en: ['birth date', 'reference date'],
    },
    formula: {
      fr: 'Âge exact = différence calendaire entre date de naissance et date de référence.',
      en: 'Exact age = calendar difference between birth date and reference date.',
    },
    numericExample: {
      fr: 'Exemple : du 20/06/1998 au 13/02/2026, l’âge exact est de 27 ans, 7 mois et 24 jours.',
      en: 'Example: from 1998-06-20 to 2026-02-13, exact age is 27 years, 7 months, and 24 days.',
    },
    decisionScenario: {
      fr: 'Décision : pour une inscription réglementée par âge, vous utilisez l’âge exact à la date de clôture et non à la date d’aujourd’hui.',
      en: 'Decision: for age-regulated enrollment, use exact age at deadline date, not current date.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : des parents vérifient l’éligibilité d’un enfant à une catégorie sportive selon la date officielle de référence.',
      en: 'Contextualized case: parents verify a child’s eligibility for a sports category using official reference date.',
    },
    thresholds: {
      fr: ['Validation administrative : date de référence explicite.', 'Vigilance : année bissextile.', 'Alerte : date de naissance future par erreur.'],
      en: ['Administrative validation: explicit reference date.', 'Watch: leap-year effects.', 'Alert: future birth date entered by mistake.'],
    },
    riskNotice: {
      fr: 'Une erreur d’un jour peut invalider un dossier administratif. Vérifiez le format de date et la date de référence demandée.',
      en: 'A one-day error can invalidate administrative eligibility. Validate date format and required reference date.',
    },
    relatedCalculators: ['difference-entre-deux-dates', 'rythme-cardiaque-cible', 'moyenne-scolaire'],
  },
  'consommation-carburant': {
    variables: {
      fr: ['litres consommés', 'distance parcourue', 'prix au litre'],
      en: ['fuel liters', 'distance traveled', 'price per liter'],
    },
    formula: {
      fr: 'Consommation L/100 = Litres / Distance x 100. Coût total = Litres x Prix au litre.',
      en: 'L/100 consumption = Liters / Distance x 100. Total cost = Liters x Price per liter.',
    },
    numericExample: {
      fr: 'Exemple : 38 litres sur 620 km donnent 6,1 L/100 ; à 1,90 €/L, le coût du trajet est 72,20 €.',
      en: 'Example: 38 liters over 620 km equals 6.1 L/100; at €1.90/L, trip cost is €72.20.',
    },
    decisionScenario: {
      fr: 'Décision : si la consommation augmente de plus de 10 % sur trois pleins, vous contrôlez pression des pneus et style de conduite.',
      en: 'Decision: if consumption rises by >10% over three refuels, review tire pressure and driving style.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un commercial itinérant compare deux véhicules pour sélectionner le plus rentable à 25 000 km/an.',
      en: 'Contextualized case: a field salesperson compares two vehicles to choose the most cost-efficient at 25,000 km/year.',
    },
    thresholds: {
      fr: ['Écart normal : variation <= 5 %.', 'Vigilance : 5 % à 10 %.', 'Alerte : > 10 % sans changement de trajet.'],
      en: ['Normal variation: <= 5%.', 'Watch: 5% to 10%.', 'Alert: >10% without route change.'],
    },
    riskNotice: {
      fr: 'Le coût réel inclut aussi assurance, entretien et amortissement. Le calculateur mesure le carburant, pas le TCO complet.',
      en: 'True vehicle cost also includes insurance, maintenance, and depreciation. This tool measures fuel cost, not full TCO.',
    },
    relatedCalculators: ['economies-petites-depenses', 'budget-mensuel', 'partage-addition'],
  },
  'quantite-peinture': {
    variables: {
      fr: ['surface à peindre', 'nombre de couches', 'rendement produit'],
      en: ['paintable surface', 'number of coats', 'product coverage'],
    },
    formula: {
      fr: 'Quantité (L) = Surface x Couches / Rendement (m²/L).',
      en: 'Quantity (L) = Surface x Coats / Coverage (m²/L).',
    },
    numericExample: {
      fr: 'Exemple : 42 m², 2 couches, rendement 10 m²/L donnent 8,4 L, soit 9 à 10 L avec marge.',
      en: 'Example: 42 m², 2 coats, 10 m²/L coverage gives 8.4 L, i.e. 9–10 L with margin.',
    },
    decisionScenario: {
      fr: 'Décision : si le besoin théorique dépasse de peu la contenance standard, vous prenez le format supérieur pour éviter une rupture en cours de chantier.',
      en: 'Decision: if theoretical need slightly exceeds standard package size, choose the upper size to avoid mid-job shortage.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un propriétaire repeint un studio locatif et optimise son achat entre deux marques au rendement différent.',
      en: 'Contextualized case: a landlord repainting a studio optimizes purchase between two paints with different coverage.',
    },
    thresholds: {
      fr: ['Marge recommandée : +5 % à +15 %.', 'Surface irrégulière : marge supérieure.', 'Alerte : oublier portes/fenêtres dans le calcul net.'],
      en: ['Recommended buffer: +5% to +15%.', 'Irregular surfaces: use higher buffer.', 'Alert: forgetting to net out doors/windows.'],
    },
    riskNotice: {
      fr: 'Le rendement annoncé dépend du support et de la préparation. Sur murs poreux, la consommation réelle peut être nettement plus élevée.',
      en: 'Declared coverage depends on substrate and prep quality. On porous walls, real usage can be significantly higher.',
    },
    relatedCalculators: ['surface-piece', 'budget-mensuel', 'capacite-epargne-mensuelle'],
  },
  'surface-piece': {
    variables: {
      fr: ['longueur', 'largeur'],
      en: ['length', 'width'],
    },
    formula: {
      fr: 'Surface = Longueur x Largeur. Périmètre = 2 x (Longueur + Largeur).',
      en: 'Area = Length x Width. Perimeter = 2 x (Length + Width).',
    },
    numericExample: {
      fr: 'Exemple : 4,8 m x 3,6 m donnent 17,28 m² et un périmètre de 16,8 m.',
      en: 'Example: 4.8 m x 3.6 m yields 17.28 m² and a perimeter of 16.8 m.',
    },
    decisionScenario: {
      fr: 'Décision : si la surface utile reste sous le minimum cible après déduction des meubles, vous revoyez l’aménagement avant d’acheter les matériaux.',
      en: 'Decision: if usable area remains below target after furniture footprint, revise layout before purchasing materials.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : un locataire prépare l’achat d’un revêtement de sol et vérifie le périmètre pour les plinthes.',
      en: 'Contextualized case: a tenant preparing floor material purchase validates perimeter for skirting boards.',
    },
    thresholds: {
      fr: ['Mesure fiable : deux prises de mesure.', 'Vigilance : murs non parfaitement droits.', 'Alerte : erreur d’unité (cm vs m).'],
      en: ['Reliable measurement: take two readings.', 'Watch: walls not perfectly straight.', 'Alert: unit error (cm vs m).'],
    },
    riskNotice: {
      fr: 'La formule suppose une pièce rectangulaire. Pour les formes complexes, découpez la pièce en sous-zones et additionnez les surfaces.',
      en: 'Formula assumes a rectangular room. For complex shapes, split into sub-zones and sum the areas.',
    },
    relatedCalculators: ['quantite-peinture', 'frais-notaire', 'budget-mensuel'],
  },
  'moyenne-scolaire': {
    variables: {
      fr: ['notes', 'coefficients'],
      en: ['grades', 'coefficients'],
    },
    formula: {
      fr: 'Moyenne simple = somme des notes / nombre de notes ; moyenne pondérée = somme(note x coef) / somme(coef).',
      en: 'Simple average = sum of grades / number of grades; weighted average = sum(grade x coef) / sum(coef).',
    },
    numericExample: {
      fr: 'Exemple : notes 12, 14, 16 avec coefficients 1, 2, 3 donnent une moyenne pondérée de 14,67.',
      en: 'Example: grades 12, 14, 16 with coefficients 1, 2, 3 give a weighted average of 14.67.',
    },
    decisionScenario: {
      fr: 'Décision : si la moyenne cible n’est pas atteinte, vous priorisez la matière au coefficient le plus élevé pour maximiser l’impact.',
      en: 'Decision: if target average is not met, prioritize the highest-coefficient subject to maximize impact.',
    },
    contextualCase: {
      fr: 'Cas contextualisé : une lycéenne prépare le trimestre et calcule la note minimale à obtenir en mathématiques pour conserver sa mention.',
      en: 'Contextualized case: a high-school student computes minimum math score needed to keep target grade distinction.',
    },
    thresholds: {
      fr: ['Progression stable : moyenne en hausse sur 3 évaluations.', 'Vigilance : stagnation malgré effort.', 'Alerte : baisse continue sur matières à fort coefficient.'],
      en: ['Stable progression: average rising over 3 assessments.', 'Watch: stagnation despite effort.', 'Alert: continuous decline in high-coefficient subjects.'],
    },
    riskNotice: {
      fr: 'Assurez-vous que l’échelle de notation est homogène (sur 20 ici). Une erreur de format fausse immédiatement la moyenne.',
      en: 'Ensure grading scale is consistent (0–20 here). A format mismatch immediately distorts the average.',
    },
    relatedCalculators: ['difference-entre-deux-dates', 'age-exact', 'budget-mensuel'],
  },
};

function getCategoryLabel(category: CategoryKey, locale: Locale): string {
  const labels: Record<CategoryKey, Localized<string>> = {
    finance: { fr: 'finance personnelle', en: 'personal finance' },
    health: { fr: 'santé', en: 'health' },
    realEstate: { fr: 'immobilier', en: 'real estate' },
    dailyLife: { fr: 'vie pratique', en: 'daily life' },
    home: { fr: 'maison et travaux', en: 'home projects' },
    education: { fr: 'éducation', en: 'education' },
  };
  return resolveLocalizedString(labels[category], locale, `categoryLabel.${category}`);
}

function formatNaturalList(items: string[], locale: Locale): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return locale === 'fr' ? `${items[0]} et ${items[1]}` : `${items[0]} and ${items[1]}`;
  const head = items.slice(0, -1).join(', ');
  const tail = items[items.length - 1];
  return locale === 'fr' ? `${head} et ${tail}` : `${head}, and ${tail}`;
}

function assertRenderableString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string') {
    throw new Error(`Invalid SEO content for ${fieldName}: expected string.`);
  }
  const trimmed = value.trim();
  if (trimmed.includes('[object Object]')) {
    throw new Error(`Invalid SEO content for ${fieldName}: found [object Object].`);
  }
  if (trimmed.includes('undefined')) {
    throw new Error(`Invalid SEO content for ${fieldName}: found undefined token.`);
  }
  return trimmed;
}

function assertRenderableStringArray(value: unknown, fieldName: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid SEO content for ${fieldName}: expected string array.`);
  }
  return value.map((item, index) => assertRenderableString(item, `${fieldName}[${index}]`));
}

function resolveLocalizedString(value: string | Localized<string> | undefined, locale: Locale, fieldName: string): string {
  let resolved: unknown;

  if (typeof value === 'string') {
    resolved = value;
  } else if (value === undefined) {
    resolved = '';
  } else if (value && typeof value === 'object') {
    resolved = value[locale];
  } else {
    resolved = value;
  }

  if (resolved === undefined) {
    return '';
  }
  if (typeof resolved !== 'string') {
    throw new Error(`Invalid SEO content for ${fieldName}: resolved value must be a string.`);
  }
  return assertRenderableString(resolved, fieldName);
}

function resolveLocalizedStringArray(
  value: string[] | Localized<string[]> | undefined,
  locale: Locale,
  fieldName: string,
): string[] {
  let resolved: unknown;

  if (Array.isArray(value)) {
    resolved = value;
  } else if (value === undefined) {
    resolved = [];
  } else if (value && typeof value === 'object') {
    resolved = value[locale];
  } else {
    resolved = value;
  }

  if (resolved === undefined) {
    return [];
  }
  return assertRenderableStringArray(resolved, fieldName);
}

function resolveCalculatorDetail(detail: CalculatorDetail, locale: Locale, calculatorSlug: CalculatorSlug): ResolvedCalculatorDetail {
  return {
    variables: resolveLocalizedStringArray(detail.variables, locale, `${calculatorSlug}.variables.${locale}`),
    formula: resolveLocalizedString(detail.formula, locale, `${calculatorSlug}.formula.${locale}`),
    numericExample: resolveLocalizedString(detail.numericExample, locale, `${calculatorSlug}.numericExample.${locale}`),
    decisionScenario: resolveLocalizedString(detail.decisionScenario, locale, `${calculatorSlug}.decisionScenario.${locale}`),
    contextualCase: resolveLocalizedString(detail.contextualCase, locale, `${calculatorSlug}.contextualCase.${locale}`),
    thresholds: resolveLocalizedStringArray(detail.thresholds, locale, `${calculatorSlug}.thresholds.${locale}`),
    riskNotice: resolveLocalizedString(detail.riskNotice, locale, `${calculatorSlug}.riskNotice.${locale}`),
  };
}

function validateSeoContent(content: CalculatorSeoContent, calculatorSlug: CalculatorSlug, locale: Locale): void {
  assertRenderableStringArray(content.introduction, `${calculatorSlug}.introduction.${locale}`);
  assertRenderableStringArray(content.howItWorks, `${calculatorSlug}.howItWorks.${locale}`);
  assertRenderableStringArray(content.interpretation, `${calculatorSlug}.interpretation.${locale}`);
  assertRenderableString(content.formula, `${calculatorSlug}.formula.${locale}`);
  assertRenderableStringArray(content.thresholds, `${calculatorSlug}.thresholds.${locale}`);
  assertRenderableString(content.riskNotice, `${calculatorSlug}.riskNotice.${locale}`);

  for (const [index, scenario] of content.scenarios.entries()) {
    assertRenderableString(scenario.title, `${calculatorSlug}.scenarios[${index}].title.${locale}`);
    assertRenderableString(scenario.text, `${calculatorSlug}.scenarios[${index}].text.${locale}`);
  }

  for (const [index, link] of content.relatedCalculators.entries()) {
    assertRenderableString(link.label, `${calculatorSlug}.relatedCalculators[${index}].label.${locale}`);
    assertRenderableString(link.href, `${calculatorSlug}.relatedCalculators[${index}].href.${locale}`);
    if (link.description !== undefined) {
      assertRenderableString(link.description, `${calculatorSlug}.relatedCalculators[${index}].description.${locale}`);
    }
  }

  for (const [index, link] of content.relatedBlogPosts.entries()) {
    assertRenderableString(link.label, `${calculatorSlug}.relatedBlogPosts[${index}].label.${locale}`);
    assertRenderableString(link.href, `${calculatorSlug}.relatedBlogPosts[${index}].href.${locale}`);
    if (link.description !== undefined) {
      assertRenderableString(link.description, `${calculatorSlug}.relatedBlogPosts[${index}].description.${locale}`);
    }
  }

  for (const [index, faq] of content.faqs.entries()) {
    assertRenderableString(faq.question, `${calculatorSlug}.faqs[${index}].question.${locale}`);
    assertRenderableString(faq.answer, `${calculatorSlug}.faqs[${index}].answer.${locale}`);
  }
}

function buildRelatedCalculatorLinks(calculator: CalculatorDefinition, locale: Locale): RelatedLink[] {
  const detail = CALCULATOR_DETAILS[calculator.slug];
  const pool: CalculatorSlug[] = [];

  if (detail.relatedCalculators) {
    pool.push(...detail.relatedCalculators);
  }

  for (const item of CALCULATORS) {
    if (item.category === calculator.category && item.slug !== calculator.slug) {
      pool.push(item.slug);
    }
  }

  pool.push(...CROSS_CATEGORY_FALLBACKS[calculator.category]);

  const selected: CalculatorSlug[] = [];
  for (const slug of pool) {
    if (slug === calculator.slug || selected.includes(slug)) continue;
    selected.push(slug);
    if (selected.length === 3) break;
  }

  return selected.map((slug) => {
    const related = getCalculatorBySlug(slug);
    return {
      label: resolveLocalizedString(related.name, locale, `${calculator.slug}.relatedCalculators.${slug}.label.${locale}`),
      href: getCalculatorRoute(locale, slug),
      description:
        locale === 'fr'
          ? `Compléter votre analyse avec ${related.name.fr.toLowerCase()} pour sécuriser la décision.`
          : `Extend your analysis with ${related.name.en.toLowerCase()} for stronger decision confidence.`,
    };
  });
}

function buildRelatedBlogLinks(calculator: CalculatorDefinition, locale: Locale): RelatedLink[] {
  const detail = CALCULATOR_DETAILS[calculator.slug];
  const selectedBlogs = detail.relatedBlogs ?? DEFAULT_BLOGS_BY_CATEGORY[calculator.category];

  return selectedBlogs.slice(0, 2).map((blogSlug) => {
    const blogMeta = BLOG_METADATA[blogSlug];
    return {
      label: resolveLocalizedString(
        { fr: blogMeta.fr.title, en: blogMeta.en.title },
        locale,
        `${calculator.slug}.relatedBlogs.${blogSlug}.label.${locale}`,
      ),
      href: resolveLocalizedString(
        { fr: blogMeta.fr.path, en: blogMeta.en.path },
        locale,
        `${calculator.slug}.relatedBlogs.${blogSlug}.href.${locale}`,
      ),
      description:
        locale === 'fr'
          ? 'Lecture complémentaire pour passer de la simulation à un plan d’action concret.'
          : 'Companion reading to turn simulation into an actionable execution plan.',
    };
  });
}

function buildIntroduction(calculator: CalculatorDefinition, locale: Locale, detail: ResolvedCalculatorDetail): string[] {
  const category = getCategoryLabel(calculator.category, locale);
  const variables = formatNaturalList(detail.variables, locale);

  if (locale === 'fr') {
    return [
      `Le calculateur ${calculator.name.fr.toLowerCase()} a été conçu pour répondre à une question opérationnelle fréquente dans la catégorie ${category} : comment passer d’une intuition à une décision chiffrée, rapide et vérifiable. L’objectif de cette page est de vous donner un cadre clair, pas un résultat “magique”. Vous saisissez des données concrètes, vous obtenez un résultat interprétable, puis vous le traduisez en action. Cette méthode évite les décisions prises sous pression, limite les erreurs de calcul manuel et améliore la cohérence entre vos objectifs et vos contraintes réelles.`,
      `Les variables les plus structurantes ici sont ${variables}. Quand ces entrées sont cohérentes et récentes, le calcul devient un véritable outil de pilotage. À l’inverse, des données imprécises conduisent à des écarts de décision coûteux. C’est pourquoi nous recommandons toujours de partir d’un scénario central, puis de le confronter à un scénario prudent. Cette discipline simple améliore la robustesse de vos choix, notamment quand vous arbitrez entre plusieurs options proches.`,
      `${detail.numericExample} Ce type d’illustration permet de vérifier immédiatement que l’ordre de grandeur obtenu est compatible avec votre réalité. L’intérêt SEO et pédagogique est double : répondre à l’intention utilisateur (“combien ?”) tout en apportant de la méthode (“comment décider ensuite ?”).`,
      `${detail.decisionScenario} Une bonne simulation n’a de valeur que si elle débouche sur une règle d’exécution claire, mesurable et répétable. C’est cette logique qui transforme un outil de calcul en outil de gestion réelle.`,
      `${detail.contextualCase} Cette contextualisation est essentielle pour éviter les conseils génériques : un résultat chiffré n’a de sens que dans un environnement de décision concret, avec des priorités, des contraintes et un horizon de temps définis.`
    ];
  }

  return [
    `The ${calculator.name.en.toLowerCase()} calculator is built to answer a practical question in ${category}: how to move from intuition to a quantified, auditable decision. This page is designed as a decision framework, not a “magic number” generator. You enter real assumptions, obtain an interpretable output, and translate that output into a concrete next step. This workflow reduces pressure-driven decisions, limits manual errors, and keeps your objectives aligned with real constraints.`,
    `The most influential inputs here are ${variables}. When those inputs are recent and coherent, the estimate becomes operationally useful. When they are not, decision quality drops quickly. A reliable method is to start with a baseline scenario and then test a conservative version. That simple two-layer approach improves robustness, especially when you are comparing options with close headline numbers.`,
    `${detail.numericExample} This kind of numerical benchmark lets you sanity-check magnitude before acting. From a content-quality perspective, it serves both user intent (“how much?”) and execution intent (“what should I do next?”).`,
    `${detail.decisionScenario} A calculation only creates value when it is attached to a measurable execution rule. That is the difference between passive simulation and active planning.`,
    `${detail.contextualCase} Context matters because numeric outputs are never interpreted in a vacuum. Decisions become stronger when assumptions, constraints, and time horizon are explicitly connected.`
  ];
}

function buildHowItWorks(_calculator: CalculatorDefinition, locale: Locale, detail: ResolvedCalculatorDetail): string[] {
  const variables = formatNaturalList(detail.variables, locale);

  if (locale === 'fr') {
    return [
      `Le fonctionnement du calcul s’appuie sur un enchaînement simple : saisie des données clés, application d’une formule transparente, puis lecture des indicateurs de sortie. Les entrées attendues (${variables}) doivent être homogènes sur la même période de référence. Mélanger des valeurs mensuelles et annuelles sans conversion est la première source d’erreur observée sur ce type d’outil.`,
      `La logique de calcul utilisée est explicite : ${detail.formula} Cette transparence est volontaire : vous devez pouvoir expliquer le résultat à un tiers (banque, partenaire, foyer, client) sans dépendre d’une “boîte noire”. En pratique, plus la formule est comprise, plus l’exécution est solide.`,
      `Pour renforcer la fiabilité, utilisez systématiquement une méthode en trois passes : scénario central, scénario prudent, puis scénario optimisé. Le scénario central sert de référence opérationnelle. Le scénario prudent vous protège contre les hypothèses trop favorables. Le scénario optimisé sert de cible d’amélioration réaliste, pas de promesse.`,
      `Enfin, pensez à tracer vos hypothèses. Une note courte avec la date de mise à jour, la source des données et la variable la plus incertaine suffit à professionnaliser votre usage. Cette traçabilité facilite les revues périodiques et limite les décisions contradictoires dans le temps.`
    ];
  }

  return [
    `The calculation flow follows a clear sequence: input key data, apply a transparent formula, then interpret output indicators. Expected inputs (${variables}) should be aligned on the same time basis. Mixing monthly and annual values without conversion is a frequent source of error in practical usage.`,
    `The underlying logic is explicit: ${detail.formula} This transparency is intentional. You should be able to explain the result to stakeholders (lenders, partners, clients, household members) without relying on a black-box outcome. In operational environments, explainability directly improves execution quality.`,
    `To improve reliability, run three passes: baseline, conservative, and optimized scenarios. Baseline drives day-to-day decisions. Conservative protects against optimistic assumptions. Optimized scenario defines upside potential, not guaranteed outcome.`,
    `Finally, keep assumptions documented. A short note with update date, data source, and most uncertain variable is enough to professionalize your workflow. This tracking discipline supports periodic reviews and prevents inconsistent decisions over time.`
  ];
}

function buildInterpretation(_calculator: CalculatorDefinition, locale: Locale, detail: ResolvedCalculatorDetail): string[] {
  const thresholds = formatNaturalList(detail.thresholds, locale);

  if (locale === 'fr') {
    return [
      `Interpréter le résultat consiste à répondre à trois questions : est-ce cohérent avec ma réalité actuelle, est-ce compatible avec mes objectifs, et quelle action déclenche-t-il immédiatement ? Le chiffre seul ne suffit pas. Il doit être positionné dans un seuil de décision. Sur cette page, vos repères prioritaires sont : ${thresholds}.`,
      `La bonne pratique est de distinguer trois zones : confortable, à surveiller, et critique. En zone confortable, vous exécutez le plan prévu et vous suivez la stabilité. En zone à surveiller, vous ajustez une variable à la fois pour identifier l’effet réel. En zone critique, vous suspendez les décisions engageantes et vous réévaluez les hypothèses de base.`,
      `Pour éviter les biais, comparez toujours la sortie du jour à une moyenne glissante récente. Un écart ponctuel n’est pas forcément un signal durable. À l’inverse, un petit écart répété plusieurs cycles doit déclencher une correction. Cette lecture dynamique est plus fiable qu’une interprétation “photo instantanée”.`,
      `Enfin, transformez le résultat en action datée : montant à modifier, échéance à décaler, objectif à recalibrer, ou arbitrage à acter. Sans action explicite, la simulation reste informative ; avec action, elle devient un levier de performance.`
    ];
  }

  return [
    `Interpreting the result means answering three practical questions: is it consistent with current reality, is it aligned with objectives, and what immediate action does it trigger? A number alone is not enough. It must be evaluated against decision thresholds. On this page, your priority benchmarks are: ${thresholds}.`,
    `Use a three-zone interpretation model: comfortable, watch, and critical. In comfortable zone, execute and monitor stability. In watch zone, adjust one variable at a time to isolate impact. In critical zone, pause irreversible commitments and reassess core assumptions before moving forward.`,
    `To reduce bias, compare today’s output against a recent moving baseline. A one-off deviation is not always meaningful; repeated small deviations across cycles are often more important operational signals.`,
    `Then convert the result into a dated action: change one amount, shift one deadline, recalibrate one target, or make one explicit trade-off. Without action, simulation remains informational; with action, it becomes performance infrastructure.`
  ];
}

function buildScenarios(_calculator: CalculatorDefinition, locale: Locale, detail: ResolvedCalculatorDetail): CalculatorSeoScenario[] {
  if (locale === 'fr') {
    return [
      {
        title: 'Scénario prudent',
        text: `Vous retenez des hypothèses conservatrices pour tester la solidité minimale du plan. ${detail.decisionScenario} Si le résultat reste acceptable dans cette configuration, votre décision est généralement robuste face aux aléas.`,
      },
      {
        title: 'Scénario central',
        text: `Vous utilisez les valeurs les plus proches de votre situation actuelle et vous suivez ce scénario comme référence de pilotage mensuel ou hebdomadaire. ${detail.numericExample} C’est la base de comparaison la plus utile pour les ajustements progressifs.`,
      },
      {
        title: 'Scénario contextualisé',
        text: `${detail.contextualCase} L’objectif est de relier la simulation à un usage réel, avec des contraintes concrètes, afin d’éviter les décisions abstraites et peu exécutables.`,
      },
    ];
  }

  return [
    {
      title: 'Conservative scenario',
      text: `Use conservative assumptions to test minimum plan resilience. ${detail.decisionScenario} If output remains acceptable here, the decision is usually robust against uncertainty.`,
    },
    {
      title: 'Baseline scenario',
      text: `Use values closest to current reality and track this scenario as your operational baseline. ${detail.numericExample} This becomes your most useful anchor for incremental optimization.`,
    },
    {
      title: 'Contextualized scenario',
      text: `${detail.contextualCase} The purpose is to tie the estimate to real constraints, so decisions remain executable rather than purely theoretical.`,
    },
  ];
}

function buildFaqs(calculator: CalculatorDefinition, locale: Locale, detail: ResolvedCalculatorDetail): FAQItem[] {
  const calcName = resolveLocalizedString(calculator.name, locale, `${calculator.slug}.name.${locale}`);

  if (locale === 'fr') {
    return [
      {
        question: `Quelles données dois-je préparer avant d’utiliser ${calcName} ?`,
        answer: `Préparez d’abord des données récentes et cohérentes sur ${formatNaturalList(detail.variables, 'fr')}. Évitez de mélanger des périodes différentes, par exemple une charge annuelle avec un revenu mensuel. Vérifiez enfin l’unité de chaque champ avant de valider la simulation. Cette rigueur simple augmente fortement la fiabilité du résultat et la qualité de la décision qui suit.`,
      },
      {
        question: `À quelle fréquence faut-il recalculer ce simulateur ?`,
        answer: `Un recalcul mensuel suffit dans la plupart des cas, avec un recalcul immédiat en cas de changement majeur de revenus, charges ou objectifs. Si votre contexte évolue vite, une revue hebdomadaire peut être utile sur une période courte. L’important est de garder la même méthode de saisie pour comparer des résultats comparables. Sans cadence de revue, le calcul perd sa valeur opérationnelle.`,
      },
      {
        question: `Comment savoir si le résultat est “bon” ou “mauvais” ?`,
        answer: `Le résultat doit être lu avec des seuils explicites, pas de manière isolée. Sur cette page, les repères prioritaires sont : ${formatNaturalList(detail.thresholds, 'fr')}. Classez votre sortie en zone confortable, zone de vigilance, ou zone critique pour décider rapidement de l’action à mener. Cette lecture par seuils évite les interprétations émotionnelles.`,
      },
      {
        question: `Ce calculateur remplace-t-il un avis professionnel ?`,
        answer: `Non, il sert de base de cadrage et de comparaison. Il est très utile pour structurer une décision et préparer un échange avec un conseiller, mais il ne remplace pas une validation contractuelle, fiscale, médicale ou juridique selon le sujet. Utilisez le résultat pour poser les bonnes questions, puis confirmez les points engageants auprès d’un professionnel. Cette combinaison est la plus sûre en pratique.`,
      },
      {
        question: `Quel est l’exemple le plus représentatif d’utilisation ?`,
        answer: `${detail.numericExample} Cet exemple vous donne un ordre de grandeur, mais la bonne pratique consiste à le recalculer avec vos propres hypothèses. Ensuite, comparez un scénario central et un scénario prudent pour tester la robustesse. C’est cette comparaison qui transforme l’outil en support de décision fiable.`,
      },
      {
        question: `Quelle décision concrète puis-je prendre après la simulation ?`,
        answer: `${detail.decisionScenario} Définissez ensuite une action datée et mesurable : montant à modifier, échéance à ajuster, ou objectif à recalibrer. Limitez-vous à un changement majeur à la fois pour isoler l’effet réel. Cette approche améliore l’exécution et évite les corrections contradictoires.`,
      },
      {
        question: `Comment adapter le calcul à mon profil personnel ?`,
        answer: `${detail.contextualCase} Le principe est de garder la formule identique, mais d’adapter les hypothèses d’entrée à votre réalité terrain. Si votre profil est atypique, ajoutez une marge de sécurité explicite dans l’interprétation. Cela réduit le risque de surconfiance dans un résultat trop “propre”.`,
      },
      {
        question: `Quelles erreurs fréquentes dois-je éviter ?`,
        answer: `Les erreurs les plus courantes sont les unités incohérentes, les données incomplètes et les hypothèses trop optimistes. Une autre erreur classique est de ne faire qu’une simulation unique sans scénario prudent. Enfin, ne confondez jamais estimation et garantie, surtout pour des décisions engageantes. Quelques minutes de vérification évitent souvent des erreurs coûteuses.`,
      },
      {
        question: `Comment améliorer progressivement mon résultat ?`,
        answer: `Commencez par identifier la variable qui influence le plus le résultat, puis testez un ajustement réaliste sur cette seule variable. Mesurez l’impact sur deux à trois cycles avant d’agir sur un second levier. Cette démarche incrémentale est plus efficace que les changements massifs et simultanés. Elle permet aussi de conserver une trajectoire stable dans le temps.`,
      },
      {
        question: `Quel risque principal dois-je garder en tête ?`,
        answer: `${detail.riskNotice} Pour limiter ce risque, documentez vos hypothèses et datez chaque simulation. Comparez ensuite la prévision au réel pour corriger rapidement les écarts. Cette boucle de contrôle est la clé d’un usage professionnel et durable du calculateur.`,
      },
    ];
  }

  return [
    {
      question: `What data should I prepare before using ${calcName}?`,
      answer: `Start with recent, coherent values for ${formatNaturalList(detail.variables, 'en')}. Avoid mixing incompatible time bases, such as annual costs with monthly income. Validate units before running the model. This simple discipline materially improves output reliability and downstream decision quality.`,
    },
    {
      question: `How often should this calculator be updated?`,
      answer: `Monthly updates are usually sufficient, with immediate refresh after major changes in income, costs, or objectives. In fast-changing contexts, a short weekly review cycle can be justified. Keep the same input method over time so comparisons remain meaningful. Without cadence, the model loses operational value.`,
    },
    {
      question: `How do I know whether the result is acceptable?`,
      answer: `Do not read the output in isolation. Use explicit thresholds: ${formatNaturalList(detail.thresholds, 'en')}. Classify your result into comfortable, watch, or critical zone and attach a predefined action to each zone. Threshold-based reading prevents emotional overreaction and improves execution speed.`,
    },
    {
      question: `Does this calculator replace professional advice?`,
      answer: `No. It is a decision-support framework, not a legal, tax, medical, or contractual validation. Use it to structure assumptions and prepare better questions for advisors. For high-stakes decisions, always confirm with qualified professionals and official documentation. The best outcomes come from combining both layers.`,
    },
    {
      question: `Can you provide a representative numerical benchmark?`,
      answer: `${detail.numericExample} Use this as a benchmark, then rerun with your own assumptions and risk profile. Compare baseline versus conservative scenarios before committing resources. That comparison is what makes the estimate decision-grade.`,
    },
    {
      question: `What concrete decision should follow the simulation?`,
      answer: `${detail.decisionScenario} Then define one dated action: adjust one amount, move one deadline, or recalibrate one target. Keep changes incremental so impact can be isolated and measured. This improves execution discipline and decision clarity.`,
    },
    {
      question: `How do I adapt this model to my personal context?`,
      answer: `${detail.contextualCase} Keep the formula stable, but adapt assumptions to your real constraints and operating conditions. If your profile is atypical, apply an explicit safety margin during interpretation. That reduces overconfidence and improves resilience.`,
    },
    {
      question: `Which mistakes are most common in practical usage?`,
      answer: `Typical mistakes include inconsistent units, incomplete inputs, and optimistic assumptions. Another frequent issue is using only one scenario without conservative stress-testing. Finally, users often confuse an estimate with a guaranteed outcome. Basic validation steps usually prevent costly decisions.`,
    },
    {
      question: `How can I improve results over time?`,
      answer: `Identify the highest-impact variable first and test one realistic adjustment. Measure impact across multiple cycles before changing a second lever. Incremental optimization outperforms large simultaneous changes in most real workflows. It also preserves strategic consistency over time.`,
    },
    {
      question: `What is the main risk I should keep in mind?`,
      answer: `${detail.riskNotice} To control this risk, document assumptions and timestamp each simulation. Then compare forecast versus observed outcome to recalibrate quickly. This feedback loop is essential for professional-grade use.`,
    },
  ];
}

export function getCalculatorSeoContent(calculator: CalculatorDefinition, locale: Locale): CalculatorSeoContent {
  const detail = resolveCalculatorDetail(CALCULATOR_DETAILS[calculator.slug], locale, calculator.slug);

  const content: CalculatorSeoContent = {
    introduction: buildIntroduction(calculator, locale, detail),
    howItWorks: buildHowItWorks(calculator, locale, detail),
    interpretation: buildInterpretation(calculator, locale, detail),
    formula: detail.formula,
    thresholds: detail.thresholds,
    riskNotice: detail.riskNotice,
    scenarios: buildScenarios(calculator, locale, detail),
    relatedCalculators: buildRelatedCalculatorLinks(calculator, locale),
    relatedBlogPosts: buildRelatedBlogLinks(calculator, locale),
    faqs: buildFaqs(calculator, locale, detail),
  };

  validateSeoContent(content, calculator.slug, locale);
  return content;
}
