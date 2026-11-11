import type { Locale } from './i18n';
import type { CalculatorSeoContent } from './calculator-seo-content';

interface EditorialPage {
  heading: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  content: CalculatorSeoContent;
}

// P3.1: approved Surface/Tip FR/EN specification, 11 November 2026.
// Plain-text paragraphs preserve the supplied copy without rendering Markdown as HTML.
const P31_EDITORIAL_PAGES: Record<string, Partial<Record<Locale, EditorialPage>>> = {
  "surface-piece": {
    "fr": {
      "heading": "Calculer la surface d’une pièce en m²",
      "metaTitle": "Surface de pièce en m² : calculateur gratuit | Calcery",
      "metaDescription": "Mesurez la longueur et la largeur de votre pièce pour calculer sa surface en m² et son périmètre en mètres. Outil gratuit, rapide et sans inscription.",
      "description": "Entrez la longueur et la largeur en mètres : obtenez immédiatement la surface au sol et le périmètre d'une pièce rectangulaire.",
      "content": {
        "introduction": [
          "Avant de commander un revêtement de sol, de vérifier la place disponible pour des meubles ou de préparer des plinthes, il faut connaître les dimensions réelles de la pièce. Ce calculateur répond à deux questions différentes : combien de mètres carrés couvre le sol ? et combien de mètres mesure le contour ? La première réponse est une surface, la seconde est une longueur. Elles ne servent pas aux mêmes achats.",
          "Mesurez au sol la longueur et la largeur en mètres, puis renseignez ces deux valeurs. Si vous avez relevé 480 cm et 360 cm, convertissez-les d'abord en 4,80 m et 3,60 m. L'outil calcule alors une surface de 17,28 m² et un périmètre de 16,80 m. Ces résultats décrivent un rectangle idéal ; ils ne déduisent pas automatiquement les renfoncements, les placards fixes ou les ouvertures.",
          "Pour une pièce avec un angle en L, utilisez l'outil séparément sur chaque partie rectangulaire et additionnez les surfaces obtenues. Ce calcul simple permet de préparer une estimation, mais ne remplace pas les mesures détaillées requises pour la pose d'un matériau."
        ],
        "howItWorks": [
          "La surface se calcule en multipliant la longueur par la largeur : surface (m²) = longueur (m) × largeur (m). Le périmètre représente le tour du rectangle : périmètre (m) = 2 × (longueur + largeur). Avec une pièce de 4,80 m par 3,60 m, la surface est de 17,28 m², tandis que le tour complet atteint 16,80 m. Le périmètre peut aider à estimer une longueur de plinthes avant déduction des passages de portes ; la surface peut servir de base à une estimation de revêtement de sol.",
          "Ces formules supposent quatre angles droits et deux côtés opposés de même longueur. Si les murs ne sont pas parallèles, prenez plusieurs mesures et vérifiez quelle approximation est acceptable pour votre projet. Pour un achat, tenez ensuite compte des découpes et pertes propres au matériau, sans les considérer comme déjà intégrées au résultat."
        ],
        "interpretation": [
          "Une surface en m² ne donne pas directement le nombre de lames de parquet, de carreaux ou de pots de peinture à acheter. Elle indique seulement la superficie géométrique. Consultez les indications du fabricant pour les conditionnements, les découpes et les marges éventuelles. De même, le périmètre de 16,80 m n'est pas forcément la longueur exacte de plinthes : des portes ou ouvertures peuvent réduire la longueur à poser.",
          "Vérifiez aussi l'unité saisie. Une longueur de 480 entrée comme si elle était en mètres produirait un résultat disproportionné. Enfin, la surface au sol ne permet pas de calculer directement la surface des murs : cette dernière nécessite notamment les hauteurs et les ouvertures. Le calculateur de quantité de peinture peut constituer une étape distincte, après relevé des informations nécessaires."
        ],
        "formula": "",
        "thresholds": [],
        "riskNotice": "",
        "scenarios": [
          {
            "title": "Cas 1 — Revêtement d'une pièce rectangulaire",
            "text": "Une chambre mesure 4,80 m de long et 3,60 m de large. Le résultat, 17,28 m², sert de point de départ pour estimer le revêtement de sol. Avant l'achat, la personne confronte ce chiffre aux dimensions des produits, aux découpes et à la configuration réelle de la chambre. Le calculateur n'effectue pas ce supplément automatiquement."
          },
          {
            "title": "Cas 2 — Préparation des plinthes",
            "text": "Pour la même chambre, le périmètre théorique est de 16,80 m. Si la pièce comporte une porte, la longueur à équiper peut être inférieure. Il faut mesurer les passages à exclure, puis regarder les longueurs commerciales disponibles. Il serait incorrect de commander automatiquement 16,80 m de plinthes sans vérifier les ouvertures."
          },
          {
            "title": "Cas 3 — Pièce en L",
            "text": "Un séjour irrégulier peut être représenté par deux rectangles non superposés. On mesure chaque zone, on calcule sa surface et on additionne les deux résultats. En revanche, les périmètres ne s'additionnent pas pour obtenir automatiquement le contour extérieur : des côtés intérieurs communs seraient comptés deux fois. Pour les plinthes, mesurez directement le contour accessible."
          }
        ],
        "faqs": [
          {
            "question": "Quelle différence entre surface et périmètre ?",
            "answer": "La surface mesure l'étendue du sol et s'exprime en mètres carrés (m²). Le périmètre mesure la longueur du contour et s'exprime en mètres (m). Un même rectangle produit donc deux nombres qui répondent à deux besoins distincts."
          },
          {
            "question": "Comment convertir des centimètres avant de calculer ?",
            "answer": "Divisez chaque mesure en centimètres par 100. Par exemple, 480 cm deviennent 4,80 m. Saisissez ensuite les mesures en mètres dans les deux champs ; l'outil calculera lui-même les m²."
          },
          {
            "question": "Puis-je calculer la surface d'une pièce en L ?",
            "answer": "Oui, en la décomposant en rectangles qui ne se chevauchent pas, puis en additionnant leurs surfaces. Le calculateur traite chaque rectangle séparément : il n'analyse pas automatiquement un plan irrégulier."
          },
          {
            "question": "La surface affichée suffit-elle pour acheter du parquet ?",
            "answer": "Non. Le résultat constitue une base géométrique. Les découpes, les pertes, le sens de pose et le conditionnement des produits doivent être évalués séparément avant un achat."
          },
          {
            "question": "Ce calcul permet-il d'estimer la peinture des murs ?",
            "answer": "Pas directement. La superficie du sol n'est pas celle des murs. Pour estimer une peinture murale, il faut également les longueurs des murs, leur hauteur, les ouvertures et les indications du produit."
          }
        ],
        "relatedCalculators": [
          {
            "label": "Quantité de peinture",
            "href": "/fr/maison-travaux/quantite-peinture/",
            "description": "Estimer séparément la peinture à partir des surfaces à couvrir."
          }
        ],
        "relatedBlogPosts": [],
        "replaceSupplementaryContent": true,
        "sectionTitles": {
          "interpretationTitle": "Comment interpréter les résultats"
        }
      }
    },
    "en": {
      "heading": "Room Area Calculator in Square Metres (m²)",
      "metaTitle": "Room Area Calculator: Square Metres and Perimeter | Calcery",
      "metaDescription": "Enter room length and width in metres to calculate rectangular floor area in m² and perimeter in metres. Free, instant tool with no sign-up required.",
      "description": "Measure a rectangular room in metres and calculate its floor area and perimeter instantly.",
      "content": {
        "introduction": [
          "When planning new flooring, checking whether furniture will fit, or estimating skirting board lengths, two measurements matter for different reasons: floor area and perimeter. Floor area measures how much ground a room covers. Perimeter measures the length around its edges. Both can help with planning, but they are not interchangeable.",
          "Use a tape measure to record the room's length and width in metres. If you measured 480 cm by 360 cm, enter 4.8 m and 3.6 m rather than the centimetre values. The calculator returns 17.28 m² of area and 16.8 m of perimeter. It assumes a rectangular shape and does not automatically account for recesses, fixed cupboards, doorways or material waste.",
          "For an L-shaped room, divide the floor into separate rectangles, calculate each area and add the areas together. The tool does not draw a floor plan or measure a room for you. Its purpose is to make the basic geometry quick to check before you move on to a more detailed project estimate."
        ],
        "howItWorks": [
          "The area formula is area (m²) = length (m) × width (m). The perimeter formula is perimeter (m) = 2 × (length + width). A 4.8 m by 3.6 m rectangle therefore covers 17.28 square metres and has a 16.8-metre outer edge. Area is relevant when estimating floor coverings; perimeter is useful when measuring a continuous run around the room, such as skirting boards before adjusting for openings.",
          "Both formulas assume a rectangle with right angles. Older or irregular rooms may have walls that are not perfectly parallel. If measurements vary, record them carefully and decide whether a rectangular approximation is adequate. For flooring purchases, add any allowance for cuts or waste separately using the product supplier's guidance. No purchasing allowance is included in the calculated area."
        ],
        "interpretation": [
          "A floor area of 17.28 m² is not an instruction to buy exactly 17.28 m² of a particular flooring product. Packaging sizes, pattern matching and cuts affect what you eventually need. Similarly, a perimeter of 16.8 m is the full rectangle's edge, not necessarily the precise length of skirting to install once doorways are excluded.",
          "Check your units before relying on a result. Typing 480 into a field expecting metres instead of entering 4.8 will make the estimate far too large. Also note that floor area is different from wall area: calculating paint requirements generally needs wall dimensions, height, openings and product coverage information. This room area tool does not calculate those quantities automatically."
        ],
        "formula": "",
        "thresholds": [],
        "riskNotice": "",
        "scenarios": [
          {
            "title": "Scenario 1 — Planning flooring",
            "text": "A bedroom is 4.8 m long and 3.6 m wide. Its 17.28 m² floor area provides an initial figure for comparing flooring packs. Before purchase, the user checks pack coverage, the room layout and any installation waste. The calculator supplies the geometry; it does not decide how many packs to order."
          },
          {
            "title": "Scenario 2 — Measuring skirting boards",
            "text": "The same bedroom has a theoretical perimeter of 16.8 m. If there is a doorway, the actual length to cover may be shorter. The user measures the openings that should be excluded, then checks available board lengths. Ordering solely from the unadjusted perimeter would risk overestimating materials."
          },
          {
            "title": "Scenario 3 — Splitting an L-shaped room",
            "text": "A living room with a recess can be divided into two non-overlapping rectangles. Calculate each floor area separately and add the results. However, do not add their perimeters to find the outside boundary: shared internal edges would be counted twice. Measure the outside edge directly if that is what the project requires."
          }
        ],
        "faqs": [
          {
            "question": "What is the difference between room area and perimeter?",
            "answer": "Area is the size of the floor surface, measured in square metres (m²). Perimeter is the distance around its edge, measured in metres (m). The two values support different planning tasks."
          },
          {
            "question": "Can I enter centimetres or feet?",
            "answer": "The current input fields are in metres only. Divide centimetres by 100 before entering them. If your measurements are in feet, convert them to metres first; this tool does not provide a feet/inches selector."
          },
          {
            "question": "How do I calculate an L-shaped room?",
            "answer": "Split the room into rectangles that do not overlap, calculate each rectangle's area and add the results. The tool does not automatically recognize an irregular floor plan."
          },
          {
            "question": "Is the area enough to order flooring?",
            "answer": "Not by itself. It is a starting measurement. Product pack sizes, cuts, layout and any required waste allowance must be checked separately."
          },
          {
            "question": "Can I use this to calculate wall paint?",
            "answer": "Not directly. Floor area does not equal wall area. Wall heights, lengths, doors, windows and the paint's coverage rate are additional inputs for a paint estimate."
          }
        ],
        "relatedCalculators": [
          {
            "label": "Paint quantity",
            "href": "/en/home/paint-quantity/",
            "description": "Estimate paint separately using the surfaces to cover."
          }
        ],
        "relatedBlogPosts": [],
        "replaceSupplementaryContent": true,
        "sectionTitles": {
          "interpretationTitle": "Interpreting your results"
        }
      }
    }
  },
  "pourboire": {
    "fr": {
      "heading": "Calculateur de pourboire et partage d’addition",
      "metaTitle": "Calculateur de pourboire et partage de note | Calcery",
      "metaDescription": "Calculez un pourboire en euros, le total de l’addition et la part de chacun selon le taux choisi. Calcul gratuit et immédiat, même à plusieurs.",
      "description": "Saisissez l'addition, choisissez un pourcentage de pourboire et répartissez le total à parts égales.",
      "content": {
        "introduction": [
          "Une addition à plusieurs peut se régler rapidement dès lors que chacun connaît le montant du pourboire, le total final et la somme à verser par personne. Cet outil réalise ces trois calculs à partir du montant de l'addition en euros, du pourcentage choisi et du nombre de personnes. Il effectue un partage égal : il ne répartit pas différemment les consommations de chacun.",
          "Exemple : pour une addition de 84 €, un pourboire de 10 % représente 8,40 €. Le total atteint 92,40 €. Si trois personnes partagent également, la contribution affichée est de 30,80 € par personne. Le pourcentage de 10 % est ici un choix de démonstration, pas une recommandation universelle.",
          "En France, le pourboire est facultatif ; les prix affichés dans les restaurants doivent inclure le service. Vérifiez la note et les usages du lieu avant d'ajouter un montant. Dans d'autres pays, les pratiques peuvent être différentes. Le calculateur ne détermine pas quel taux serait attendu : il applique celui que vous choisissez. Source de référence pour la France : DGCCRF, « Pourboire »."
        ],
        "howItWorks": [
          "Le montant du pourboire correspond à addition × (taux / 100). Le total final correspond à addition + pourboire. Pour un groupe qui paie à parts égales, la contribution individuelle est total final / nombre de personnes. Par exemple, pour 84 €, 10 % et 3 personnes : 84 × 0,10 = 8,40 € ; 84 + 8,40 = 92,40 € ; 92,40 / 3 = 30,80 €.",
          "Vous pouvez sélectionner un taux proposé dans l'interface ou saisir un autre pourcentage. Les taux proposés servent à essayer différents montants ; ils ne correspondent pas à une règle applicable partout. Si vous ne souhaitez pas laisser de pourboire, un taux de 0 % laisse le total égal à l'addition, lorsque cette saisie est admise par l'interface. Le calcul conserve les montants en euros et affiche des valeurs monétaires arrondies pour la lecture ; selon le mode de paiement, un petit ajustement de centimes peut être nécessaire dans le règlement effectif."
        ],
        "interpretation": [
          "Le pourboire est le supplément calculé sur l'addition. Le total est la somme de l'addition et de ce supplément. Le total par personne correspond à une division égale entre tous les convives saisis, et non à un relevé de ce que chaque personne a consommé. Si un ami souhaite payer une part plus élevée ou si une personne n'a pas consommé certains plats, ce calculateur ne sait pas gérer ces différences automatiquement.",
          "Avant le paiement, vérifiez que le montant de départ correspond bien à la somme que vous souhaitez partager et qu'aucun supplément n'a déjà été comptabilisé. La question « quel taux choisir ? » dépend du pays, du contexte et de votre décision ; ne confondez pas les boutons de simulation avec des obligations ou des standards de service."
        ],
        "formula": "",
        "thresholds": [],
        "riskNotice": "",
        "scenarios": [
          {
            "title": "Cas 1 — Restaurant entre amis",
            "text": "Trois personnes règlent une addition de 84 € et choisissent ensemble un pourboire de 10 %. L'outil affiche 8,40 € de pourboire, 92,40 € au total et 30,80 € par personne. Elles peuvent ainsi convenir du règlement sans refaire le calcul manuellement. Cette simulation suppose que les trois personnes versent une part identique."
          },
          {
            "title": "Cas 2 — Pourboire facultatif en France",
            "text": "Le groupe constate que le service est compris et décide de ne pas laisser de somme supplémentaire. Dans ce cas, il n'est pas nécessaire de prendre un taux présenté comme « normal ». Le total à partager reste l'addition initiale, répartie entre les participants selon leur accord."
          },
          {
            "title": "Cas 3 — Répartition non égale",
            "text": "Deux personnes ont commandé des plats de montants différents et souhaitent payer selon leur consommation. L'affichage « total par personne » n'est pas adapté à ce choix, car il répartit la facture de façon égale. Elles doivent alors établir leurs parts séparément ; le calculateur de partage d'addition peut être une ressource utile si sa fonctionnalité correspond à leur besoin."
          }
        ],
        "faqs": [
          {
            "question": "Comment calculer 10 % de pourboire ?",
            "answer": "Multipliez le montant de l'addition par 0,10. Sur 84 €, cela donne 8,40 €. Ajoutez ensuite ce supplément à l'addition si vous souhaitez connaître le total final."
          },
          {
            "question": "Le pourboire est-il obligatoire en France ?",
            "answer": "Non. La DGCCRF précise que le pourboire est facultatif et laissé à l'appréciation du client. Le service facturé par un restaurant ne doit pas être confondu avec ce supplément volontaire."
          },
          {
            "question": "Comment partager le pourboire entre plusieurs personnes ?",
            "answer": "Le calculateur ajoute le pourboire à l'addition, puis divise le total par le nombre de personnes. Il suppose que chacun paie la même part, sans distinction des consommations individuelles."
          },
          {
            "question": "Les taux de 5 %, 10 %, 12 % ou 15 % sont-ils recommandés ?",
            "answer": "Non. Ce sont des valeurs pratiques à sélectionner pour simuler des montants. Les usages dépendent du pays et de la situation ; vérifiez le contexte avant de choisir votre taux."
          },
          {
            "question": "Pourquoi le total par personne peut-il différer de quelques centimes à la caisse ?",
            "answer": "Lorsqu'une somme est divisée entre plusieurs personnes, le règlement réel peut nécessiter une répartition des centimes. Vérifiez le total effectivement débité et ajustez la répartition si nécessaire."
          }
        ],
        "relatedCalculators": [
          {
            "label": "Partage d’addition",
            "href": "/fr/vie-pratique/partage-addition/",
            "description": "Calculer une répartition égale de l’addition."
          }
        ],
        "relatedBlogPosts": [
          {
            "label": "Pourboire en France et à l’étranger",
            "href": "/fr/blog/pourboire-regles-pratiques-voyage/"
          },
          {
            "label": "Partage d’addition entre amis",
            "href": "/fr/blog/partage-addition-entre-amis-guide/"
          }
        ],
        "replaceSupplementaryContent": true,
        "sectionTitles": {
          "interpretationTitle": "Comment interpréter les résultats"
        },
        "sources": [
          {
            "label": "DGCCRF — Pourboire (France)",
            "href": "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/pourboire"
          }
        ]
      }
    },
    "en": {
      "heading": "Tip Calculator and Equal Bill Split",
      "metaTitle": "Tip Calculator: Amount and Split the Bill | Calcery",
      "metaDescription": "Calculate a tip, total bill and equal amount per person using your chosen percentage. Free instant calculator for euro amounts, with no account needed.",
      "description": "Enter a bill in euros, choose your tip percentage and see the total and equal share per person.",
      "content": {
        "introduction": [
          "When a group finishes a meal, the practical questions are straightforward: how much is the tip, what is the final bill and how much does each person pay? This tool answers all three for a bill entered in euros. You choose the percentage and number of people, and the calculator displays the tip amount, combined total and equal per-person share. It does not track individual orders or split the bill unevenly.",
          "For example, an €84 bill with a 10% tip produces an €8.40 tip and a €92.40 final amount. Divided equally among three people, that is €30.80 each. The 10% rate is an example chosen for the calculation, not advice about how much anyone should tip in a particular country.",
          "Tipping customs vary widely by destination and type of service. Some bills already include service; other places have different expectations. Check the receipt and local practices before choosing a percentage. This calculator does not detect your location, determine a customary rate or convert between currencies. Its job is to make the arithmetic transparent once you have chosen your amount."
        ],
        "howItWorks": [
          "The formula for the tip is bill × (percentage / 100). The final total is bill + tip. If everyone pays an equal share, each person's amount is final total / number of people. Using €84, 10% and three people: the tip is €8.40, the bill with the tip is €92.40 and each equal contribution is €30.80.",
          "You can select one of the percentage options in the interface or enter another rate. The buttons are calculation shortcuts rather than universal tipping recommendations. With a 0% tip, where accepted by the input, the final total equals the original bill. Monetary values are displayed in euros. When splitting certain amounts, practical payments may require one person to pay an extra cent so that all contributions add up exactly to the total."
        ],
        "interpretation": [
          "Tip amount is the additional amount calculated from the bill. Total is the bill plus the tip. Total per person is an equal division of that total, regardless of what each guest ordered. If one guest pays only for a drink and another pays for a full meal, this equal-share result should not be mistaken for an item-by-item settlement.",
          "Make sure the bill amount you entered is the amount you actually intend to split. If a service charge or a tip has already been added, adding another tip may not match your intention. The calculator does not determine whether tipping is mandatory, expected or appropriate; that decision depends on the local context and the group's preference."
        ],
        "formula": "",
        "thresholds": [],
        "riskNotice": "",
        "scenarios": [
          {
            "title": "Scenario 1 — A group meal",
            "text": "Three friends share an €84 bill and choose to add 10%. The calculator shows €8.40 for the tip, €92.40 in total and €30.80 per person. They can agree on the equal payment without recalculating. If they would rather pay by item, they need a different allocation method."
          },
          {
            "title": "Scenario 2 — Service already included",
            "text": "A traveller checks the bill and decides not to add any extra tip. The amount to split is simply the existing bill. No percentage button should be treated as proof of a local requirement; selecting a rate is a user decision, not advice generated by the tool."
          },
          {
            "title": "Scenario 3 — Different individual orders",
            "text": "Two diners have ordered very different amounts. The displayed equal share may not feel appropriate because the calculator does not allocate separate items to each person. They should work out their individual contributions separately or use another bill-splitting method if it supports their situation."
          }
        ],
        "faqs": [
          {
            "question": "How do I calculate a 10% tip?",
            "answer": "Multiply the bill by 0.10. For an €84 bill, the tip is €8.40. Add it to the bill to find the amount payable before any equal split."
          },
          {
            "question": "Does this calculator recommend a tipping percentage?",
            "answer": "No. The selectable percentages are shortcuts for performing the calculation. Tipping customs differ by country and service type, so check local expectations and whether a service charge is already included."
          },
          {
            "question": "How is the bill split between people?",
            "answer": "The tool adds the tip to the bill and divides the result by the number of people entered. Every person is assigned an equal share, even if their orders differed."
          },
          {
            "question": "Can I use pounds or dollars?",
            "answer": "The current interface labels the bill in euros and displays euro results. It does not offer currency conversion. Do not interpret a euro result as an amount converted from another currency."
          },
          {
            "question": "Why might the final payment differ by a cent?",
            "answer": "Splitting a total across several people may produce fractional cents. A real-world payment may need a small adjustment so that everyone's contributions add up to exactly the amount charged."
          }
        ],
        "relatedCalculators": [
          {
            "label": "Split bill",
            "href": "/en/daily-life/split-bill/",
            "description": "Calculate an equal share of a bill."
          }
        ],
        "relatedBlogPosts": [
          {
            "label": "Tipping Guide",
            "href": "/en/blog/tipping-guide-home-and-travel/"
          },
          {
            "label": "Split Bill with Friends",
            "href": "/en/blog/split-bill-with-friends/"
          }
        ],
        "replaceSupplementaryContent": true,
        "sectionTitles": {
          "interpretationTitle": "Interpreting the results"
        }
      }
    }
  }
};

export function getP31EditorialPage(slug: string, locale: Locale): EditorialPage | undefined {
  return P31_EDITORIAL_PAGES[slug]?.[locale];
}
