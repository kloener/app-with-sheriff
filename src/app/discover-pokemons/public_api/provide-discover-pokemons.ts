import {
  EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { HttpPokemonRepository } from '@discover-pokemons/infrastructure';
import { CommandBus, EventBus } from '@shared/application';
import type { IEventBus } from '@shared/domain';

export const provideDiscoverPokemons = (): (
  | Provider
  | EnvironmentProviders
)[] => [
  {
    provide: GetPokemonsUseCase,
    useFactory: (
      httpPokemonRepository: HttpPokemonRepository,
      eventBus: IEventBus,
    ) => new GetPokemonsUseCase(httpPokemonRepository, eventBus),
    deps: [HttpPokemonRepository, EventBus],
  },
  provideEnvironmentInitializer(() => {
    const commandBus = inject(CommandBus);
    const getPokemonsUseCase = inject(GetPokemonsUseCase);

    commandBus.register(LoadMorePokemonsCommand.name, getPokemonsUseCase);
  }),
];
