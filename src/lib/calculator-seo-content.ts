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

interface SeoSeed {
  variables: Localized<string[]>;
  formula: Localized<string>;
  signals: Localized<string[]>;
  relatedCalculators?: CalculatorSlug[];
  relatedBlogs?: BlogSlug[];
}

export interface CalculatorSeoScenario {
  title: string;
  text: string;
}

export interface CalculatorSeoContent {
  introduction: string[];
  howItWorks: string[];
  interpretation: string[];
  scenarios: CalculatorSeoScenario[];
  relatedCalculators: RelatedLink[];
  relatedBlogPosts: RelatedLink[];
  faqs: FAQItem[];
}

const BLOG_METADATA: Record<BlogSlug, Localized<{ title: string; path: string }>> = {
  'budget-couple-methode-simple': {
    fr: {
      title: 'Budget couple : methode simple pour gerer les finances a deux sans conflit',
      path: '/blog/budget-couple-methode-simple',
    },
    en: {
      title: 'Couple Budget Guide: Simple Method to Manage Money Together Without Conflict',
      path: '/en/blog/budget-couple-methode-simple',
    },
  },
  'budget-mensuel-mode-emploi': {
    fr: {
      title: 'Budget mensuel : guide pratique pour mieux gerer son argent au quotidien',
      path: '/blog/budget-mensuel-mode-emploi',
    },
    en: {
      title: 'Monthly Budget Guide: Step-by-Step Method to Manage Money and Save More',
      path: '/en/blog/budget-mensuel-mode-emploi',
    },
  },
  'calcul-impot-revenu-sans-stress': {
    fr: {
      title: 'Calcul impot sur le revenu : methode simple pour anticiper sereinement',
      path: '/blog/calcul-impot-revenu-sans-stress',
    },
    en: {
      title: 'Income Tax Estimate Guide: Plan Cash Flow and Reduce Tax Stress',
      path: '/en/blog/calcul-impot-revenu-sans-stress',
    },
  },
  'epargne-automatique-strategies': {
    fr: {
      title: 'Epargne automatique : strategie progressive pour atteindre vos objectifs',
      path: '/blog/epargne-automatique-strategies',
    },
    en: {
      title: 'Automatic Savings Strategy: Build Consistent Savings All Year',
      path: '/en/blog/epargne-automatique-strategies',
    },
  },
  'fonds-urgence-combien-mettre': {
    fr: {
      title: "Fonds d'urgence : combien epargner selon votre situation financiere",
      path: '/blog/fonds-urgence-combien-mettre',
    },
    en: {
      title: 'Emergency Fund Guide: How Much to Save for Financial Security',
      path: '/en/blog/fonds-urgence-combien-mettre',
    },
  },
  'interets-composes-erreurs-a-eviter': {
    fr: {
      title: 'Interets composes : les erreurs qui freinent la croissance de votre capital',
      path: '/blog/interets-composes-erreurs-a-eviter',
    },
    en: {
      title: 'Compound Interest Mistakes: 5 Errors That Hurt Long-Term Growth',
      path: '/en/blog/interets-composes-erreurs-a-eviter',
    },
  },
  'investissement-progressif-dca': {
    fr: {
      title: 'Investissement progressif DCA : lisser le risque avec une methode reguliere',
      path: '/blog/investissement-progressif-dca',
    },
    en: {
      title: 'DCA Investing Guide: Progressive Investing Without Market Timing',
      path: '/en/blog/investissement-progressif-dca',
    },
  },
  'methode-50-30-20': {
    fr: {
      title: 'La methode 50/30/20 : guide simple pour equilibrer budget et epargne',
      path: '/blog/methode-50-30-20',
    },
    en: {
      title: '50/30/20 Budget Rule: Practical Guide to Balance Spending and Savings',
      path: '/en/blog/methode-50-30-20',
    },
  },
  'optimiser-quotient-familial-legalement': {
    fr: {
      title: 'Quotient familial : les bons reflexes pour optimiser son impot legalement',
      path: '/blog/optimiser-quotient-familial-legalement',
    },
    en: {
      title: 'Family Tax Shares: Legal Ways to Optimize Household Tax Planning',
      path: '/en/blog/optimiser-quotient-familial-legalement',
    },
  },
  'partage-addition-entre-amis-guide': {
    fr: {
      title: "Partage d'addition entre amis : methode simple et equitable",
      path: '/blog/partage-addition-entre-amis-guide',
    },
    en: {
      title: 'Split Bill with Friends: Fair Method to Share Costs and Tips',
      path: '/en/blog/partage-addition-entre-amis-guide',
    },
  },
  'petites-depenses-qui-comptent': {
    fr: {
      title: 'Petites depenses du quotidien : comment les reduire et economiser plus',
      path: '/blog/petites-depenses-qui-comptent',
    },
    en: {
      title: 'Small Expenses That Add Up: How to Cut Daily Money Leaks',
      path: '/en/blog/petites-depenses-qui-comptent',
    },
  },
  'pourboire-regles-pratiques-voyage': {
    fr: {
      title: 'Pourboire en France et a l etranger : reperes pratiques pour bien calculer',
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
  education: ['methode-50-30-20', 'epargne-automatique-strategies', 'budget-mensuel-mode-emploi'],
};

const CROSS_CATEGORY_FALLBACKS: Record<CategoryKey, CalculatorSlug[]> = {
  finance: ['budget-mensuel', 'capacite-epargne-mensuelle', 'objectif-epargne-temps'],
  health: ['calcul-imc', 'besoin-calorique-journalier', 'besoin-eau-quotidien'],
  realEstate: ['mensualite-credit', 'taux-endettement', 'capacite-epargne-mensuelle'],
  dailyLife: ['budget-mensuel', 'capacite-epargne-mensuelle', 'consommation-carburant'],
  home: ['surface-piece', 'quantite-peinture', 'budget-mensuel'],
  education: ['moyenne-scolaire', 'budget-mensuel', 'objectif-epargne-temps'],
};

const SEO_SEEDS: Record<CalculatorSlug, SeoSeed> = {
  'budget-mensuel': {
    variables: {
      fr: ['revenu mensuel net', 'depenses logement', 'depenses alimentation', 'depenses transport', 'depenses loisirs', 'autres depenses'],
      en: ['net monthly income', 'housing expenses', 'food expenses', 'transport expenses', 'leisure expenses', 'other expenses'],
    },
    formula: {
      fr: 'reste a vivre = revenu net - somme des depenses ; taux d epargne = reste a vivre / revenu net x 100',
      en: 'remaining balance = net income - total expenses ; savings rate = remaining balance / net income x 100',
    },
    signals: {
      fr: ['reste a vivre positif et stable', 'depenses variables sous controle', 'taux d epargne qui progresse mois apres mois'],
      en: ['positive and stable remaining balance', 'variable spending kept under control', 'savings rate improving month after month'],
    },
    relatedCalculators: ['capacite-epargne-mensuelle', 'objectif-epargne-temps', 'taux-endettement'],
  },
  'epargne-automatique': {
    variables: {
      fr: ['objectif d epargne', 'duree en mois', 'capital initial', 'taux annuel optionnel'],
      en: ['savings goal', 'duration in months', 'initial capital', 'optional annual rate'],
    },
    formula: {
      fr: 'versement mensuel estime selon la cible, la duree et le rendement ; avec taux, le capital est compose chaque mois',
      en: 'estimated monthly contribution based on target, timeline and yield; with a rate, capital compounds each month',
    },
    signals: {
      fr: ['effort mensuel soutenable', 'coherence entre objectif et calendrier', 'progression reguliere sans interruption'],
      en: ['sustainable monthly contribution', 'goal and timeline consistency', 'steady progression without interruptions'],
    },
    relatedCalculators: ['objectif-epargne-temps', 'interets-composes', 'capacite-epargne-mensuelle'],
  },
  'interets-composes': {
    variables: {
      fr: ['capital initial', 'taux annuel', 'duree en annees', 'frequence de capitalisation'],
      en: ['initial capital', 'annual rate', 'duration in years', 'compounding frequency'],
    },
    formula: {
      fr: 'montant final = capital initial x (1 + taux / frequence) ^ (frequence x duree)',
      en: 'final amount = initial capital x (1 + rate / frequency) ^ (frequency x duration)',
    },
    signals: {
      fr: ['ecart croissant entre capital verse et capital final', 'impact du temps plus fort que la precision de timing', 'sensibilite du resultat au taux reel'],
      en: ['growing gap between contributed capital and final amount', 'time impact stronger than market timing precision', 'result sensitivity to real return assumptions'],
    },
    relatedCalculators: ['epargne-automatique', 'objectif-epargne-temps', 'pret-personnel'],
    relatedBlogs: ['interets-composes-erreurs-a-eviter', 'investissement-progressif-dca'],
  },
  'impot-revenu': {
    variables: {
      fr: ['revenu net imposable annuel', 'situation familiale', 'parts fiscales', 'ajustements de base'],
      en: ['annual taxable income', 'household status', 'tax shares', 'basic adjustments'],
    },
    formula: {
      fr: 'estimation par tranches et quotient familial, puis agrandissement a une vision mensuelle de tresorerie',
      en: 'estimate based on tax brackets and household share logic, then translated into monthly cash-flow view',
    },
    signals: {
      fr: ['ordre de grandeur fiscal credible', 'tresorerie mensuelle anticipee', 'ecart faible entre scenario prudent et scenario central'],
      en: ['credible tax magnitude estimate', 'anticipated monthly cash flow', 'small gap between conservative and baseline scenarios'],
    },
    relatedCalculators: ['budget-mensuel', 'taux-endettement', 'capacite-epargne-mensuelle'],
    relatedBlogs: ['calcul-impot-revenu-sans-stress', 'optimiser-quotient-familial-legalement'],
  },
  'economies-petites-depenses': {
    variables: {
      fr: ['montant depense par occurrence', 'frequence hebdomadaire ou mensuelle', 'horizon annuel'],
      en: ['amount spent per occurrence', 'weekly or monthly frequency', 'annual horizon'],
    },
    formula: {
      fr: 'economie potentielle = depense unitaire x frequence x periode ; projection comparee sur mois et annee',
      en: 'potential savings = unit expense x frequency x period; projection compared across month and year',
    },
    signals: {
      fr: ['fuites budgetaires identifiees', 'gain annuel concret', 'priorites de reduction sans frustration excessive'],
      en: ['identified budget leaks', 'concrete annual gain', 'clear reduction priorities without excessive frustration'],
    },
    relatedCalculators: ['budget-mensuel', 'capacite-epargne-mensuelle', 'objectif-epargne-temps'],
    relatedBlogs: ['petites-depenses-qui-comptent', 'methode-50-30-20'],
  },
  pourboire: {
    variables: {
      fr: ['montant de l addition', 'pourcentage de pourboire', 'partage eventuel entre personnes'],
      en: ['bill total', 'tip percentage', 'optional split across people'],
    },
    formula: {
      fr: 'pourboire = total x taux ; total final = total + pourboire ; part individuelle = total final / nombre de personnes',
      en: 'tip = bill x rate; final total = bill + tip; per-person amount = final total / number of people',
    },
    signals: {
      fr: ['coherence entre service recu et taux applique', 'montant final sans surprise', 'part individuelle lisible pour le groupe'],
      en: ['consistency between service quality and applied rate', 'no-surprise final amount', 'clear per-person share for the group'],
    },
    relatedCalculators: ['partage-addition', 'economies-petites-depenses', 'budget-mensuel'],
    relatedBlogs: ['pourboire-regles-pratiques-voyage', 'partage-addition-entre-amis-guide'],
  },
  'partage-addition': {
    variables: {
      fr: ['montant total', 'nombre de participants', 'pourboire optionnel', 'mode de repartition'],
      en: ['total amount', 'number of participants', 'optional tip', 'split mode'],
    },
    formula: {
      fr: 'part individuelle = (total + pourboire) / participants, avec ajustements selon consommation si necessaire',
      en: 'individual share = (total + tip) / participants, with optional weighted adjustments by consumption',
    },
    signals: {
      fr: ['repartition percue comme equitable', 'absence d arrondis conflictuels', 'paiement rapide en fin de repas'],
      en: ['split perceived as fair', 'no conflicting rounding issues', 'fast checkout at the end of the meal'],
    },
    relatedCalculators: ['pourboire', 'economies-petites-depenses', 'budget-mensuel'],
    relatedBlogs: ['partage-addition-entre-amis-guide', 'pourboire-regles-pratiques-voyage'],
  },
  'taux-endettement': {
    variables: {
      fr: ['revenus mensuels', 'charges mensuelles', 'seuil de reference'],
      en: ['monthly income', 'monthly charges', 'reference threshold'],
    },
    formula: {
      fr: 'taux d endettement = charges mensuelles / revenus mensuels x 100',
      en: 'debt ratio = monthly charges / monthly income x 100',
    },
    signals: {
      fr: ['ratio compatible avec votre marge de securite', 'charges fixes non excessives', 'capacite de financement preservee'],
      en: ['ratio aligned with your safety margin', 'fixed costs not excessive', 'borrowing capacity preserved'],
    },
    relatedCalculators: ['mensualite-credit', 'capacite-emprunt-immobilier', 'budget-mensuel'],
  },
  'mensualite-credit': {
    variables: {
      fr: ['montant emprunte', 'taux annuel', 'duree du pret'],
      en: ['loan principal', 'annual rate', 'loan duration'],
    },
    formula: {
      fr: 'formule d annuite constante, avec cas particulier a taux nul',
      en: 'constant annuity formula, with dedicated behavior when rate is zero',
    },
    signals: {
      fr: ['mensualite absorbee sans tension', 'cout du credit acceptable', 'equilibre entre duree et effort mensuel'],
      en: ['monthly payment absorbed without stress', 'acceptable borrowing cost', 'balanced trade-off between duration and monthly effort'],
    },
    relatedCalculators: ['pret-personnel', 'taux-endettement', 'capacite-emprunt-immobilier'],
  },
  'pret-personnel': {
    variables: {
      fr: ['capital emprunte', 'taux annuel', 'duree en annees'],
      en: ['borrowed capital', 'annual rate', 'duration in years'],
    },
    formula: {
      fr: 'calcule la mensualite puis derive montant total rembourse et cout total du credit',
      en: 'computes monthly payment, then derives total repaid amount and total borrowing cost',
    },
    signals: {
      fr: ['difference claire entre capital et cout du credit', 'duree raisonnable au regard du projet', 'impact mensuel compatible avec vos autres objectifs'],
      en: ['clear difference between principal and borrowing cost', 'reasonable duration for the project', 'monthly impact compatible with your other goals'],
    },
    relatedCalculators: ['mensualite-credit', 'taux-endettement', 'budget-mensuel'],
  },
  'salaire-brut-net': {
    variables: {
      fr: ['salaire brut', 'ratio net estime', 'periode de reference'],
      en: ['gross salary', 'estimated net ratio', 'reference period'],
    },
    formula: {
      fr: 'net estime = brut x ratio net, avec ratio configurable selon contexte',
      en: 'estimated net = gross x net ratio, with configurable ratio by context',
    },
    signals: {
      fr: ['vision realiste du revenu disponible', 'coherence avec votre fiche de paie', 'base fiable pour un budget mensuel'],
      en: ['realistic view of available income', 'consistency with your payslip', 'reliable baseline for monthly budgeting'],
    },
    relatedCalculators: ['salaire-net-brut', 'budget-mensuel', 'taux-endettement'],
  },
  'salaire-net-brut': {
    variables: {
      fr: ['salaire net cible', 'ratio net estime', 'periode de reference'],
      en: ['target net salary', 'estimated net ratio', 'reference period'],
    },
    formula: {
      fr: 'brut estime = net / ratio net ; utile pour simuler une negotiation ou une projection RH',
      en: 'estimated gross = net / net ratio; useful for salary negotiation and HR projections',
    },
    signals: {
      fr: ['objectif net traduit en brut realiste', 'ordre de grandeur exploitable en discussion salariale', 'coherence avec le marche et vos charges'],
      en: ['net target translated into realistic gross amount', 'usable magnitude for salary negotiation', 'consistency with market and deduction structure'],
    },
    relatedCalculators: ['salaire-brut-net', 'budget-mensuel', 'capacite-epargne-mensuelle'],
  },
  'tva-ht-ttc': {
    variables: {
      fr: ['montant HT ou TTC', 'taux de TVA', 'sens de conversion'],
      en: ['pre-tax or tax-included amount', 'VAT rate', 'conversion direction'],
    },
    formula: {
      fr: 'TTC = HT x (1 + TVA) ; HT = TTC / (1 + TVA)',
      en: 'tax-included = pre-tax x (1 + VAT); pre-tax = tax-included / (1 + VAT)',
    },
    signals: {
      fr: ['conversion immediate et sans erreur', 'marge commerciale lisible', 'coherence entre devis, facture et budget'],
      en: ['instant and error-free conversion', 'clear commercial margin view', 'consistency across quote, invoice and budget'],
    },
    relatedCalculators: ['budget-mensuel', 'capacite-epargne-mensuelle', 'impot-revenu'],
  },
  'capacite-epargne-mensuelle': {
    variables: {
      fr: ['revenus mensuels', 'depenses mensuelles totales', 'marge de securite souhaitee'],
      en: ['monthly income', 'total monthly expenses', 'desired safety margin'],
    },
    formula: {
      fr: 'capacite d epargne = revenus mensuels - depenses mensuelles',
      en: 'monthly savings capacity = monthly income - monthly expenses',
    },
    signals: {
      fr: ['montant disponible reel pour epargner', 'stabilite de la capacite dans le temps', 'compatibilite avec vos objectifs de moyen terme'],
      en: ['real amount available to save', 'capacity stability over time', 'compatibility with medium-term goals'],
    },
    relatedCalculators: ['budget-mensuel', 'objectif-epargne-temps', 'epargne-automatique'],
  },
  'objectif-epargne-temps': {
    variables: {
      fr: ['objectif de capital', 'versement mensuel', 'capital initial', 'taux annuel optionnel'],
      en: ['target capital', 'monthly contribution', 'initial capital', 'optional annual rate'],
    },
    formula: {
      fr: 'simulation mois par mois jusqu a la cible, avec capitalisation optionnelle',
      en: 'month-by-month simulation until the target is reached, with optional compounding',
    },
    signals: {
      fr: ['horizon de temps realiste', 'effort mensuel compatible avec votre budget', 'gain de temps si taux ou contribution augmentent'],
      en: ['realistic timeline', 'monthly effort compatible with your budget', 'timeline gains when rate or contribution improve'],
    },
    relatedCalculators: ['epargne-automatique', 'capacite-epargne-mensuelle', 'interets-composes'],
  },
  'calcul-imc': {
    variables: {
      fr: ['poids en kilogrammes', 'taille en centimetres'],
      en: ['weight in kilograms', 'height in centimeters'],
    },
    formula: {
      fr: 'IMC = poids / (taille en metres x taille en metres)',
      en: 'BMI = weight / (height in meters x height in meters)',
    },
    signals: {
      fr: ['positionnement dans une zone interpretable', 'suivi de tendance plutot que point isole', 'lecture combinee avec contexte medical personnel'],
      en: ['placement in an interpretable range', 'trend monitoring over isolated values', 'reading combined with personal medical context'],
    },
    relatedCalculators: ['poids-ideal', 'besoin-calorique-journalier', 'besoin-eau-quotidien'],
  },
  'besoin-calorique-journalier': {
    variables: {
      fr: ['age', 'sexe', 'poids', 'taille', 'niveau d activite'],
      en: ['age', 'sex', 'weight', 'height', 'activity level'],
    },
    formula: {
      fr: 'metabolisme de base estime puis multiplie par un facteur d activite',
      en: 'estimated basal metabolism multiplied by an activity factor',
    },
    signals: {
      fr: ['apport energetique adapte a votre objectif', 'difference claire entre maintien et ajustement', 'coherence avec la realite de votre activite'],
      en: ['energy intake aligned with your objective', 'clear gap between maintenance and adjustment', 'consistency with your actual activity profile'],
    },
    relatedCalculators: ['calcul-imc', 'depense-calorique-activite', 'besoin-eau-quotidien'],
  },
  'poids-ideal': {
    variables: {
      fr: ['taille', 'sexe', 'repere de formule'],
      en: ['height', 'sex', 'formula benchmark'],
    },
    formula: {
      fr: 'estimation theorique selon formule de reference basee sur la taille et le sexe',
      en: 'theoretical estimate based on a reference formula using height and sex',
    },
    signals: {
      fr: ['repere indicatif et non objectif absolu', 'coherence avec votre composition corporelle', 'lecture combinee avec forme physique globale'],
      en: ['indicative benchmark rather than absolute target', 'consistency with your body composition', 'reading combined with overall fitness status'],
    },
    relatedCalculators: ['calcul-imc', 'besoin-calorique-journalier', 'rythme-cardiaque-cible'],
  },
  'besoin-eau-quotidien': {
    variables: {
      fr: ['poids', 'duree d activite physique', 'besoin de base'],
      en: ['weight', 'physical activity duration', 'base hydration need'],
    },
    formula: {
      fr: 'hydratation de base selon le poids + ajustement lie a l activite',
      en: 'base hydration from body weight + activity-related adjustment',
    },
    signals: {
      fr: ['volume d eau quotidien atteignable', 'adaptation selon chaleur et effort', 'repartition sur la journee'],
      en: ['achievable daily water volume', 'adjustment for heat and exercise', 'spread across the day'],
    },
    relatedCalculators: ['besoin-calorique-journalier', 'calcul-imc', 'depense-calorique-activite'],
  },
  'rythme-cardiaque-cible': {
    variables: {
      fr: ['age', 'intensite cible en pourcentage'],
      en: ['age', 'target intensity percentage'],
    },
    formula: {
      fr: 'frequence cardiaque max estimee = 220 - age, puis zone cible calculee selon intensite',
      en: 'estimated max heart rate = 220 - age, then target zone computed from intensity',
    },
    signals: {
      fr: ['zone d entrainement coherente avec objectif', 'intensite soutenable dans le temps', 'ecart maitrise entre zone basse et zone haute'],
      en: ['training zone aligned with the objective', 'sustainable intensity over time', 'controlled gap between low and high zones'],
    },
    relatedCalculators: ['depense-calorique-activite', 'besoin-calorique-journalier', 'calcul-imc'],
  },
  'depense-calorique-activite': {
    variables: {
      fr: ['poids', 'duree de l activite', 'valeur MET de l effort'],
      en: ['weight', 'activity duration', 'MET value for the effort'],
    },
    formula: {
      fr: 'calories depensees = MET x poids x duree en heures',
      en: 'calories burned = MET x body weight x duration in hours',
    },
    signals: {
      fr: ['comparaison possible entre activites', 'coherence entre effort percu et depense estimee', 'utilisation comme repere et non comme valeur absolue'],
      en: ['comparable view across activities', 'consistency between perceived effort and estimate', 'used as a benchmark, not an absolute value'],
    },
    relatedCalculators: ['besoin-calorique-journalier', 'rythme-cardiaque-cible', 'besoin-eau-quotidien'],
  },
  'capacite-emprunt-immobilier': {
    variables: {
      fr: ['revenus mensuels', 'charges existantes', 'taux annuel', 'duree du pret', 'taux d endettement maximal'],
      en: ['monthly income', 'existing charges', 'annual rate', 'loan duration', 'maximum debt ratio'],
    },
    formula: {
      fr: 'mensualite maximale = revenus x ratio max - charges ; capital empruntable derive via formule d annuite',
      en: 'max monthly payment = income x max ratio - charges; borrowing capacity derived from annuity formula',
    },
    signals: {
      fr: ['mensualite cible supportable', 'coherence entre projet et ratio d endettement', 'marge de securite conservee apres achat'],
      en: ['target monthly payment remains affordable', 'project aligned with debt ratio rules', 'safety margin preserved after purchase'],
    },
    relatedCalculators: ['mensualite-credit', 'taux-endettement', 'frais-notaire'],
  },
  'frais-notaire': {
    variables: {
      fr: ['prix du bien', 'taux de frais estime'],
      en: ['property price', 'estimated fee rate'],
    },
    formula: {
      fr: 'frais de notaire = prix x taux ; cout total d acquisition = prix + frais',
      en: 'notary fees = price x rate; total acquisition cost = price + fees',
    },
    signals: {
      fr: ['enveloppe globale d acquisition validee', 'apport ajustable avant offre', 'coherence entre budget et frais annexes'],
      en: ['total acquisition envelope validated', 'down payment can be adjusted before offer', 'budget consistency including ancillary costs'],
    },
    relatedCalculators: ['capacite-emprunt-immobilier', 'mensualite-credit', 'rentabilite-locative-brute'],
  },
  'rentabilite-locative-brute': {
    variables: {
      fr: ['loyer annuel', 'prix d acquisition'],
      en: ['annual rent', 'purchase price'],
    },
    formula: {
      fr: 'rentabilite brute = loyer annuel / prix d acquisition x 100',
      en: 'gross yield = annual rent / purchase price x 100',
    },
    signals: {
      fr: ['comparaison rapide de plusieurs biens', 'premier filtre avant analyse detaillee', 'ecart pertinent entre rendement et risque'],
      en: ['quick comparison across multiple properties', 'first filter before detailed analysis', 'relevant spread between yield and risk'],
    },
    relatedCalculators: ['rendement-locatif-net', 'frais-notaire', 'capacite-emprunt-immobilier'],
  },
  'rendement-locatif-net': {
    variables: {
      fr: ['loyer annuel', 'charges annuelles', 'prix d achat', 'couts d acquisition'],
      en: ['annual rent', 'annual charges', 'purchase price', 'acquisition costs'],
    },
    formula: {
      fr: 'rendement net = (loyer - charges) / (prix + couts d acquisition) x 100',
      en: 'net yield = (rent - charges) / (price + acquisition costs) x 100',
    },
    signals: {
      fr: ['vision plus realiste de la performance locative', 'prise en compte des charges recurrentes', 'ecart explicite entre brut et net'],
      en: ['more realistic view of rental performance', 'recurring charges included', 'explicit gap between gross and net yield'],
    },
    relatedCalculators: ['rentabilite-locative-brute', 'frais-notaire', 'capacite-emprunt-immobilier'],
  },
  'difference-entre-deux-dates': {
    variables: {
      fr: ['date de debut', 'date de fin', 'precision en jours mois annees'],
      en: ['start date', 'end date', 'precision in days months years'],
    },
    formula: {
      fr: 'difference calendaire avec decomposition en annees, mois, jours et total de jours',
      en: 'calendar difference split into years, months, days and total day count',
    },
    signals: {
      fr: ['duree exploitable pour planning ou contrats', 'coherence du total jours avec la decomposition', 'aucune confusion sur les bornes de date'],
      en: ['duration usable for planning or contracts', 'total days consistent with date decomposition', 'no ambiguity on date boundaries'],
    },
    relatedCalculators: ['age-exact', 'budget-mensuel', 'objectif-epargne-temps'],
  },
  'age-exact': {
    variables: {
      fr: ['date de naissance', 'date de reference'],
      en: ['birth date', 'reference date'],
    },
    formula: {
      fr: 'age exact derive de la difference calendaire en annees, mois et jours',
      en: 'exact age derived from calendar difference in years, months and days',
    },
    signals: {
      fr: ['age detaille utile pour demarches administratives', 'calcul date a date sans approximation', 'coherence des unites de temps'],
      en: ['detailed age useful for administrative processes', 'date-to-date calculation without rough approximation', 'time-unit consistency'],
    },
    relatedCalculators: ['difference-entre-deux-dates', 'moyenne-scolaire', 'rythme-cardiaque-cible'],
  },
  'consommation-carburant': {
    variables: {
      fr: ['litres consommes', 'distance parcourue', 'prix au litre optionnel'],
      en: ['fuel consumed in liters', 'distance traveled', 'optional fuel price per liter'],
    },
    formula: {
      fr: 'consommation L/100 = litres / distance x 100 ; cout total = litres x prix au litre',
      en: 'L/100 consumption = liters / distance x 100; total cost = liters x price per liter',
    },
    signals: {
      fr: ['suivi precis du cout de mobilite', 'comparaison possible entre trajets ou vehicules', 'identification rapide des derives de consommation'],
      en: ['precise mobility cost tracking', 'easy comparison across trips or vehicles', 'fast detection of consumption drifts'],
    },
    relatedCalculators: ['economies-petites-depenses', 'budget-mensuel', 'partage-addition'],
  },
  'quantite-peinture': {
    variables: {
      fr: ['surface totale a peindre', 'nombre de couches', 'rendement en m2 par litre'],
      en: ['total paintable surface', 'number of coats', 'coverage in m2 per liter'],
    },
    formula: {
      fr: 'quantite de peinture = surface x couches / rendement',
      en: 'paint quantity = surface x coats / coverage',
    },
    signals: {
      fr: ['achat de peinture ajuste au besoin reel', 'reduction des surplus inutiles', 'coherence entre budget materiaux et surface'],
      en: ['paint purchase aligned with real need', 'reduced unnecessary surplus', 'consistency between material budget and surface'],
    },
    relatedCalculators: ['surface-piece', 'budget-mensuel', 'capacite-epargne-mensuelle'],
  },
  'surface-piece': {
    variables: {
      fr: ['longueur', 'largeur', 'forme rectangulaire'],
      en: ['length', 'width', 'rectangular shape assumption'],
    },
    formula: {
      fr: 'surface = longueur x largeur ; perimetre = 2 x (longueur + largeur)',
      en: 'area = length x width; perimeter = 2 x (length + width)',
    },
    signals: {
      fr: ['mesures fiables pour travaux et amenagement', 'perimetre utile pour plinthes et finitions', 'base claire pour estimer quantites de materiaux'],
      en: ['reliable dimensions for renovation and layout', 'perimeter useful for skirting and finishing', 'clear baseline to estimate material quantities'],
    },
    relatedCalculators: ['quantite-peinture', 'budget-mensuel', 'frais-notaire'],
  },
  'moyenne-scolaire': {
    variables: {
      fr: ['liste des notes', 'coefficients optionnels', 'echelle de notation'],
      en: ['grade list', 'optional coefficients', 'grading scale'],
    },
    formula: {
      fr: 'moyenne simple si pas de coefficients ; sinon somme(note x coefficient) / somme(coefficients)',
      en: 'simple average when no coefficients; otherwise sum(grade x coefficient) / sum(coefficients)',
    },
    signals: {
      fr: ['suivi clair de progression academique', 'impact immediat des matieres a fort coefficient', 'objectif de trimestre plus lisible'],
      en: ['clear academic progression tracking', 'immediate impact of high-coefficient subjects', 'more readable term objective'],
    },
    relatedCalculators: ['difference-entre-deux-dates', 'age-exact', 'budget-mensuel'],
  },
};

const TITLE_VARIANTS = {
  fr: {
    introLead: [
      'Dans une logique de decision pratique,',
      'Pour transformer un besoin concret en chiffre actionnable,',
      'Quand on veut eviter les approximations au quotidien,',
    ],
    howLead: [
      'Sur le plan methodologique,',
      'D un point de vue calculatoire,',
      'Concretement, dans la mecanique de calcul,',
    ],
    interpretationLead: [
      'Une fois le resultat obtenu,',
      'Au moment d interpreter la sortie,',
      'Dans la phase de decision,',
    ],
  },
  en: {
    introLead: [
      'From a practical decision standpoint,',
      'To turn a concrete need into an actionable number,',
      'When you want to avoid rough approximations,',
    ],
    howLead: [
      'From a methodological perspective,',
      'At the pure calculation level,',
      'In practical terms, in the computation flow,',
    ],
    interpretationLead: [
      'Once the result is displayed,',
      'At interpretation time,',
      'During the decision phase,',
    ],
  },
};

function slugHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickVariant(locale: Locale, bucket: keyof typeof TITLE_VARIANTS.fr, slug: string): string {
  const variants = TITLE_VARIANTS[locale][bucket];
  return variants[slugHash(slug) % variants.length];
}

function formatNaturalList(items: string[], locale: Locale): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    return locale === 'fr' ? `${items[0]} et ${items[1]}` : `${items[0]} and ${items[1]}`;
  }

  const head = items.slice(0, -1).join(', ');
  const tail = items[items.length - 1];
  return locale === 'fr' ? `${head} et ${tail}` : `${head}, and ${tail}`;
}

function getCategoryLabel(category: CategoryKey, locale: Locale): string {
  const labels: Record<CategoryKey, Localized<string>> = {
    finance: { fr: 'finance personnelle', en: 'personal finance' },
    health: { fr: 'sante', en: 'health' },
    realEstate: { fr: 'immobilier', en: 'real estate' },
    dailyLife: { fr: 'vie pratique', en: 'daily life' },
    home: { fr: 'maison et travaux', en: 'home projects' },
    education: { fr: 'education', en: 'education' },
  };
  return labels[category][locale];
}

function buildRelatedCalculatorLinks(calculator: CalculatorDefinition, locale: Locale): RelatedLink[] {
  const seed = SEO_SEEDS[calculator.slug];
  const pool: CalculatorSlug[] = [];

  if (seed.relatedCalculators) {
    pool.push(...seed.relatedCalculators);
  }

  for (const item of CALCULATORS) {
    if (item.category === calculator.category && item.slug !== calculator.slug) {
      pool.push(item.slug);
    }
  }

  pool.push(...CROSS_CATEGORY_FALLBACKS[calculator.category]);

  const picked: CalculatorSlug[] = [];
  for (const slug of pool) {
    if (slug === calculator.slug || picked.includes(slug)) continue;
    picked.push(slug);
    if (picked.length === 3) break;
  }

  return picked.map((slug) => {
    const related = getCalculatorBySlug(slug);
    return {
      label: related.name[locale],
      href: getCalculatorRoute(locale, slug),
      description:
        locale === 'fr'
          ? `Approfondir la decision avec ${related.name.fr.toLowerCase()}.`
          : `Extend the analysis with ${related.name.en.toLowerCase()}.`,
    };
  });
}

function buildRelatedBlogLinks(calculator: CalculatorDefinition, locale: Locale): RelatedLink[] {
  const seed = SEO_SEEDS[calculator.slug];
  const selected = seed.relatedBlogs ?? DEFAULT_BLOGS_BY_CATEGORY[calculator.category];

  return selected.slice(0, 2).map((blogSlug) => ({
    label: BLOG_METADATA[blogSlug][locale].title,
    href: BLOG_METADATA[blogSlug][locale].path,
    description:
      locale === 'fr'
        ? 'Article connexe pour consolider votre methode.'
        : 'Related article to reinforce your execution method.',
  }));
}

function buildIntroduction(calculator: CalculatorDefinition, locale: Locale): string[] {
  const seed = SEO_SEEDS[calculator.slug];
  const vars = seed.variables[locale];
  const varsAsText = formatNaturalList(vars, locale);
  const categoryLabel = getCategoryLabel(calculator.category, locale);
  const introLead = pickVariant(locale, 'introLead', calculator.slug);

  if (locale === 'fr') {
    return [
      `${introLead} le calculateur ${calculator.name.fr.toLowerCase()} sert a objectiver un sujet qui est souvent traite a l instinct. Dans la categorie ${categoryLabel}, beaucoup d utilisateurs disposent d informations partielles, mais manquent d un cadre unique pour comparer plusieurs hypotheses. L outil vous aide a transformer cette incertitude en une estimation lisible, avec un resultat direct et une methode stable. Le but n est pas de remplacer une expertise humaine, mais de vous donner une base chiffrree utile pour agir maintenant, puis ajuster votre decision quand votre contexte evolue. Cette approche limite les biais de perception, reduit les erreurs manuelles et facilite les arbitrages dans des situations concretes.`,
      `Le principal avantage est la clarte de lecture entre les variables d entree et les indicateurs de sortie. Ici, les parametres cles sont ${varsAsText}. En reunissant ces informations dans un meme ecran, vous obtenez une vision complete de votre scenario, ce qui rend les comparaisons plus fiables. Cette coherence est essentielle lorsque vous devez choisir entre plusieurs options, justifier une decision a un tiers, ou suivre une progression dans le temps. Le calculateur agit comme un tableau de bord compact: il simplifie la lecture sans gommer les nuances importantes.`,
      `Dans un parcours SEO oriente intention utilisateur, cette page repond aux questions les plus frequentes: comment estimer rapidement, quelles hypotheses utiliser, que signifie concretement le resultat, et quelles actions lancer ensuite. Au lieu d un contenu purement theorique, vous combinez explication pedagogique, simulation immediate et recommandations d interpretation. Cette articulation entre methode et execution est ce qui rend l outil utile sur mobile comme sur desktop. Vous pouvez revenir regulierement, tester des valeurs actualisees et observer les effets de vos choix sur un horizon court, moyen ou long terme selon le sujet.`,
      `Autre point important: ce calculateur favorise une prise de decision progressive. Plutot que de chercher une precision impossible des le premier essai, vous commencez avec des hypotheses raisonnables, puis vous raffinez les entrees. Ce mode de travail est plus robuste qu un calcul unique figé, car il tient compte des changements de revenu, de charges, de comportements ou d objectifs. Dans la pratique, les utilisateurs les plus efficaces sont ceux qui comparaient plusieurs scenarios avant d agir, puis mettent a jour leurs parametres avec discipline.`,
      `Enfin, l outil s integre naturellement dans une strategie plus large avec les autres calculateurs Calcery et les articles du blog. Une simulation isolee est utile, mais une sequence de simulations reliees est encore plus puissante pour arbitrer, prioriser et executer. C est exactement la logique de cette page: offrir une estimation rapide, compréhensible et exploitable, tout en gardant un niveau de prudence adapte a la realite terrain.`
    ];
  }

  return [
    `${introLead} the ${calculator.name.en.toLowerCase()} calculator is designed to convert an uncertain question into a usable estimate. Inside the ${categoryLabel} category, many users have fragmented information but lack a consistent framework for comparing alternatives. This tool gives you that structure by connecting clear inputs to immediate outputs. The objective is not to replace professional judgement, but to provide a reliable numeric baseline you can act on today and refine as your context changes. This reduces manual errors, limits emotional bias, and improves decision quality when several options look similar at first sight.`,
    `A key strength is the explicit link between input variables and resulting indicators. On this page, the core parameters are ${varsAsText}. Bringing them together in a single workflow improves consistency across scenarios and makes side-by-side comparison faster. That consistency matters when you need to justify a decision, prepare a discussion, or track progress over time. In practice, the calculator works like a compact operational dashboard: simple enough for quick use, but structured enough to support repeatable decisions.`,
    `From a search-intent perspective, this page addresses the most common user questions: how to estimate quickly, which assumptions are realistic, what the result actually means, and what to do next. Instead of static theory, you get an execution-oriented format combining explanation, simulation, and interpretation guidance. This makes the page useful both on mobile and desktop. You can revisit it with updated values and test how sensitive your outcome is to each assumption before committing resources.`,
    `Another important benefit is progressive decision-making. Rather than chasing false precision on the first try, you start with realistic assumptions and iterate. That approach is more resilient because it captures changes in income, costs, behavior, constraints, or priorities over time. In real usage, the strongest outcomes usually come from users who compare multiple scenarios first, then update their inputs with discipline as new information becomes available.`,
    `Finally, this calculator is meant to work as part of a broader workflow with related Calcery tools and blog resources. A single estimate is useful; a connected sequence of estimates is stronger for prioritization and execution. That is the core role of this page: deliver a fast, understandable, and actionable estimate while keeping interpretation grounded in real-world constraints.`
  ];
}

function buildHowItWorks(calculator: CalculatorDefinition, locale: Locale): string[] {
  const seed = SEO_SEEDS[calculator.slug];
  const vars = seed.variables[locale];
  const howLead = pickVariant(locale, 'howLead', calculator.slug);

  if (locale === 'fr') {
    return [
      `${howLead} la qualite du resultat depend d abord de la qualite des entrees. Vous devez renseigner les variables principales dans un ordre logique, puis verifier leur coherence avant interpretation. Pour ${calculator.name.fr.toLowerCase()}, les donnees importantes sont ${formatNaturalList(vars, locale)}. Une bonne pratique consiste a utiliser des valeurs observables, pas des valeurs ideales. Lorsque certaines donnees sont incertaines, creez deux versions du meme scenario: une prudente et une centrale. Cette methode de double estimation limite les surprises et donne une plage de decision plus robuste.`,
      `La mecanique de calcul repose sur le principe suivant: ${seed.formula.fr}. Cette formule est volontairement lisible pour que vous compreniez ce qui influence reellement la sortie. L interet est double: d une part, vous identifiez rapidement les variables les plus sensibles; d autre part, vous savez quelles actions ont un impact significatif. En pratique, cette transparence evite le syndrome de la boite noire. Vous ne subissez pas un nombre final, vous comprenez comment il est produit et donc comment l ameliorer de facon concrète.`,
      `Le calculateur est concu pour offrir des retours immediats, mais il reste un modele simplifie. Certains facteurs contextuels peuvent ne pas etre representes dans les champs standards: saisonnalite, contraintes contractuelles, specificites locales, frais indirects ou evenements exceptionnels. C est normal dans un outil d estimation rapide. La bonne posture est de l utiliser comme un repere decisionnel, puis de completer l analyse si l enjeu financier, sante ou immobilier devient critique.`,
      `Pour fiabiliser encore la lecture, vous pouvez documenter vos hypotheses dans une note courte: origine des donnees, date de mise a jour, hypothese la plus incertaine, et seuil qui declencherait une action corrective. Cette discipline transforme le calcul ponctuel en processus de pilotage. Elle est particulierement utile si vous revenez regulierement sur cette page pour suivre une evolution, preparer une decision, ou comparer plusieurs options sur une meme base methodologique.`
    ];
  }

  return [
    `${howLead} output quality depends first on input quality. Enter the main variables in a clear order, then validate consistency before interpretation. For ${calculator.name.en.toLowerCase()}, the key parameters are ${formatNaturalList(vars, locale)}. A practical habit is to use observable values instead of idealized assumptions. When one variable is uncertain, run at least two versions of the same case: a conservative one and a baseline one. This dual-scenario method reduces surprise and gives you a stronger decision range.`,
    `The computation logic is based on this principle: ${seed.formula.en}. The formula is intentionally explicit so you can see what really drives the output. This has two advantages: you identify high-impact variables quickly, and you know which actions matter most for improvement. In real usage, that transparency avoids black-box behavior. You are not passively accepting a result; you can explain it, challenge it, and refine it with clear reasoning.`,
    `The calculator is optimized for fast estimation, but it remains a simplified model. Some contextual factors may sit outside standard fields: seasonality, contractual constraints, local rules, indirect costs, or one-off events. That limitation is expected in quick decision tools. The right approach is to use the result as a planning benchmark, then deepen the analysis when the stakes become high or irreversible.`,
    `To improve reliability over time, document your assumptions in a short note: data source, update date, most uncertain variable, and threshold that would trigger corrective action. This turns a one-off simulation into a repeatable decision process. It is especially valuable if you revisit this page often to monitor trends, prepare a choice, or compare alternatives using the same methodological baseline.`
  ];
}

function buildInterpretation(calculator: CalculatorDefinition, locale: Locale): string[] {
  const seed = SEO_SEEDS[calculator.slug];
  const interpretationLead = pickVariant(locale, 'interpretationLead', calculator.slug);
  const signals = seed.signals[locale];

  if (locale === 'fr') {
    return [
      `${interpretationLead} la question n est pas seulement "quel est le chiffre", mais "que dois-je faire avec ce chiffre". Les meilleurs usages consistent a comparer le resultat a un seuil de decision, puis a definir une action simple et mesurable. Pour ${calculator.name.fr.toLowerCase()}, vous pouvez vous appuyer sur trois signaux prioritaires: ${formatNaturalList(signals, locale)}. Si ces signaux convergent, la decision est generalement solide. S ils divergent fortement, cela indique qu une hypothese doit etre revue avant d engager du temps ou de l argent.`,
      `Interpretez toujours la sortie dans votre contexte personnel: contraintes de tresorerie, horizon de temps, tolerance au risque, stabilite de revenus, objectifs secondaires et niveau de flexibilite. Un meme resultat peut conduire a des decisions differentes selon ces parametres. C est pourquoi il est utile de construire une lecture en trois niveaux: acceptable, a surveiller, et a corriger. Cette gradation evite les reactions excessives et aide a prioriser les actions avec sang-froid.`,
      `Erreurs frequentes a eviter: saisir des donnees trop optimistes, ignorer les couts indirects, confondre estimation et garantie, et ne pas revalider les hypotheses apres un changement de situation. Une bonne pratique consiste a planifier un point de controle periodique. Meme cinq minutes par semaine ou par mois peuvent suffire a maintenir la qualite de decision, detecter une derive et ajuster rapidement le plan d action.`,
      `Enfin, souvenez-vous qu une interpretation efficace est orientee execution. Definissez une prochaine action concrete apres chaque simulation: ajuster un poste de depense, modifier un montant, prolonger une duree, reevaluer une priorite ou demander un avis professionnel. Sans cette etape, meme un excellent calcul reste theorique. Avec elle, vous transformez un resultat en progression mesurable et durable.`
    ];
  }

  return [
    `${interpretationLead} the key question is not only "what is the number," but "what should I do with it." The most effective usage is to compare the output against a decision threshold, then assign one measurable action. For ${calculator.name.en.toLowerCase()}, focus on three core signals: ${formatNaturalList(signals, locale)}. When these signals align, the decision is usually robust. When they diverge, at least one assumption likely needs revision before committing time, effort, or money.`,
    `Always read the output inside your real context: cash-flow constraints, time horizon, risk tolerance, income stability, secondary goals, and flexibility level. The same numeric result can justify different decisions for different profiles. A practical framework is to classify outcomes in three levels: acceptable, monitor, and correct. This avoids overreaction and supports calm prioritization.`,
    `Common mistakes to avoid: using overly optimistic inputs, ignoring indirect costs, treating an estimate like a guarantee, and failing to refresh assumptions after a context change. A lightweight review routine helps a lot. Even a short weekly or monthly check can maintain decision quality, detect drift early, and keep execution aligned with reality.`,
    `Finally, strong interpretation is action-oriented. After each simulation, define one immediate next step: adjust an expense line, change a contribution amount, extend a timeline, re-prioritize a target, or seek professional advice. Without that step, even excellent estimates remain theoretical. With it, results become measurable progress over time.`
  ];
}

function buildScenarios(calculator: CalculatorDefinition, locale: Locale): CalculatorSeoScenario[] {
  const seed = SEO_SEEDS[calculator.slug];
  const vars = seed.variables[locale];

  if (locale === 'fr') {
    return [
      {
        title: 'Scenario 1 - Profil prudent',
        text: `Vous utilisez des hypothèses volontairement conservatrices sur ${formatNaturalList(vars.slice(0, 3), locale)}. L objectif est de mesurer la faisabilite minimale de votre decision sans compter sur un contexte ideal. Si le resultat reste acceptable meme dans cette version prudente, votre plan est generalement robuste. Ce scenario sert de filet de securite et permet de definir un seuil d alerte clair avant execution.`,
      },
      {
        title: 'Scenario 2 - Profil central',
        text: `Vous renseignez des valeurs proches de votre realite actuelle, avec un niveau de precision suffisant pour piloter le quotidien. C est le scenario de reference a suivre dans le temps. Vous pouvez comparer ce resultat aux signaux cles (${formatNaturalList(seed.signals.fr, locale)}) pour verifier la coherence globale. Si un indicateur se degrade, vous savez exactement quelle variable ajuster en priorite.`,
      },
      {
        title: 'Scenario 3 - Profil optimise',
        text: `Vous testez une version amelioree en modifiant une ou deux variables a fort impact, sans tomber dans l optimisme excessif. Cette simulation montre le potentiel de progression atteignable avec des actions concretes: renegociation, reduction ciblee, augmentation de contribution, meilleure organisation, ou changement d habitude. L interet n est pas de rever un chiffre maximal, mais d identifier un plan realiste d amelioration progressive.`
      },
    ];
  }

  return [
    {
      title: 'Scenario 1 - Conservative profile',
      text: `You run intentionally conservative assumptions on ${formatNaturalList(vars.slice(0, 3), locale)}. The goal is to test minimum feasibility without relying on ideal conditions. If the outcome remains acceptable in this cautious setup, your plan is usually resilient. This scenario acts as a safety baseline and helps define a clear alert threshold before execution.`,
    },
    {
      title: 'Scenario 2 - Baseline profile',
      text: `You use values close to your current reality with enough precision for day-to-day decisions. This becomes your reference scenario over time. You can compare this output against key signals (${formatNaturalList(seed.signals.en, locale)}) to validate overall consistency. If one indicator drifts, you know exactly which variable to adjust first.`,
    },
    {
      title: 'Scenario 3 - Optimized profile',
      text: `You test an improved version by changing one or two high-impact variables, without unrealistic optimism. This simulation shows reachable upside through concrete actions: renegotiation, targeted cuts, higher contribution, better organization, or behavior upgrades. The objective is not to chase a perfect number, but to identify a realistic path of progressive improvement.`
    },
  ];
}

function makeFaqTemplates(calculator: CalculatorDefinition, locale: Locale): FAQItem[] {
  const seed = SEO_SEEDS[calculator.slug];
  const name = calculator.name[locale];
  const vars = seed.variables[locale];

  if (locale === 'fr') {
    return [
      {
        question: `Quelles donnees faut-il verifier en priorite avant d utiliser ${name} ?`,
        answer: `Commencez par valider ${formatNaturalList(vars.slice(0, 3), locale)} avec des valeurs recentes. Plus vos entrees sont proches de votre realite, plus la simulation sera exploitable pour decider.`,
      },
      {
        question: `A quelle frequence dois-je refaire la simulation ${name.toLowerCase()} ?`,
        answer: `Une mise a jour mensuelle est souvent suffisante. Recalculez immediatement si vous avez un changement important de revenus, charges, habitudes ou objectifs.`,
      },
      {
        question: `Le resultat de ${name} est-il une garantie ou une estimation ?`,
        answer: `C est une estimation decisionnelle. Elle est tres utile pour comparer des scenarios, mais elle ne remplace pas une validation contractuelle, fiscale, medicale ou professionnelle quand les enjeux sont eleves.`,
      },
      {
        question: `Comment ameliorer rapidement le resultat obtenu avec ${name} ?`,
        answer: `Identifiez la variable la plus sensible dans votre cas, puis testez une action ciblee. Travaillez par petites iterations au lieu de modifier toutes les hypotheses d un coup.`,
      },
      {
        question: `Pourquoi creer plusieurs scenarios avec ${name} plutot qu un seul ?`,
        answer: `Trois scenarios (prudent, central, optimise) donnent une plage de decision plus fiable. Vous visualisez le risque bas, le cas probable et le potentiel d amelioration.`,
      },
      {
        question: `Que faire si le resultat semble incoherent avec ma situation ?`,
        answer: `Revoyez les unites, la periode de reference et les valeurs saisies. Les incoherences viennent souvent d une variable oubliee ou d un montant entre dans la mauvaise echelle.`,
      },
      {
        question: `Puis-je utiliser ${name} pour preparer un echange avec un professionnel ?`,
        answer: `Oui, c est meme recommande. Venir avec une simulation structuree facilite la discussion et permet d obtenir des recommandations plus precises.`,
      },
    ];
  }

  return [
    {
      question: `Which inputs should I validate first before using ${name}?`,
      answer: `Start by checking ${formatNaturalList(vars.slice(0, 3), locale)} with up-to-date values. The closer your inputs are to reality, the more actionable the estimate becomes.`,
    },
    {
      question: `How often should I rerun the ${name.toLowerCase()} simulation?`,
      answer: `A monthly refresh is usually enough. Recalculate immediately when a major change affects income, costs, routines, or objectives.`,
    },
    {
      question: `Is the ${name} result a guarantee or an estimate?`,
      answer: `It is a decision-support estimate. It is excellent for scenario comparison, but it does not replace contractual, tax, medical, or professional validation for high-stakes decisions.`,
    },
    {
      question: `What is the fastest way to improve the output from ${name}?`,
      answer: `Find the highest-impact variable in your case and test one targeted action. Iterative adjustments are more reliable than changing every assumption at once.`,
    },
    {
      question: `Why should I build multiple scenarios instead of one?`,
      answer: `Using conservative, baseline, and optimized scenarios gives a safer decision range. You can see downside risk, likely outcome, and realistic upside in one framework.`,
    },
    {
      question: `What if the output seems inconsistent with my situation?`,
      answer: `Recheck units, reference period, and raw values. Most inconsistencies come from one missing variable or a value entered at the wrong scale.`,
    },
    {
      question: `Can I use ${name} to prepare a professional discussion?`,
      answer: `Yes. Bringing a structured simulation improves discussion quality and helps advisors provide more precise recommendations.`,
    },
  ];
}

function buildExpandedFaqs(calculator: CalculatorDefinition, locale: Locale): FAQItem[] {
  const baseFaqs = calculator.faqs[locale];
  const generatedFaqs = makeFaqTemplates(calculator, locale);

  const combined = [...baseFaqs, ...generatedFaqs];
  const unique: FAQItem[] = [];
  const seen = new Set<string>();

  for (const item of combined) {
    const key = item.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  while (unique.length < 10) {
    unique.push(
      locale === 'fr'
        ? {
            question: `Comment exploiter ${calculator.name.fr.toLowerCase()} sur le long terme ?`,
            answer: 'Conservez une routine de mise a jour, comparez vos scenarios dans le temps et transformez chaque resultat en action mesurable.',
          }
        : {
            question: `How should I use ${calculator.name.en.toLowerCase()} over the long term?`,
            answer: 'Maintain a regular update routine, compare scenarios over time, and convert each result into one measurable action.',
          },
    );
  }

  return unique.slice(0, 10);
}

export function getCalculatorSeoContent(calculator: CalculatorDefinition, locale: Locale): CalculatorSeoContent {
  return {
    introduction: buildIntroduction(calculator, locale),
    howItWorks: buildHowItWorks(calculator, locale),
    interpretation: buildInterpretation(calculator, locale),
    scenarios: buildScenarios(calculator, locale),
    relatedCalculators: buildRelatedCalculatorLinks(calculator, locale),
    relatedBlogPosts: buildRelatedBlogLinks(calculator, locale),
    faqs: buildExpandedFaqs(calculator, locale),
  };
}
