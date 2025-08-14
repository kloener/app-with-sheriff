import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonDetails } from '@discover-pokemons/presentation/components/pokemon-details';

@Component({
  selector: 'app-details-pokemon-page',
  imports: [PokemonDetails],
  templateUrl: './details-pokemon-page.html',
  styleUrl: './details-pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPokemonPage {
  idOrName = input.required<string>();
}
