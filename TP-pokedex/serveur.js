const express = require('express');
const app = express();
const pokedex = require('./pokedex.json');
let cors = require('cors')

app.use(express.json());
app.use(cors())


const languages = ['french', 'english'];


// Liste des pokemons
app.get('/pokemon', (req, res) => {
  const lang = req.query.lang || 'french';
  const HP   = "HP"
  const Attack = "Attack"
  const Defense = "Defense"
  const SpAttack = "Sp. Attack"
  const SpDefense = "Sp. Defense"
  const Speed = "Speed"
  

  const pokemons = pokedex.map(pokemon => ({
    id: pokemon.id,
    name: pokemon.name[lang],
    type: pokemon.type[1],
    HP: pokemon.base[HP],
    Attack: pokemon.base[Attack],
    Defense: pokemon.base[Defense],
    SpAttack: pokemon.base[SpAttack],
    SpDefense: pokemon.base[SpDefense],
    Speed: pokemon.base[Speed]
  }));

  res.json(pokemons);
});

app.get('/pokemon/search', (req, res) => {
  const lang = req.query.lang || 'english';
  const name = req.query.name;

  if (!languages.includes(lang)) {
    return res.status(400).json({ error: 'Invalid language' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  const pokemon = pokedex.find(pokemon => pokemon.name[lang].toLowerCase() === name.toLowerCase());

  if (!pokemon) {
    return res.status(404).json({ error: 'Pokemon not found' });
  }

  const details = {
    id: pokemon.id,
    name: pokemon.name[lang],
    type: pokemon.type,
    HP: pokemon.base[HP],
    Attack: pokemon.base[Attack],
    Defense: pokemon.base[Defense],
    SpAttack: pokemon.base[SpAttack],
    SpDefense: pokemon.base[SpDefense],
    Speed: pokemon.base[Speed]
  };

  res.json(details);
});


// Ajout d'un pokemon
app.post('/pokemon', (req, res) => {
  const pokemon = req.body;

  if (!pokemon || !pokemon.id || !pokemon.name || !pokemon.type || !pokemon.base) {
    return res.status(400).json({ error: 'Invalid pokemon data' });
  }

  pokedex.push(pokemon);

  res.status(200).json(pokemon);
});

// Modification d'un pokemon
app.put('/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = req.body;

  if (!pokemon || !pokemon.name || !pokemon.type || !pokemon.base) {
    return res.status(400).json({ error: 'Invalid pokemon' });
  }

  const index = pokedex.findIndex(pokemon => pokemon.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Pokemon not found' });
  }

  pokedex[index] = pokemon;

  res.json(pokemon);
});

// Suppression d'un pokemon
app.delete('/pokemon/:id', (req, res) => {
    const { id } = req.params;
  
    // Vérifier si un pokemon avec l'ID donné existe
    const pokemonIndex = pokedex.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
  
    // Supprimer le pokemon de la liste
    pokedex.splice(pokemonIndex, 1);
  })

app.listen(3000, () => {
  console.log("Serveur à l'écoute")

});
  

