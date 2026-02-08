import React, { useMemo, useState } from 'react';

type Locale = 'fr' | 'en';

interface CompoundInterestCalculatorProps {
  lang?: Locale;
}

const messages = {
  fr: {
    initialCapital: 'Capital initial',
    annualRate: 'Taux annuel (%)',
    duration: 'Durée (années)',
    compoundingFrequency: 'Fréquence de capitalisation',
    frequencies: {
      annually: 'Annuelle',
      semiannually: 'Semestrielle',
      quarterly: 'Trimestrielle',
      monthly: 'Mensuelle',
      daily: 'Quotidienne',
    },
    finalAmount: 'Montant final',
    earnedInterest: 'Intérêts gagnés',
    totalReturn: 'Rendement total',
    formulaTitle: 'Formule utilisée',
    formulaItems: {
      final: 'Montant final',
      principal: 'Capital initial',
      rate: 'Taux annuel',
      frequency: 'Fréquence de capitalisation',
      years: 'Nombre d’années',
    },
    copy: 'Copier le résultat',
    copied: 'Résultat copié.',
    copyError: 'Copie impossible sur ce navigateur.',
  },
  en: {
    initialCapital: 'Initial capital',
    annualRate: 'Annual rate (%)',
    duration: 'Duration (years)',
    compoundingFrequency: 'Compounding frequency',
    frequencies: {
      annually: 'Annually',
      semiannually: 'Semi-annually',
      quarterly: 'Quarterly',
      monthly: 'Monthly',
      daily: 'Daily',
    },
    finalAmount: 'Final amount',
    earnedInterest: 'Earned interest',
    totalReturn: 'Total return',
    formulaTitle: 'Formula used',
    formulaItems: {
      final: 'Final amount',
      principal: 'Initial capital',
      rate: 'Annual rate',
      frequency: 'Compounding frequency',
      years: 'Number of years',
    },
    copy: 'Copy result',
    copied: 'Result copied.',
    copyError: 'Copy is not available in this browser.',
  },
};

export default function CompoundInterestCalculator({ lang = 'fr' }: CompoundInterestCalculatorProps) {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [compounding, setCompounding] = useState<'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'daily'>('annually');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const t = messages[lang];

  const compoundingFrequency = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  const result = useMemo(() => {
    const n = compoundingFrequency[compounding];
    const r = rate / 100;
    const finalAmount = principal * Math.pow(1 + r / n, n * years);
    const interest = finalAmount - principal;

    return {
      finalAmount: finalAmount.toFixed(2),
      interest: interest.toFixed(2),
      totalReturn: ((interest / principal) * 100).toFixed(2),
    };
  }, [principal, rate, years, compounding]);

  const handleShare = async () => {
    const text =
      lang === 'fr'
        ? `Capital initial: ${principal}€ | Taux: ${rate}% | Durée: ${years} ans | Résultat: ${result.finalAmount}€`
        : `Initial capital: ${principal}€ | Rate: ${rate}% | Duration: ${years} years | Result: ${result.finalAmount}€`;

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
            {t.initialCapital}: <span className="text-black">{principal.toLocaleString()}€</span>
          </label>
          <input
            type="range"
            min="100"
            max="1000000"
            step="1000"
            value={principal}
            onChange={(event) => setPrincipal(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          />
          <input
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            value={principal}
            min="0"
            onChange={(event) => setPrincipal(Math.max(0, Number(event.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            {t.annualRate}: <span className="text-black">{rate.toFixed(2)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          />
          <input
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            step="0.01"
            value={rate}
            min="0"
            onChange={(event) => setRate(Math.max(0, Number(event.target.value) || 0))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            {t.duration}: <span className="text-black">{years}</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          />
          <input
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            value={years}
            min="1"
            onChange={(event) => setYears(Math.max(1, Number(event.target.value) || 1))}
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="compounding-frequency" className="mb-2 block text-sm font-semibold text-gray-900">
            {t.compoundingFrequency}
          </label>
          <select
            id="compounding-frequency"
            value={compounding}
            onChange={(event) => setCompounding(event.target.value as typeof compounding)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="annually">{t.frequencies.annually}</option>
            <option value="semiannually">{t.frequencies.semiannually}</option>
            <option value="quarterly">{t.frequencies.quarterly}</option>
            <option value="monthly">{t.frequencies.monthly}</option>
            <option value="daily">{t.frequencies.daily}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.finalAmount}</p>
          <p className="text-3xl font-bold text-black">{result.finalAmount}€</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.earnedInterest}</p>
          <p className="text-3xl font-bold text-black">+{result.interest}€</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
          <p className="mb-2 text-sm font-medium text-gray-600">{t.totalReturn}</p>
          <p className="text-3xl font-bold text-black">{result.totalReturn}%</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-3 font-semibold text-gray-900">{t.formulaTitle}</h3>
        <p className="rounded bg-gray-50 p-3 font-mono text-sm text-gray-600">A = P(1 + r/n)^(nt)</p>
        <ul className="mt-3 space-y-1 text-sm text-gray-600">
          <li>
            • <strong>A</strong> = {t.formulaItems.final}
          </li>
          <li>
            • <strong>P</strong> = {t.formulaItems.principal} ({principal}€)
          </li>
          <li>
            • <strong>r</strong> = {t.formulaItems.rate} ({rate}%)
          </li>
          <li>
            • <strong>n</strong> = {t.formulaItems.frequency} ({compoundingFrequency[compounding]})
          </li>
          <li>
            • <strong>t</strong> = {t.formulaItems.years} ({years})
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={handleShare}
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
