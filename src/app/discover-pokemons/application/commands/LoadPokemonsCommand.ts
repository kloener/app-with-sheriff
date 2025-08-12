import { Pokemon } from '@discover-pokemons/domain';
import { Command } from '@shared/domain';

/**
 * Initially Load Pokemons without changing page, limit or offsets.
 */
export class LoadPokemonsCommand implements Command<never, Pokemon[]> {
  public readonly commandName = LoadPokemonsCommand.name;

  private constructor() {
    // Private constructor to enforce the use of the static create method
  }

  static create(): Command<never, Pokemon[]> {
    return new LoadPokemonsCommand();
  }
}
