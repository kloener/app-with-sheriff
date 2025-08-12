import { isDevMode } from '@angular/core';
import {
  DomainEvent,
  IDomainEventHandler,
  IEventBus,
  IEventHandlerRegistry,
} from '@shared/domain';
import { LogMethod } from './log-method.annotation';

export class EventBus implements IEventBus, IEventHandlerRegistry {
  private readonly handlers = new Map<string, IDomainEventHandler[]>();

  @LogMethod('debug', isDevMode())
  publish<EventType = unknown>(event: DomainEvent<EventType>): void {
    const handlers = this.handlers.get(event.eventType) ?? [];
    handlers.forEach((handler) => handler.handle(event));
  }

  register(eventType: string, handler: IDomainEventHandler) {
    const handlers = this.handlers.get(eventType) ?? [];
    this.handlers.set(eventType, [...handlers, handler]);
  }
}
