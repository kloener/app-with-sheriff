import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonList } from '@discover-pokémons/presentation';

@Component({
  selector: 'app-discover-pokemon-page',
  imports: [PokemonList],
  templateUrl: './discover-pokemon-page.html',
  styleUrl: './discover-pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPokemonPage {}
