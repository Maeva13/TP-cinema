import React, { useState, useEffect } from 'react';
import axios from 'axios';

const typeColors = {
  'Grass': '#78c850',
  'Fire': '#f08030',
  'Water': '#6890f0',
  'Bug': '#a8b820',
  'Normal': '#a8a878',
  'Poison': '#a040a0',
  'Electric': '#f8d030',
  'Ground': '#e0c068',
  'Fairy': '#ee99ac',
  'Fighting': '#c03028',
  'Psychic': '#f85888',
  'Rock': '#b8a038',
  'Ghost': '#705898',
  'Ice': '#98d8d8',
  'Dragon': '#7038f8',
  'Dark': '#705848',
  'Steel': '#b8b8d0'
};

export default function Appli() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/pokemon')
         .then(response => setPokemons(response.data))
         .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  function getTypeColor(type) {
    return typeColors[type] || '#000000';  
  }

  return (
    <div>
      <h1>Pokedex</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td style={{ backgroundColor: getTypeColor(pokemon.type) }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


