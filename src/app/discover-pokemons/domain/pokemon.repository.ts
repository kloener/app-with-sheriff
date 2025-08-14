import { Pokemon } from './entities/pokemon.entity';

export interface PokemonRepository {
  findAll(page: number, pageSize: number): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
}
