import { Provider } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { Pokémon } from '@discover-pokémons/domain';

export const provideDiscoverPokemonsMocks = (): Provider[] => [
  {
    provide: GetAllPokémonUseCase,
    useFactory: () =>
      new GetAllPokémonUseCase({
        findAll: () =>
          Promise.resolve([
            new Pokémon(
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
