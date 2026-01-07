import React, { useState, useEffect } from 'react';

const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<number>(0);
  const [percent, setPercent] = useState<number>(10);
  const [people, setPeople] = useState<number>(1);

  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [perPerson, setPerPerson] = useState<number>(0);

  useEffect(() => {
    const t = bill * percent / 100;
    const tot = bill + t;
    const pp = people > 0 ? tot / people : 0;
    setTip(t);
    setTotal(tot);
    setPerPerson(pp);
  }, [bill, percent, people]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number = 0) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, parseFloat(e.target.value) || min);
    setter(value);
  };

  const presets = [5, 10, 12, 15];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Montant de l’addition (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={bill}
            onChange={handleInputChange(setBill)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 45.50"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Nombre de personnes</label>
          <input
            type="number"
            min="1"
            step="1"
            value={people}
            onChange={handleInputChange(setPeople, 1)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 2"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Pourcentage (%)</label>
        <div className="flex space-x-2 mb-2">
          {presets.map(p => (
            <button
              key={p}
              onClick={() => setPercent(p)}
              className={`px-4 py-2 rounded ${percent === p ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {p}%
            </button>
          ))}
        </div>
        <input
          type="number"
          min="0"
          step="any"
          value={percent}
          onChange={handleInputChange(setPercent)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Autre %"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Pourboire</h3>
          <p className="text-2xl">{tip.toFixed(2)} €</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Total</h3>
          <p className="text-2xl">{total.toFixed(2)} €</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Total / personne</h3>
          <p className="text-2xl">{perPerson.toFixed(2)} €</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">En France, le service est souvent inclus, le pourboire reste optionnel.</p>
    </div>
  );
};

export default TipCalculator;