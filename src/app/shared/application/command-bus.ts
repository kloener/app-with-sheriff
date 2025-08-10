import {
  Command,
  ICommandBus,
  ICommandHandler,
  ICommandHandlerRegistry,
} from '@shared/domain';

export class CommandNotFoundFor extends Error {
  constructor(commandName: string) {
    super(`No handler registered for command: ${commandName}`);
  }
}

export class CommandHandlerAlreadySet extends Error {
  constructor(commandName: string) {
    super(`CommandHandler already registered for command: ${commandName}`);
  }
}

export class CommandBus implements ICommandBus, ICommandHandlerRegistry {
  private handlers = new Map<string, ICommandHandler>();

  execute(command: Command) {
    const handler = this.handlers.get(command.commandName);
    console.log('Executing command:', command.commandName, handler);
    if (!handler) {
      throw new CommandNotFoundFor(command.commandName);
    }

    return handler.handle(command);
  }

  register(commandName: string, handler: ICommandHandler) {
    if (this.handlers.has(commandName)) {
      throw new CommandHandlerAlreadySet(commandName);
    }
    this.handlers.set(commandName, handler);
  }
}
