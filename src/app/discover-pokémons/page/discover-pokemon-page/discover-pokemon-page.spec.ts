import { provideZonelessChangeDetection } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { Pokémon } from '@discover-pokémons/domain';
import { render } from '@testing-library/angular';

import { DiscoverPokemonPage } from './discover-pokemon-page';

describe('DiscoverPokemonPage', () => {
  const setup = () =>
    render(DiscoverPokemonPage, {
      deferBlockStates: DeferBlockState.Complete,
      providers: [
        provideZonelessChangeDetection(),
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
                    'https://example.com/bulbasaur.png?1',
                    'https://example.com/bulbasaur.png?2',
                    'https://example.com/bulbasaur.png?3',
                  ),
                ]),
              findById: () => Promise.resolve(null),
            }),
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
