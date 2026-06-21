import React, { useId, useState } from 'react';

type Locale = 'fr' | 'en';

interface SmallExpensesSavingsCalculatorProps {
  lang?: Locale;
}

type Frequency = 'daily' | 'weekly' | 'monthly';
type Horizon = 'month' | 'year' | 'fiveYears';

const messages = {
  fr: {
    presets: 'Préréglages',
    unitCost: 'Dépense unitaire (€)',
    frequency: 'Fréquence',
    quantity: 'Quantité par période',
    horizon: 'Horizon',
    showExtra: 'Afficher aussi par mois / par an',
    totalPeriod: 'Économie sur la période',
    monthly: 'Économie mensuelle estimée',
    annual: 'Économie annuelle estimée',
    note: 'Même de petites dépenses répétées peuvent représenter un budget important sur la durée.',
    frequencies: { daily: 'par jour', weekly: 'par semaine', monthly: 'par mois' },
    horizons: { month: '1 mois', year: '1 an', fiveYears: '5 ans' },
    presetsList: [
      { name: 'Café', unitCost: 2.2, frequencyType: 'daily' as const, quantity: 1 },
      { name: 'Cigarettes', unitCost: 12, frequencyType: 'daily' as const, quantity: 1 },
      { name: 'Streaming', unitCost: 12.99, frequencyType: 'monthly' as const, quantity: 1 },
    ],
  },
  en: {
    presets: 'Presets',
    unitCost: 'Unit cost (€)',
    frequency: 'Frequency',
    quantity: 'Quantity per period',
    horizon: 'Time horizon',
    showExtra: 'Also show monthly / yearly savings',
    totalPeriod: 'Savings over period',
    monthly: 'Estimated monthly savings',
    annual: 'Estimated yearly savings',
    note: 'Even small recurring expenses can become significant over time.',
    frequencies: { daily: 'per day', weekly: 'per week', monthly: 'per month' },
    horizons: { month: '1 month', year: '1 year', fiveYears: '5 years' },
    presetsList: [
      { name: 'Coffee', unitCost: 2.2, frequencyType: 'daily' as const, quantity: 1 },
      { name: 'Cigarettes', unitCost: 12, frequencyType: 'daily' as const, quantity: 1 },
      { name: 'Streaming', unitCost: 12.99, frequencyType: 'monthly' as const, quantity: 1 },
    ],
  },
};

const SmallExpensesSavingsCalculator: React.FC<SmallExpensesSavingsCalculatorProps> = ({ lang = 'fr' }) => {
  const t = messages[lang];
  const baseId = useId();

  const [unitCost, setUnitCost] = useState<number>(0);
  const [frequencyType, setFrequencyType] = useState<Frequency>('daily');
  const [quantity, setQuantity] = useState<number>(0);
  const [horizon, setHorizon] = useState<Horizon>('month');
  const [showExtra, setShowExtra] = useState<boolean>(false);

  const periodsPerMonth = frequencyType === 'daily' ? 30 : frequencyType === 'weekly' ? 4.345 : 1;
  const monthly = unitCost * quantity * periodsPerMonth;
  const horizonMonths = horizon === 'month' ? 1 : horizon === 'year' ? 12 : 60;
  const total = monthly * horizonMonths;
  const annual = monthly * 12;

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>, min = 0) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(min, parseFloat(event.target.value) || min);
      setter(value);
    };

  const applyPreset = (preset: (typeof t.presetsList)[number]) => {
    setUnitCost(preset.unitCost);
    setFrequencyType(preset.frequencyType);
    setQuantity(preset.quantity);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block font-semibold">{t.presets}</label>
        <div className="flex flex-wrap gap-2">
          {t.presetsList.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${baseId}-unit-cost`} className="mb-2 block font-semibold">
            {t.unitCost}
          </label>
          <input
            id={`${baseId}-unit-cost`}
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            min="0"
            step="any"
            value={unitCost}
            onChange={handleInputChange(setUnitCost)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-frequency`} className="mb-2 block font-semibold">
            {t.frequency}
          </label>
          <select
            id={`${baseId}-frequency`}
            value={frequencyType}
            onChange={(event) => setFrequencyType(event.target.value as Frequency)}
            className="w-full rounded border border-gray-300 p-2"
          >
            {(Object.entries(t.frequencies) as Array<[Frequency, string]>).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${baseId}-quantity`} className="mb-2 block font-semibold">
            {t.quantity}
          </label>
          <input
            id={`${baseId}-quantity`}
            type="number"
            onFocus={(event) => event.currentTarget.select()}
            min="0"
            step="any"
            value={quantity}
            onChange={handleInputChange(setQuantity)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor={`${baseId}-horizon`} className="mb-2 block font-semibold">
            {t.horizon}
          </label>
          <select
            id={`${baseId}-horizon`}
            value={horizon}
            onChange={(event) => setHorizon(event.target.value as Horizon)}
            className="w-full rounded border border-gray-300 p-2"
          >
            {(Object.entries(t.horizons) as Array<[Horizon, string]>).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id={`${baseId}-show-extra`}
          checked={showExtra}
          onChange={(event) => setShowExtra(event.target.checked)}
          className="mr-2"
        />
        <label htmlFor={`${baseId}-show-extra`} className="font-semibold">
          {t.showExtra}
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-live="polite">
        <div className="rounded-lg bg-blue-100 p-4 shadow">
          <h3 className="font-semibold">{t.totalPeriod}</h3>
          <p className="text-2xl">{total.toFixed(2)} €</p>
        </div>
        <div className="rounded-lg bg-green-100 p-4 shadow">
          <h3 className="font-semibold">{t.monthly}</h3>
          <p className="text-2xl">{monthly.toFixed(2)} €</p>
        </div>
        {showExtra && (
          <div className="rounded-lg bg-yellow-100 p-4 shadow">
            <h3 className="font-semibold">{t.annual}</h3>
            <p className="text-2xl">{annual.toFixed(2)} €</p>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600">{t.note}</p>
    </div>
  );
};

export default SmallExpensesSavingsCalculator;
