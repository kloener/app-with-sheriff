import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokémon } from '@discover-pokémons/domain';

@Component({
  selector: 'app-pokemon-full-image',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-full-image.html',
  styleUrl: './pokemon-full-image.scss',
})
export class PokemonFullImage {
  pokemon = input.required<Pokémon>();
}
