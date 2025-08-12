import { Pokemon } from '@discover-pokemons/domain';
import { PokemonDetailDTO } from './PokemonDetailDTO';

/**
 * maps PokemonDetailDTO to Pokemon entity
 */
export const dtoToPokemon = (dto: PokemonDetailDTO): Pokemon =>
  new Pokemon(
    String(dto.id),
    dto.name,
    [...dto.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    dto.order,
    dto.height,
    dto.weight,
    dto.sprites.other['showdown'].front_default ?? dto.sprites.front_default,
    dto.sprites.other['showdown'].back_default ?? dto.sprites.back_default,
  );
