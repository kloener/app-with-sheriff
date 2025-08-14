import type { PokemonDetailDTO } from './PokemonDetailDTO';

const mockDetails: PokemonDetailDTO[] = [
  {
    abilities: [
      {
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/',
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: 'chlorophyll',
          url: 'https://pokeapi.co/api/v2/ability/34/',
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: 64,
    cries: {
      latest:
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
      legacy:
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg',
    },
    forms: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-form/1/' },
    ],
    height: 7,
    held_items: [],
    id: 1,
    is_default: true,
    location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
    name: 'bulbasaur',
    order: 1,
    species: {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
    },
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      back_female: null,
      back_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
      back_shiny_female: null,
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      front_female: null,
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
          front_female: null,
        },
        home: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png',
          front_shiny_female: null,
        },
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png',
        },
        showdown: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/1.gif',
          back_female: null,
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/1.gif',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/1.gif',
          front_shiny_female: null,
        },
      },
    },
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
      },
      {
        base_stat: 65,
        effort: 1,
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        base_stat: 65,
        effort: 0,
        stat: {
          name: 'special-defense',
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        base_stat: 45,
        effort: 0,
        stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
      },
    ],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      },
    ],
    weight: 69,
  },
  {
    abilities: [
      {
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/',
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: 'chlorophyll',
          url: 'https://pokeapi.co/api/v2/ability/34/',
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: 142,
    cries: {
      latest:
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/2.ogg',
      legacy:
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/2.ogg',
    },
    forms: [
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-form/2/' },
    ],
    height: 10,
    held_items: [],
    id: 2,
    is_default: true,
    location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/2/encounters',
    name: 'ivysaur',
    order: 2,
    species: {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
    },
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
      back_female: null,
      back_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png',
      back_shiny_female: null,
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      front_female: null,
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png',
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
          front_female: null,
        },
        home: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/2.png',
          front_shiny_female: null,
        },
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/2.png',
        },
        showdown: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/2.gif',
          back_female: null,
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/2.gif',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/2.gif',
          front_female: null,
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/2.gif',
          front_shiny_female: null,
        },
      },
    },
    stats: [
      {
        base_stat: 60,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
      },
      {
        base_stat: 62,
        effort: 0,
        stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
      },
      {
        base_stat: 63,
        effort: 0,
        stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
      },
      {
        base_stat: 80,
        effort: 1,
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        base_stat: 80,
        effort: 1,
        stat: {
          name: 'special-defense',
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        base_stat: 60,
        effort: 0,
        stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
      },
    ],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      },
    ],
    weight: 130,
  },
  {
    abilities: [
      {
        ability: {
          name: 'overgrow',
          url: 'https://pokeapi.co/api/v2/ability/65/',
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: 'chlorophyll',
          url: 'https://pokeapi.co/api/v2/ability/34/',
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: 236,
    cries: {
      latest:
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/3.ogg',
      legacy:
        'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/3.ogg',
    },
    forms: [
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-form/3/' },
    ],
    height: 20,
    held_items: [],
    id: 3,
    is_default: true,
    location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/3/encounters',
    name: 'venusaur',
    order: 3,
    species: {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
    },
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',
      back_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/3.png',
      back_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/3.png',
      back_shiny_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/3.png',
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      front_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/3.png',
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png',
      front_shiny_female:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/3.png',
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
          front_female: null,
        },
        home: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png',
          front_female:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/female/3.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/3.png',
          front_shiny_female:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/female/3.png',
        },
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/3.png',
        },
        showdown: {
          back_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/3.gif',
          back_female:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/female/3.gif',
          back_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/3.gif',
          back_shiny_female: null,
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif',
          front_female:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/female/3.gif',
          front_shiny:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/3.gif',
          front_shiny_female:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/female/3.gif',
        },
      },
    },
    stats: [
      {
        base_stat: 80,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
      },
      {
        base_stat: 82,
        effort: 0,
        stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
      },
      {
        base_stat: 83,
        effort: 0,
        stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
      },
      {
        base_stat: 100,
        effort: 2,
        stat: {
          name: 'special-attack',
          url: 'https://pokeapi.co/api/v2/stat/4/',
        },
      },
      {
        base_stat: 100,
        effort: 1,
        stat: {
          name: 'special-defense',
          url: 'https://pokeapi.co/api/v2/stat/5/',
        },
      },
      {
        base_stat: 80,
        effort: 0,
        stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
      },
    ],
    types: [
      {
        slot: 1,
        type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
      },
      {
        slot: 2,
        type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
      },
    ],
    weight: 1000,
  },
];
export default (idOrName: string): PokemonDetailDTO | undefined =>
  mockDetails.find(
    (detail) => `${detail.id}` === idOrName || detail.name === idOrName,
  );
