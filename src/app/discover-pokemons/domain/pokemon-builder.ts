import { PokemonStats } from '@discover-pokemons/domain/pokemon-stats';
import { Pokemon } from '@discover-pokemons/domain/pokemon.entity';

interface PokemonBuilderType {
  id: string;
  name: string;
  order: number;
  height: number;
  weight: number;
  types: string[];
  species: string;
  abilities: string[];
  stats: PokemonStats;
  frontImgUrl: string;
  backImgUrl: string;
}

export class PokemonBuilder {
  private pokemon: PokemonBuilderType;

  static create(): PokemonBuilder {
    return new PokemonBuilder();
  }

  static createWithBulbasaurDefaults(): PokemonBuilder {
    return new PokemonBuilder({
      id: '1',
      name: 'Bulbasaur',
      order: 1,
      height: 49,
      weight: 45,
      types: ['grass', 'poison'],
      species: 'Bulbasaur',
      abilities: ['overgrow', 'chlorophyll'],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        'special-attack': 65,
        'special-defense': 65,
        speed: 45,
      },
      frontImgUrl: 'https://example.com/bulbasaur.png?1',
      backImgUrl: 'https://example.com/bulbasaur.png?2',
    });
  }

  private constructor(defaults: Partial<PokemonBuilderType> = {}) {
    this.pokemon = {
      id: 'unknown',
      name: 'unknown',
      order: 0,
      height: 0,
      weight: 0,
      types: ['unknown'],
      species: 'unknown',
      abilities: ['unknown'],
      stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        'special-attack': 0,
        'special-defense': 0,
        speed: 0,
      },
      frontImgUrl: '',
      backImgUrl: '',
      ...defaults,
    };
  }

  id(id: string): PokemonBuilder {
    this.pokemon.id = id;
    return this;
  }
  name(name: string): PokemonBuilder {
    this.pokemon.name = name;
    return this;
  }
  order(order: number): PokemonBuilder {
    this.pokemon.order = order;
    return this;
  }
  height(height: number): PokemonBuilder {
    this.pokemon.height = height;
    return this;
  }
  weight(weight: number): PokemonBuilder {
    this.pokemon.weight = weight;
    return this;
  }
  types(types: string[]): PokemonBuilder {
    this.pokemon.types = types;
    return this;
  }
  species(species: string): PokemonBuilder {
    this.pokemon.species = species;
    return this;
  }
  abilities(abilities: string[]): PokemonBuilder {
    this.pokemon.abilities = abilities;
    return this;
  }
  stats(stats: PokemonStats): PokemonBuilder {
    this.pokemon.stats = stats;
    return this;
  }
  frontImgUrl(frontImgUrl: string): PokemonBuilder {
    this.pokemon.frontImgUrl = frontImgUrl;
    return this;
  }
  backImgUrl(backImgUrl: string): PokemonBuilder {
    this.pokemon.backImgUrl = backImgUrl;
    return this;
  }

  build(): Pokemon {
    return new Pokemon(
      this.pokemon.id,
      this.pokemon.name,
      this.pokemon.types,
      this.pokemon.order,
      this.pokemon.height,
      this.pokemon.weight,
      this.pokemon.species,
      this.pokemon.abilities,
      this.pokemon.stats,
      this.pokemon.frontImgUrl,
      this.pokemon.backImgUrl,
    );
  }
}
