import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../page').then((m) => m.DiscoverPokemonPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
