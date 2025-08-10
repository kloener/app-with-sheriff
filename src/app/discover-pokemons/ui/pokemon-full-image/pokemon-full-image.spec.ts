import { provideZonelessChangeDetection } from '@angular/core';
import { Pokemon } from '@discover-pokemons/domain';
import { render } from '@testing-library/angular';
import { PokemonFullImage } from './pokemon-full-image';

describe('PokemonFullImage', () => {
  const setup = () =>
    render(PokemonFullImage, {
      providers: [provideZonelessChangeDetection()],
      inputs: {
        pokemon: new Pokemon(
          '_id', //: string,
          '_name', //: string,
          1, //: number,
          50, //: number,
          50, //: number,
          '_frontImgUrl', //: string,
          '_backImgUrl', //: string,
          '_shinyImgUrl', //: string)
        ),
      },
    });

  it('should create', async () => {
    const screen = await setup();
    expect(screen.queryByRole('img')).not.toBeNull();
  });
});
