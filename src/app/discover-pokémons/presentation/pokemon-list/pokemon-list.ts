import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { PokemonFullImage } from '@discover-pokémons/ui';
import { ObserveIntersection } from '@shared/ui';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, PokemonFullImage, ObserveIntersection, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  private readonly getAllUseCase = inject(GetAllPokémonUseCase);
  protected readonly pokemonList = this.getAllUseCase.execute({
    page: 1,
    pageSize: 20,
  });

  loadMorePokemon(isIntersecting: boolean): void {
    if (isIntersecting) {
      // LoadMorePokémonsUseCase.loadMorePokemons();
    }
  }
}
