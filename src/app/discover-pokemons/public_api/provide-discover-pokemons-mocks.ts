import { Provider } from '@angular/core';
import { GetAllPokemonUseCase } from '@discover-pokemons/application';
import { Pokemon } from '@discover-pokemons/domain';

export const provideDiscoverPokemonsMocks = (): Provider[] => [
  {
    provide: GetAllPokemonUseCase,
    useFactory: () =>
      new GetAllPokemonUseCase({
        findAll: () =>
          Promise.resolve([
            new Pokemon(
              '1',
              'Bulbasaur',
              1,
              45,
              49,
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            ),
          ]),
        findById: () => Promise.resolve(null),
      }),
  },
];
