import { Pokedex } from "pokeapi-js-wrapper";

const Dex = new Pokedex({ timeout: 1000 * 60 * 2 });

async function getRandomPokemonById(id) {
  const pokemon = await Dex.getPokemonByName(id);
  const pokemonSpecies = await Dex.getPokemonSpeciesByName(id);
  return { ...pokemon, species: pokemonSpecies };
}

function getRandPokemonId(...exclude) {
  let randId;
  do {
    randId = Math.floor(Math.random() * 629) + 1;
  } while (exclude.includes(randId));
  return randId;
}

async function getRandomPokemon(...exclude) {
  const randId = getRandPokemonId(...exclude);
  return await getRandomPokemonById(randId);
}

async function getRandomPokemons(n) {
  const rands = [];
  const pokemons = [];
  let currentRand;
  for (let i = 0; i < n; i++) {
    currentRand = getRandPokemonId(rands);
    rands.push(currentRand);
    pokemons.push(await getRandomPokemonById(currentRand));
  }
  return pokemons;
}

export { getRandomPokemons, getRandomPokemon, Dex };
