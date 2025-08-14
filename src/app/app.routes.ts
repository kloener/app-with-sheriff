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
      import('@discover-pokemons/routes').then((m) => m.routes),
  },
];
