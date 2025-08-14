import {
  Pokemon,
  PokemonBuilder,
  PokemonStats,
} from '@discover-pokemons/domain';
import { PokemonDetailDTO } from './PokemonDetailDTO';

/**
 * maps PokemonDetailDTO to Pokemon entity
 */
export const dtoToPokemon = (dto: PokemonDetailDTO): Pokemon =>
  PokemonBuilder.create()
    .id(String(dto.id))
    .name(dto.name)
    .types(
      [...dto.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    )
    .order(dto.order)
    .height(dto.height)
    .weight(dto.weight)
    .species(dto.species.name)
    .abilities(dto.abilities.map((a) => a.ability.name))
    .stats(
      dto.stats.reduce((a, b) => {
        a[b.stat.name as keyof typeof a] = b.base_stat;
        return a;
      }, {} as PokemonStats),
    )
    .frontImgUrl(
      dto.sprites.other['showdown'].front_default ?? dto.sprites.front_default,
    )
    .backImgUrl(
      dto.sprites.other['showdown'].back_default ?? dto.sprites.back_default,
    )
    .build();
