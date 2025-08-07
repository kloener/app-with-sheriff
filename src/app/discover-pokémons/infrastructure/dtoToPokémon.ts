import { Pokémon } from '@discover-pokémons/domain';
import { PokémonDetailDTO } from './PokémonDetailDTO';

/**
 * maps PokémonDetailDTO to Pokémon entity
 */
export const dtoToPokémon = (dto: PokémonDetailDTO): Pokémon =>
  new Pokémon(
    String(dto.id),
    dto.name,
    dto.order,
    dto.height,
    dto.weight,
    dto.sprites.front_default,
    dto.sprites.back_default,
    dto.sprites.other['official-artwork'].front_default,
  );
