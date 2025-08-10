import { Pokemon, PokemonRepository } from '@discover-pokemons/domain';
import { GetAllPokemonUseCase } from './discover-pokemon.use-cases';

describe('GetAllPokemonUseCase', () => {
  let useCase: GetAllPokemonUseCase;
  const mockPokemon = new Pokemon('1', 'Bulbasaur', 1, 45, 49, '', '', '');
  const mockRepository: PokemonRepository = {
    findAll(_page: number, _pageSize: number): Promise<Pokemon[]> {
      return Promise.resolve([mockPokemon]);
    },
    findById(_id: string): Promise<Pokemon | null> {
      return Promise.resolve(mockPokemon);
    },
  };

  beforeEach(() => {
    useCase = new GetAllPokemonUseCase(mockRepository);
  });

  it('should rertieve all Pokemon using repository', async () => {
    // Arrange
    const page = 1;
    const pageSize = 10;
    const expectedPokemon: Pokemon[] = [mockPokemon];

    // Act
    const result = await useCase.execute({ page, pageSize });

    // Assert
    expect(result).toEqual(expectedPokemon);
  });
});
