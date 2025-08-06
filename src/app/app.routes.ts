import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./bookings/page').then(m => m.BookingsPageComponent)
  }
];
