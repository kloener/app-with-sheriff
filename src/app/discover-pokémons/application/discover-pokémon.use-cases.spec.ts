import { Pokémon, PokémonRepository } from '@discover-pokémons/domain';
import { GetAllPokémonUseCase } from './discover-pokémon.use-cases';

describe('GetAllPokémonUseCase', () => {
  let useCase: GetAllPokémonUseCase;
  const mockPokémon = new Pokémon('1', 'Bulbasaur', 1, 45, 49, '', '', '');
  const mockRepository: PokémonRepository = {
    findAll(_page: number, _pageSize: number): Promise<Pokémon[]> {
      return Promise.resolve([mockPokémon]);
    },
    findById(_id: string): Promise<Pokémon | null> {
      return Promise.resolve(mockPokémon);
    },
  };

  beforeEach(() => {
    useCase = new GetAllPokémonUseCase(mockRepository);
  });

  it('should rertieve all Pokémon using repository', async () => {
    // Arrange
    const page = 1;
    const pageSize = 10;
    const expectedPokémon: Pokémon[] = [mockPokémon];

    // Act
    const result = await useCase.execute({ page, pageSize });

    // Assert
    expect(result).toEqual(expectedPokémon);
  });
});
