import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from '@discover-pokemons/domain';

@Component({
  selector: 'app-pokemon-full-image',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-full-image.html',
  styleUrl: './pokemon-full-image.scss',
})
export class PokemonFullImage {
  pokemon = input.required<Pokemon>();
  size = input<string>('256');
}
