import { LogAsyncMethod } from '@shared/application/log-async-method.annotation';
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

  @LogAsyncMethod('info')
  execute<ReturnType = unknown, CommandType = unknown>(
    command: Command<CommandType, ReturnType>,
  ) {
    const handler = this.handlers.get(command.commandName);
    if (!handler) {
      throw new CommandNotFoundFor(command.commandName);
    }
    return (handler as ICommandHandler<ReturnType, CommandType>).handle(
      command,
    );
  }

  register(commandName: string, handler: ICommandHandler) {
    if (this.handlers.has(commandName)) {
      throw new CommandHandlerAlreadySet(commandName);
    }
    this.handlers.set(commandName, handler);
  }
}
