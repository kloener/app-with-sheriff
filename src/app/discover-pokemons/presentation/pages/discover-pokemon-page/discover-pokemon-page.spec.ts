import {
  inject,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import {
  LoadMorePokemonsCommand,
  LoadPokemonsCommand,
} from '@discover-pokemons/application/commands';
import { PokemonBuilder } from '@discover-pokemons/domain';
import { CommandBus, EventBus } from '@shared/application';
import { provideEventBus } from '@shared/providers';
import { render } from '@testing-library/angular';

import { DiscoverPokemonPage } from './discover-pokemon-page';

describe('DiscoverPokemonPage', () => {
  const setup = () =>
    render(DiscoverPokemonPage, {
      deferBlockStates: DeferBlockState.Complete,
      providers: [
        provideZonelessChangeDetection(),
        provideEventBus(),
        provideEnvironmentInitializer(() => {
          const commandBus = inject(CommandBus);
          const getPokemonsUseCase = inject(GetPokemonsUseCase);

          commandBus.register(LoadMorePokemonsCommand.name, getPokemonsUseCase);
          commandBus.register(LoadPokemonsCommand.name, getPokemonsUseCase);
        }),
        {
          provide: GetPokemonsUseCase,
          useFactory: () =>
            new GetPokemonsUseCase(
              {
                findAll: () =>
                  Promise.resolve([
                    PokemonBuilder.createWithBulbasaurDefaults().build(),
                  ]),
                findById: () => Promise.resolve(null),
              },
              new EventBus(),
            ),
        },
      ],
    });

  it('should render pokemon list', async () => {
    // Arrange
    const { findByRole } = await setup();

    // Act
    const listItem = await findByRole('listitem');

    // Assert
    expect(listItem).not.toBeNull();
  });
});
