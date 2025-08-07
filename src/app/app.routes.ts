import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'discover-pokemons',
  },
  {
    path: 'discover-pokemons',
    loadChildren: () =>
      import('./discover-pokémons/public_api').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'discover-pokemons',
  },
];
