import {
  EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
  Provider,
} from '@angular/core';
import {
  GetPokemonDetailsUseCase,
  GetPokemonsUseCase,
} from '@discover-pokemons/application';
import {
  LoadMorePokemonsCommand,
  LoadPokemonsCommand,
} from '@discover-pokemons/application/commands';
import { HttpPokemonRepository } from '@discover-pokemons/infrastructure/pokemon-repository';
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
  {
    provide: GetPokemonDetailsUseCase,
    useFactory: (
      httpPokemonRepository: HttpPokemonRepository,
      eventBus: IEventBus,
    ) => new GetPokemonDetailsUseCase(httpPokemonRepository, eventBus),
    deps: [HttpPokemonRepository, EventBus],
  },
  provideEnvironmentInitializer(() => {
    const commandBus = inject(CommandBus);
    const getPokemonsUseCase = inject(GetPokemonsUseCase);

    commandBus.register(LoadMorePokemonsCommand.name, getPokemonsUseCase);
    commandBus.register(LoadPokemonsCommand.name, getPokemonsUseCase);
  }),
];
