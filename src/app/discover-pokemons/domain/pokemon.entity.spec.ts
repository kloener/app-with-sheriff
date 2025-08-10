import { Pokemon } from '@discover-pokemons/domain/pokemon.entity';

describe('Pokemon Entity', () => {
  it('should create a Pokemon with the correct properties', () => {
    // Arrange
    const id = '1';
    const name = 'Bulbasaur';
    const order = 1;
    const height = 7;
    const weight = 69;
    const imageUrl = 'https://example.com/bulbasaur.png';

    // Act
    const pokemon = new Pokemon(
      id,
      name,
      order,
      height,
      weight,
      `${imageUrl}?1`,
      `${imageUrl}?2`,
      `${imageUrl}?3`,
    );

    // Assert
    expect(pokemon.id).toBe(id);
    expect(pokemon.name).toBe(name);
    expect(pokemon.order).toBe(order);
    expect(pokemon.height).toBe(height);
    expect(pokemon.weight).toBe(weight);
    expect(pokemon.frontImgUrl).toBe(`${imageUrl}?1`);
    expect(pokemon.backImgUrl).toBe(`${imageUrl}?2`);
    expect(pokemon.shinyImgUrl).toBe(`${imageUrl}?3`);
  });

  it('should throw an error if any property is invalid', () => {
    expect(
      () => new Pokemon('', 'name', 1, 10, 10, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid ID');
    expect(
      () => new Pokemon('1', '', 1, 10, 10, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Name');

    expect(
      () => new Pokemon('2', 'name', 0, 10, 10, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Order');
    expect(
      () =>
        new Pokemon('3', 'name', 9999, 10, 10, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Order');

    expect(
      () => new Pokemon('4', 'name', 1, 0, 10, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Height');
    expect(
      () => new Pokemon('5', 'name', 1, 9999, 10, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Height');

    expect(
      () => new Pokemon('6', 'name', 1, 10, 0, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Weight');
    expect(
      () => new Pokemon('7', 'name', 1, 10, 9999, 'image1', 'image2', 'image3'),
    ).toThrowError('Invalid Weight');

    expect(
      () => new Pokemon('8', 'name', 1, 10, 10, '', 'image2', 'image3'),
    ).toThrowError('Invalid FrontImgUrl');
    expect(
      () => new Pokemon('9', 'name', 1, 10, 10, 'image1', '', 'image3'),
    ).toThrowError('Invalid BackImgUrl');
    expect(
      () => new Pokemon('0', 'name', 1, 10, 10, 'image1', 'image2', ''),
    ).toThrowError('Invalid ShinyImgUrl');
  });
});
