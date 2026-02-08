import React, { useMemo, useState } from 'react';

type Locale = 'fr' | 'en';

interface IncomeCalculatorProps {
  lang?: Locale;
}

const messages = {
  fr: {
    grossIncome: 'Revenu annuel brut',
    taxParts: 'Nombre de parts fiscales',
    taxPartsHelp: 'Célibataire: 1 | Marié/PACS: 2 | + enfant: +0.5 ou +1',
    fiscalYear: 'Année fiscale',
    yearEstimate: 'Estimation',
    noteTitle: 'Note',
    note:
      "Ce calculateur donne une estimation basée sur le barème standard. Votre impôt réel peut varier selon les réductions/crédits d'impôt et autres abattements.",
    marginalRate: 'Tranche marginale',
    effectiveRate: 'Taux effectif',
    taxDue: 'Impôt à payer',
    socialContributions: 'Cotisations sociales',
    netIncomeTitle: 'Revenu net après impôts et cotisations',
    yearly: '/an',
    monthly: '/mois',
    breakdown: 'Répartition',
    gross: 'Revenu brut',
    incomeTax: 'Impôt sur le revenu',
    net: 'Revenu net',
    taxTips: 'Conseils de réduction d’impôts',
    tips: [
      'Plan d’épargne retraite (PER): déductible jusqu’à 10% de vos revenus',
      'Assurance vie: fiscalité allégée après 8 ans',
      'Investissement immobilier: certaines réductions peuvent s’appliquer',
      'Dons aux associations: une part peut être déduite',
    ],
    copy: 'Copier le résultat',
    copied: 'Résultat copié.',
    copyError: 'Copie impossible sur ce navigateur.',
  },
  en: {
    grossIncome: 'Gross annual income',
    taxParts: 'Tax household shares',
    taxPartsHelp: 'Single: 1 | Married/civil union: 2 | + child: +0.5 or +1',
    fiscalYear: 'Tax year',
    yearEstimate: 'Estimate',
    noteTitle: 'Note',
    note:
      'This calculator provides an estimate based on standard tax brackets. Your actual tax may vary depending on credits, deductions and specific rules.',
    marginalRate: 'Marginal tax bracket',
    effectiveRate: 'Effective tax rate',
    taxDue: 'Estimated tax due',
    socialContributions: 'Social contributions',
    netIncomeTitle: 'Net income after tax and contributions',
    yearly: '/year',
    monthly: '/month',
    breakdown: 'Breakdown',
    gross: 'Gross income',
    incomeTax: 'Income tax',
    net: 'Net income',
    taxTips: 'Tax optimization tips',
    tips: [
      'Retirement savings plans can reduce taxable income in many cases.',
      'Some long-term investment wrappers receive favorable taxation.',
      'Certain real-estate investments may provide tax incentives.',
      'Donations can be partially deductible depending on the jurisdiction.',
    ],
    copy: 'Copy result',
    copied: 'Result copied.',
    copyError: 'Copy is not available in this browser.',
  },
};

export default function IncomeCalculator({ lang = 'fr' }: IncomeCalculatorProps) {
  const [income, setIncome] = useState(40000);
  const [nbParts, setNbParts] = useState(1);
  const [year, setYear] = useState(2025);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const t = messages[lang];

  // Approximate progressive brackets used for estimate display
  const taxBrackets = [
    { limit: 11294, rate: 0 },
    { limit: 28797, rate: 0.11 },
    { limit: 82341, rate: 0.3 },
    { limit: 177882, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ];

  const result = useMemo(() => {
    const incomeTaxed = income / nbParts;
    let tax = 0;
    let prevLimit = 0;

    for (const bracket of taxBrackets) {
      const taxableInThisBracket = Math.min(incomeTaxed, bracket.limit) - prevLimit;
      if (taxableInThisBracket > 0) {
        tax += taxableInThisBracket * bracket.rate;
      }
      prevLimit = bracket.limit;
      if (incomeTaxed <= bracket.limit) break;
    }

    const totalTax = tax * nbParts;
    const netAfterTax = income - totalTax;
    const effectiveRate = income > 0 ? ((totalTax / income) * 100).toFixed(2) : '0.00';

    const socialContribution = income * 0.08;
    const netIncome = netAfterTax - socialContribution;

    return {
      taxBracket:
        incomeTaxed < 11294
          ? '0%'
          : incomeTaxed < 28797
            ? '11%'
            : incomeTaxed < 82341
              ? '30%'
              : incomeTaxed < 177882
                ? '41%'
                : '45%',
      totalTax: totalTax.toFixed(2),
      socialContribution: socialContribution.toFixed(2),
      netIncome: netIncome.toFixed(2),
      effectiveRate,
    };
  }, [income, nbParts, year]);

  const handleExport = async () => {
    const text =
      lang === 'fr'
        ? `Calcul d'impôt\nRevenu brut: ${income}€\nParts: ${nbParts}\nAnnée: ${year}\nImpôt: ${result.totalTax}€\nCotisations: ${result.socialContribution}€\nNet: ${result.netIncome}€\nTaux effectif: ${result.effectiveRate}%`
        : `Tax estimate\nGross income: ${income}€\nShares: ${nbParts}\nYear: ${year}\nTax: ${result.totalTax}€\nContributions: ${result.socialContribution}€\nNet: ${result.netIncome}€\nEffective rate: ${result.effectiveRate}%`;

    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }

    window.setTimeout(() => setCopyState('idle'), 2200);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            {t.grossIncome}: <span className="text-black">{income.toLocaleString()}€</span>
          </label>
          <input
            type="range"
            min="1000"
            max="500000"
            step="1000"
            value={income}
            onChange={(event) => setIncome(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          />
          <input
            type="number"
            value={income}
            min="0"
            onChange={(event) => setIncome(Math.max(0, Number(event.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="nb-parts" className="mb-2 block text-sm font-semibold text-gray-900">
            {t.taxParts}
          </label>
          <p className="mb-2 text-sm text-gray-600">{t.taxPartsHelp}</p>
          <input
            id="nb-parts"
            type="number"
            min="0.5"
            step="0.5"
            value={nbParts}
            onChange={(event) => setNbParts(Math.max(0.5, Number(event.target.value) || 0.5))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="tax-year" className="mb-2 block text-sm font-semibold text-gray-900">
            {t.fiscalYear}
          </label>
          <select
            id="tax-year"
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025 ({t.yearEstimate})</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>{t.noteTitle}:</strong> {t.note}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-live="polite">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.marginalRate}</p>
          <p className="text-2xl font-bold text-black">{result.taxBracket}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.effectiveRate}</p>
          <p className="text-2xl font-bold text-black">{result.effectiveRate}%</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.taxDue}</p>
          <p className="text-2xl font-bold text-black">{result.totalTax}€</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.socialContributions}</p>
          <p className="text-2xl font-bold text-black">{result.socialContribution}€</p>
        </div>
      </div>

      <div className="rounded-lg bg-black p-6 text-center text-white">
        <p className="mb-2 text-sm font-medium text-gray-300">{t.netIncomeTitle}</p>
        <p className="text-4xl font-bold">{result.netIncome}€</p>
        <p className="mt-2 text-sm text-gray-400">
          {t.yearly} | {(parseFloat(result.netIncome) / 12).toFixed(0)}€{t.monthly}
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 font-semibold text-gray-900">{t.breakdown}</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">{t.gross}</span>
            <span className="font-semibold text-black">{income.toLocaleString()}€</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-gray-700">- {t.incomeTax}</span>
            <span className="font-semibold text-red-600">-{result.totalTax}€</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">- {t.socialContributions}</span>
            <span className="font-semibold text-red-600">-{result.socialContribution}€</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t-2 pt-3">
            <span className="font-semibold text-gray-900">= {t.net}</span>
            <span className="text-lg font-bold text-black">{result.netIncome}€</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold text-gray-900">{t.taxTips}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {t.tips.map((tip) => (
            <li key={tip}>✓ {tip}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleExport}
        className="w-full rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-gray-900"
      >
        {t.copy}
      </button>

      <p className="text-center text-sm text-gray-600" aria-live="polite">
        {copyState === 'copied' ? t.copied : copyState === 'error' ? t.copyError : ''}
      </p>
    </div>
  );
}
