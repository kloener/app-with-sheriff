import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetAllPokémonUseCase } from './discover-pokémons/application';
import { from, tap } from 'rxjs';
import { PokemonList } from '@discover-pokémons/presentation';

@Component({
  selector: 'app-root',
  imports: [PokemonList, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('app-with-sheriff');
  protected readonly debug = from(
    inject(GetAllPokémonUseCase).execute({ page: 1, pageSize: 10 }),
  ).pipe(tap((p) => console.log(p)));
}
