import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { GetPokemonDetailsUseCase } from '@discover-pokemons/application';
import { PokemonFullImage } from '@discover-pokemons/ui';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  imports: [JsonPipe, AsyncPipe, PokemonFullImage],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetails {
  private readonly getPokemonDetailsUseCase = inject(GetPokemonDetailsUseCase);

  idOrName = input.required<string>();

  protected pokemonDetails$ = toObservable(this.idOrName).pipe(
    switchMap((idOrName) =>
      from(this.getPokemonDetailsUseCase.execute({ idOrName })),
    ),
  );
}
