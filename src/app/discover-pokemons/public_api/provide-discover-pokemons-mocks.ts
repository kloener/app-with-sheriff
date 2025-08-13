import { Provider } from '@angular/core';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { Pokemon } from '@discover-pokemons/domain';
import { DomainEvent } from '@shared/domain';

export const provideDiscoverPokemonsMocks = (): Provider[] => [
  {
    provide: GetPokemonsUseCase,
    useFactory: () =>
      new GetPokemonsUseCase(
        {
          findAll: () =>
            Promise.resolve([
              new Pokemon(
                '1',
                'Bulbasaur',
                ['grass', 'poison'],
                1,
                45,
                49,
                'Bulbasaur',
                ['overgrow', 'chlorophyll'],
                {
                  hp: 45,
                  attack: 49,
                  defense: 49,
                  'special-attack': 65,
                  'special-defense': 65,
                  speed: 45,
                } satisfies Record<
                  | 'hp'
                  | 'attack'
                  | 'defense'
                  | 'special-attack'
                  | 'special-defense'
                  | 'speed',
                  number
                >,
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
              ),
            ]),
          findById: () => Promise.resolve(null),
        },
        {
          publish<EventType = unknown>(_event: DomainEvent<EventType>): void {
            // no-op
          },
        },
      ),
  },
];
