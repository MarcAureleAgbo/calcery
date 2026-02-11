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
  | 'partage-addition';

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
      fr: 'Bientot des calculateurs sante pour suivre vos objectifs, habitudes et indicateurs utiles au quotidien.',
      en: 'Upcoming health calculators to track goals, habits and useful daily indicators.',
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
      fr: 'Bientot des calculateurs immobiliers pour estimer budget, mensualites et scenarios d achat ou de location.',
      en: 'Upcoming real estate calculators for budget, monthly payment and buy-vs-rent scenarios.',
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
      fr: 'Bientot des calculateurs pour prioriser vos travaux, estimer budgets et planifier vos projets maison.',
      en: 'Upcoming calculators to prioritize renovation plans, estimate budgets and manage home projects.',
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
      fr: 'Bientot des outils education pour planifier budgets d apprentissage et suivre vos objectifs de progression.',
      en: 'Upcoming education tools for learning budgets and progress planning.',
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
