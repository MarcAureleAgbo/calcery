import React, { useState, useEffect } from 'react';

const SplitBillCalculator: React.FC = () => {
  const [bill, setBill] = useState<number>(0);
  const [people, setPeople] = useState<number>(2);
  const [tipMode, setTipMode] = useState<'percent' | 'amount'>('percent');
  const [tipPercent, setTipPercent] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [round, setRound] = useState<boolean>(false);

  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [perPerson, setPerPerson] = useState<number>(0);

  useEffect(() => {
    const t = tipMode === 'percent' ? bill * tipPercent / 100 : tipAmount;
    const tot = bill + t;
    const pp = people > 0 ? tot / people : 0;
    setTip(t);
    setTotal(tot);
    setPerPerson(pp);
  }, [bill, people, tipMode, tipPercent, tipAmount]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number = 0) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, parseFloat(e.target.value) || min);
    setter(value);
  };

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
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Pourboire</label>
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => setTipMode('percent')}
            className={`px-4 py-2 rounded ${tipMode === 'percent' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pourcentage
          </button>
          <button
            onClick={() => setTipMode('amount')}
            className={`px-4 py-2 rounded ${tipMode === 'amount' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Montant
          </button>
        </div>
        {tipMode === 'percent' ? (
          <input
            type="number"
            min="0"
            step="any"
            value={tipPercent}
            onChange={handleInputChange(setTipPercent)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="%"
          />
        ) : (
          <input
            type="number"
            min="0"
            step="any"
            value={tipAmount}
            onChange={handleInputChange(setTipAmount)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="€"
          />
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="round"
          checked={round}
          onChange={(e) => setRound(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="round" className="font-semibold">Arrondir par personne</label>
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
          <h3 className="font-semibold">Par personne</h3>
          <p className="text-2xl">{perPerson.toFixed(2)} €</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">{people} personnes • total {total.toFixed(2)} € • {perPerson.toFixed(2)} € / personne</p>
      {round && <p className="text-sm text-gray-600">Des centimes peuvent rester après arrondi.</p>}
    </div>
  );
};

export default SplitBillCalculator;