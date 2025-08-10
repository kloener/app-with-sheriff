export interface Command<T = unknown> {
  commandName: string;
  payload?: T;
}

export interface ICommandHandler<ReturnType = unknown, CommandType = unknown> {
  handle(command: Command<CommandType>): Promise<ReturnType>;
}

export interface ICommandBus {
  execute(command: Command): Promise<unknown>;
}

export interface ICommandHandlerRegistry {
  register(commandName: string, handler: ICommandHandler): void;
}
