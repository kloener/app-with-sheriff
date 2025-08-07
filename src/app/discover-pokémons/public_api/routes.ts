import { Routes } from '@angular/router';
import { provideDiscoverPokemons } from '@discover-pokémons/public_api/provide-discover-pokemons';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [provideDiscoverPokemons()],
    loadComponent: () => import('../page').then((m) => m.DiscoverPokemonPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
