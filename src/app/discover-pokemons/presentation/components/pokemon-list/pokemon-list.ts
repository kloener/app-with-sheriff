import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import {
  LoadMorePokemonsCommand,
  LoadPokemonsCommand,
} from '@discover-pokemons/application/commands';
import { PokemonFullImage } from '@discover-pokemons/presentation/ui/pokemon-full-image';
import { CommandBus } from '@shared/application';
import {
  JoinPipe,
  ObserveIntersection,
  RoundPipe,
  UcfirstPipe,
} from '@shared/presentation';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    PokemonFullImage,
    ObserveIntersection,
    UpperCasePipe,
    RouterLink,
    UcfirstPipe,
    RoundPipe,
    JoinPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList implements OnInit {
  private readonly commandBus = inject(CommandBus);
  private readonly getPokemonsUseCase = inject(GetPokemonsUseCase);

  protected pokemonList$ = this.getPokemonsUseCase.pokemonList$;

  async ngOnInit(): Promise<void> {
    await this.commandBus.execute(LoadPokemonsCommand.create());
  }

  async loadMorePokemon(): Promise<void> {
    await this.commandBus.execute(LoadMorePokemonsCommand.create());
  }
}
