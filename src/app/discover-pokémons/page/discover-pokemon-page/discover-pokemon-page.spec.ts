import { provideZonelessChangeDetection } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { Pokémon } from '@discover-pokémons/domain';
import { render } from '@testing-library/angular';

import { DiscoverPokemonPage } from './discover-pokemon-page';

describe('DiscoverPokemonPage', () => {
  const setup = () =>
    render(DiscoverPokemonPage, {
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
    const pokemonImage = await findByRole('img');

    // Assert
    expect(listItem).not.toBeNull();
    expect(pokemonImage).not.toBeNull();
    expect(listItem.textContent).toEqual('');
  });
});
