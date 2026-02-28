import React from 'react';
import { CountryListProps } from './types/Country';

const CountryList: React.FC<CountryListProps> = ({ countries }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {countries.map((country) => {
      const code = typeof country.code === 'string' && country.code.length === 2 ? country.code.toLowerCase() : null;
      const flagUrl = code ? `https://flagcdn.com/24x18/${code}.png` : null;
      return (
        <li key={country.code} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          {flagUrl ? (
            <img
              src={flagUrl}
              alt={`Drapeau ${country.code}`}
              style={{ width: 24, height: 18, marginRight: 8, objectFit: 'cover', borderRadius: 2, border: '1px solid #ccc' }}
              title={`Drapeau ${country.code}`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <span style={{ fontSize: '1.5em', marginRight: 8 }}>🏳️</span>
          )}
          <span style={{ marginRight: 8 }}>{country.code}</span>
          <span>{country.name}</span>
        </li>
      );
    })}
  </ul>
);

export default CountryList;
