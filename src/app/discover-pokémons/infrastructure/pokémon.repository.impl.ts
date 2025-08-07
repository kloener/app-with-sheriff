import { inject, Injectable } from '@angular/core';
import { Pokémon, PokémonRepository } from '../domain';
import { HttpClient } from '@angular/common/http';
import {
  bufferCount,
  firstValueFrom,
  map,
  merge,
  OperatorFunction,
  switchMap,
} from 'rxjs';
import { CacheAsyncByParams } from '@shared/utils';
import { PokémonDetailDTO } from './PokémonDetailDTO';
import { PokémonItemDTO } from './PokémonItemDTO';

/**
 * maps PokémonDetailDTO to Pokémon entity
 */
const dtoToPokémon = (dto: PokémonDetailDTO): Pokémon =>
  new Pokémon(
    dto.id,
    dto.name,
    dto.order,
    dto.height,
    dto.weight,
    dto.sprites.front_default,
    dto.sprites.back_default,
    dto.sprites.other['official-artwork'].front_default,
  );

/**
 * rxjs mapper for PokémonDetailDTO to Pokémon entity
 */
const mapDtoToPokémon: () => OperatorFunction<PokémonDetailDTO, Pokémon> =
  () => (source) =>
    source.pipe(map(dtoToPokémon));

/**
 * Repository implementation for fetching Pokémon data from the API using angular HttpClient.
 */
@Injectable({ providedIn: 'root' })
export class HttpPokémonRepository implements PokémonRepository {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly http = inject(HttpClient);
  private readonly pageSize = 20; // Default page size

  @CacheAsyncByParams()
  async findAll(
    page: number,
    pageSize: number = this.pageSize,
  ): Promise<Pokémon[]> {
    const offset = (page - 1) * pageSize;
    const requestUri = `${this.apiUrl}?offset=${offset}&limit=${pageSize}`;
    return firstValueFrom(
      this.http.get<{ results: PokémonItemDTO[] }>(requestUri).pipe(
        map((response) => response.results),
        switchMap((results) => {
          const detailRequests = results.map((item) =>
            this.findById(item.name),
          );
          return merge(...detailRequests).pipe(
            bufferCount(detailRequests.length),
          );
        }),
        map((list) => list.filter((pokemon) => pokemon !== null) as Pokémon[]),
      ),
    );
  }

  @CacheAsyncByParams()
  async findById(idOrName: string): Promise<Pokémon | null> {
    const requestUri = `${this.apiUrl}/${idOrName}`;
    return firstValueFrom(
      this.http.get<PokémonDetailDTO>(requestUri).pipe(mapDtoToPokémon()),
    ).catch(() => null);
  }
}
