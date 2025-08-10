import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { ICommandHandler } from '@shared/domain';
import { Pokemon, PokemonRepository } from '../domain';

export interface GetPokemonsQuery {
  readonly page: number;
  readonly pageSize: number;
}

export class GetPokemonsUseCase
  implements ICommandHandler<Pokemon[], LoadMorePokemonsCommand>
{
  private page = 1;
  private pageSize = 20;
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  handle(_command: LoadMorePokemonsCommand) {
    this.page += 1;
    return this.execute({ page: this.page, pageSize: this.pageSize });
  }

  async execute(query: GetPokemonsQuery): Promise<Pokemon[]> {
    this.page = query.page;
    this.pageSize = query.pageSize;
    return this.pokemonRepository.findAll(this.page, this.pageSize);
  }
}
