import React, { useState, useEffect } from 'react';

const SmallExpensesSavingsCalculator: React.FC = () => {
  const [unitCost, setUnitCost] = useState<number>(0);
  const [frequencyType, setFrequencyType] = useState<'par jour' | 'par semaine' | 'par mois'>('par jour');
  const [quantity, setQuantity] = useState<number>(0);
  const [horizon, setHorizon] = useState<'1 mois' | '1 an' | '5 ans'>('1 mois');
  const [showExtra, setShowExtra] = useState<boolean>(false);

  const [monthly, setMonthly] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [annual, setAnnual] = useState<number>(0);

  useEffect(() => {
    let monthlyCost = 0;
    if (frequencyType === 'par jour') {
      monthlyCost = unitCost * quantity * 30;
    } else if (frequencyType === 'par semaine') {
      monthlyCost = unitCost * quantity * 4.345;
    } else {
      monthlyCost = unitCost * quantity;
    }
    setMonthly(monthlyCost);
    let totalCost = 0;
    if (horizon === '1 mois') {
      totalCost = monthlyCost;
    } else if (horizon === '1 an') {
      totalCost = monthlyCost * 12;
    } else {
      totalCost = monthlyCost * 60;
    }
    setTotal(totalCost);
    setAnnual(monthlyCost * 12);
  }, [unitCost, frequencyType, quantity, horizon]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number = 0) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, parseFloat(e.target.value) || min);
    setter(value);
  };

  const presets = [
    { name: 'Café', unitCost: 2.2, frequencyType: 'par jour' as const, quantity: 1 },
    { name: 'Cigarettes', unitCost: 12, frequencyType: 'par jour' as const, quantity: 1 },
    { name: 'Streaming', unitCost: 12.99, frequencyType: 'par mois' as const, quantity: 1 },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setUnitCost(preset.unitCost);
    setFrequencyType(preset.frequencyType);
    setQuantity(preset.quantity);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 font-semibold">Presets</label>
        <div className="flex space-x-2 flex-wrap">
          {presets.map(preset => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Dépense unitaire (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={unitCost}
            onChange={handleInputChange(setUnitCost)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Fréquence</label>
          <select
            value={frequencyType}
            onChange={(e) => setFrequencyType(e.target.value as typeof frequencyType)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="par jour">par jour</option>
            <option value="par semaine">par semaine</option>
            <option value="par mois">par mois</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Quantité par période</label>
          <input
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={handleInputChange(setQuantity)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Horizon</label>
          <select
            value={horizon}
            onChange={(e) => setHorizon(e.target.value as typeof horizon)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="1 mois">1 mois</option>
            <option value="1 an">1 an</option>
            <option value="5 ans">5 ans</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="showExtra"
          checked={showExtra}
          onChange={(e) => setShowExtra(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="showExtra" className="font-semibold">Afficher aussi par mois / par an</label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Économie sur la période</h3>
          <p className="text-2xl">{total.toFixed(2)} €</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Économie mensuelle estimée</h3>
          <p className="text-2xl">{monthly.toFixed(2)} €</p>
        </div>
        {showExtra && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h3 className="font-semibold">Économie annuelle estimée</h3>
            <p className="text-2xl">{annual.toFixed(2)} €</p>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600">Même de petites dépenses répétées peuvent représenter un budget important sur la durée.</p>
    </div>
  );
};

export default SmallExpensesSavingsCalculator;