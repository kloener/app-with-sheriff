import { PokemonBuilder } from '@discover-pokemons/domain/entities/pokemon-builder';
import { Pokemon } from '@discover-pokemons/domain/entities/pokemon.entity';

describe('PokemonBuilder', () => {
  it('should create a Pokemon with the correct properties', () => {
    // Arrange
    const id = '1';
    const name = 'Bulbasaur';
    const order = 1;
    const height = 7;
    const weight = 69;
    const imageUrl = 'https://example.com/bulbasaur.png';

    // Act
    const pokemon: Pokemon = PokemonBuilder.createWithBulbasaurDefaults()
      .id(id)
      .name(name)
      .order(order)
      .height(height)
      .weight(weight)
      .frontImgUrl(`${imageUrl}?1`)
      .backImgUrl(`${imageUrl}?2`)
      .build();

    // Assert
    expect(pokemon.id).toBe(id);
    expect(pokemon.name).toBe(name);
    expect(pokemon.order).toBe(order);
    expect(pokemon.height).toBe(height);
    expect(pokemon.weight).toBe(weight);
    expect(pokemon.frontImgUrl).toBe(`${imageUrl}?1`);
    expect(pokemon.backImgUrl).toBe(`${imageUrl}?2`);
  });

  it('should throw an error if any property is invalid', () => {
    expect(
      // '', 'name', 1, 10, 10, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().id('').build(),
    ).toThrowError('Invalid ID: ');
    expect(
      // '1', '', 1, 10, 10, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().name('').build(),
    ).toThrowError('Invalid Name:  for  / 1');

    expect(
      // '2', 'name', 0, 10, 10, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().order(0).build(),
    ).toThrowError('Invalid Order: 0 for Bulbasaur / 1');
    expect(() =>
      // '3', 'name', 9999, 10, 10, 'image1', 'image2', 'image3'
      PokemonBuilder.createWithBulbasaurDefaults().order(9999).build(),
    ).toThrowError('Invalid Order: 9999 for Bulbasaur / 1');

    expect(
      // '4', 'name', 1, 0, 10, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().height(0).build(),
    ).toThrowError('Invalid Height: 0 for Bulbasaur / 1');
    expect(
      // '5', 'name', 1, 9999, 10, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().height(9999).build(),
    ).toThrowError('Invalid Height: 9999 for Bulbasaur / 1');

    expect(
      // '6', 'name', 1, 10, 0, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().weight(0).build(),
    ).toThrowError('Invalid Weight: 0 for Bulbasaur / 1');
    expect(
      // '7', 'name', 1, 10, 9999, 'image1', 'image2', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().weight(10_000).build(),
    ).toThrowError('Invalid Weight: 10000 for Bulbasaur / 1');

    expect(
      // '8', 'name', 1, 10, 10, '', 'image2', 'image3'
      () =>
        PokemonBuilder.createWithBulbasaurDefaults().frontImgUrl('').build(),
    ).toThrowError('Invalid FrontImgUrl:  for Bulbasaur / 1');
    expect(
      // '9', 'name', 1, 10, 10, 'image1', '', 'image3'
      () => PokemonBuilder.createWithBulbasaurDefaults().backImgUrl('').build(),
    ).toThrowError('Invalid BackImgUrl:  for Bulbasaur / 1');
  });
});
