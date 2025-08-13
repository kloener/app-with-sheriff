import { PokemonStats } from '@discover-pokemons/domain/pokemon-stats';
import { Pokemon } from '@discover-pokemons/domain/pokemon.entity';

describe('Pokemon Entity', () => {
  it('should create a Pokemon with the correct properties', () => {
    // Arrange
    const id = '1';
    const name = 'Bulbasaur';
    const types = ['grass', 'poison'];
    const order = 1;
    const height = 7;
    const weight = 69;
    const species = 'specie';
    const abilities = ['ability1', 'ability2'];
    const stats: PokemonStats = {
      hp: 45,
      attack: 49,
      defense: 49,
      'special-attack': 65,
      'special-defense': 65,
      speed: 45,
    };
    const imageUrl = 'https://example.com/bulbasaur.png';

    // Act
    const pokemon: Pokemon = new Pokemon(
      id,
      name,
      types,
      order,
      height,
      weight,
      species,
      abilities,
      stats,
      `${imageUrl}?1`,
      `${imageUrl}?2`,
    );

    // Assert
    expect(pokemon.id).toBe(id);
    expect(pokemon.name).toBe(name);
    expect(pokemon.types).toBe(types);
    expect(pokemon.order).toBe(order);
    expect(pokemon.height).toBe(height);
    expect(pokemon.weight).toBe(weight);
    expect(pokemon.species).toBe(species);
    expect(pokemon.abilities).toBe(abilities);
    expect(pokemon.stats).toBe(stats);
    expect(pokemon.frontImgUrl).toBe(`${imageUrl}?1`);
    expect(pokemon.backImgUrl).toBe(`${imageUrl}?2`);
  });
});
