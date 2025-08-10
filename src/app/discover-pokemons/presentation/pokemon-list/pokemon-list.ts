import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetAllPokemonUseCase } from '@discover-pokemons/application';
import { PokemonFullImage } from '@discover-pokemons/ui';
import { ObserveIntersection } from '@shared/ui';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, PokemonFullImage, ObserveIntersection, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  private readonly getAllUseCase = inject(GetAllPokemonUseCase);
  protected readonly pokemonList = this.getAllUseCase.execute({
    page: 1,
    pageSize: 20,
  });

  loadMorePokemon(isIntersecting: boolean): void {
    if (isIntersecting) {
      // LoadMorePokemonsUseCase.loadMorePokemons();
    }
  }
}
