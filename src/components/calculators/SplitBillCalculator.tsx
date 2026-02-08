import React, { useEffect, useId, useState } from 'react';

type Locale = 'fr' | 'en';

interface SplitBillCalculatorProps {
  lang?: Locale;
}

const messages = {
  fr: {
    bill: 'Montant de l’addition (€)',
    people: 'Nombre de personnes',
    tip: 'Pourboire',
    percentMode: 'Pourcentage',
    amountMode: 'Montant',
    percentPlaceholder: '%',
    amountPlaceholder: '€',
    round: 'Arrondir par personne',
    tipAmount: 'Pourboire',
    total: 'Total',
    perPerson: 'Par personne',
    summary: (people: number, total: string, perPerson: string) =>
      `${people} personnes • total ${total} € • ${perPerson} € / personne`,
    roundNote: 'Des centimes peuvent rester après arrondi.',
  },
  en: {
    bill: 'Bill amount (€)',
    people: 'Number of people',
    tip: 'Tip',
    percentMode: 'Percentage',
    amountMode: 'Fixed amount',
    percentPlaceholder: '%',
    amountPlaceholder: '€',
    round: 'Round per person',
    tipAmount: 'Tip amount',
    total: 'Total',
    perPerson: 'Per person',
    summary: (people: number, total: string, perPerson: string) =>
      `${people} people • total ${total} € • ${perPerson} € / person`,
    roundNote: 'A few cents may remain after rounding.',
  },
};

const SplitBillCalculator: React.FC<SplitBillCalculatorProps> = ({ lang = 'fr' }) => {
  const [bill, setBill] = useState<number>(0);
  const [people, setPeople] = useState<number>(2);
  const [tipMode, setTipMode] = useState<'percent' | 'amount'>('percent');
  const [tipPercent, setTipPercent] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [round, setRound] = useState<boolean>(false);

  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [perPerson, setPerPerson] = useState<number>(0);

  const baseId = useId();
  const t = messages[lang];

  useEffect(() => {
    const computedTip = tipMode === 'percent' ? (bill * tipPercent) / 100 : tipAmount;
    const computedTotal = bill + computedTip;
    let computedPerPerson = people > 0 ? computedTotal / people : 0;

    if (round) {
      computedPerPerson = Math.ceil(computedPerPerson);
    }

    setTip(computedTip);
    setTotal(computedTotal);
    setPerPerson(computedPerPerson);
  }, [bill, people, tipMode, tipPercent, tipAmount, round]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>, min = 0) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(min, parseFloat(event.target.value) || min);
      setter(value);
    };

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
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold">{t.tip}</label>
        <div className="mb-2 flex gap-2">
          <button
            type="button"
            onClick={() => setTipMode('percent')}
            className={`rounded px-4 py-2 ${tipMode === 'percent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            aria-pressed={tipMode === 'percent'}
          >
            {t.percentMode}
          </button>
          <button
            type="button"
            onClick={() => setTipMode('amount')}
            className={`rounded px-4 py-2 ${tipMode === 'amount' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            aria-pressed={tipMode === 'amount'}
          >
            {t.amountMode}
          </button>
        </div>

        {tipMode === 'percent' ? (
          <input
            id={`${baseId}-tip-percent`}
            type="number"
            min="0"
            step="any"
            value={tipPercent}
            onChange={handleInputChange(setTipPercent)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder={t.percentPlaceholder}
          />
        ) : (
          <input
            id={`${baseId}-tip-amount`}
            type="number"
            min="0"
            step="any"
            value={tipAmount}
            onChange={handleInputChange(setTipAmount)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder={t.amountPlaceholder}
          />
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id={`${baseId}-round`}
          checked={round}
          onChange={(event) => setRound(event.target.checked)}
          className="mr-2"
        />
        <label htmlFor={`${baseId}-round`} className="font-semibold">
          {t.round}
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg bg-blue-100 p-4 shadow">
          <h3 className="font-semibold">{t.tipAmount}</h3>
          <p className="text-2xl">{tip.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-green-100 p-4 shadow">
          <h3 className="font-semibold">{t.total}</h3>
          <p className="text-2xl">{total.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-yellow-100 p-4 shadow">
          <h3 className="font-semibold">{t.perPerson}</h3>
          <p className="text-2xl">{perPerson.toFixed(2)} €</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">{t.summary(people, total.toFixed(2), perPerson.toFixed(2))}</p>
      {round && <p className="text-sm text-gray-600">{t.roundNote}</p>}
    </div>
  );
};

export default SplitBillCalculator;
