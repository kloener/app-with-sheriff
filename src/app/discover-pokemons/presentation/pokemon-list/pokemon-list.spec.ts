import { provideZonelessChangeDetection } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { GetAllPokemonUseCase } from '@discover-pokemons/application';
import { Pokemon } from '@discover-pokemons/domain';
import { render, RenderResult } from '@testing-library/angular';
import { PokemonList } from './pokemon-list';

describe('PokemonList', () => {
  const setup = (pokemonList: Pokemon[] = []) =>
    render(PokemonList, {
      // deferBlockStates: DeferBlockState.Complete,
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GetAllPokemonUseCase,
          useValue: { execute: () => Promise.resolve([...pokemonList]) },
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
      new Pokemon(
        '1',
        'Bulbasaur',
        1,
        45,
        49,
        'https://pokemon.api/1.png',
        'https://pokemon.api/back/1.png',
        'https://pokemon.api/shiny/1.png',
      ),
    ]);
    await updateAllDeferBlocks(result, DeferBlockState.Complete);
    await result.fixture.whenStable();

    expect(result.queryByRole('list')).toBeTruthy();
  });
});
