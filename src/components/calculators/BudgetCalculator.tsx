import React, { useEffect, useId, useMemo, useState } from 'react';

type Locale = 'fr' | 'en';

interface BudgetCalculatorProps {
  lang?: Locale;
}

const messages = {
  fr: {
    monthlyIncome: 'Revenu mensuel net (€)',
    housing: 'Dépenses logement (€)',
    food: 'Dépenses alimentation (€)',
    transport: 'Dépenses transport (€)',
    leisure: 'Dépenses loisirs (€)',
    other: 'Dépenses autres (€)',
    incomeHelp: 'Entrez votre salaire après impôts et charges.',
    housingHelp: 'Loyer, charges, assurance habitation.',
    foodHelp: 'Courses, restaurants, snacks.',
    transportHelp: 'Carburant, transports en commun, assurance auto.',
    leisureHelp: 'Sorties, hobbies, abonnements.',
    otherHelp: 'Santé, éducation, imprévus.',
    resultsHint: 'Renseignez un montant de revenu pour voir les résultats de votre budget.',
    totalExpenses: 'Total dépenses',
    remaining: 'Reste à vivre',
    savingsRate: 'Taux d’épargne',
    overspendingWarning: 'Vos dépenses dépassent vos revenus. Pensez à réduire certaines dépenses.',
    placeholders: {
      income: 'Ex: 2500',
      housing: 'Ex: 800',
      food: 'Ex: 400',
      transport: 'Ex: 200',
      leisure: 'Ex: 150',
      other: 'Ex: 100',
    },
  },
  en: {
    monthlyIncome: 'Net monthly income (€)',
    housing: 'Housing expenses (€)',
    food: 'Food expenses (€)',
    transport: 'Transport expenses (€)',
    leisure: 'Leisure expenses (€)',
    other: 'Other expenses (€)',
    incomeHelp: 'Enter your salary after taxes and deductions.',
    housingHelp: 'Rent, utilities, home insurance.',
    foodHelp: 'Groceries, restaurants, snacks.',
    transportHelp: 'Fuel, public transport, car insurance.',
    leisureHelp: 'Entertainment, hobbies, subscriptions.',
    otherHelp: 'Health, education, unexpected costs.',
    resultsHint: 'Enter your income amount to see your budget results.',
    totalExpenses: 'Total expenses',
    remaining: 'Remaining balance',
    savingsRate: 'Savings rate',
    overspendingWarning: 'Your expenses exceed your income. Consider reducing some costs.',
    placeholders: {
      income: 'Ex: 2500',
      housing: 'Ex: 800',
      food: 'Ex: 400',
      transport: 'Ex: 200',
      leisure: 'Ex: 150',
      other: 'Ex: 100',
    },
  },
};

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ lang = 'fr' }) => {
  const [income, setIncome] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);
  const [leisure, setLeisure] = useState<number>(0);
  const [other, setOther] = useState<number>(0);

  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [savingsRate, setSavingsRate] = useState<number>(0);

  const baseId = useId();
  const t = messages[lang];

  useEffect(() => {
    const expenses = housing + food + transport + leisure + other;
    setTotalExpenses(expenses);
    const balance = income - expenses;
    setRemaining(balance);
    setSavingsRate(income > 0 ? (balance / income) * 100 : 0);
  }, [income, housing, food, transport, leisure, other]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, parseFloat(event.target.value) || 0);
      setter(value);
    };

  const fields = useMemo(
    () => [
      {
        id: `${baseId}-income`,
        label: t.monthlyIncome,
        value: income,
        setValue: setIncome,
        placeholder: t.placeholders.income,
        help: t.incomeHelp,
      },
      {
        id: `${baseId}-housing`,
        label: t.housing,
        value: housing,
        setValue: setHousing,
        placeholder: t.placeholders.housing,
        help: t.housingHelp,
      },
      {
        id: `${baseId}-food`,
        label: t.food,
        value: food,
        setValue: setFood,
        placeholder: t.placeholders.food,
        help: t.foodHelp,
      },
      {
        id: `${baseId}-transport`,
        label: t.transport,
        value: transport,
        setValue: setTransport,
        placeholder: t.placeholders.transport,
        help: t.transportHelp,
      },
      {
        id: `${baseId}-leisure`,
        label: t.leisure,
        value: leisure,
        setValue: setLeisure,
        placeholder: t.placeholders.leisure,
        help: t.leisureHelp,
      },
      {
        id: `${baseId}-other`,
        label: t.other,
        value: other,
        setValue: setOther,
        placeholder: t.placeholders.other,
        help: t.otherHelp,
      },
    ],
    [baseId, t, income, housing, food, transport, leisure, other],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => {
          const hintId = `${field.id}-hint`;
          return (
            <div key={field.id}>
              <label htmlFor={field.id} className="mb-2 block font-semibold">
                {field.label}
              </label>
              <input
                id={field.id}
                type="number"
                min="0"
                step="any"
                value={field.value}
                onChange={handleInputChange(field.setValue)}
                className="w-full rounded border border-gray-300 p-2"
                placeholder={field.placeholder}
                aria-describedby={hintId}
              />
              <p id={hintId} className="mt-1 text-sm text-gray-600">
                {field.help}
              </p>
            </div>
          );
        })}
      </div>

      {income === 0 ? (
        <div className="py-8 text-center text-gray-600">
          <p>{t.resultsHint}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-live="polite">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">{t.totalExpenses}</h3>
            <p className="text-2xl text-red-700">{totalExpenses.toFixed(2)} €</p>
          </div>
          <div
            className={`rounded-lg border p-4 ${
              remaining >= 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}
          >
            <h3 className={`font-semibold ${remaining >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              {t.remaining}
            </h3>
            <p className={`text-2xl ${remaining >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {remaining.toFixed(2)} €
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">{t.savingsRate}</h3>
            <p className="text-2xl text-blue-700">{savingsRate.toFixed(2)} %</p>
          </div>
        </div>
      )}

      {remaining < 0 && (
        <div className="rounded border border-red-300 bg-red-100 px-4 py-3 text-red-700" role="alert">
          <p>{t.overspendingWarning}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
