import { Pokémon, PokémonRepository } from "../domain";

export interface GetAllPokémonQuery {
  readonly page: number;
  readonly pageSize: number;
}

export class GetAllPokémonUseCase {
  constructor(
    private readonly pokémonRepository: PokémonRepository
  ) {}

  async execute(query: GetAllPokémonQuery): Promise<Pokémon[]> {
    return this.pokémonRepository.findAll(query.page, query.pageSize);
  }
}
