import { Pokémon } from '@discover-pokémons/domain/pokémon.entity';

describe('Pokémon Entity', () => {
  it('should create a Pokémon with the correct properties', () => {
    // Arrange
    const id = '1';
    const name = 'Bulbasaur';
    const order = 1;
    const height = 7;
    const weight = 69;
    const imageUrl = 'https://example.com/bulbasaur.png';

    // Act
    const pokémon = new Pokémon(
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
    expect(pokémon.id).toBe(id);
    expect(pokémon.name).toBe(name);
    expect(pokémon.order).toBe(order);
    expect(pokémon.height).toBe(height);
    expect(pokémon.weight).toBe(weight);
    expect(pokémon.frontImgUrl).toBe(`${imageUrl}?1`);
    expect(pokémon.backImgUrl).toBe(`${imageUrl}?2`);
    expect(pokémon.shinyImgUrl).toBe(`${imageUrl}?3`);
  });
});
