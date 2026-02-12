import type { FAQItem } from './types';

export type Locale = 'fr' | 'en';

export type CategoryKey =
  | 'finance'
  | 'health'
  | 'realEstate'
  | 'dailyLife'
  | 'home'
  | 'education';

export type CalculatorSlug =
  | 'budget-mensuel'
  | 'epargne-automatique'
  | 'interets-composes'
  | 'impot-revenu'
  | 'economies-petites-depenses'
  | 'pourboire'
  | 'partage-addition'
  | 'taux-endettement'
  | 'mensualite-credit'
  | 'pret-personnel'
  | 'salaire-brut-net'
  | 'salaire-net-brut'
  | 'tva-ht-ttc'
  | 'capacite-epargne-mensuelle'
  | 'objectif-epargne-temps'
  | 'calcul-imc'
  | 'besoin-calorique-journalier'
  | 'poids-ideal'
  | 'besoin-eau-quotidien'
  | 'rythme-cardiaque-cible'
  | 'depense-calorique-activite'
  | 'capacite-emprunt-immobilier'
  | 'frais-notaire'
  | 'rentabilite-locative-brute'
  | 'rendement-locatif-net'
  | 'difference-entre-deux-dates'
  | 'age-exact'
  | 'consommation-carburant'
  | 'quantite-peinture'
  | 'surface-piece'
  | 'moyenne-scolaire';

type Localized<T> = {
  fr: T;
  en: T;
};

export interface CategoryDefinition {
  key: CategoryKey;
  slug: Localized<string>;
  name: Localized<string>;
  h1: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  seoText: Localized<string[]>;
  ctaLabel: Localized<string>;
}

export interface CalculatorDefinition {
  slug: CalculatorSlug;
  category: CategoryKey;
  icon: string;
  name: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  faqs: Localized<FAQItem[]>;
  tips: Localized<string[]>;
  updatedAt: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    key: 'finance',
    slug: { fr: 'finance', en: 'finance' },
    name: { fr: 'Finance personnelle', en: 'Personal finance' },
    h1: {
      fr: 'Calculateurs de finance personnelle',
      en: 'Personal finance calculators',
    },
    title: {
      fr: 'Finance personnelle: outils pour budget, impots et epargne | Calcery',
      en: 'Personal finance tools for budgeting, tax and savings | Calcery',
    },
    description: {
      fr: 'Comparez vos scenarios de budget, epargne, fiscalite et investissement avec des calculateurs clairs et rapides.',
      en: 'Compare budget, savings, tax and investing scenarios with clear and fast calculators.',
    },
    seoText: {
      fr: [
        "La categorie Finance personnelle de Calcery regroupe des calculateurs concrets pour prendre des decisions plus sereines au quotidien. Au lieu de travailler a l'intuition, vous visualisez l'impact reel de vos choix: depenses fixes, epargne mensuelle, fiscalite, rendement a long terme. L'objectif n'est pas d'ajouter de la complexite, mais de transformer des questions vagues en chiffres actionnables. En quelques minutes, vous pouvez tester plusieurs hypotheses et identifier l'option la plus adaptee a votre situation.",
        "Cette approche est utile pour les profils debutants comme pour les utilisateurs plus avances. Si vous demarrez, le calculateur de budget mensuel vous aide a poser une base saine. Si vous avez deja des habitudes financieres, les outils d'epargne automatique et d'interets composes permettent d'optimiser votre trajectoire sur 12, 24 ou 60 mois. Vous gagnez du temps, vous eliminez les erreurs de calcul manuel, et vous comparez des scenarios de maniere coherente.",
        "Nous avons aussi integre un calculateur d'impot sur le revenu pour estimer rapidement un ordre de grandeur fiscal. Il ne remplace pas un conseil professionnel, mais il vous donne une vue claire avant declaration, investissement ou changement de revenus. Coupler ce calcul avec votre budget global vous aide a anticiper votre tresorerie sans mauvaise surprise. Cette logique est essentielle pour lisser vos charges et maintenir un taux d'epargne stable tout au long de l'annee.",
        "Chaque outil est pense pour une utilisation mobile et desktop, sans inscription obligatoire et avec une interface lisible. Vous pouvez revenir regulierement, ajuster vos donnees et suivre votre progression. En structurant vos decisions avec des calculateurs fiables, vous passez d'une gestion reactive a une gestion proactive. C'est exactement la valeur de cette categorie: vous donner des reperes concrets, repetables, et adaptes a vos objectifs financiers reels."
      ],
      en: [
        "Calcery's Personal finance category brings together practical calculators designed to support clearer day-to-day decisions. Instead of relying on rough guesses, you can measure the real impact of your choices across cash flow, savings, taxation and long-term growth. The goal is not to overwhelm users with complexity, but to convert abstract questions into concrete numbers you can act on quickly. In just a few minutes, you can compare multiple scenarios and choose the option that best fits your priorities.",
        "This structure works for both beginners and advanced users. If you are starting from scratch, the monthly budget calculator helps establish a realistic baseline. If you already track your finances, the automatic savings and compound interest tools help optimize your trajectory over 12, 24 or 60 months. You save time, reduce spreadsheet friction, and keep comparisons consistent across different assumptions and timelines.",
        "We also include an income tax calculator to provide a fast first-pass estimate before planning major decisions. It does not replace professional advice, but it gives useful context before filing, investing or adjusting your salary strategy. When combined with your budget view, tax estimation helps smooth cash flow and avoid avoidable end-of-year pressure. This is especially useful for households that want better predictability without adding heavy software.",
        "All tools are built for mobile and desktop, with no required account and a clear interface focused on execution. You can revisit results, adjust inputs, and track improvement over time. By structuring your decisions with reliable calculators, you move from reactive money management to proactive planning. That is the core purpose of this category: practical, repeatable financial clarity that supports real goals and better long-term outcomes."
      ],
    },
    ctaLabel: {
      fr: 'Explorer les outils finance',
      en: 'Explore finance tools',
    },
  },
  {
    key: 'health',
    slug: { fr: 'sante', en: 'health' },
    name: { fr: 'Sante', en: 'Health' },
    h1: {
      fr: 'Calculateurs sante et prevention',
      en: 'Health and prevention calculators',
    },
    title: {
      fr: 'Sante: outils de suivi et estimation pratique | Calcery',
      en: 'Health tools for practical tracking and estimates | Calcery',
    },
    description: {
      fr: 'Des calculateurs sante pour suivre vos objectifs, habitudes et indicateurs utiles au quotidien.',
      en: 'Health calculators to track goals, habits and useful daily indicators.',
    },
    seoText: {
      fr: [
        "La categorie Sante est pensee pour offrir des calculateurs simples relies a des objectifs concrets: prevention, habitudes et suivi personnel. L'idee est de rendre les indicateurs sante plus accessibles, sans jargon inutile. Beaucoup d'utilisateurs veulent comprendre rapidement une estimation, visualiser une progression, puis ajuster leurs habitudes de maniere pragmatique. Cette section sera construite dans cette logique: claire, pratique et utilisable sans barriere technique.",
        "Dans une approche preventive, les outils numeriques servent avant tout a mieux s'organiser. Un bon calculateur n'a pas vocation a remplacer un professionnel, mais a aider a structurer des decisions quotidiennes: rythme de suivi, objectifs raisonnables, priorites a court terme. Nous privilegions des interfaces courtes, des explications lisibles et des resultats immediats. Ce cadre permet d'eviter les interpretations approximatives et facilite une utilisation reguliere sur mobile comme sur desktop.",
        "Calcery appliquera les memes standards de qualite a cette categorie que sur les outils finance: rapidite, lisibilite, et usage sans friction. Les futurs calculateurs sante seront classes par cas d'usage, avec une presentation pedagogique pour que chacun comprenne ce que mesure l'outil et comment exploiter le resultat. Nous prevoirons aussi des avertissements explicites lorsque des limites d'interpretation existent, afin de maintenir une information responsable.",
        "L'objectif final est de proposer une boite a outils utile dans la vraie vie: des estimateurs qui aident a suivre des routines, a fixer des objectifs mesurables et a garder une vision coherente dans le temps. Cette categorie evoluera progressivement avec de nouveaux modules, tout en conservant la meme promesse Calcery: des calculateurs actionnables, rapides et adaptes a des besoins concrets."
      ],
      en: [
        "The Health category is designed to provide simple calculators connected to practical goals: prevention, habits and personal tracking. The focus is to make useful health indicators easier to understand without unnecessary jargon. Most users want fast estimates, clear progress signals and actionable next steps. This section will be built around that expectation: practical, readable and immediately useful for everyday decisions.",
        "In a prevention-oriented workflow, digital tools are most valuable when they help people organize consistent routines. A calculator should not replace medical professionals, but it can support daily planning through realistic targets, clear intervals and better self-monitoring. We prioritize short interfaces, clear assumptions and immediate outputs. This reduces interpretation mistakes and makes regular use easier on both mobile and desktop devices.",
        "Calcery will apply the same quality standards here as in our finance tools: speed, clarity and low-friction usage. Upcoming health calculators will be organized by use case, with explanatory content so users understand what is measured and how to interpret each result responsibly. We will also keep transparent disclaimers whenever limits apply, ensuring trustworthy and balanced guidance.",
        "Our long-term goal is a practical toolkit that supports real behavior change: calculators that help users track routines, set measurable targets and stay consistent over time. This category will grow progressively with new modules while keeping the same Calcery promise: fast, actionable tools designed for real-world decisions."
      ],
    },
    ctaLabel: {
      fr: 'Voir les categories disponibles',
      en: 'Browse available categories',
    },
  },
  {
    key: 'realEstate',
    slug: { fr: 'immobilier', en: 'real-estate' },
    name: { fr: 'Immobilier', en: 'Real estate' },
    h1: {
      fr: 'Calculateurs immobilier',
      en: 'Real estate calculators',
    },
    title: {
      fr: 'Immobilier: simuler vos projets et couts cles | Calcery',
      en: 'Real estate calculators for planning and cost scenarios | Calcery',
    },
    description: {
      fr: 'Des calculateurs immobiliers pour estimer budget, mensualites et scenarios d achat ou de location.',
      en: 'Real estate calculators for budget, monthly payment and buy-vs-rent scenarios.',
    },
    seoText: {
      fr: [
        "La categorie Immobilier regroupera des calculateurs utiles pour preparer un achat, comparer une location ou anticiper les charges d'un bien. Les decisions immobilieres engagent souvent sur plusieurs annees, ce qui rend les estimations rapides mais fiables indispensables. Le but de cette section est de vous aider a visualiser les ordres de grandeur avant toute demarche: mensualite, cout global, marge de securite, impact d'un apport et sensibilite aux taux.",
        "Un bon simulateur immobilier doit etre lisible et flexible. Selon votre profil, les priorites peuvent varier: capacite d'emprunt, ratio d'endettement, cout des travaux, ou comparaison entre plusieurs villes. Nous structurons cette categorie autour de cas d'usage concrets pour eviter les ecrans trop techniques. Vous pourrez ajuster les parametres principaux, observer les effets immediats et garder un cadre coherent pour arbitrer vos options avec plus de recul.",
        "Cette approche ne remplace pas un courtier, un notaire ou un conseiller financier, mais elle permet d'arriver mieux prepare aux echanges professionnels. En pratique, disposer d'une estimation claire avant rendez-vous facilite les decisions et reduit les erreurs de cadrage. Nous ajouterons egalement des explications simples sur les hypotheses de calcul, afin que chaque resultat soit interprete dans son contexte et avec le bon niveau de prudence.",
        "La categorie evoluera avec des modules specialises: frais annexes, rentabilite locative, projection de charges et scenarios de financement. L'objectif reste constant: transformer un sujet souvent percu comme complexe en decisions structurees, mesurables et comparables. En centralisant ces outils dans un parcours clair, Calcery vous aide a preparer vos projets immobiliers avec davantage de visibilite et de serenite."
      ],
      en: [
        "The Real estate category will include calculators built to support purchase planning, rental comparisons and cost forecasting. Property decisions usually involve long commitments, so fast but reliable estimates are essential. This section is designed to help users understand key numbers early: monthly payment ranges, total cost, safety margins, down payment impact and sensitivity to interest rates before entering a formal process.",
        "An effective real estate calculator must stay both clear and flexible. Priorities differ by profile: borrowing capacity, debt ratio, renovation budget or city-to-city comparisons. We organize this category around practical use cases instead of dense technical flows. Users will be able to adjust core assumptions, observe immediate effects and compare options with a consistent framework that supports better decision quality.",
        "These tools do not replace mortgage brokers, legal advisors or financial professionals, but they improve preparation before those conversations. In practice, arriving with realistic estimates reduces friction and helps focus on the right questions. We will provide clear notes about assumptions and limits so each output can be interpreted responsibly and used as a planning reference rather than a guaranteed prediction.",
        "The category will expand with focused modules for additional fees, rental yield, operating costs and financing scenarios. The objective remains the same: convert a complex topic into structured, measurable and comparable decisions. By centralizing these tools in a clean workflow, Calcery helps users prepare real estate projects with stronger clarity and better long-term confidence."
      ],
    },
    ctaLabel: {
      fr: 'Explorer les autres categories',
      en: 'Explore other categories',
    },
  },
  {
    key: 'dailyLife',
    slug: { fr: 'vie-pratique', en: 'daily-life' },
    name: { fr: 'Vie pratique', en: 'Daily life' },
    h1: {
      fr: 'Calculateurs vie pratique',
      en: 'Daily life calculators',
    },
    title: {
      fr: 'Vie pratique: calculateurs utiles au quotidien | Calcery',
      en: 'Daily life calculators for everyday decisions | Calcery',
    },
    description: {
      fr: 'Des outils rapides pour les decisions quotidiennes: partage, pourboire et optimisation des petites depenses.',
      en: 'Fast tools for everyday decisions: split bills, tipping and optimizing small recurring expenses.',
    },
    seoText: {
      fr: [
        "La categorie Vie pratique rassemble des calculateurs utilises dans des situations concretes du quotidien, la ou l'on veut une reponse rapide et fiable. Plutot que d'ouvrir une feuille de calcul pour une operation simple, vous obtenez un resultat clair en quelques secondes. Cette categorie couvre notamment le partage d'addition, le pourboire et l'impact des petites depenses recurrentes, avec une interface construite pour etre comprise immediatement.",
        "Ces decisions paraissent mineures, mais leur repetition peut generer des erreurs ou des incomprehensions. Un partage mal calcule cree des tensions, un pourboire estime au hasard manque de coherence, et des micro-depenses non suivies fragilisent le budget mensuel. Les outils proposes ici reduisent ces frictions en standardisant la methode de calcul. Chacun peut verifier les chiffres, comparer des scenarios et obtenir une base commune pour decider rapidement.",
        "L'avantage de cette approche est la simplicite operationnelle: peu de champs, une sortie lisible, et des hypotheses transparentes. Vous pouvez utiliser ces calculateurs en situation reelle, sur mobile, sans inscription et sans courbe d'apprentissage. Ils s'integrent naturellement avec la categorie Finance personnelle lorsque vous souhaitez transformer un resultat ponctuel en plan d'action plus large, par exemple en reinjectant les economies realisees dans un objectif d'epargne.",
        "En structurant ces usages du quotidien, vous gagnez du temps et vous ameliorez la qualite de vos decisions sur le long terme. Vie pratique n'est pas une categorie secondaire: c'est souvent le point d'entree le plus concret vers une meilleure gestion globale. Avec des outils clairs et repetables, vous eliminez l'approximation et vous gardez le controle dans des situations tres frequentes de la vie courante."
      ],
      en: [
        "The Daily life category groups calculators used in common real-world situations where people need quick, reliable answers. Instead of opening a spreadsheet for a simple operation, users get a clear result in seconds. This category includes bill splitting, tipping and small recurring expense analysis, all built with interfaces that are easy to understand at first glance and fast to use on mobile.",
        "These decisions may look minor, but repeated uncertainty creates friction over time. Poor split calculations can cause group tension, random tipping decisions reduce consistency, and untracked micro-spending weakens monthly control. The tools in this section reduce that friction by standardizing the method. Everyone can verify the numbers, compare options and align around a shared result before taking action.",
        "The key benefit is operational simplicity: few inputs, readable outputs and transparent assumptions. You can use these calculators in real contexts, without signup and without onboarding overhead. They also connect naturally with Personal finance workflows when you want to convert isolated savings into broader planning, such as reallocating daily optimizations toward a recurring savings target.",
        "By structuring everyday decisions, you save time and improve long-term consistency. Daily life is not a secondary category; for many users, it is the most practical entry point to better overall money management. With clear, repeatable tools, you replace rough approximations with confident decisions in situations that happen every week."
      ],
    },
    ctaLabel: {
      fr: 'Utiliser les outils vie pratique',
      en: 'Use daily life tools',
    },
  },
  {
    key: 'home',
    slug: { fr: 'maison-travaux', en: 'home' },
    name: { fr: 'Maison et travaux', en: 'Home and projects' },
    h1: {
      fr: 'Calculateurs maison et travaux',
      en: 'Home and project calculators',
    },
    title: {
      fr: 'Maison et travaux: estimer couts et priorites | Calcery',
      en: 'Home calculators to estimate costs and priorities | Calcery',
    },
    description: {
      fr: 'Des calculateurs pour prioriser vos travaux, estimer budgets et planifier vos projets maison.',
      en: 'Calculators to prioritize renovation plans, estimate budgets and manage home projects.',
    },
    seoText: {
      fr: [
        "La categorie Maison et travaux vise a simplifier la preparation de projets domestiques souvent couteux et difficiles a prioriser. Entre renovation, entretien, ameublement et arbitrages budgetaires, il est utile de disposer d'outils rapides pour estimer les ordres de grandeur. Cette section sera structuree autour de scenarios concrets afin d'aider a decider quoi faire, quand le faire et avec quel niveau de depense acceptable.",
        "Dans la pratique, la difficulte vient rarement d'un calcul unique, mais de l'enchainement de choix: urgences techniques, confort, valorisation du bien, disponibilite de tresorerie. Les futurs calculateurs de cette categorie permettront de comparer plusieurs plans d'action et d'objectiver les compromis. L'objectif est de reduire la charge mentale en proposant des resultats lisibles et directement exploitables dans un planning realiste.",
        "Comme pour les autres categories Calcery, nous privilegions une experience fluide, sans complexite inutile. Les outils seront accessibles sur mobile et desktop, avec une presentation claire des hypotheses. Nous integreons egalement une logique pedagogique pour expliquer les limites de chaque estimation, afin d'eviter les mauvaises interpretations. Vous pourrez ainsi utiliser les resultats comme base de discussion avec artisans, prestataires ou partenaires financiers.",
        "A terme, cette categorie formera un veritable tableau de bord de decision pour l'univers maison: priorisation, projection de couts, marge de securite et suivi d'etapes. L'ambition est simple: transformer des projets souvent diffuses en trajectoires chiffrrees et comparables. Avec des calculateurs pratiques et coherents, vous avancez plus sereinement dans vos travaux et gardez la maitrise de votre budget global."
      ],
      en: [
        "The Home and projects category is designed to simplify planning for household decisions that are often costly and difficult to prioritize. Renovation, maintenance, furnishing and budget trade-offs all require fast estimates to stay under control. This section will be structured around practical scenarios so users can decide what to do, when to do it and how much spending remains realistic at each stage.",
        "In real life, complexity rarely comes from one single calculation. It comes from a sequence of choices: urgent repairs, comfort upgrades, property value impact and cash-flow constraints. Future calculators in this category will help compare action plans and make trade-offs explicit. The goal is to reduce decision fatigue by providing outputs that are easy to read and directly usable in a realistic timeline.",
        "As with all Calcery categories, we focus on speed, clarity and low friction. Tools will be available on mobile and desktop with transparent assumptions and concise explanations. We will also include guidance on interpretation limits to prevent overconfidence in rough estimates. This makes outputs useful as a preparation layer before discussing scope and pricing with contractors or financial partners.",
        "Over time, this category will evolve into a practical decision dashboard for home projects: prioritization, cost projections, safety margins and phased execution. The ambition is straightforward: turn scattered ideas into measurable, comparable plans. With practical calculators and consistent methodology, users can move forward on home projects with more confidence and better budget control."
      ],
    },
    ctaLabel: {
      fr: 'Explorer les categories actives',
      en: 'Explore active categories',
    },
  },
  {
    key: 'education',
    slug: { fr: 'education', en: 'education' },
    name: { fr: 'Education', en: 'Education' },
    h1: {
      fr: 'Calculateurs education et apprentissage',
      en: 'Education and learning calculators',
    },
    title: {
      fr: 'Education: outils de planification et progression | Calcery',
      en: 'Education calculators for planning and progress | Calcery',
    },
    description: {
      fr: 'Des outils education pour planifier budgets d apprentissage et suivre vos objectifs de progression.',
      en: 'Education tools for learning budgets and progress planning.',
    },
    seoText: {
      fr: [
        "La categorie Education est destinee aux utilisateurs qui souhaitent structurer leurs objectifs d'apprentissage avec des reperes concrets. Qu'il s'agisse de formation continue, de preparation d'examen ou de planification de ressources, les calculateurs peuvent aider a traduire un objectif general en plan d'action mesurable. Cette section sera developpee pour rendre la planification plus simple et plus realiste, sans lourdeur technique.",
        "Un parcours d'apprentissage efficace repose sur la regularite, la priorisation et l'allocation de moyens adaptes. Les futurs outils education de Calcery aideront a estimer l'effort necessaire, a organiser les etapes et a comparer plusieurs rythmes de progression. L'idee est d'eviter les plans trop ambitieux ou trop flous en proposant des calculateurs lisibles qui mettent en evidence les parametres importants et les compromis possibles.",
        "Nous appliquerons la meme exigence de clarte que sur les autres categories: interfaces courtes, sorties comprehensibles, logique mobile-first et explications pedagogiques. Chaque module sera concu pour etre utile en situation reelle, que vous pilotiez un projet personnel ou un plan de formation plus structure. Les resultats ne remplaceront pas un accompagnement specialise, mais fourniront un cadre concret pour prendre de meilleures decisions.",
        "A long terme, cette categorie a vocation a devenir un espace d'aide a la progression continue: planification, suivi d'avancement, gestion des contraintes et arbitrage des priorites. En combinant methodologie simple et outils pratiques, Calcery veut faciliter l'apprentissage dans la duree. Vous pourrez ainsi transformer des intentions en trajectoires claires, avec une vision chifree de vos objectifs educationnels."
      ],
      en: [
        "The Education category is built for users who want to structure learning goals with practical metrics. Whether the objective is upskilling, certification preparation or long-term study planning, calculators can turn broad intentions into measurable execution plans. This section will be developed to make planning simpler and more realistic, without forcing users into complex technical workflows.",
        "Effective learning progress depends on consistency, prioritization and resource allocation. Upcoming Calcery education tools will help estimate required effort, organize milestones and compare pacing options. The purpose is to avoid plans that are either overly ambitious or too vague by providing clear calculators that highlight the variables that matter and the trade-offs behind each strategy.",
        "We will apply the same clarity standards used across the platform: short interfaces, readable outputs, mobile-first usage and concise educational guidance. Each module is designed for practical real-world use, whether you are managing a personal learning objective or a more structured training roadmap. Results are not a substitute for specialized coaching, but they provide a strong framework for better decisions.",
        "Over time, this category is intended to become a continuous progress workspace: planning, tracking, constraint management and priority balancing. By combining practical tools with simple methodology, Calcery aims to make long-term learning easier to sustain. Users can move from intention to execution with clearer milestones and measurable educational outcomes."
      ],
    },
    ctaLabel: {
      fr: 'Voir les outils disponibles',
      en: 'See available tools',
    },
  },
];

export const CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'budget-mensuel',
    category: 'finance',
    icon: '💰',
    name: { fr: 'Budget mensuel', en: 'Monthly budget' },
    title: {
      fr: 'Calculateur budget mensuel gratuit',
      en: 'Free monthly budget calculator',
    },
    description: {
      fr: 'Calculez facilement votre budget mensuel pour mieux gerer vos finances.',
      en: 'Calculate your monthly budget to make better financial decisions.',
    },
    metaTitle: {
      fr: 'Calculateur budget mensuel | Finance personnelle Calcery',
      en: 'Monthly budget calculator | Personal finance Calcery',
    },
    metaDescription: {
      fr: 'Estimez revenus, depenses et reste a vivre avec un outil budget rapide et clair.',
      en: 'Estimate income, expenses and remaining cash with a clear monthly budget tool.',
    },
    faqs: {
      fr: [
        { question: "Qu'est-ce qu'un budget mensuel ?", answer: "Une estimation claire de vos revenus et depenses sur un mois." },
        { question: 'Pourquoi le calculer ?', answer: 'Pour mieux piloter vos decisions et eviter les decouverts.' },
        { question: 'Le resultat est-il precis ?', answer: 'Oui, selon la qualite des donnees que vous saisissez.' },
        { question: 'Puis-je inclure des revenus variables ?', answer: 'Oui, utilisez une moyenne mensuelle realiste.' },
        { question: 'Ce calculateur est-il gratuit ?', answer: 'Oui, sans inscription obligatoire.' },
      ],
      en: [
        { question: 'What is a monthly budget?', answer: 'A clear estimate of your income and expenses over one month.' },
        { question: 'Why calculate it?', answer: 'To make better day-to-day decisions and avoid cash-flow stress.' },
        { question: 'Is the result accurate?', answer: 'It is as reliable as the values you provide.' },
        { question: 'Can I include variable income?', answer: 'Yes, use a realistic monthly average.' },
        { question: 'Is this tool free?', answer: 'Yes, and no signup is required.' },
      ],
    },
    tips: {
      fr: [
        'Incluez revenus fixes et variables pour une vision complete.',
        'Classez les depenses essentielles et discretionnaires.',
        'Ajustez votre budget tous les mois selon la realite.',
      ],
      en: [
        'Include both fixed and variable income for a complete view.',
        'Separate essential spending from optional spending.',
        'Review your budget monthly and adjust quickly.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'epargne-automatique',
    category: 'finance',
    icon: '📈',
    name: { fr: 'Epargne automatique', en: 'Automatic savings' },
    title: {
      fr: 'Calculateur epargne automatique gratuit',
      en: 'Free automatic savings calculator',
    },
    description: {
      fr: 'Calculez votre plan d epargne pour atteindre vos objectifs financiers.',
      en: 'Estimate the monthly contribution needed to reach your savings goal.',
    },
    metaTitle: {
      fr: 'Calculateur epargne automatique | Finance personnelle Calcery',
      en: 'Automatic savings calculator | Personal finance Calcery',
    },
    metaDescription: {
      fr: 'Projetez votre epargne mensuelle et la duree necessaire pour atteindre votre objectif.',
      en: 'Project monthly savings and estimate time needed to reach your target.',
    },
    faqs: {
      fr: [
        { question: "Comment fixer un objectif d'epargne ?", answer: 'Definissez un montant cible et une date realiste.' },
        { question: 'Pourquoi automatiser ?', answer: "L'automatisation reduit les oublis et renforce la regularite." },
        { question: 'Puis-je ajuster chaque mois ?', answer: 'Oui, adaptez selon votre tresorerie.' },
        { question: 'Faut-il commencer petit ?', answer: 'Oui, la constance compte plus que le montant initial.' },
        { question: 'Ce calcul prend-il en compte les interets ?', answer: 'Vous pouvez les integrer dans vos scenarios.' },
      ],
      en: [
        { question: 'How do I set a savings target?', answer: 'Choose a realistic target amount and timeline.' },
        { question: 'Why automate savings?', answer: 'Automation improves consistency and reduces missed contributions.' },
        { question: 'Can I adjust monthly?', answer: 'Yes, adapt contributions to your cash flow.' },
        { question: 'Should I start small?', answer: 'Yes, consistency matters more than starting big.' },
        { question: 'Are returns included?', answer: 'You can test scenarios with or without returns.' },
      ],
    },
    tips: {
      fr: [
        "Programmez le virement juste apres la date d'entree de revenu.",
        'Commencez avec un montant tenable puis augmentez progressivement.',
        'Associez cet outil a votre budget mensuel pour rester coherent.',
      ],
      en: [
        'Schedule transfers right after income arrives.',
        'Start with a sustainable amount and increase gradually.',
        'Use this together with your monthly budget for consistency.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'interets-composes',
    category: 'finance',
    icon: '📊',
    name: { fr: 'Interets composes', en: 'Compound interest' },
    title: {
      fr: 'Calculateur interets composes gratuit',
      en: 'Free compound interest calculator',
    },
    description: {
      fr: 'Simulez la croissance de votre capital sur le long terme.',
      en: 'Simulate long-term capital growth with compound interest.',
    },
    metaTitle: {
      fr: 'Calculateur interets composes | Projection investissement Calcery',
      en: 'Compound interest calculator | Investment projection Calcery',
    },
    metaDescription: {
      fr: 'Visualisez la croissance de votre epargne selon taux, duree et versements periodiques.',
      en: 'Visualize savings growth based on rate, duration and recurring contributions.',
    },
    faqs: {
      fr: [
        { question: "Qu'est-ce que l'interet compose ?", answer: 'Des interets calcules sur le capital et les interets deja acquis.' },
        { question: 'Pourquoi est-ce puissant ?', answer: 'Parce que la croissance accelere avec le temps.' },
        { question: 'Quelle duree simuler ?', answer: 'Testez 5, 10, 20 ans pour comparer les effets.' },
        { question: 'Quel taux utiliser ?', answer: 'Utilisez un scenario prudent, median et ambitieux.' },
        { question: 'Les versements mensuels sont-ils utiles ?', answer: 'Oui, ils amplifient fortement le resultat final.' },
      ],
      en: [
        { question: 'What is compound interest?', answer: 'Interest earned on both principal and accumulated interest.' },
        { question: 'Why is it powerful?', answer: 'Because growth accelerates over time.' },
        { question: 'What horizon should I test?', answer: 'Compare 5, 10 and 20-year scenarios.' },
        { question: 'Which rate should I use?', answer: 'Run conservative, baseline and optimistic assumptions.' },
        { question: 'Do recurring contributions help?', answer: 'Yes, they significantly increase long-term outcomes.' },
      ],
    },
    tips: {
      fr: [
        'Commencez tot pour maximiser l effet du temps.',
        'Comparez plusieurs frequences de versement.',
        'Restez prudent sur les hypotheses de rendement.',
      ],
      en: [
        'Start early to maximize the time effect.',
        'Compare different contribution frequencies.',
        'Keep return assumptions conservative.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'impot-revenu',
    category: 'finance',
    icon: '🧾',
    name: { fr: 'Impot sur le revenu', en: 'Income tax' },
    title: {
      fr: 'Calculateur impot sur le revenu gratuit',
      en: 'Free income tax calculator',
    },
    description: {
      fr: 'Estimez rapidement votre impot annuel avec une approche claire.',
      en: 'Estimate your annual income tax with a clear and simple approach.',
    },
    metaTitle: {
      fr: 'Calculateur impot revenu | Estimation fiscale Calcery',
      en: 'Income tax calculator | Tax estimate Calcery',
    },
    metaDescription: {
      fr: 'Simulez un ordre de grandeur de votre impot pour mieux anticiper votre budget annuel.',
      en: 'Simulate a first-pass income tax estimate to plan your annual budget.',
    },
    faqs: {
      fr: [
        { question: "Ce calcul remplace-t-il l'administration ?", answer: "Non, c'est une estimation informative." },
        { question: 'Pourquoi simuler en avance ?', answer: 'Pour anticiper votre tresorerie et eviter les surprises.' },
        { question: 'Le quotient familial est-il pris en compte ?', answer: 'Oui, selon les parametres proposes.' },
        { question: 'Puis-je comparer plusieurs scenarios ?', answer: 'Oui, modifiez revenus et situation familiale.' },
        { question: 'Dois-je consulter un expert ?', answer: 'Oui pour toute situation fiscale complexe.' },
      ],
      en: [
        { question: 'Does this replace official tax calculation?', answer: 'No, this is an informational estimate.' },
        { question: 'Why simulate in advance?', answer: 'To improve annual cash-flow planning.' },
        { question: 'Is household quotient considered?', answer: 'Yes, based on available parameters.' },
        { question: 'Can I compare scenarios?', answer: 'Yes, adjust income and family assumptions.' },
        { question: 'Should I consult a professional?', answer: 'Yes for complex tax situations.' },
      ],
    },
    tips: {
      fr: [
        'Testez au moins trois scenarios de revenus.',
        'Integrez le resultat a votre budget mensuel.',
        'Gardez une marge de securite sur vos estimations.',
      ],
      en: [
        'Run at least three income scenarios.',
        'Integrate estimates into your monthly budget view.',
        'Keep a safety margin in your planning.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'economies-petites-depenses',
    category: 'dailyLife',
    icon: '☕',
    name: { fr: 'Economies petites depenses', en: 'Small expense savings' },
    title: {
      fr: 'Calculateur economies petites depenses gratuit',
      en: 'Free small expense savings calculator',
    },
    description: {
      fr: 'Estimez l impact cumule de vos petites depenses repetees.',
      en: 'Estimate the cumulative impact of recurring small expenses.',
    },
    metaTitle: {
      fr: 'Calculateur petites depenses | Vie pratique Calcery',
      en: 'Small expense calculator | Daily life Calcery',
    },
    metaDescription: {
      fr: 'Mesurez ce que vos micro-depenses coutent sur 1, 3 ou 5 ans et optimisez votre budget.',
      en: 'Measure what recurring micro-spending costs over 1, 3 or 5 years.',
    },
    faqs: {
      fr: [
        { question: 'Pourquoi suivre les petites depenses ?', answer: 'Parce que leur cumul peut etre tres eleve.' },
        { question: 'Faut-il tout supprimer ?', answer: 'Non, priorisez les depenses sans vraie valeur.' },
        { question: 'Quel horizon utiliser ?', answer: 'Testez 12 mois puis 3 ans pour visualiser.' },
        { question: 'Puis-je combiner avec un objectif epargne ?', answer: 'Oui, redirigez les montants economises.' },
        { question: 'Est-ce utile pour un couple ?', answer: 'Oui, pour aligner les habitudes communes.' },
      ],
      en: [
        { question: 'Why track small expenses?', answer: 'Because recurring micro-costs add up quickly.' },
        { question: 'Do I need to remove everything?', answer: 'No, prioritize low-value spending first.' },
        { question: 'What time horizon should I use?', answer: 'Start with 12 months, then compare 3 years.' },
        { question: 'Can I link this to savings goals?', answer: 'Yes, redirect saved amounts into your plan.' },
        { question: 'Is it useful for couples?', answer: 'Yes, it helps align shared habits.' },
      ],
    },
    tips: {
      fr: [
        'Commencez par deux ou trois habitudes recurrentes.',
        'Redirigez automatiquement les montants economises.',
        'Revoyez vos categories chaque mois.',
      ],
      en: [
        'Start with two or three recurring habits.',
        'Automatically redirect savings into a target account.',
        'Review spending categories monthly.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'pourboire',
    category: 'dailyLife',
    icon: '🍽️',
    name: { fr: 'Pourboire', en: 'Tip calculator' },
    title: {
      fr: 'Calculateur pourboire gratuit',
      en: 'Free tip calculator',
    },
    description: {
      fr: 'Calculez rapidement le pourboire, le total et le montant par personne.',
      en: 'Quickly calculate tip amount, total bill and per-person total.',
    },
    metaTitle: {
      fr: 'Calculateur pourboire | Vie pratique Calcery',
      en: 'Tip calculator | Daily life Calcery',
    },
    metaDescription: {
      fr: 'Simulez un pourboire en quelques secondes avec partage et total final.',
      en: 'Simulate tip amount in seconds with final total and split option.',
    },
    faqs: {
      fr: [
        { question: 'Le pourboire est-il obligatoire ?', answer: 'Non, il reste optionnel selon le contexte.' },
        { question: 'Quel pourcentage choisir ?', answer: 'Souvent entre 5 et 10% selon le service.' },
        { question: 'Puis-je arrondir ?', answer: 'Oui, pour simplifier le paiement.' },
        { question: 'Fonctionne-t-il a plusieurs ?', answer: 'Oui, le total par personne est calcule.' },
        { question: 'Le service inclus change quoi ?', answer: 'Vous pouvez ajuster le pourcentage librement.' },
      ],
      en: [
        { question: 'Is tipping mandatory?', answer: 'No, it depends on local context and service quality.' },
        { question: 'What percentage should I use?', answer: 'Typically 5% to 10% based on service.' },
        { question: 'Can I round values?', answer: 'Yes, rounding makes payment easier.' },
        { question: 'Does it support groups?', answer: 'Yes, per-person totals are included.' },
        { question: 'What if service is already included?', answer: 'You can still adjust percentage as needed.' },
      ],
    },
    tips: {
      fr: [
        'Definissez le pourcentage avant de partager la note.',
        'Arrondissez le montant final pour simplifier.',
        'Restez coherent avec le niveau de service recu.',
      ],
      en: [
        'Agree on tip policy before splitting the bill.',
        'Round final totals for easier payment.',
        'Keep decisions aligned with service quality.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'partage-addition',
    category: 'dailyLife',
    icon: '👥',
    name: { fr: "Partage d'addition", en: 'Split bill' },
    title: {
      fr: 'Calculateur partage addition gratuit',
      en: 'Free split bill calculator',
    },
    description: {
      fr: "Partagez facilement l'addition entre amis, avec ou sans pourboire.",
      en: 'Split any bill fairly, with optional tip and rounding.',
    },
    metaTitle: {
      fr: 'Calculateur partage addition | Vie pratique Calcery',
      en: 'Split bill calculator | Daily life Calcery',
    },
    metaDescription: {
      fr: 'Repartissez une addition rapidement entre plusieurs personnes avec un calcul transparent.',
      en: 'Split a bill quickly across multiple people with transparent calculations.',
    },
    faqs: {
      fr: [
        { question: 'Comment partager une addition ?', answer: 'Entrez le total, le nombre de personnes et vos options.' },
        { question: 'Le pourboire est-il pris en compte ?', answer: 'Oui, il peut etre ajoute au total.' },
        { question: 'Puis-je faire une repartition egale ?', answer: 'Oui, en un clic.' },
        { question: 'Et si une personne paie plus ?', answer: 'Vous pouvez ajuster manuellement selon votre accord.' },
        { question: 'Convient-il aux groupes ?', answer: 'Oui, pour de petites ou grandes tables.' },
      ],
      en: [
        { question: 'How do I split a bill?', answer: 'Enter total amount, number of people and options.' },
        { question: 'Is tip included?', answer: 'Yes, you can include tip in total.' },
        { question: 'Can I split equally?', answer: 'Yes, with one click.' },
        { question: 'What if someone pays more?', answer: 'You can adjust manually based on your agreement.' },
        { question: 'Is it suitable for larger groups?', answer: 'Yes, for both small and large groups.' },
      ],
    },
    tips: {
      fr: [
        'Validez le mode de repartition avant le calcul.',
        'Integrez le pourboire au total pour plus de clarte.',
        'Annoncez le montant final par personne directement.',
      ],
      en: [
        'Agree on split rules before calculating.',
        'Include tip in total for full transparency.',
        'Share final per-person amounts clearly.',
      ],
    },
    updatedAt: '2026-02-10',
  },
  {
    slug: 'taux-endettement',
    category: 'finance',
    icon: '📉',
    name: { fr: "Taux d'endettement", en: 'Debt ratio' },
    title: {
      fr: "Calculateur taux d'endettement",
      en: 'Debt ratio calculator',
    },
    description: {
      fr: "Calculez votre taux d'endettement mensuel en fonction de vos revenus et charges.",
      en: 'Calculate your monthly debt ratio from income and recurring charges.',
    },
    metaTitle: {
      fr: "Calculateur taux d'endettement | Calcery",
      en: 'Debt ratio calculator | Calcery',
    },
    metaDescription: {
      fr: "Estimez votre taux d'endettement pour mieux piloter vos projets de credit.",
      en: 'Estimate your debt ratio to better manage borrowing decisions.',
    },
    faqs: {
      fr: [
        { question: "Qu'est-ce que le taux d'endettement ?", answer: 'Le rapport entre vos charges de credit et vos revenus mensuels.' },
        { question: 'Pourquoi le suivre ?', answer: "Il aide a evaluer votre marge financiere avant un nouveau pret." },
        { question: 'Quel niveau viser ?', answer: 'En pratique, de nombreux dossiers visent un seuil autour de 35%.' },
      ],
      en: [
        { question: 'What is a debt ratio?', answer: 'It is the share of your monthly income used by recurring debt payments.' },
        { question: 'Why track it?', answer: 'It helps assess borrowing room before applying for a new loan.' },
        { question: 'What ratio is usually targeted?', answer: 'In many cases, lenders prefer a ratio close to 35% or below.' },
      ],
    },
    tips: {
      fr: [
        'Integrez toutes les mensualites fixes dans vos charges.',
        'Mettez a jour le calcul apres tout changement de revenu.',
        'Comparez plusieurs scenarios avant de vous engager.',
      ],
      en: [
        'Include all fixed monthly debt payments.',
        'Update calculations whenever income changes.',
        'Compare scenarios before committing to new debt.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'mensualite-credit',
    category: 'finance',
    icon: '🏦',
    name: { fr: 'Mensualite de credit', en: 'Loan monthly payment' },
    title: {
      fr: 'Calculateur mensualite de credit',
      en: 'Loan monthly payment calculator',
    },
    description: {
      fr: 'Simulez une mensualite a partir du montant, du taux et de la duree.',
      en: 'Estimate monthly loan payments from principal, rate and duration.',
    },
    metaTitle: {
      fr: 'Calculateur mensualite credit | Calcery',
      en: 'Loan monthly payment calculator | Calcery',
    },
    metaDescription: {
      fr: 'Obtenez une estimation rapide de votre mensualite de pret.',
      en: 'Get a quick estimate of your monthly loan payment.',
    },
    faqs: {
      fr: [
        { question: 'Quels parametres sont necessaires ?', answer: 'Montant emprunte, taux annuel et duree du credit.' },
        { question: 'Le resultat est-il exact ?', answer: 'C est une estimation utile avant une simulation bancaire detaillee.' },
        { question: 'Puis-je tester un taux a 0% ?', answer: 'Oui, le calcul gere aussi ce cas.' },
      ],
      en: [
        { question: 'Which inputs are required?', answer: 'Principal amount, annual interest rate, and loan term.' },
        { question: 'Is the result exact?', answer: 'It is a planning estimate before a detailed bank offer.' },
        { question: 'Can I test a 0% rate?', answer: 'Yes, the calculator also handles zero-interest scenarios.' },
      ],
    },
    tips: {
      fr: [
        'Testez plusieurs durees pour voir le compromis cout / mensualite.',
        'Utilisez un taux prudent pour vos projections.',
        'Comparez ensuite avec votre taux d endettement global.',
      ],
      en: [
        'Compare several durations to evaluate payment vs. total cost.',
        'Use conservative rates for realistic planning.',
        'Then compare results with your overall debt ratio.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'pret-personnel',
    category: 'finance',
    icon: '💳',
    name: { fr: 'Pret personnel', en: 'Personal loan simulator' },
    title: {
      fr: 'Simulateur pret personnel',
      en: 'Personal loan simulator',
    },
    description: {
      fr: 'Estimez mensualite, montant rembourse et cout total de votre pret personnel.',
      en: 'Estimate monthly payment, total repayment and total cost for a personal loan.',
    },
    metaTitle: {
      fr: 'Simulateur pret personnel | Calcery',
      en: 'Personal loan simulator | Calcery',
    },
    metaDescription: {
      fr: 'Comparez rapidement les couts d un pret personnel selon la duree et le taux.',
      en: 'Quickly compare personal loan costs by duration and interest rate.',
    },
    faqs: {
      fr: [
        { question: 'Que calcule cet outil ?', answer: 'Mensualite, total rembourse et cout global du credit.' },
        { question: 'Pourquoi comparer plusieurs durees ?', answer: 'La duree influence fortement le cout total des interets.' },
        { question: 'A qui sert cette simulation ?', answer: 'A toute personne preparant un financement personnel.' },
      ],
      en: [
        { question: 'What does this tool compute?', answer: 'Monthly payment, total repayment, and total credit cost.' },
        { question: 'Why compare durations?', answer: 'Loan term has a major impact on the total interest paid.' },
        { question: 'Who is it for?', answer: 'Anyone planning personal financing decisions.' },
      ],
    },
    tips: {
      fr: [
        'Ajoutez une marge de securite dans votre budget mensuel.',
        'Evitez de simuler uniquement le meilleur taux possible.',
        'Verifiez la coherence avec vos autres charges fixes.',
      ],
      en: [
        'Keep a safety margin in your monthly budget.',
        'Do not simulate only best-case interest rates.',
        'Check consistency with your other fixed expenses.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'salaire-brut-net',
    category: 'finance',
    icon: '🧮',
    name: { fr: 'Brut vers net', en: 'Gross to net salary' },
    title: {
      fr: 'Convertisseur salaire brut vers net',
      en: 'Gross to net salary converter',
    },
    description: {
      fr: 'Obtenez une estimation rapide du salaire net a partir du brut.',
      en: 'Get a quick estimate of net salary from gross salary.',
    },
    metaTitle: {
      fr: 'Convertisseur brut net salaire | Calcery',
      en: 'Gross to net salary converter | Calcery',
    },
    metaDescription: {
      fr: 'Estimez votre salaire net mensuel a partir du brut.',
      en: 'Estimate your monthly net salary from gross salary.',
    },
    faqs: {
      fr: [
        { question: 'Le resultat est-il contractuel ?', answer: 'Non, c est une estimation informative basee sur un ratio moyen.' },
        { question: 'Pourquoi un ecart avec la fiche de paie ?', answer: 'Le statut et les cotisations reelles varient selon chaque situation.' },
        { question: 'Puis-je l utiliser pour budgeter ?', answer: 'Oui, pour une premiere projection rapide.' },
      ],
      en: [
        { question: 'Is the result contractual?', answer: 'No, this is an estimate based on an average payroll ratio.' },
        { question: 'Why can payroll differ?', answer: 'Actual deductions vary by status, contract, and contribution rules.' },
        { question: 'Can I use it for budgeting?', answer: 'Yes, as a fast first-pass estimate.' },
      ],
    },
    tips: {
      fr: [
        'Utilisez un scenario prudent pour vos decisions.',
        'Comparez ensuite avec vos bulletins recents.',
        'Mettez a jour vos calculs lors des changements de contrat.',
      ],
      en: [
        'Use conservative assumptions in planning.',
        'Compare with your recent payroll slips.',
        'Recalculate whenever contract terms change.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'salaire-net-brut',
    category: 'finance',
    icon: '🔁',
    name: { fr: 'Net vers brut', en: 'Net to gross salary' },
    title: {
      fr: 'Convertisseur salaire net vers brut',
      en: 'Net to gross salary converter',
    },
    description: {
      fr: 'Estimez le salaire brut correspondant a votre net mensuel.',
      en: 'Estimate gross salary from your monthly net salary.',
    },
    metaTitle: {
      fr: 'Convertisseur net brut salaire | Calcery',
      en: 'Net to gross salary converter | Calcery',
    },
    metaDescription: {
      fr: 'Convertissez un salaire net en estimation de salaire brut.',
      en: 'Convert net salary into an estimated gross salary.',
    },
    faqs: {
      fr: [
        { question: 'A quoi sert cet outil ?', answer: 'A estimer un niveau de brut a partir d un net cible.' },
        { question: 'Puis-je l utiliser pour negocier ?', answer: 'Oui, comme base de discussion initiale.' },
        { question: 'Le taux utilise est-il fixe ?', answer: 'Il s agit d une approximation moyenne, pas d un calcul paie complet.' },
      ],
      en: [
        { question: 'What is this tool for?', answer: 'It estimates gross salary from a desired net amount.' },
        { question: 'Can it support salary negotiation?', answer: 'Yes, as an initial reference for discussion.' },
        { question: 'Is the conversion exact?', answer: 'No, it uses an average approximation, not full payroll rules.' },
      ],
    },
    tips: {
      fr: [
        'Combinez ce calcul avec vos objectifs de budget net.',
        'Conservez une marge selon votre regime reel.',
        'Verifiez vos hypotheses avec un professionnel si besoin.',
      ],
      en: [
        'Combine this estimate with your net budget target.',
        'Keep a margin for your actual payroll framework.',
        'Validate assumptions with a professional when needed.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'tva-ht-ttc',
    category: 'finance',
    icon: '🧾',
    name: { fr: 'TVA HT TTC', en: 'VAT HT TTC' },
    title: {
      fr: 'Calcul TVA HT vers TTC et TTC vers HT',
      en: 'VAT calculator net to gross and gross to net',
    },
    description: {
      fr: 'Convertissez un montant HT ou TTC avec le taux de TVA de votre choix.',
      en: 'Convert before-tax and after-tax amounts with a custom VAT rate.',
    },
    metaTitle: {
      fr: 'Calcul TVA HT TTC | Calcery',
      en: 'VAT calculator | Calcery',
    },
    metaDescription: {
      fr: 'Outil de conversion bidirectionnelle HT / TTC avec montant TVA detaille.',
      en: 'Bidirectional VAT conversion with detailed tax amount.',
    },
    faqs: {
      fr: [
        { question: 'Puis-je convertir dans les deux sens ?', answer: 'Oui, HT vers TTC et TTC vers HT.' },
        { question: 'Le taux est-il personnalisable ?', answer: 'Oui, vous saisissez librement le taux de TVA.' },
        { question: 'Le montant TVA est-il affiche ?', answer: 'Oui, le detail de la taxe est retourne avec le resultat.' },
      ],
      en: [
        { question: 'Can I convert both ways?', answer: 'Yes, from net to gross and from gross to net.' },
        { question: 'Is VAT rate customizable?', answer: 'Yes, you can enter any VAT percentage.' },
        { question: 'Is VAT amount shown?', answer: 'Yes, the tax amount is shown with the result.' },
      ],
    },
    tips: {
      fr: [
        'Verifiez le taux applicable a votre activite.',
        'Controlez les arrondis sur vos documents finaux.',
        'Utilisez la meme logique sur tous vos devis.',
      ],
      en: [
        'Check the VAT rate relevant to your context.',
        'Review rounding on final accounting documents.',
        'Apply the same method across all quotes/invoices.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'capacite-epargne-mensuelle',
    category: 'finance',
    icon: '💶',
    name: { fr: "Capacite d'epargne", en: 'Monthly savings capacity' },
    title: {
      fr: "Calculateur capacite d'epargne mensuelle",
      en: 'Monthly savings capacity calculator',
    },
    description: {
      fr: 'Calculez votre surplus mensuel a epargner apres depenses.',
      en: 'Calculate your monthly savings surplus after expenses.',
    },
    metaTitle: {
      fr: "Capacite d'epargne mensuelle | Calcery",
      en: 'Monthly savings capacity | Calcery',
    },
    metaDescription: {
      fr: 'Visualisez votre capacite d epargne mensuelle et annuelle.',
      en: 'Visualize your monthly and yearly savings potential.',
    },
    faqs: {
      fr: [
        { question: 'Quelle formule est utilisee ?', answer: 'Revenus mensuels moins depenses mensuelles.' },
        { question: 'Pourquoi annualiser le resultat ?', answer: 'Pour visualiser rapidement votre potentiel sur 12 mois.' },
        { question: 'Peut-on avoir un resultat negatif ?', answer: 'Oui, cela signale un budget mensuel a corriger.' },
      ],
      en: [
        { question: 'Which formula is used?', answer: 'Monthly income minus monthly expenses.' },
        { question: 'Why annualize the result?', answer: 'To quickly estimate long-term impact over 12 months.' },
        { question: 'Can the result be negative?', answer: 'Yes, indicating that spending exceeds income.' },
      ],
    },
    tips: {
      fr: [
        'Mettez a jour vos depenses fixes et variables chaque mois.',
        'Affectez une partie de la capacite a un objectif concret.',
        'Suivez l evolution sur plusieurs mois pour lisser les variations.',
      ],
      en: [
        'Update fixed and variable expenses monthly.',
        'Allocate part of the surplus to a clear savings goal.',
        'Track trends across multiple months to smooth volatility.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'objectif-epargne-temps',
    category: 'finance',
    icon: '🎯',
    name: { fr: "Objectif d'epargne", en: 'Savings goal timeline' },
    title: {
      fr: "Calculateur delai objectif d'epargne",
      en: 'Savings goal timeline calculator',
    },
    description: {
      fr: 'Estimez le nombre de mois necessaires pour atteindre votre objectif.',
      en: 'Estimate how many months are needed to reach your savings target.',
    },
    metaTitle: {
      fr: "Objectif d'epargne: delai estime | Calcery",
      en: 'Savings goal timeline estimate | Calcery',
    },
    metaDescription: {
      fr: 'Calculez la duree pour atteindre un objectif d epargne selon vos versements.',
      en: 'Calculate time to target based on monthly savings contributions.',
    },
    faqs: {
      fr: [
        { question: 'Quels parametres sont pris en compte ?', answer: 'Objectif, versement mensuel, capital initial et rendement optionnel.' },
        { question: 'Puis-je inclure un taux annuel ?', answer: 'Oui, pour simuler une croissance plus realiste du capital.' },
        { question: 'Le resultat est-il arrondi ?', answer: 'Oui, en nombre de mois complets necessaires.' },
      ],
      en: [
        { question: 'Which inputs are used?', answer: 'Target, monthly contribution, initial amount, and optional annual return.' },
        { question: 'Can I include annual return?', answer: 'Yes, to simulate more realistic capital growth.' },
        { question: 'Is output rounded?', answer: 'Yes, to full months needed to reach the goal.' },
      ],
    },
    tips: {
      fr: [
        'Augmentez legerement le versement pour reduire fortement le delai.',
        'Testez plusieurs hypotheses de rendement.',
        'Gardez un scenario prudent pour vos decisions engageantes.',
      ],
      en: [
        'A small increase in contribution can reduce timeline significantly.',
        'Run multiple return assumptions.',
        'Use conservative scenarios for major decisions.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'calcul-imc',
    category: 'health',
    icon: '⚖️',
    name: { fr: 'Calcul IMC', en: 'BMI calculator' },
    title: {
      fr: 'Calculateur IMC',
      en: 'BMI calculator',
    },
    description: {
      fr: 'Calculez votre indice de masse corporelle a partir du poids et de la taille.',
      en: 'Calculate body mass index from your weight and height.',
    },
    metaTitle: {
      fr: 'Calcul IMC rapide | Calcery',
      en: 'BMI calculator | Calcery',
    },
    metaDescription: {
      fr: 'Outil IMC simple avec interpretation de la categorie de resultat.',
      en: 'Simple BMI tool with category interpretation.',
    },
    faqs: {
      fr: [
        { question: 'Que mesure l IMC ?', answer: 'Le rapport entre votre poids et votre taille au carre.' },
        { question: 'Le resultat suffit-il seul ?', answer: 'Non, il doit etre interprete dans un contexte plus large.' },
        { question: 'Peut-on suivre une evolution ?', answer: 'Oui, en recalculant regulierement dans le temps.' },
      ],
      en: [
        { question: 'What does BMI measure?', answer: 'The relationship between body weight and squared height.' },
        { question: 'Is BMI enough on its own?', answer: 'No, it should be interpreted with broader health context.' },
        { question: 'Can it track progress?', answer: 'Yes, by recalculating over time.' },
      ],
    },
    tips: {
      fr: [
        'Utilisez toujours les memes unites pour comparer.',
        'Suivez la tendance plutot qu une valeur isolee.',
        'Consultez un professionnel en cas de doute medical.',
      ],
      en: [
        'Use consistent units when comparing results.',
        'Focus on trends rather than one isolated value.',
        'Consult a professional for medical interpretation.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'besoin-calorique-journalier',
    category: 'health',
    icon: '🔥',
    name: { fr: 'Besoin calorique journalier', en: 'Daily calorie needs' },
    title: {
      fr: 'Calculateur besoin calorique journalier',
      en: 'Daily calorie needs calculator',
    },
    description: {
      fr: 'Estimez vos besoins caloriques selon age, sexe, poids, taille et activite.',
      en: 'Estimate calorie needs by age, sex, body metrics, and activity level.',
    },
    metaTitle: {
      fr: 'Besoin calorique journalier | Calcery',
      en: 'Daily calorie needs | Calcery',
    },
    metaDescription: {
      fr: 'Simulation de metabolisme de base et maintien calorique quotidien.',
      en: 'Estimate basal metabolism and daily maintenance calories.',
    },
    faqs: {
      fr: [
        { question: 'Que donne ce calcul ?', answer: 'Le metabolisme de base et un besoin calorique de maintien.' },
        { question: 'Le niveau d activite est-il important ?', answer: 'Oui, il influence fortement le resultat final.' },
        { question: 'Est-ce un conseil medical ?', answer: 'Non, c est une estimation informative.' },
      ],
      en: [
        { question: 'What does this output include?', answer: 'Basal metabolic rate and maintenance calorie estimate.' },
        { question: 'Does activity level matter?', answer: 'Yes, it has a major impact on daily calorie needs.' },
        { question: 'Is this medical advice?', answer: 'No, this is informational estimation only.' },
      ],
    },
    tips: {
      fr: [
        'Choisissez un niveau d activite realiste.',
        'Ajustez apres quelques semaines de suivi reel.',
        'Ne changez pas drastiquement vos apports sans accompagnement.',
      ],
      en: [
        'Choose a realistic activity factor.',
        'Recalibrate after tracking for a few weeks.',
        'Avoid extreme intake changes without guidance.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'poids-ideal',
    category: 'health',
    icon: '🎚️',
    name: { fr: 'Poids ideal', en: 'Ideal weight' },
    title: {
      fr: 'Calculateur poids ideal',
      en: 'Ideal weight calculator',
    },
    description: {
      fr: 'Obtenez une estimation de poids ideal selon votre taille et votre sexe.',
      en: 'Estimate ideal weight from height and sex.',
    },
    metaTitle: {
      fr: 'Poids ideal estime | Calcery',
      en: 'Estimated ideal weight | Calcery',
    },
    metaDescription: {
      fr: 'Outil simple pour une estimation indicative du poids ideal.',
      en: 'Simple tool for an indicative ideal-weight estimate.',
    },
    faqs: {
      fr: [
        { question: 'Ce chiffre est-il une cible absolue ?', answer: 'Non, il s agit d un repere indicatif.' },
        { question: 'Dois-je viser exactement ce poids ?', answer: 'Pas forcement, le contexte individuel reste prioritaire.' },
        { question: 'Puis-je suivre une progression ?', answer: 'Oui, comparez vos mesures sur la duree.' },
      ],
      en: [
        { question: 'Is this an absolute target?', answer: 'No, it is an indicative reference point.' },
        { question: 'Should I aim exactly for that number?', answer: 'Not necessarily; personal context matters first.' },
        { question: 'Can it be used for tracking?', answer: 'Yes, as a trend reference over time.' },
      ],
    },
    tips: {
      fr: [
        'Utilisez ce calcul comme repere, pas comme injonction.',
        'Priorisez votre forme globale et vos marqueurs sante.',
        'Discutez de vos objectifs avec un professionnel qualifie.',
      ],
      en: [
        'Use this estimate as guidance, not strict instruction.',
        'Prioritize overall health markers and fitness.',
        'Discuss goals with a qualified professional.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'besoin-eau-quotidien',
    category: 'health',
    icon: '💧',
    name: { fr: 'Besoin en eau quotidien', en: 'Daily water needs' },
    title: {
      fr: 'Calculateur besoin en eau quotidien',
      en: 'Daily water needs calculator',
    },
    description: {
      fr: 'Estimez votre hydratation quotidienne selon poids et activite.',
      en: 'Estimate daily hydration needs based on weight and activity.',
    },
    metaTitle: {
      fr: 'Besoin en eau quotidien | Calcery',
      en: 'Daily water needs | Calcery',
    },
    metaDescription: {
      fr: 'Simulation de volume d eau recommande par jour.',
      en: 'Estimate recommended water intake per day.',
    },
    faqs: {
      fr: [
        { question: 'Que prend en compte ce calcul ?', answer: 'Votre poids et votre niveau d activite quotidienne.' },
        { question: 'Le climat est-il inclus ?', answer: 'Non, adaptez selon chaleur, effort et contexte personnel.' },
        { question: 'Est-ce une prescription medicale ?', answer: 'Non, c est un repere d usage general.' },
      ],
      en: [
        { question: 'What inputs are used?', answer: 'Body weight and daily activity duration.' },
        { question: 'Is climate included?', answer: 'No, adjust for heat, effort, and personal context.' },
        { question: 'Is this medical prescription?', answer: 'No, this is general guidance only.' },
      ],
    },
    tips: {
      fr: [
        'Fractionnez votre hydratation sur la journee.',
        'Augmentez vos apports lors des activites longues.',
        'Surveillez les signes de deshydratation.',
      ],
      en: [
        'Spread hydration throughout the day.',
        'Increase intake during longer activity sessions.',
        'Watch for dehydration signs in daily routine.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'rythme-cardiaque-cible',
    category: 'health',
    icon: '❤️',
    name: { fr: 'Rythme cardiaque cible', en: 'Target heart rate' },
    title: {
      fr: 'Calculateur rythme cardiaque cible',
      en: 'Target heart rate calculator',
    },
    description: {
      fr: "Estimez une frequence cardiaque cible selon l'age et l intensite.",
      en: 'Estimate target training heart rate from age and intensity.',
    },
    metaTitle: {
      fr: 'Rythme cardiaque cible | Calcery',
      en: 'Target heart rate | Calcery',
    },
    metaDescription: {
      fr: 'Obtenez une cible bpm et une zone d entrainement indicative.',
      en: 'Get target bpm and an indicative training zone.',
    },
    faqs: {
      fr: [
        { question: 'Quelle formule est utilisee ?', answer: 'Base 220 - age, puis application du pourcentage d intensite.' },
        { question: 'A quoi sert la zone 50-85% ?', answer: "A definir une plage d effort generale pour l entrainement." },
        { question: 'Ce calcul suffit-il seul ?', answer: 'Non, adaptez toujours selon votre condition et avis medical.' },
      ],
      en: [
        { question: 'Which formula is used?', answer: 'Baseline 220 - age, then intensity percentage is applied.' },
        { question: 'What is the 50-85% zone for?', answer: 'It gives a general training intensity range.' },
        { question: 'Is this enough on its own?', answer: 'No, adjust to your personal condition and medical context.' },
      ],
    },
    tips: {
      fr: [
        'Commencez dans la partie basse de la zone.',
        'Montez l intensite progressivement.',
        'Arretez en cas de symptomes anormaux.',
      ],
      en: [
        'Start in the lower part of the zone.',
        'Increase intensity progressively.',
        'Stop if unusual symptoms appear.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'depense-calorique-activite',
    category: 'health',
    icon: '🏃',
    name: { fr: 'Depense calorique activite', en: 'Activity calories burned' },
    title: {
      fr: 'Calculateur depense calorique par activite',
      en: 'Calories burned by activity calculator',
    },
    description: {
      fr: 'Estimez les calories depensees selon poids, duree et type d activite.',
      en: 'Estimate calories burned from weight, duration and activity type.',
    },
    metaTitle: {
      fr: 'Depense calorique activite | Calcery',
      en: 'Activity calories burned | Calcery',
    },
    metaDescription: {
      fr: 'Simulation rapide des calories depensees pendant une activite.',
      en: 'Quick estimate of calories burned during exercise.',
    },
    faqs: {
      fr: [
        { question: 'Sur quoi repose le calcul ?', answer: 'Sur une valeur MET selon le type d activite.' },
        { question: 'Le resultat est-il exact ?', answer: 'C est une estimation moyenne, utile pour comparer des scenarios.' },
        { question: 'Puis-je changer de duree ?', answer: 'Oui, la duree influence directement la depense estimee.' },
      ],
      en: [
        { question: 'What drives the estimate?', answer: 'A MET value associated with each activity type.' },
        { question: 'Is the result exact?', answer: 'It is an average estimate useful for scenario comparison.' },
        { question: 'Can I vary duration?', answer: 'Yes, duration directly impacts estimated burn.' },
      ],
    },
    tips: {
      fr: [
        'Utilisez le meme poids de reference pour comparer.',
        'Comparez plusieurs activites a duree egale.',
        'Integrez ces donnees dans un suivi regulier.',
      ],
      en: [
        'Use the same body weight for comparisons.',
        'Compare activities at equal duration.',
        'Integrate results into regular tracking.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'capacite-emprunt-immobilier',
    category: 'realEstate',
    icon: '🏡',
    name: { fr: "Capacite d'emprunt immobilier", en: 'Mortgage borrowing capacity' },
    title: {
      fr: "Calculateur capacite d'emprunt immobilier",
      en: 'Mortgage borrowing capacity calculator',
    },
    description: {
      fr: 'Estimez votre capacite d emprunt selon revenus, charges, taux et duree.',
      en: 'Estimate borrowing capacity based on income, charges, rate, and duration.',
    },
    metaTitle: {
      fr: "Capacite d'emprunt immobilier | Calcery",
      en: 'Mortgage borrowing capacity | Calcery',
    },
    metaDescription: {
      fr: 'Simulez mensualite maximale et montant empruntable.',
      en: 'Simulate maximum monthly payment and borrowing amount.',
    },
    faqs: {
      fr: [
        { question: 'Que calcule cet outil ?', answer: 'Mensualite supportable et capital potentiellement empruntable.' },
        { question: 'Le taux d endettement est-il modifiable ?', answer: 'Oui, vous pouvez tester plusieurs hypothese de ratio.' },
        { question: 'Est-ce une offre bancaire ?', answer: 'Non, c est une estimation preparatoire.' },
      ],
      en: [
        { question: 'What does it calculate?', answer: 'Affordable monthly payment and potential borrowing amount.' },
        { question: 'Can debt ratio be changed?', answer: 'Yes, you can test different ratio assumptions.' },
        { question: 'Is this a bank offer?', answer: 'No, this is a preparatory estimate.' },
      ],
    },
    tips: {
      fr: [
        'Integrez toutes vos charges recurrentes.',
        'Testez un taux plus haut pour scenario prudent.',
        'Conservez une marge pour imprevus immobiliers.',
      ],
      en: [
        'Include all recurring monthly obligations.',
        'Test higher rates for conservative planning.',
        'Keep margin for property-related surprises.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'frais-notaire',
    category: 'realEstate',
    icon: '📜',
    name: { fr: 'Frais de notaire', en: 'Notary fees' },
    title: {
      fr: 'Calculateur frais de notaire',
      en: 'Notary fee calculator',
    },
    description: {
      fr: 'Estimez les frais de notaire et le budget total d acquisition.',
      en: 'Estimate notary fees and total acquisition budget.',
    },
    metaTitle: {
      fr: 'Calcul frais de notaire | Calcery',
      en: 'Notary fee calculator | Calcery',
    },
    metaDescription: {
      fr: 'Outil de simulation des frais de notaire a partir du prix du bien.',
      en: 'Estimate notary fees based on property purchase price.',
    },
    faqs: {
      fr: [
        { question: 'Que comprend cette estimation ?', answer: 'Un calcul forfaitaire selon le taux de frais saisi.' },
        { question: 'Le taux peut-il changer ?', answer: 'Oui, selon neuf/ancien et contexte du dossier.' },
        { question: 'Le resultat remplace-t-il un devis notarial ?', answer: 'Non, il sert de repere budgetaire initial.' },
      ],
      en: [
        { question: 'What does this estimate include?', answer: 'A simplified estimate based on the entered fee rate.' },
        { question: 'Can fee rates vary?', answer: 'Yes, they vary by property type and transaction context.' },
        { question: 'Does this replace a legal quote?', answer: 'No, it is an initial budgeting reference.' },
      ],
    },
    tips: {
      fr: [
        'Testez plusieurs taux pour encadrer votre budget.',
        'Ajoutez les frais annexes hors notaire pour une vision complete.',
        'Conservez une marge de securite.',
      ],
      en: [
        'Test multiple fee rates for budget range planning.',
        'Add other acquisition costs for full visibility.',
        'Keep a contingency margin.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'rentabilite-locative-brute',
    category: 'realEstate',
    icon: '🏘️',
    name: { fr: 'Rentabilite locative brute', en: 'Gross rental yield' },
    title: {
      fr: 'Calculateur rentabilite locative brute',
      en: 'Gross rental yield calculator',
    },
    description: {
      fr: 'Calculez la rentabilite brute annuelle de votre investissement locatif.',
      en: 'Calculate annual gross rental yield of a property investment.',
    },
    metaTitle: {
      fr: 'Rentabilite locative brute | Calcery',
      en: 'Gross rental yield | Calcery',
    },
    metaDescription: {
      fr: 'Outil simple pour estimer le rendement locatif brut.',
      en: 'Simple tool to estimate gross rental return.',
    },
    faqs: {
      fr: [
        { question: 'Comment est calculee la rentabilite brute ?', answer: 'Loyer annuel divise par prix d achat, puis multiplie par 100.' },
        { question: 'Les charges sont-elles incluses ?', answer: 'Non, elles ne sont pas prises en compte dans la version brute.' },
        { question: 'A quoi sert cet indicateur ?', answer: 'A comparer rapidement plusieurs opportunites immobiliere.' },
      ],
      en: [
        { question: 'How is gross yield computed?', answer: 'Annual rent divided by purchase price, multiplied by 100.' },
        { question: 'Are expenses included?', answer: 'No, gross yield excludes operating charges.' },
        { question: 'Why use this metric?', answer: 'To compare property opportunities quickly at first pass.' },
      ],
    },
    tips: {
      fr: [
        'Utilisez ensuite le rendement net pour une decision finale.',
        'Visez des hypothese de loyer realistes.',
        'Comparez sur plusieurs biens similaires.',
      ],
      en: [
        'Use net yield next for final decision quality.',
        'Use realistic rent assumptions.',
        'Compare across similar properties.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'rendement-locatif-net',
    category: 'realEstate',
    icon: '📊',
    name: { fr: 'Rendement locatif net', en: 'Net rental yield' },
    title: {
      fr: 'Calculateur rendement locatif net',
      en: 'Net rental yield calculator',
    },
    description: {
      fr: 'Estimez un rendement locatif net en incluant charges et frais d acquisition.',
      en: 'Estimate net rental yield including costs and recurring charges.',
    },
    metaTitle: {
      fr: 'Rendement locatif net estime | Calcery',
      en: 'Estimated net rental yield | Calcery',
    },
    metaDescription: {
      fr: 'Simulation de rendement net pour une analyse locative plus realiste.',
      en: 'Net rental return simulation for more realistic investment analysis.',
    },
    faqs: {
      fr: [
        { question: 'Que prend en compte le net ?', answer: 'Loyers, charges annuelles et cout global d acquisition.' },
        { question: 'Pourquoi est-il plus utile que le brut ?', answer: 'Il rapproche davantage la simulation de la realite.' },
        { question: 'Peut-on comparer plusieurs scenarios ?', answer: 'Oui, notamment sur loyers et niveaux de charges.' },
      ],
      en: [
        { question: 'What is included in net yield?', answer: 'Rent, annual charges, and total acquisition cost.' },
        { question: 'Why more useful than gross yield?', answer: 'It is closer to actual economic performance.' },
        { question: 'Can I run multiple scenarios?', answer: 'Yes, especially for rent and expense assumptions.' },
      ],
    },
    tips: {
      fr: [
        'Restez prudent sur le niveau de vacance locative.',
        'Integrez les frais d entretien recurrent.',
        'Comparez net et brut pour comprendre les ecarts.',
      ],
      en: [
        'Keep assumptions conservative on vacancy risk.',
        'Include recurring maintenance costs.',
        'Compare gross and net yield to understand spread.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'difference-entre-deux-dates',
    category: 'dailyLife',
    icon: '📅',
    name: { fr: 'Difference entre deux dates', en: 'Date difference' },
    title: {
      fr: 'Calculateur difference entre deux dates',
      en: 'Date difference calculator',
    },
    description: {
      fr: 'Obtenez la difference en jours et en format calendrier entre deux dates.',
      en: 'Get date difference in days and calendar format.',
    },
    metaTitle: {
      fr: 'Difference entre deux dates | Calcery',
      en: 'Date difference calculator | Calcery',
    },
    metaDescription: {
      fr: 'Calculez une duree entre deux dates en jours, mois et annees.',
      en: 'Calculate duration between two dates in days, months, and years.',
    },
    faqs: {
      fr: [
        { question: 'Quel format de resultat est fourni ?', answer: 'Une vue calendrier (annees/mois/jours) et un total de jours.' },
        { question: 'La date de fin doit-elle etre superieure ?', answer: 'Oui, la date de fin doit etre posterieure a la date de debut.' },
        { question: 'A quoi sert ce calcul ?', answer: 'Planification, suivi de delais et controle administratif.' },
      ],
      en: [
        { question: 'Which outputs are provided?', answer: 'Calendar duration (years/months/days) and total day count.' },
        { question: 'Must end date be after start date?', answer: 'Yes, end date must be later than start date.' },
        { question: 'What is it useful for?', answer: 'Planning, deadline tracking, and administrative checks.' },
      ],
    },
    tips: {
      fr: [
        'Verifiez le fuseau/date locale lors de la saisie.',
        'Conservez un format ISO pour eviter les ambiguities.',
        'Utilisez le total jours pour les comparaisons rapides.',
      ],
      en: [
        'Double-check date format before submitting.',
        'Prefer ISO-style dates for consistency.',
        'Use total days for quick cross-comparison.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'age-exact',
    category: 'dailyLife',
    icon: '🎂',
    name: { fr: 'Age exact', en: 'Exact age' },
    title: {
      fr: 'Calculateur age exact',
      en: 'Exact age calculator',
    },
    description: {
      fr: 'Calculez un age exact en annees, mois et jours.',
      en: 'Calculate exact age in years, months, and days.',
    },
    metaTitle: {
      fr: 'Calcul age exact | Calcery',
      en: 'Exact age calculator | Calcery',
    },
    metaDescription: {
      fr: 'Estimation precise de l age entre date de naissance et date de reference.',
      en: 'Precise age estimate between birth date and reference date.',
    },
    faqs: {
      fr: [
        { question: 'Quelle date de reference utiliser ?', answer: 'La date du jour ou toute date de votre choix.' },
        { question: 'Le resultat inclut-il les jours ?', answer: 'Oui, le detail annees/mois/jours est retourne.' },
        { question: 'Peut-on l utiliser pour des formalites ?', answer: 'Oui, pour une verification rapide avant saisie administrative.' },
      ],
      en: [
        { question: 'Which reference date should I use?', answer: 'Today or any custom date needed.' },
        { question: 'Does output include days?', answer: 'Yes, result includes years, months, and days.' },
        { question: 'Is it useful for admin tasks?', answer: 'Yes, it helps quick age verification before submissions.' },
      ],
    },
    tips: {
      fr: [
        'Saisissez les dates au format standard pour eviter les erreurs.',
        'Controlez la coherence jour/mois pour les anciennes dates.',
        'Utilisez une meme date de reference sur vos comparaisons.',
      ],
      en: [
        'Use standard date formatting to avoid input mistakes.',
        'Check day/month order for old dates.',
        'Use one consistent reference date when comparing.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'consommation-carburant',
    category: 'dailyLife',
    icon: '⛽',
    name: { fr: 'Consommation carburant', en: 'Fuel consumption' },
    title: {
      fr: 'Calculateur consommation carburant',
      en: 'Fuel consumption calculator',
    },
    description: {
      fr: 'Calculez la consommation en L/100 km et le cout carburant estime.',
      en: 'Calculate fuel consumption in L/100 km and estimated fuel cost.',
    },
    metaTitle: {
      fr: 'Consommation carburant L/100 | Calcery',
      en: 'Fuel consumption L/100 calculator | Calcery',
    },
    metaDescription: {
      fr: 'Simulation de consommation et cout total de carburant.',
      en: 'Estimate fuel efficiency and total fuel spending.',
    },
    faqs: {
      fr: [
        { question: 'Quel indicateur principal est fourni ?', answer: 'La consommation en litres pour 100 kilometres.' },
        { question: 'Puis-je estimer le cout ?', answer: 'Oui, en ajoutant le prix du carburant au litre.' },
        { question: 'A quoi sert ce calcul ?', answer: 'Suivi budget transport et comparaison de trajets.' },
      ],
      en: [
        { question: 'What is the main output?', answer: 'Fuel usage in liters per 100 kilometers.' },
        { question: 'Can I estimate cost?', answer: 'Yes, by entering fuel price per liter.' },
        { question: 'What is this useful for?', answer: 'Transport budgeting and route comparison.' },
      ],
    },
    tips: {
      fr: [
        'Mesurez distance et carburant sur une periode stable.',
        'Comparez ville, mixte et autoroute separement.',
        'Actualisez le prix carburant regulierement.',
      ],
      en: [
        'Measure fuel and distance across a stable period.',
        'Compare city, mixed, and highway segments separately.',
        'Update fuel price regularly for accurate cost tracking.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'quantite-peinture',
    category: 'home',
    icon: '🎨',
    name: { fr: 'Quantite peinture', en: 'Paint quantity' },
    title: {
      fr: 'Calculateur quantite de peinture',
      en: 'Paint quantity calculator',
    },
    description: {
      fr: 'Estimez la quantite de peinture selon surface, couches et rendement.',
      en: 'Estimate paint quantity from surface, coats, and coverage.',
    },
    metaTitle: {
      fr: 'Calcul quantite peinture | Calcery',
      en: 'Paint quantity calculator | Calcery',
    },
    metaDescription: {
      fr: 'Outil simple pour estimer les litres de peinture necessaires.',
      en: 'Simple tool to estimate liters of paint required.',
    },
    faqs: {
      fr: [
        { question: 'Que signifie le rendement m2/L ?', answer: 'La surface couverte par litre selon le produit choisi.' },
        { question: 'Pourquoi saisir le nombre de couches ?', answer: 'Chaque couche augmente la quantite totale necessaire.' },
        { question: 'Dois-je ajouter une marge ?', answer: 'Oui, prevoir un surplus est souvent prudent.' },
      ],
      en: [
        { question: 'What does m2/L coverage mean?', answer: 'How much surface one liter can cover for your paint type.' },
        { question: 'Why include number of coats?', answer: 'Each additional coat increases total paint needed.' },
        { question: 'Should I add margin?', answer: 'Yes, adding a small safety margin is usually wise.' },
      ],
    },
    tips: {
      fr: [
        'Mesurez les surfaces utiles avec precision.',
        'Tenez compte des pertes d application.',
        'Ajoutez 5 a 10% de marge selon le support.',
      ],
      en: [
        'Measure effective paintable surfaces carefully.',
        'Account for application losses.',
        'Add a 5-10% margin depending on wall condition.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'surface-piece',
    category: 'home',
    icon: '📐',
    name: { fr: 'Surface piece', en: 'Room surface' },
    title: {
      fr: 'Calculateur surface de piece',
      en: 'Room surface calculator',
    },
    description: {
      fr: 'Calculez rapidement surface et perimetre d une piece rectangulaire.',
      en: 'Quickly calculate surface area and perimeter of a rectangular room.',
    },
    metaTitle: {
      fr: 'Calcul surface piece | Calcery',
      en: 'Room surface calculator | Calcery',
    },
    metaDescription: {
      fr: 'Outil rapide pour estimer surface m2 et perimetre.',
      en: 'Fast tool to estimate area and perimeter.',
    },
    faqs: {
      fr: [
        { question: 'Quels champs sont necessaires ?', answer: 'Longueur et largeur de la piece en metres.' },
        { question: 'Le calcul vaut-il pour toute forme ?', answer: 'Non, ici le modele suppose une piece rectangulaire.' },
        { question: 'A quoi sert le perimetre ?', answer: 'Utile pour plinthes, moulures et certains materiaux lineaires.' },
      ],
      en: [
        { question: 'Which inputs are required?', answer: 'Room length and width in meters.' },
        { question: 'Does it fit any room shape?', answer: 'No, this model assumes a rectangular room.' },
        { question: 'Why perimeter output?', answer: 'Useful for skirting boards and linear material estimates.' },
      ],
    },
    tips: {
      fr: [
        'Mesurez au sol avec un metre ruban stable.',
        'Verifiez les unites avant saisie.',
        'Refaites une mesure en cas de doute.',
      ],
      en: [
        'Measure floor dimensions with a reliable tape.',
        'Check units before submission.',
        'Re-measure if dimensions seem inconsistent.',
      ],
    },
    updatedAt: '2026-02-12',
  },
  {
    slug: 'moyenne-scolaire',
    category: 'education',
    icon: '📚',
    name: { fr: 'Moyenne scolaire', en: 'School average' },
    title: {
      fr: 'Calculateur moyenne scolaire',
      en: 'School average calculator',
    },
    description: {
      fr: 'Calculez une moyenne simple ou ponderee a partir des notes saisies.',
      en: 'Calculate simple or weighted average from entered grades.',
    },
    metaTitle: {
      fr: 'Calcul moyenne scolaire | Calcery',
      en: 'School average calculator | Calcery',
    },
    metaDescription: {
      fr: 'Outil de calcul de moyenne avec coefficients optionnels.',
      en: 'Grade average calculator with optional coefficients.',
    },
    faqs: {
      fr: [
        { question: 'Comment saisir les notes ?', answer: 'Entrez les notes separees par virgules.' },
        { question: 'Les coefficients sont-ils obligatoires ?', answer: 'Non, sans coefficient la moyenne simple est calculee.' },
        { question: 'Quelle echelle est attendue ?', answer: 'Le calculateur est prevu pour des notes sur 20.' },
      ],
      en: [
        { question: 'How do I enter grades?', answer: 'Provide grades separated by commas.' },
        { question: 'Are coefficients mandatory?', answer: 'No, simple average is computed if omitted.' },
        { question: 'Which grading scale is expected?', answer: 'The calculator is designed for 0-20 grading scale.' },
      ],
    },
    tips: {
      fr: [
        'Verifiez le nombre de coefficients saisis.',
        'Gardez le meme format decimal pour toutes les notes.',
        'Comparez moyenne simple et ponderee selon votre contexte.',
      ],
      en: [
        'Make sure coefficient count matches grade count.',
        'Use consistent decimal format in all inputs.',
        'Compare simple and weighted averages when relevant.',
      ],
    },
    updatedAt: '2026-02-12',
  },
];

const CATEGORY_BY_KEY = new Map(CATEGORIES.map((category) => [category.key, category]));
const CALCULATOR_BY_SLUG = new Map(CALCULATORS.map((calculator) => [calculator.slug, calculator]));

export function getCategoryByKey(key: CategoryKey): CategoryDefinition {
  const category = CATEGORY_BY_KEY.get(key);
  if (!category) {
    throw new Error(`Unknown category key: ${key}`);
  }
  return category;
}

export function getCategorySlug(locale: Locale, key: CategoryKey): string {
  return getCategoryByKey(key).slug[locale];
}

export function getCategoryByLocaleSlug(locale: Locale, slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((category) => category.slug[locale] === slug);
}

export function getCategoryRoute(locale: Locale, key: CategoryKey): string {
  return `/${locale}/${getCategorySlug(locale, key)}`;
}

export function getCalculatorBySlug(slug: CalculatorSlug): CalculatorDefinition {
  const calculator = CALCULATOR_BY_SLUG.get(slug);
  if (!calculator) {
    throw new Error(`Unknown calculator slug: ${slug}`);
  }
  return calculator;
}

export function getCalculatorRoute(locale: Locale, slug: CalculatorSlug): string {
  const calculator = getCalculatorBySlug(slug);
  return `${getCategoryRoute(locale, calculator.category)}/${calculator.slug}`;
}

export function getCalculatorsByCategory(key: CategoryKey): CalculatorDefinition[] {
  return CALCULATORS.filter((calculator) => calculator.category === key);
}

export function getCategoryStaticPaths(locale: Locale) {
  return CATEGORIES.map((category) => ({
    params: { category: category.slug[locale] },
    props: {
      category,
      locale,
      calculators: getCalculatorsByCategory(category.key),
    },
  }));
}

export function getCalculatorStaticPaths(locale: Locale) {
  return CALCULATORS.map((calculator) => {
    const category = getCategoryByKey(calculator.category);
    return {
      params: {
        category: category.slug[locale],
        slug: calculator.slug,
      },
      props: {
        locale,
        category,
        calculator,
      },
    };
  });
}

export const LEGACY_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: '/calculateurs', to: '/fr/calculateurs' },
  { from: '/en/calculateurs', to: '/en/calculators' },
  { from: '/budget-mensuel', to: '/fr/finance/budget-mensuel' },
  { from: '/epargne-automatique', to: '/fr/finance/epargne-automatique' },
  { from: '/interets-composes', to: '/fr/finance/interets-composes' },
  { from: '/impot-revenu', to: '/fr/finance/impot-revenu' },
  { from: '/economies-petites-depenses', to: '/fr/vie-pratique/economies-petites-depenses' },
  { from: '/pourboire', to: '/fr/vie-pratique/pourboire' },
  { from: '/partage-addition', to: '/fr/vie-pratique/partage-addition' },
  { from: '/calculateurs/budget-mensuel', to: '/fr/finance/budget-mensuel' },
  { from: '/calculateurs/epargne-automatique', to: '/fr/finance/epargne-automatique' },
  { from: '/calculateurs/interets-composes', to: '/fr/finance/interets-composes' },
  { from: '/calculateurs/impot-revenu', to: '/fr/finance/impot-revenu' },
  { from: '/calculateurs/economies-petites-depenses', to: '/fr/vie-pratique/economies-petites-depenses' },
  { from: '/calculateurs/pourboire', to: '/fr/vie-pratique/pourboire' },
  { from: '/calculateurs/partage-addition', to: '/fr/vie-pratique/partage-addition' },
  { from: '/calculateurs/demo', to: '/fr/calculateurs' },
  { from: '/en/budget-mensuel', to: '/en/finance/budget-mensuel' },
  { from: '/en/epargne-automatique', to: '/en/finance/epargne-automatique' },
  { from: '/en/interets-composes', to: '/en/finance/interets-composes' },
  { from: '/en/impot-revenu', to: '/en/finance/impot-revenu' },
  { from: '/en/economies-petites-depenses', to: '/en/daily-life/economies-petites-depenses' },
  { from: '/en/pourboire', to: '/en/daily-life/pourboire' },
  { from: '/en/partage-addition', to: '/en/daily-life/partage-addition' },
  { from: '/en/calculateurs/budget-mensuel', to: '/en/finance/budget-mensuel' },
  { from: '/en/calculateurs/epargne-automatique', to: '/en/finance/epargne-automatique' },
  { from: '/en/calculateurs/interets-composes', to: '/en/finance/interets-composes' },
  { from: '/en/calculateurs/impot-revenu', to: '/en/finance/impot-revenu' },
  { from: '/en/calculateurs/economies-petites-depenses', to: '/en/daily-life/economies-petites-depenses' },
  { from: '/en/calculateurs/pourboire', to: '/en/daily-life/pourboire' },
  { from: '/en/calculateurs/partage-addition', to: '/en/daily-life/partage-addition' },
  { from: '/en/calculateurs/demo', to: '/en/calculators' },
];
