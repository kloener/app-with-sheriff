import { provideZonelessChangeDetection } from '@angular/core';
import { PokemonBuilder } from '@discover-pokemons/domain';
import { render } from '@testing-library/angular';
import { PokemonFullImage } from './pokemon-full-image';

describe('PokemonFullImage', () => {
  const setup = () =>
    render(PokemonFullImage, {
      providers: [provideZonelessChangeDetection()],
      inputs: {
        pokemon: PokemonBuilder.createWithBulbasaurDefaults().build(),
      },
    });

  it('should create', async () => {
    const screen = await setup();
    expect(screen.queryByRole('img')).not.toBeNull();
  });
});
