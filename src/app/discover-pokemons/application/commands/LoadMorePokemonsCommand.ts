import { Pokemon } from '@discover-pokemons/domain';
import { Command } from '@shared/domain';

export class LoadMorePokemonsCommand implements Command<never, Pokemon[]> {
  public readonly commandName = LoadMorePokemonsCommand.name;

  private constructor() {
    // Private constructor to enforce the use of the static create method
  }

  static create(): Command<never, Pokemon[]> {
    return new LoadMorePokemonsCommand();
  }
}
