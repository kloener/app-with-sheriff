import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  signal,
} from '@angular/core';
import { Pokemon } from '@discover-pokemons/domain';

@Component({
  selector: 'app-pokemon-full-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-full-image.html',
  styleUrl: './pokemon-full-image.scss',
})
export class PokemonFullImage {
  pokemon = input.required<Pokemon>();
  size = input<string>('256');
  imageUrl = computed(() => {
    const mouseState = this.isMouseOver();
    const pokemon = this.pokemon();
    return mouseState ? pokemon.backImgUrl : pokemon.frontImgUrl;
  });

  private isMouseOver = signal<boolean>(false);

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isMouseOver.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isMouseOver.set(false);
  }
}
