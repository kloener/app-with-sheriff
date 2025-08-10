import { Pokemon, PokemonRepository } from '../domain';

export interface GetAllPokemonQuery {
  readonly page: number;
  readonly pageSize: number;
}

export class GetAllPokemonUseCase {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async execute(query: GetAllPokemonQuery): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll(query.page, query.pageSize);
  }
}
