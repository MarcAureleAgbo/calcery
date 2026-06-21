import React, { useId, useMemo, useState } from 'react';

type Locale = 'fr' | 'en';

interface SavingsGoalCalculatorProps {
  lang?: Locale;
}

const messages = {
  fr: {
    goal: 'Objectif d’épargne (€)',
    duration: 'Durée (mois)',
    initial: 'Épargne initiale (€)',
    rate: 'Taux annuel (%)',
    reached: 'Votre objectif est déjà atteint.',
    monthlyEffort: 'Effort mensuel',
    totalPaid: 'Total versé',
    estimatedInterest: 'Intérêts estimés',
    estimatedFinal: 'Capital final estimé',
  },
  en: {
    goal: 'Savings goal (€)',
    duration: 'Duration (months)',
    initial: 'Initial savings (€)',
    rate: 'Annual rate (%)',
    reached: 'Your goal is already reached.',
    monthlyEffort: 'Monthly contribution',
    totalPaid: 'Total contributed',
    estimatedInterest: 'Estimated interest',
    estimatedFinal: 'Estimated final amount',
  },
};

const calculateFinalCapital = (effort: number, rate: number, months: number, initial: number): number => {
  if (rate === 0) return initial + effort * months;
  const factor = ((1 + rate) ** months - 1) / rate;
  return initial * (1 + rate) ** months + effort * factor;
};

const findMonthlyEffort = (target: number, rate: number, months: number, initial: number): number => {
  if (target <= initial) return 0;

  let low = 0;
  let high = target * 2;
  let mid = 0;

  for (let index = 0; index < 100; index += 1) {
    mid = (low + high) / 2;
    if (calculateFinalCapital(mid, rate, months, initial) < target) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return mid;
};

const SavingsGoalCalculator: React.FC<SavingsGoalCalculatorProps> = ({ lang = 'fr' }) => {
  const [goal, setGoal] = useState<number>(0);
  const [months, setMonths] = useState<number>(1);
  const [initial, setInitial] = useState<number>(0);
  const [annualRate, setAnnualRate] = useState<number>(0);

  const baseId = useId();
  const t = messages[lang];

  const result = useMemo(() => {
    if (annualRate === 0) {
      const monthlyEffort = Math.max(goal - initial, 0) / months;
      const totalPaid = monthlyEffort * months;
      return {
        monthlyEffort,
        totalPaid,
        interest: 0,
        finalCapital: initial + totalPaid,
      };
    }

    const monthlyRate = annualRate / 100 / 12;
    const monthlyEffort = findMonthlyEffort(goal, monthlyRate, months, initial);
    const finalCapital = calculateFinalCapital(monthlyEffort, monthlyRate, months, initial);
    const totalPaid = monthlyEffort * months;
    return {
      monthlyEffort,
      totalPaid,
      interest: Math.max(finalCapital - initial - totalPaid, 0),
      finalCapital,
    };
  }, [goal, months, initial, annualRate]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>, min = 0) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(min, parseFloat(event.target.value) || min);
      setter(value);
    };

  const isGoalReached = goal <= initial;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${baseId}-goal`} className="mb-2 block font-semibold">
            {t.goal}
          </label>
          <input
            id={`${baseId}-goal`}
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            min="0"
            step="any"
            value={goal}
            onChange={handleInputChange(setGoal)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-months`} className="mb-2 block font-semibold">
            {t.duration}
          </label>
          <input
            id={`${baseId}-months`}
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            min="1"
            step="1"
            value={months}
            onChange={handleInputChange(setMonths, 1)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-initial`} className="mb-2 block font-semibold">
            {t.initial}
          </label>
          <input
            id={`${baseId}-initial`}
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            min="0"
            step="any"
            value={initial}
            onChange={handleInputChange(setInitial)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-rate`} className="mb-2 block font-semibold">
            {t.rate}
          </label>
          <input
            id={`${baseId}-rate`}
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            min="0"
            step="any"
            value={annualRate}
            onChange={handleInputChange(setAnnualRate)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
      </div>

      {isGoalReached && (
        <div className="rounded border border-green-300 bg-green-100 px-4 py-3 text-green-700" role="status">
          <p>{t.reached}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        <div className="rounded-lg bg-blue-100 p-4 shadow">
          <h3 className="font-semibold">{t.monthlyEffort}</h3>
          <p className="text-2xl">{result.monthlyEffort.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-green-100 p-4 shadow">
          <h3 className="font-semibold">{t.totalPaid}</h3>
          <p className="text-2xl">{result.totalPaid.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-yellow-100 p-4 shadow">
          <h3 className="font-semibold">{t.estimatedInterest}</h3>
          <p className="text-2xl">{result.interest.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-purple-100 p-4 shadow">
          <h3 className="font-semibold">{t.estimatedFinal}</h3>
          <p className="text-2xl">{result.finalCapital.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;
