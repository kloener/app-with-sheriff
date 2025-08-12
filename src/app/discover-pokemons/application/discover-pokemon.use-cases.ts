import { LoadMorePokemonsCommand } from '@discover-pokemons/application/commands';
import { PokemonsUpdated } from '@discover-pokemons/domain/events/pokemons-updated';
import { ICommandHandler, IEventBus } from '@shared/domain';
import { BehaviorSubject, map, Observable, OperatorFunction } from 'rxjs';
import { Pokemon, PokemonRepository } from '../domain';

export interface GetPokemonsQuery {
  readonly page: number;
  readonly pageSize: number;
}

function mapToArray<T>(): (list: Map<string, T>) => T[] {
  return (mapList) => Array.from(mapList.values());
}

const mapMapToArray: <T>() => OperatorFunction<Map<string, T>, T[]> =
  () => (source) =>
    source.pipe(map(mapToArray()));

export class GetPokemonsUseCase
  implements ICommandHandler<Pokemon[], LoadMorePokemonsCommand>
{
  private page = 1;
  private pageSize = 20;
  private readonly pokemonList$$ = new BehaviorSubject<Map<string, Pokemon>>(
    new Map<string, Pokemon>(),
  );

  public readonly pokemonList$: Observable<Pokemon[]> = this.pokemonList$$
    .asObservable()
    .pipe(mapMapToArray());

  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly eventBus: IEventBus,
  ) {}

  handle(_command: LoadMorePokemonsCommand) {
    this.page += 1;
    return this.execute({ page: this.page, pageSize: this.pageSize });
  }

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
      currentMap.set(pokemon.id, pokemon);
    }
    this.pokemonList$$.next(new Map<string, Pokemon>([...currentMap]));
  }
}
