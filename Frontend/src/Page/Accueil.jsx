import React, { useState } from 'react'

function Accueil() {
    const [text, setText] = useState("");
      const [result, setResult] = useState({ corrected: "", errors: [] });

      const handleCorrect = async () => {
        const response = await fetch("http://localhost:8000/correct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
        const data = await response.json();
        setResult(data);
      };

      return (
        <div className="bg-gray-50 min-h-screen p-10 font-sans">
          {/* Header CorTexte */}
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-green-600">CorTexte</h1>
            <span>Mode nuit</span>
          </header>

          <div className="grid grid-cols-2 gap-10">
            {/* Colonne Gauche : Saisie */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Votre texte</h2>
              <textarea 
                className="w-full h-64 p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button 
                onClick={handleCorrect}
                className="mt-4 bg-green-500 text-white px-8 py-2 rounded-full hover:bg-green-600 transition"
              >
                Corriger
              </button>
            </section>

            {/* Colonne Droite : Cartes d'erreurs (Comme sur ton Figma) */}
          {/* Section Droite : Cartes de suggestions */}
<section className="flex-1">
  <h2 className="text-xl font-semibold mb-4 flex items-center">
    Correction possible 
    {/* Badge dynamique pour le nombre d'erreurs */}
    <span className="ml-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
      {result.errors.length}
    </span>
  </h2>

  <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
    {/* C'est ici que l'on place le code .map() */}
    {result.errors.length > 0 ? (
      result.errors.map((err, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-400 mb-4 transition-all hover:shadow-md">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <p className="text-sm text-gray-500 font-medium">Suggestion</p>
          </div>
          <p className="text-gray-700 text-sm mb-2">{err.message}</p>
          <p className="text-green-600 font-bold">
            Remplacement possible : {err.replacements[0]}
          </p>
        </div>
      ))
    ) : (
      <p className="text-gray-400 italic">Aucune faute détectée pour le moment.</p>
    )}
  </div>
</section>
          </div>

          {/* Affichage du texte final en bas */}
          <footer className="mt-10 bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold mb-2">Correction possible</h3>
            <p className="text-gray-800 leading-relaxed">{result.corrected}</p>
          </footer>
        </div>
      );
}

export default Accueil