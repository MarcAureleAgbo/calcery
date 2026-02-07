import React, { useState, useMemo } from 'react';

export default function IncomeCalculator() {
  const [income, setIncome] = useState(40000);
  const [nbParts, setNbParts] = useState(1);
  const [year, setYear] = useState(2025);

  // Tranches d'imposition France 2025 (célibataire)
  const taxBrackets2025 = [
    { limit: 11294, rate: 0 },
    { limit: 28797, rate: 0.11 },
    { limit: 82341, rate: 0.30 },
    { limit: 177882, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ];

  const taxBrackets2024 = [
    { limit: 11294, rate: 0 },
    { limit: 28797, rate: 0.11 },
    { limit: 82341, rate: 0.30 },
    { limit: 177882, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ];

  const brackets = year === 2025 ? taxBrackets2025 : taxBrackets2024;

  const result = useMemo(() => {
    const incomeTaxed = income / nbParts;
    let tax = 0;
    let prevLimit = 0;

    for (let bracket of brackets) {
      const taxableInThisBracket = Math.min(incomeTaxed, bracket.limit) - prevLimit;
      if (taxableInThisBracket > 0) {
        tax += taxableInThisBracket * bracket.rate;
      }
      prevLimit = bracket.limit;
      if (incomeTaxed <= bracket.limit) break;
    }

    const totalTax = tax * nbParts;
    const netAfterTax = income - totalTax;
    const effectiveRate = ((totalTax / income) * 100).toFixed(2);

    // Estimation cotisations sociales (environ 8% pour salarié)
    const socialContribution = income * 0.08;
    const netIncome = netAfterTax - socialContribution;

    return {
      taxBracket: incomeTaxed < 11294 ? '0%' : 
                  incomeTaxed < 28797 ? '11%' :
                  incomeTaxed < 82341 ? '30%' :
                  incomeTaxed < 177882 ? '41%' : '45%',
      totalTax: totalTax.toFixed(2),
      socialContribution: socialContribution.toFixed(2),
      netIncome: netIncome.toFixed(2),
      effectiveRate: effectiveRate,
    };
  }, [income, nbParts, year, brackets]);

  const handleExport = () => {
    const text = `Calcul d'impôt sur le revenu\n\nRevenu brut: ${income}€\nNombre de parts: ${nbParts}\nAnnée: ${year}\n\nImpôt à payer: ${result.totalTax}€\nCotisations sociales: ${result.socialContribution}€\nRevenu net: ${result.netIncome}€\nTaux effectif: ${result.effectiveRate}%`;
    navigator.clipboard.writeText(text);
    alert('Résultat copié!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            💰 Revenu annuel brut: <span className="text-black">{income.toLocaleString()}€</span>
          </label>
          <input
            type="range"
            min="1000"
            max="500000"
            step="1000"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">👨‍👩‍👧 Nombre de parts fiscales</label>
          <p className="text-sm text-gray-600 mb-2">
            Célibataire: 1 | Marié/PACS: 2 | + enfant: +0.5 ou +1
          </p>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={nbParts}
            onChange={(e) => setNbParts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">📅 Année fiscale</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025 (Estimation)</option>
          </select>
        </div>
      </div>

      {/* Nota Bene */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>⚠️ Note:</strong> Ce calculateur donne une estimation basée sur le barème standard 2025. Votre impôt réel peut varier selon les réductions/crédits d'impôt, investissements immobiliers, et autres abattements. Consultez votre avis d'imposition de l'année précédente pour plus de précision.
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Tranche marginale</p>
          <p className="text-2xl font-bold text-black">{result.taxBracket}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Taux effectif</p>
          <p className="text-2xl font-bold text-black">{result.effectiveRate}%</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Impôt à payer</p>
          <p className="text-2xl font-bold text-black">{result.totalTax}€</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Cotisations sociales</p>
          <p className="text-2xl font-bold text-black">{result.socialContribution}€</p>
        </div>
      </div>

      {/* Net Income Summary */}
      <div className="bg-black text-white rounded-lg p-6 text-center">
        <p className="text-gray-300 text-sm font-medium mb-2">💵 Revenu net après impôts et cotisations</p>
        <p className="text-4xl font-bold">{result.netIncome}€</p>
        <p className="text-sm text-gray-400 mt-2">/an | {(parseFloat(result.netIncome) / 12).toFixed(0)}€/mois</p>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">📊 Répartition</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Revenu brut</span>
            <span className="font-semibold text-black">{income.toLocaleString()}€</span>
          </div>
          <div className="flex justify-between items-center border-t pt-3">
            <span className="text-gray-700">- Impôt sur le revenu</span>
            <span className="font-semibold text-red-600">-{result.totalTax}€</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">- Cotisations sociales</span>
            <span className="font-semibold text-red-600">-{result.socialContribution}€</span>
          </div>
          <div className="flex justify-between items-center border-t-2 pt-3 mt-3">
            <span className="text-gray-900 font-semibold">= Revenu net</span>
            <span className="font-bold text-black text-lg">{result.netIncome}€</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Conseils de réduction d'impôts</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✓ Plan d'épargne retraite (PER) : déductible jusqu'à 10% de vos revenus</li>
          <li>✓ Assurance vie : rendement sans imposition si durée 8 ans</li>
          <li>✓ Investissement immobilier : amortissement possible</li>
          <li>✓ Dons aux associations : 66% du montant déductible</li>
          <li>✓ Défiscalisation : Pinel, Girardin, Malraux selon votre région</li>
        </ul>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        📋 Copier le résultat
      </button>
    </div>
  );
}
