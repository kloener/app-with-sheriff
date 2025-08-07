import { PokemonList } from './pokemon-list';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { render } from '@testing-library/angular';

describe('PokemonList', () => {
  const setup = () =>
    render(PokemonList, {
      providers: [
        {
          provide: GetAllPokémonUseCase,
          useValue: { execute: () => Promise.resolve([]) },
        },
      ],
    });

  it('should create', async () => {
    const screen = await setup();

    expect(screen.queryByRole('list')).not.toBeNull();
  });
});
