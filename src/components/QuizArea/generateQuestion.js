import { randomItems } from "/src/utils/common";
import pokemonNames from "/src/stored/names";
import pokemonTypes from "/src/stored/types";
import pokemonAbilities from "/src/stored/abilities";
import pokemonEggGroups from "/src/stored/egg_groups";
import pokemonGenerations from "/src/stored/generations";
import pokemonDexColors from "/src/stored/dexcolors";

const NUM_OPTIONS = 4;

function selectQuestion(score) {
  const numberOfQuestions = score < 7 ? 3 : 6;
  // question 1 2 0 are the easier ones
  // so 3 4 5 unlock when score > 6
  return (score + 1) % numberOfQuestions;
}

function generateQuestion(score, forPokemon) {
  const correctIndex = Math.floor(Math.random() * NUM_OPTIONS);
  // note, it is in range [0, NUM_OPTIONS - 1]
  let options;
  let question;

  const questionIndex = selectQuestion(score);
  switch (questionIndex) {
    case 1:
      question = "What's it called?";

      options = [
        ...randomItems(pokemonNames, correctIndex, forPokemon.name),
        forPokemon.name,
      ];
      options.push(
        ...randomItems(
          pokemonNames,
          NUM_OPTIONS - 1 - correctIndex,
          ...options,
        ),
      );

      break;
    case 2: {
      const forPokemonTypes = forPokemon.types.map((val) => val.type.name);

      question = `What type of pokemon is ${forPokemon.name}`;

      options = [
        ...randomItems(pokemonTypes, correctIndex, ...forPokemonTypes),
        forPokemon.types[forPokemon.types.length - 1].type.name,
      ];
      options.push(
        ...randomItems(
          pokemonTypes,
          NUM_OPTIONS - 1 - correctIndex,
          ...options,
          ...forPokemonTypes, // not all types are pushed to options
        ),
      );

      break;
    }
    case 0: {
      // abilities
      const forPokemonAbilitiesUnfiltered = forPokemon.abilities.map(
        (item) => item.ability.name,
      );
      const forPokemonAbilities = forPokemon.abilities
        .filter((ability) => !ability.is_hidden)
        .map((item) => item.ability.name);

      if (forPokemonAbilities.length >= 3) {
        question = `Which of these isn't an ability of ${forPokemon.name}?`;
        options = [
          ...randomItems(forPokemonAbilities, correctIndex),
          ...randomItems(pokemonAbilities, 1, forPokemonAbilitiesUnfiltered),
        ];
        options.push(
          ...randomItems(
            forPokemonAbilities,
            NUM_OPTIONS - 1 - correctIndex,
            ...options,
          ),
        );
      } else {
        question = `Which of these abilities does ${forPokemon.name} have`;
        options = [
          ...randomItems(
            pokemonAbilities,
            correctIndex,
            ...forPokemonAbilitiesUnfiltered,
          ),
          ...randomItems(forPokemonAbilities, 1),
        ];
        options.push(
          ...randomItems(
            pokemonAbilities,
            NUM_OPTIONS - 1 - correctIndex,
            ...options,
            ...forPokemonAbilitiesUnfiltered, // options doesn't contain all of them
          ),
        );
      }
      break;
    }
    case 3: {
      // egg group
      const forPokemonEggGroups = forPokemon.species.egg_groups.map(
        (group) => group.name,
      );
      console.log(forPokemonEggGroups);
      question = `What egg group is ${forPokemon.name} from`;
      options = [
        ...randomItems(pokemonEggGroups, correctIndex, ...forPokemonEggGroups),
        ...randomItems(forPokemonEggGroups, 1),
      ];
      options.push(
        ...randomItems(
          pokemonNames,
          NUM_OPTIONS - 1 - correctIndex,
          ...options,
          ...forPokemonEggGroups,
        ),
      );

      break;
    }
    case 4:
      // generations

      question = `What generation does ${forPokemon.name} originate from`;
      options = [
        ...randomItems(
          pokemonGenerations,
          correctIndex,
          forPokemon.species.generation.name,
        ),
        forPokemon.species.generation.name,
      ];
      options.push(
        ...randomItems(
          pokemonGenerations,
          NUM_OPTIONS - 1 - correctIndex,
          ...options,
        ),
      );

      break;

    case 5:
      // dex color
      // color.name
      question = `what color is used in the pokedex for ${forPokemon.name}`;
      options = [
        ...randomItems(
          pokemonDexColors,
          correctIndex,
          forPokemon.species.color.name,
        ),
        forPokemon.species.color.name,
      ];
      options.push(
        ...randomItems(
          pokemonDexColors,
          NUM_OPTIONS - 1 - correctIndex,
          ...options,
        ),
      );
      break;

    default:
      throw Error;
  }

  return {
    question,
    options,
    correctIndex,
    answered: false,
  };
}

export default generateQuestion;
export { selectQuestion };
