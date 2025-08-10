import {
  EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { HttpPokemonRepository } from '@discover-pokemons/infrastructure';
import { CommandBus } from '@shared/application';

export const provideDiscoverPokemons = (): (
  | Provider
  | EnvironmentProviders
)[] => [
  {
    provide: GetPokemonsUseCase,
    useFactory: (httpPokemonRepository: HttpPokemonRepository) =>
      new GetPokemonsUseCase(httpPokemonRepository),
    deps: [HttpPokemonRepository],
  },
  provideEnvironmentInitializer(() => {
    const commandBus = inject(CommandBus);
    const getPokemonsUseCase = inject(GetPokemonsUseCase);

    commandBus.register(LoadMorePokemonsCommand.name, getPokemonsUseCase);
  }),
];
