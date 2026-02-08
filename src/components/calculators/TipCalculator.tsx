import React, { useEffect, useId, useState } from 'react';

type Locale = 'fr' | 'en';

interface TipCalculatorProps {
  lang?: Locale;
}

const messages = {
  fr: {
    bill: 'Montant de l’addition (€)',
    people: 'Nombre de personnes',
    percent: 'Pourcentage (%)',
    customPercent: 'Autre %',
    tip: 'Pourboire',
    total: 'Total',
    totalPerPerson: 'Total / personne',
    note: 'En France, le service est souvent inclus, le pourboire reste optionnel.',
    placeholders: {
      bill: 'Ex: 45.50',
      people: 'Ex: 2',
    },
  },
  en: {
    bill: 'Bill amount (€)',
    people: 'Number of people',
    percent: 'Tip percentage (%)',
    customPercent: 'Other %',
    tip: 'Tip amount',
    total: 'Total',
    totalPerPerson: 'Total / person',
    note: 'In many countries, tipping practices vary. Adjust according to local customs.',
    placeholders: {
      bill: 'Ex: 45.50',
      people: 'Ex: 2',
    },
  },
};

const TipCalculator: React.FC<TipCalculatorProps> = ({ lang = 'fr' }) => {
  const [bill, setBill] = useState<number>(0);
  const [percent, setPercent] = useState<number>(10);
  const [people, setPeople] = useState<number>(1);

  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [perPerson, setPerPerson] = useState<number>(0);

  const baseId = useId();
  const t = messages[lang];

  useEffect(() => {
    const computedTip = (bill * percent) / 100;
    const computedTotal = bill + computedTip;
    const computedPerPerson = people > 0 ? computedTotal / people : 0;

    setTip(computedTip);
    setTotal(computedTotal);
    setPerPerson(computedPerPerson);
  }, [bill, percent, people]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>, min = 0) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(min, parseFloat(event.target.value) || min);
      setter(value);
    };

  const presets = [5, 10, 12, 15];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${baseId}-bill`} className="mb-2 block font-semibold">
            {t.bill}
          </label>
          <input
            id={`${baseId}-bill`}
            type="number"
            min="0"
            step="any"
            value={bill}
            onChange={handleInputChange(setBill)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder={t.placeholders.bill}
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-people`} className="mb-2 block font-semibold">
            {t.people}
          </label>
          <input
            id={`${baseId}-people`}
            type="number"
            min="1"
            step="1"
            value={people}
            onChange={handleInputChange(setPeople, 1)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder={t.placeholders.people}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${baseId}-percent`} className="mb-2 block font-semibold">
          {t.percent}
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setPercent(preset)}
              className={`rounded px-4 py-2 ${percent === preset ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              aria-pressed={percent === preset}
            >
              {preset}%
            </button>
          ))}
        </div>
        <input
          id={`${baseId}-percent`}
          type="number"
          min="0"
          step="any"
          value={percent}
          onChange={handleInputChange(setPercent)}
          className="w-full rounded border border-gray-300 p-2"
          placeholder={t.customPercent}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg bg-blue-100 p-4 shadow">
          <h3 className="font-semibold">{t.tip}</h3>
          <p className="text-2xl">{tip.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-green-100 p-4 shadow">
          <h3 className="font-semibold">{t.total}</h3>
          <p className="text-2xl">{total.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-yellow-100 p-4 shadow">
          <h3 className="font-semibold">{t.totalPerPerson}</h3>
          <p className="text-2xl">{perPerson.toFixed(2)} €</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">{t.note}</p>
    </div>
  );
};

export default TipCalculator;
