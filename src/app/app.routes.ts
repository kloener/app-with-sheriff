import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'discover-pokemons',
  },
  {
    path: 'discover-pokemons',
    loadComponent: () =>
      import('./discover-pokémons/page').then((m) => m.DiscoverPokemonPage),
  },
  {
    path: '**',
    redirectTo: 'discover-pokemons',
  },
];
