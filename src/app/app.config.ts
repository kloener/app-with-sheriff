import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  ConfirmBookingUseCase,
  CreateBookingUseCase,
  GetUserBookingsUseCase,
} from './bookings/application';
import { InMemoryBookingRepository } from './bookings/infrastructure';
import { GetAllPokémonUseCase } from './discover-pokémons/application';
import { HttpPokémonRepository } from './discover-pokémons/infrastructure';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([])),
    provideRouter(routes),
    [
      // Domain bookings
      {
        provide: CreateBookingUseCase,
        useFactory: () =>
          new CreateBookingUseCase(new InMemoryBookingRepository()),
      },
      {
        provide: ConfirmBookingUseCase,
        useFactory: () =>
          new ConfirmBookingUseCase(new InMemoryBookingRepository()),
      },
      {
        provide: GetUserBookingsUseCase,
        useFactory: () =>
          new GetUserBookingsUseCase(new InMemoryBookingRepository()),
      },
    ],
    [
      // Domain Discover Pokémon
      {
        provide: GetAllPokémonUseCase,
        useFactory: (httpPokémonRepository: HttpPokémonRepository) =>
          new GetAllPokémonUseCase(httpPokémonRepository),
        deps: [HttpPokémonRepository],
      },
    ],
  ],
};
