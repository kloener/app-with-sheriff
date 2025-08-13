import {
  LoadMorePokemonsCommand,
  LoadPokemonsCommand,
} from '@discover-pokemons/application/commands';
import {
  PokemonLoaded,
  PokemonsUpdated,
} from '@discover-pokemons/domain/events';
import { LogAsyncMethod } from '@shared/application';
import { ICommandHandler, IEventBus } from '@shared/domain';
import { BehaviorSubject, map, Observable, OperatorFunction } from 'rxjs';
import { Pokemon, PokemonRepository } from '../domain';

class PokemonNotFoundError extends Error {
  constructor(idOrName: string) {
    super(`Pokemon with id or name "${idOrName}" does not exist.`);
  }
}

export interface GetPokemonsQuery {
  readonly page: number;
  readonly pageSize: number;
}

export interface GetPokemonQuery {
  readonly idOrName: string;
}

function mapToArray<T>(): (list: Map<string, T>) => T[] {
  return (mapList) => Array.from(mapList.values());
}

const mapMapToArray: <T>() => OperatorFunction<Map<string, T>, T[]> =
  () => (source) =>
    source.pipe(map(mapToArray()));

const sortList: <T>(
  comparator: (a: T, b: T) => number,
) => OperatorFunction<T[], T[]> = (comparator) => (source) =>
  source.pipe(map((list) => [...list].sort(comparator)));

export class GetPokemonsUseCase
  implements
    ICommandHandler<Pokemon[], LoadMorePokemonsCommand>,
    ICommandHandler<Pokemon[], LoadPokemonsCommand>
{
  private page = 1;
  private pageSize = 20;
  private readonly pokemonList$$ = new BehaviorSubject<Map<string, Pokemon>>(
    new Map<string, Pokemon>(),
  );

  public readonly pokemonList$: Observable<Pokemon[]> = this.pokemonList$$
    .asObservable()
    .pipe(
      mapMapToArray(),
      sortList((a, b) => a.order - b.order),
    );

  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly eventBus: IEventBus,
  ) {}

  @LogAsyncMethod('info')
  handle(command: LoadMorePokemonsCommand | LoadPokemonsCommand) {
    if (command instanceof LoadMorePokemonsCommand) {
      this.page += 1;
    }
    return this.execute({ page: this.page, pageSize: this.pageSize });
  }

  @LogAsyncMethod('info')
  async execute(query: GetPokemonsQuery): Promise<Pokemon[]> {
    this.page = query.page;
    this.pageSize = query.pageSize;
    const result = await this.pokemonRepository.findAll(
      this.page,
      this.pageSize,
    );

    this.updatePokemonList(result);
    const updatedList = mapToArray<Pokemon>()(this.pokemonList$$.getValue());
    this.eventBus.publish(PokemonsUpdated.create(updatedList));

    return updatedList;
  }

  private updatePokemonList(result: Pokemon[]) {
    const currentMap = this.pokemonList$$.getValue();
    for (const pokemon of result) {
      currentMap.set(pokemon.name, pokemon);
    }
    this.pokemonList$$.next(new Map<string, Pokemon>([...currentMap]));
  }
}

export class GetPokemonDetailsUseCase {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly eventBus: IEventBus,
  ) {}

  async execute(query: GetPokemonQuery): Promise<Pokemon> {
    const result = await this.pokemonRepository.findById(query.idOrName);
    if (result) {
      this.eventBus.publish(PokemonLoaded.create(result));
      return result;
    }
    throw new PokemonNotFoundError(query.idOrName);
  }
}
