import { inject, provideEnvironmentInitializer } from '@angular/core';
import { Routes } from '@angular/router';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { provideDiscoverPokemons } from '@discover-pokemons/public_api/provide-discover-pokemons';
import { CommandBus } from '@shared/application';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideDiscoverPokemons(),
      provideEnvironmentInitializer(() => {
        const commandBus = inject(CommandBus);
        const getPokemonsUseCase = inject(GetPokemonsUseCase);

        try {
          commandBus.register(LoadMorePokemonsCommand.name, getPokemonsUseCase);
        } catch {
          // This is a workaround for the issue with the command bus being registered multiple times}
        }
      }),
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../page').then((m) => m.DiscoverPokemonPage),
      },
      {
        path: 'details/:idOrName',
        loadComponent: () =>
          import('../page').then((m) => m.DetailsPokemonPage),
      },
    ],
  },
];
