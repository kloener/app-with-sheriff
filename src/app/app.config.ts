import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfirmBookingUseCase, CreateBookingUseCase, GetUserBookingsUseCase } from './bookings/application';
import { InMemoryBookingRepository } from './bookings/infrastructure';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    { provide: CreateBookingUseCase, useFactory: () => new CreateBookingUseCase(new InMemoryBookingRepository()) },
    { provide: ConfirmBookingUseCase, useFactory: () => new ConfirmBookingUseCase(new InMemoryBookingRepository()) },
    { provide: GetUserBookingsUseCase, useFactory: () => new GetUserBookingsUseCase(new InMemoryBookingRepository()) },
  ]
};
