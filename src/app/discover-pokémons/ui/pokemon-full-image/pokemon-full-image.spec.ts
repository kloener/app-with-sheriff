import { provideZonelessChangeDetection } from '@angular/core';
import { Pokémon } from '@discover-pokémons/domain';
import { render } from '@testing-library/angular';
import { PokemonFullImage } from './pokemon-full-image';

describe('PokemonFullImage', () => {
  const setup = () =>
    render(PokemonFullImage, {
      providers: [provideZonelessChangeDetection()],
      inputs: {
        pokemon: new Pokémon(
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
