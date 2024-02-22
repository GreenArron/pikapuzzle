import { Pokedex } from "pokeapi-js-wrapper";

const Dex = new Pokedex({ timeout: 1000 * 60 * 2 });

function getRandPokemonId(...exclude) {
  let randId;
  do {
    randId = Math.floor(Math.random() * 629) + 1;
  } while (exclude.includes(randId));
  return randId;
}

async function getRandomPokemon(...exclude) {
  const randId = getRandPokemonId(...exclude);
  return await Dex.getPokemonSpeciesByName(randId);
}

async function getRandomPokemons(n) {
  const rands = [];
  const pokemons = [];
  let currentRand;
  for (let i = 0; i < n; i++) {
    currentRand = getRandPokemonId(rands);
    rands.push(currentRand);
    pokemons.push(await Dex.getPokemonSpeciesByName(currentRand));
  }
  return pokemons;
}

export { getRandomPokemons, getRandomPokemon };
