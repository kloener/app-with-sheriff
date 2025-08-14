import { Pokemon } from '@discover-pokemons/domain';
import { map, OperatorFunction } from 'rxjs';
import { dtoToPokemon } from './dtoToPokemon';
import { PokemonDetailDTO } from './PokemonDetailDTO';

/**
 * rxjs mapper for PokemonDetailDTO to Pokemon entity
 */
export const mapDtoToPokemon: () => OperatorFunction<
  PokemonDetailDTO,
  Pokemon
> = () => (source) => source.pipe(map(dtoToPokemon));
