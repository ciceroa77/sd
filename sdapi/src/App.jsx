import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(0);
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFact = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://numbersapi.com/${number}`);
      if (!response.ok) {
        // Trata erros de resposta HTTP (ex: 404, 500)
        const errorText = await response.text(); // Tenta obter o texto do erro do servidor
        throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
      }
      const data = await response.text(); // A API numbersapi retorna texto diretamente
      setFact(data);
    } catch (err) {
      setError(`Erro ao buscar a curiosidade: ${err.message}`);
      console.error("Erro na requisição:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateNewFact = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    setNumber(randomNumber);
  };

  useEffect(() => {
    if (number !== 0) {
      fetchFact();
    }
  }, [number]);

  return (
    <div className="App">
      <h1>Curiosidades sobre Números</h1>
      <div>
        <label htmlFor="numberInput">Digite um número: </label>
        <input
          type="number"
          id="numberInput"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
        />
      </div>
      <button onClick={generateNewFact} disabled={loading}>Gerar Nova Curiosidade</button>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      {fact && <p className="fact">{fact}</p>}
    </div>
  );
}

export default App;