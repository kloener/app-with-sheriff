import { Pokémon } from '@discover-pokémons/domain';
import { OperatorFunction, map } from 'rxjs';
import { dtoToPokémon } from './dtoToPokémon';
import { PokémonDetailDTO } from './PokémonDetailDTO';

/**
 * rxjs mapper for PokémonDetailDTO to Pokémon entity
 */
export const mapDtoToPokémon: () => OperatorFunction<
  PokémonDetailDTO,
  Pokémon
> = () => (source) => source.pipe(map(dtoToPokémon));
