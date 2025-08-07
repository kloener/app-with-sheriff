import { provideZonelessChangeDetection } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { render } from '@testing-library/angular';
import { PokemonList } from './pokemon-list';

describe('PokemonList', () => {
  const setup = () =>
    render(PokemonList, {
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GetAllPokémonUseCase,
          useValue: { execute: () => Promise.resolve([]) },
        },
      ],
    });

  it('should an empty list', async () => {
    const screen = await setup();

    expect(screen.queryByRole('list')).not.toBeNull();
  });
});
