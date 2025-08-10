export interface DomainEvent<T = unknown> {
  eventType: string;
  payload?: T;
}

export interface IDomainEventHandler {
  handle<EventType = unknown>(event: DomainEvent<EventType>): void;
}

export interface IEventBus {
  publish<EventType = unknown>(event: DomainEvent<EventType>): void;
}

export interface IEventHandlerRegistry {
  register(eventType: string, handler: IDomainEventHandler): void;
}
