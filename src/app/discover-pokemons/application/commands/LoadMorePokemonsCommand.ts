import { Command } from '@shared/domain';

export class LoadMorePokemonsCommand implements Command<void> {
  public readonly commandName = LoadMorePokemonsCommand.name;

  private constructor() {
    // Private constructor to enforce the use of the static create method
  }

  static create(): LoadMorePokemonsCommand {
    return new LoadMorePokemonsCommand();
  }
}
