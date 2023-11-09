import  { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tipo, setTipo] = useState('chiste'); // 'chiste' o 'quote'
  const [resultado, setResultado] = useState('');
  const [cargando, setCargando] = useState(false);

  const fetchResultado = async () => {
    try {
      setCargando(true);
      let apiUrl = '';
      
      if (tipo === 'chiste') {
        apiUrl = 'https://icanhazdadjoke.com/';
      } else {
        apiUrl = 'https://quote-garden.onrender.com/api/v3/quotes/random';
      }

      const response = await fetch(apiUrl, {
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();

      if (tipo === 'chiste') {
        setResultado(data.joke);
      } else {
        setResultado(data.data[0].quoteText);
      }
    } catch (error) {
      console.error('Error al obtener el resultado:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchResultado();
  }, [tipo]);

  return (
    <div className="container">
      <h1>Mi Aplicación de Entretenimiento</h1>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="chiste">Chiste</option>
        <option value="cita">Cita Celebre</option>
      </select>
      <button type="button" onClick={fetchResultado} disabled={cargando}>
        Obtener Resultado
      </button>
      {cargando && <p className="cargando">Cargando...</p>}
      {resultado && <p className="resultado">{resultado}</p>}
    </div>
  );
};

export default App;

