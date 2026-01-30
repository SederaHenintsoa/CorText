import React, { useState } from "react";
import axios from "axios";

function Accueil() {
  const [text, setText] = useState("");
  const [result, setResult] = useState({
    corrected: "",
    errors: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");      
  const [formError, setFormError] = useState(""); 

  const handleCorrect = async () => {
    if (!text.trim()) {
      setFormError("Veuillez entrer du texte.");
      return;
    }

    try {
      setFormError("");
      setError("");
      setLoading(true);
      setResult({ corrected: "", errors: [] });

      const response = await axios.post(
        "http://localhost:8000/correct",
        { text },
        { timeout: 10000 }
      );

      setResult(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10 font-sans">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-green-600">CorTexte</h1>
      </header>

      <div className="grid grid-cols-2 gap-10">
        {/* Colonne gauche */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Votre texte</h2>

          <textarea
            className="w-full h-64 p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setFormError(""); 
            }}
          />

          <button
            onClick={handleCorrect}
            disabled={loading}
            className="mt-4 bg-green-500 text-white px-8 py-2 rounded-full hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Analyse en cours..." : "Corriger"}
          </button>

          {/* Erreur utilisateur */}
          {formError && (
            <p className="text-orange-500 mt-2 text-sm">
              {formError}
            </p>
          )}

          {/* Erreur serveur */}
          {error && (
            <p className="text-red-500 mt-2 text-sm">
              {error}
            </p>
          )}
        </section>

        {/* Colonne droite */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Suggestions
            <span className="ml-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
              {result.errors.length}
            </span>
          </h2>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {loading && (
              <div className="text-center text-gray-400 animate-pulse">
                Analyse linguistique du texte...
              </div>
            )}

            {!loading && result.errors.length > 0 && (
              result.errors.map((err, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-yellow-400"
                >
                  <p className="text-gray-700 text-sm mb-2">
                    {err.message}
                  </p>
                  <p className="text-green-600 font-bold">
                    Remplacement : {err.replacements[0]}
                  </p>
                </div>
              ))
            )}

            {!loading && result.errors.length === 0 && result.corrected && (
              <p className="text-gray-400 italic">
                Aucune faute détectée 🎉
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Texte corrigé */}
      {!loading && result.corrected && (
        <footer className="mt-10 bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold mb-2 text-green-600">
            Texte corrigé
          </h3>
          <p className="text-gray-800 leading-relaxed">
            {result.corrected}
          </p>
        </footer>
      )}
    </div>
  );
}

export default Accueil;
