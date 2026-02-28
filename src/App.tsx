import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import CountryList from './CountryList';
import { fetchCountries } from './countriesApi';
import { Country } from './types/Country';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors du chargement des pays');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>
        <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '8px' }} />
        Liste des pays
      </h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <CountryList countries={countries} />}
    </div>
  );
}

export default App;