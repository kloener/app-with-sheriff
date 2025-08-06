import { Pokémon } from "./pokémon.entity";

export interface PokémonRepository {
  findAll(page: number, pageSize: number): Promise<Pokémon[]>;
  findById(id: string): Promise<Pokémon | null>;
}
