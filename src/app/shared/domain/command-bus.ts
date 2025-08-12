export interface Command<PayloadType = unknown, ResultType = unknown> {
  /**
   * Name of the command to identify the handler.
   * This should be unique across the application.
   */
  commandName: string;
  /**
   * payload, if needed - for executing the command.
   */
  payload?: PayloadType;
  /**
   * result type of the handler that should be met.
   * Note, this property must not directly assigned. It will be the result of the handler execution.
   */
  result?: ResultType;
}

export interface ICommandHandler<ReturnType = unknown, CommandType = unknown> {
  handle(command: Command<CommandType, ReturnType>): Promise<ReturnType>;
}

export interface ICommandBus {
  execute<Payload = unknown, Result = unknown>(
    command: Command<Payload, Result>,
  ): Promise<Result>;
}

export interface ICommandHandlerRegistry {
  register<ReturnType = unknown, CommandType = unknown>(
    commandName: string,
    handler: ICommandHandler<ReturnType, CommandType>,
  ): void;
}
