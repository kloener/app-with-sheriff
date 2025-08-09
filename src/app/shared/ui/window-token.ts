import { InjectionToken } from '@angular/core';

export const WINDOW_TOKEN = new InjectionToken<Window>('ref to window|global', {
  factory: () => window,
});
