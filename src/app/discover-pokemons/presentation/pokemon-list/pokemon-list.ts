import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { Pokemon } from '@discover-pokemons/domain';
import { PokemonFullImage } from '@discover-pokemons/ui';
import { CommandBus } from '@shared/application';
import { ObserveIntersection } from '@shared/ui';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonFullImage, ObserveIntersection, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  private readonly commandBus = inject(CommandBus);
  private readonly getAllUseCase = inject(GetPokemonsUseCase);

  protected pokemonList = signal<Pokemon[]>([]);

  constructor() {
    this.getAllUseCase
      .execute({
        page: 1,
        pageSize: 20,
      })
      .then((list) => this.pokemonList.set(list));
  }

  async loadMorePokemon(): Promise<void> {
    const nextList: Pokemon[] = (await this.commandBus.execute(
      LoadMorePokemonsCommand.create(),
    )) as Pokemon[];
    this.pokemonList.set(this.pokemonList().concat(nextList));
  }
}
