import { render } from '@testing-library/angular';
import { PokemonFullImage } from './pokemon-full-image';
import { screen } from '@testing-library/dom';
import { Pokémon } from '@discover-pokémons/domain';

describe('PokemonFullImage', () => {
  const setup = () => render(PokemonFullImage, {
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
      )
    },
  });

  it('should create', async () => {
    await setup();
    expect(screen.getByRole('img')).not.toBeNull();
  });
});
