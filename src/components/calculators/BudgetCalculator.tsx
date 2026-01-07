import React, { useState, useEffect } from 'react';

const BudgetCalculator: React.FC = () => {
  const [revenu, setRevenu] = useState<number>(0);
  const [logement, setLogement] = useState<number>(0);
  const [alimentation, setAlimentation] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);
  const [loisirs, setLoisirs] = useState<number>(0);
  const [autres, setAutres] = useState<number>(0);

  const [totalDepenses, setTotalDepenses] = useState<number>(0);
  const [resteAVivre, setResteAVivre] = useState<number>(0);
  const [tauxEpargne, setTauxEpargne] = useState<number>(0);

  useEffect(() => {
    const depenses = logement + alimentation + transport + loisirs + autres;
    setTotalDepenses(depenses);
    const reste = revenu - depenses;
    setResteAVivre(reste);
    setTauxEpargne(revenu > 0 ? (reste / revenu) * 100 : 0);
  }, [revenu, logement, alimentation, transport, loisirs, autres]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setter(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Revenu mensuel net (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={revenu}
            onChange={handleInputChange(setRevenu)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 2500"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Dépenses Logement (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={logement}
            onChange={handleInputChange(setLogement)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 800"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Dépenses Alimentation (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={alimentation}
            onChange={handleInputChange(setAlimentation)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 400"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Dépenses Transport (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={transport}
            onChange={handleInputChange(setTransport)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 200"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Dépenses Loisirs (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={loisirs}
            onChange={handleInputChange(setLoisirs)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 150"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Dépenses Autres (€)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={autres}
            onChange={handleInputChange(setAutres)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Total dépenses</h3>
          <p className="text-2xl">{totalDepenses.toFixed(2)} €</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Reste à vivre</h3>
          <p className={`text-2xl ${resteAVivre < 0 ? 'text-red-600' : ''}`}>{resteAVivre.toFixed(2)} €</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Taux d’épargne</h3>
          <p className="text-2xl">{tauxEpargne.toFixed(2)} %</p>
        </div>
      </div>

      {resteAVivre < 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Vos dépenses dépassent vos revenus. Pensez à réduire certaines dépenses.</p>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;