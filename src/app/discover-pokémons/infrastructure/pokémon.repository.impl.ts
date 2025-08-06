import { inject, Injectable } from "@angular/core";
import { Pokémon, PokémonRepository } from "../domain";
import { HttpClient } from "@angular/common/http";
import { bufferCount, firstValueFrom, map, merge, OperatorFunction, switchMap, tap } from 'rxjs';

/**
 * DTO for the Pokémon API response of list endpoints.
 * We don't get all details of any Pokémon, just the name and URL.
 * We need to fetch details separately for each pokémon.
 */
interface PokémonItemDTO {
  name: string;
  url: string;
}

/**
 * Partial Response DTO from the Pokémon API
 */
interface PokémonDetailDTO {
  id: string;
  name: string;
  order: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    };
  };
}

/**
 * maps PokémonDetailDTO to Pokémon entity
 */
const dtoToPokémon = (dto: PokémonDetailDTO): Pokémon => new Pokémon(
    dto.id,
    dto.name,
    dto.order,
    dto.height,
    dto.weight,
    dto.sprites.front_default,
    dto.sprites.back_default,
    dto.sprites.other['official-artwork'].front_default
);

/**
 * rxjs mapper for PokémonDetailDTO to Pokémon entity
 */
const mapDtoToPokémon: () => OperatorFunction<PokémonDetailDTO, Pokémon> = () => source => source.pipe(map(dtoToPokémon));

/**
 * rxjs mapper for a List of PokémonDetailDTOs to Pokémon entities
 */
// const mapDtoListToPokémonList: () => OperatorFunction<PokémonDetailDTO[], Pokémon[]> = () => source => source.pipe(map(list => list.map(dtoToPokémon)));

const CacheAsyncByParams: () => MethodDecorator = <T, Result = unknown> () => (_target: T, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
  const cacheByRequestUri = new Map<string, Result[]>();
  const originalMethod = descriptor.value;
  descriptor.value = async function(...args: unknown[]) {
    const cacheKey = `${String(propertyKey)}-${JSON.stringify(args)}`;
    if (cacheByRequestUri.has(cacheKey)) {
      return cacheByRequestUri.get(cacheKey)!;
    }
    const result = await originalMethod.apply(this, args);
    cacheByRequestUri.set(cacheKey, result);
    return result;
  };
};

/**
 * Repository implementation for fetching Pokémon data from the API using angular HttpClient.
 */
@Injectable({ providedIn: 'root' })
export class HttpPokémonRepository implements PokémonRepository {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly http = inject(HttpClient);
  private readonly pageSize = 20; // Default page size

  @CacheAsyncByParams()
  async findAll(page: number, pageSize: number = this.pageSize): Promise<Pokémon[]> {
    const offset = (page - 1) * pageSize;
    const requestUri = `${this.apiUrl}?offset=${offset}&limit=${pageSize}`;
    return firstValueFrom(this.http.get<{ results: PokémonItemDTO[] }>(requestUri)
      .pipe(
          map(response => response.results),
          switchMap(results => {
            const detailRequests = results.map(item => this.findById(item.name));
            return merge(...detailRequests).pipe(bufferCount(detailRequests.length));
          }),
          map(list => list.filter(pokemon => pokemon !== null) as Pokémon[]),
          tap(pokémons => console.log(`Fetched ${pokémons.length} Pokémon`, pokémons)),
        ))
  }

  @CacheAsyncByParams()
  async findById(idOrName: string): Promise<Pokémon | null> {
    const requestUri = `${this.apiUrl}/${idOrName}`;
    return firstValueFrom(this.http.get<PokémonDetailDTO>(requestUri)
      .pipe(mapDtoToPokémon())).catch(() => null);
  }
}
