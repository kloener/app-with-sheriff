import { provideZonelessChangeDetection } from '@angular/core';
import { DeferBlockState } from '@angular/core/testing';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { Pokémon } from '@discover-pokémons/domain';
import { render, RenderResult } from '@testing-library/angular';
import { PokemonList } from './pokemon-list';

describe('PokemonList', () => {
  const setup = (pokemonList: Pokémon[] = []) =>
    render(PokemonList, {
      // deferBlockStates: DeferBlockState.Complete,
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GetAllPokémonUseCase,
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
    expect(result.queryByText('Keine Pokémons gefunden.')).toBeTruthy();
  });

  it('should render list containing items', async () => {
    const result = await setup([
      new Pokémon(
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
