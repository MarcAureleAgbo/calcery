import React, { useState, useMemo } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [compounding, setCompounding] = useState('annually');

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

  const handleShare = () => {
    const text = `Capital initial: ${principal}€ | Taux: ${rate}% | Durée: ${years}ans | Résultat: ${result.finalAmount}€`;
    navigator.clipboard.writeText(text);
    alert('Résultat copié!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            💰 Capital initial: <span className="text-black">{principal.toLocaleString()}€</span>
          </label>
          <input
            type="range"
            min="100"
            max="1000000"
            step="1000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            📊 Taux annuel (%): <span className="text-black">{rate.toFixed(2)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            ⏱️ Durée (ans): <span className="text-black">{years}</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">🔄 Fréquence de capitalisation</label>
          <select
            value={compounding}
            onChange={(e) => setCompounding(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="annually">Annuelle</option>
            <option value="semiannually">Semestrielle</option>
            <option value="quarterly">Trimestrielle</option>
            <option value="monthly">Mensuelle</option>
            <option value="daily">Quotidienne</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Montant final</p>
          <p className="text-3xl font-bold text-black">{result.finalAmount}€</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Intérêts gagnés</p>
          <p className="text-3xl font-bold text-black">+{result.interest}€</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Rendement total</p>
          <p className="text-3xl font-bold text-black">{result.totalReturn}%</p>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📐 Formule utilisée</h3>
        <p className="text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded">
          A = P(1 + r/n)^(nt)
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mt-3">
          <li>• <strong>A</strong> = Montant final</li>
          <li>• <strong>P</strong> = Capital initial ({principal}€)</li>
          <li>• <strong>r</strong> = Taux annuel ({rate}%)</li>
          <li>• <strong>n</strong> = Fréquence de capitalisation ({compoundingFrequency[compounding]})</li>
          <li>• <strong>t</strong> = Nombre d'années ({years})</li>
        </ul>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        📋 Copier le résultat
      </button>
    </div>
  );
}
