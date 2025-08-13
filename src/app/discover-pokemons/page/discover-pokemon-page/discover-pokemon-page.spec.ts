import { provideZonelessChangeDetection } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { PokemonBuilder } from '@discover-pokemons/domain';
import { EventBus } from '@shared/application';
import { provideEventBus } from '@shared/public_api';
import { render } from '@testing-library/angular';

import { DiscoverPokemonPage } from './discover-pokemon-page';

describe('DiscoverPokemonPage', () => {
  const setup = () =>
    render(DiscoverPokemonPage, {
      deferBlockStates: DeferBlockState.Complete,
      providers: [
        provideZonelessChangeDetection(),
        provideEventBus(),
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
