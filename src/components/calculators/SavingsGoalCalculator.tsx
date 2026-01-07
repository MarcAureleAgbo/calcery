import React, { useState, useEffect } from 'react';

const SavingsGoalCalculator: React.FC = () => {
  const [goal, setGoal] = useState<number>(0);
  const [months, setMonths] = useState<number>(1);
  const [initial, setInitial] = useState<number>(0);
  const [annualRate, setAnnualRate] = useState<number>(0);

  const [effortMensuel, setEffortMensuel] = useState<number>(0);
  const [totalVerse, setTotalVerse] = useState<number>(0);
  const [interets, setInterets] = useState<number>(0);
  const [capitalFinal, setCapitalFinal] = useState<number>(0);

  const calculateWithoutRate = () => {
    const reste = Math.max(goal - initial, 0);
    const effort = reste / months;
    const total = effort * months;
    setEffortMensuel(effort);
    setTotalVerse(total);
    setInterets(0);
    setCapitalFinal(initial + total);
  };

  const calculateCapitalFinal = (effort: number, r: number, n: number, init: number): number => {
    if (r === 0) return init + effort * n;
    const factor = ((1 + r) ** n - 1) / r;
    return init * (1 + r) ** n + effort * factor;
  };

  const findEffortMensuel = (target: number, r: number, n: number, init: number): number => {
    if (target <= init) return 0;
    // Bisection
    let low = 0;
    let high = target * 2; // arbitrary high
    let mid = 0;
    for (let i = 0; i < 100; i++) {
      mid = (low + high) / 2;
      const cap = calculateCapitalFinal(mid, r, n, init);
      if (cap < target) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return mid;
  };

  const calculateWithRate = () => {
    const r = (annualRate / 100) / 12;
    const effort = findEffortMensuel(goal, r, months, initial);
    const capFinal = calculateCapitalFinal(effort, r, months, initial);
    const total = effort * months;
    const int = Math.max(capFinal - initial - total, 0);
    setEffortMensuel(effort);
    setTotalVerse(total);
    setInterets(int);
    setCapitalFinal(capFinal);
  };

  useEffect(() => {
    if (annualRate === 0) {
      calculateWithoutRate();
    } else {
      calculateWithRate();
    }
  }, [goal, months, initial, annualRate]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number = 0) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, parseFloat(e.target.value) || min);
    setter(value);
  };

  const isGoalReached = goal <= initial;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Objectif d’épargne (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={goal}
            onChange={handleInputChange(setGoal)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Durée (mois)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={months}
            onChange={handleInputChange(setMonths, 1)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Épargne initiale (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={initial}
            onChange={handleInputChange(setInitial)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Taux annuel (%)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={annualRate}
            onChange={handleInputChange(setAnnualRate)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {isGoalReached && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>Votre objectif est déjà atteint.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Effort mensuel</h3>
          <p className="text-2xl">{effortMensuel.toFixed(2)} €</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Total versé</h3>
          <p className="text-2xl">{totalVerse.toFixed(2)} €</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Intérêts estimés</h3>
          <p className="text-2xl">{interets.toFixed(2)} €</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Capital final estimé</h3>
          <p className="text-2xl">{capitalFinal.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;