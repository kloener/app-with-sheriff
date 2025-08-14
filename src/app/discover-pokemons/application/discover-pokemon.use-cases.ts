import { computed, Signal, signal } from '@angular/core';
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

export class GetPokemonsUseCase
  implements
    ICommandHandler<Pokemon[], LoadMorePokemonsCommand>,
    ICommandHandler<Pokemon[], LoadPokemonsCommand>
{
  private page = 1;
  private pageSize = 20;
  private readonly pokemonList$$ = signal(new Map<string, Pokemon>());

  public readonly pokemonList$: Signal<Pokemon[]> = computed(() => {
    const pokemonMap = this.pokemonList$$();
    return mapToArray<Pokemon>()(pokemonMap).sort((a, b) => a.order - b.order);
  });

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
    const updatedList = mapToArray<Pokemon>()(this.pokemonList$$());
    this.eventBus.publish(PokemonsUpdated.create(updatedList));

    return updatedList;
  }

  private updatePokemonList(result: Pokemon[]) {
    const currentMap = this.pokemonList$$();
    for (const pokemon of result) {
      currentMap.set(pokemon.name, pokemon);
    }
    this.pokemonList$$.set(new Map<string, Pokemon>([...currentMap]));
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
