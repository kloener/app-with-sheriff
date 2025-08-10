import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CacheAsyncByParams } from '@shared/utils';
import { bufferCount, firstValueFrom, map, merge, of, switchMap } from 'rxjs';
import { Pokemon, PokemonRepository } from '../domain';
import { mapDtoToPokemon } from './mapDtoToPokemon';
import { PokemonDetailDTO } from './PokemonDetailDTO';
import { PokemonItemDTO } from './PokemonItemDTO';

/**
 * Repository implementation for fetching Pokemon data from the API using angular HttpClient.
 */
@Injectable({ providedIn: 'root' })
export class HttpPokemonRepository implements PokemonRepository {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly http = inject(HttpClient);
  private readonly pageSize = 20; // Default page size

  @CacheAsyncByParams()
  async findAll(
    page: number,
    pageSize: number = this.pageSize,
  ): Promise<Pokemon[]> {
    const offset = (page - 1) * pageSize;
    const requestUri = `${this.apiUrl}?offset=${offset}&limit=${pageSize}`;
    return firstValueFrom(
      this.http.get<{ results: PokemonItemDTO[] }>(requestUri).pipe(
        map((response) => response.results),
        switchMap((results) => {
          if (results.length === 0) {
            return of([]);
          }
          const detailRequests = results.map((item) =>
            this.findById(item.name),
          );
          return merge(...detailRequests).pipe(
            bufferCount(detailRequests.length),
          );
        }),
        map((list) => list.filter((pokemon) => pokemon !== null) as Pokemon[]),
      ),
    );
  }

  @CacheAsyncByParams()
  async findById(idOrName: string): Promise<Pokemon | null> {
    const requestUri = `${this.apiUrl}/${idOrName}`;
    return firstValueFrom(
      this.http.get<PokemonDetailDTO>(requestUri).pipe(mapDtoToPokemon()),
    ).catch(() => null);
  }
}
