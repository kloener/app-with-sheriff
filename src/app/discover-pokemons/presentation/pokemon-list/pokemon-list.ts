import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { PokemonFullImage } from '@discover-pokemons/ui';
import { CommandBus } from '@shared/application';
import { ObserveIntersection } from '@shared/ui';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonFullImage,
    ObserveIntersection,
    UpperCasePipe,
    AsyncPipe,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
  private readonly commandBus = inject(CommandBus);
  private readonly getPokemonsUseCase = inject(GetPokemonsUseCase);

  protected pokemonList$ = this.getPokemonsUseCase.pokemonList$;

  constructor() {
    this.getPokemonsUseCase.execute({
      page: 1,
      pageSize: 20,
    });
  }

  async loadMorePokemon(): Promise<void> {
    await this.commandBus.execute(LoadMorePokemonsCommand.create());
  }
}
