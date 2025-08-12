import { Pokemon } from '@discover-pokemons/domain';
import { PokemonDetailDTO } from './PokemonDetailDTO';

/**
 * maps PokemonDetailDTO to Pokemon entity
 */
export const dtoToPokemon = (dto: PokemonDetailDTO): Pokemon =>
  new Pokemon(
    String(dto.id),
    dto.name,
    dto.order,
    dto.height,
    dto.weight,
    dto.sprites.front_default,
    dto.sprites.back_default,
    dto.sprites.other['official-artwork'].front_default,
  );
