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
          <label htmlFor="revenu" className="block mb-2 font-semibold">Revenu mensuel net (€)</label>
          <input
            id="revenu"
            type="number"
            min="0"
            step="any"
            value={revenu}
            onChange={handleInputChange(setRevenu)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 2500"
          />
          <p className="text-sm text-gray-500 mt-1">Entrez votre salaire après impôts et charges.</p>
        </div>
        <div>
          <label htmlFor="logement" className="block mb-2 font-semibold">Dépenses Logement (€)</label>
          <input
            id="logement"
            type="number"
            min="0"
            step="any"
            value={logement}
            onChange={handleInputChange(setLogement)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 800"
          />
          <p className="text-sm text-gray-500 mt-1">Loyer, charges, assurance habitation.</p>
        </div>
        <div>
          <label htmlFor="alimentation" className="block mb-2 font-semibold">Dépenses Alimentation (€)</label>
          <input
            id="alimentation"
            type="number"
            min="0"
            step="any"
            value={alimentation}
            onChange={handleInputChange(setAlimentation)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 400"
          />
          <p className="text-sm text-gray-500 mt-1">Courses, restaurants, snacks.</p>
        </div>
        <div>
          <label htmlFor="transport" className="block mb-2 font-semibold">Dépenses Transport (€)</label>
          <input
            id="transport"
            type="number"
            min="0"
            step="any"
            value={transport}
            onChange={handleInputChange(setTransport)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 200"
          />
          <p className="text-sm text-gray-500 mt-1">Carburant, transports en commun, assurance auto.</p>
        </div>
        <div>
          <label htmlFor="loisirs" className="block mb-2 font-semibold">Dépenses Loisirs (€)</label>
          <input
            id="loisirs"
            type="number"
            min="0"
            step="any"
            value={loisirs}
            onChange={handleInputChange(setLoisirs)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 150"
          />
          <p className="text-sm text-gray-500 mt-1">Sorties, hobbies, abonnements.</p>
        </div>
        <div>
          <label htmlFor="autres" className="block mb-2 font-semibold">Dépenses Autres (€)</label>
          <input
            id="autres"
            type="number"
            min="0"
            step="any"
            value={autres}
            onChange={handleInputChange(setAutres)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 100"
          />
          <p className="text-sm text-gray-500 mt-1">Santé, éducation, imprévus.</p>
        </div>
      </div>

      {revenu === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Renseignez un montant de revenu pour voir les résultats de votre budget.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800">Total dépenses</h3>
            <p className="text-2xl text-red-600">{totalDepenses.toFixed(2)} €</p>
          </div>
          <div className={`p-4 rounded-lg border ${resteAVivre >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h3 className={`font-semibold ${resteAVivre >= 0 ? 'text-green-800' : 'text-red-800'}`}>Reste à vivre</h3>
            <p className={`text-2xl ${resteAVivre >= 0 ? 'text-green-600' : 'text-red-600'}`}>{resteAVivre.toFixed(2)} €</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Taux d’épargne</h3>
            <p className="text-2xl text-blue-600">{tauxEpargne.toFixed(2)} %</p>
          </div>
        </div>
      )}

      {resteAVivre < 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Vos dépenses dépassent vos revenus. Pensez à réduire certaines dépenses.</p>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;