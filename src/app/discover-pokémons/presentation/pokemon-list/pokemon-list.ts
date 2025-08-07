import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { PokemonFullImage } from '@discover-pok\u00E9mons/ui';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, PokemonFullImage],
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
}
