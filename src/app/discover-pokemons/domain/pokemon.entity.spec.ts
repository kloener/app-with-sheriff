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
});
