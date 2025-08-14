import {
  inject,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { GetPokemonsUseCase } from '@discover-pokemons/application';
import {
  LoadMorePokemonsCommand,
  LoadPokemonsCommand,
} from '@discover-pokemons/application/commands';
import { Pokemon, PokemonBuilder } from '@discover-pokemons/domain';
import { CommandBus } from '@shared/application';
import { provideEventBus } from '@shared/providers';
import { render, RenderResult } from '@testing-library/angular';
import { PokemonList } from './pokemon-list';

describe('PokemonList', () => {
  const setup = (pokemonList: Pokemon[] = []) =>
    render(PokemonList, {
      // deferBlockStates: DeferBlockState.Complete,
      providers: [
        provideZonelessChangeDetection(),
        provideEventBus(),
        provideEnvironmentInitializer(() => {
          const commandBus = inject(CommandBus);
          const getPokemonsUseCase = inject(GetPokemonsUseCase);

          commandBus.register(LoadMorePokemonsCommand.name, getPokemonsUseCase);
          commandBus.register(LoadPokemonsCommand.name, getPokemonsUseCase);
        }),
        {
          provide: GetPokemonsUseCase,
          useValue: {
            pokemonList$: signal([...pokemonList]),
            execute: () => Promise.resolve([...pokemonList]),
            handle: () => Promise.resolve([...pokemonList]),
          },
        },
      ],
    });

  async function updateAllDeferBlocks(
    result: RenderResult<unknown, unknown>,
    state: DeferBlockState,
  ) {
    const defers = await result.fixture.getDeferBlocks();
    await Promise.all(defers.map((defer) => defer.render(state)));
  }

  it('should render an empty list', async () => {
    const result = await setup();
    await updateAllDeferBlocks(result, DeferBlockState.Complete);
    await result.fixture.whenStable();

    expect(result.queryByRole('list')).toBeFalsy();
    expect(result.queryByText('Keine Pokemons gefunden.')).toBeTruthy();
  });

  it('should render list containing items', async () => {
    const result = await setup([
      PokemonBuilder.createWithBulbasaurDefaults().build(),
    ]);
    await updateAllDeferBlocks(result, DeferBlockState.Complete);
    await result.fixture.whenStable();

    expect(result.queryByRole('list')).toBeTruthy();
  });

  it('should load more Pokemons when intersecting', async () => {
    const result = await setup([
      PokemonBuilder.createWithBulbasaurDefaults().build(),
    ]);

    result.fixture.componentInstance.loadMorePokemon();
  });
});
