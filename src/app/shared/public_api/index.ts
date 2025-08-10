import { Provider } from '@angular/core';
import { CommandBus, EventBus } from '@shared/application';

/**
 * Use this to provide event- and command-bus in your angular application.
 */
export const provideEventBus = (): Provider[] => [
  { provide: EventBus, useClass: EventBus },
  { provide: CommandBus, useClass: CommandBus },
];
