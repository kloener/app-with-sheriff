import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList {
  private readonly getAllUseCase = inject(GetAllPokémonUseCase);
  protected readonly pokemonList = this.getAllUseCase.execute({ page: 1, pageSize: 20 });
}
