import { Pokemon } from '@discover-pokemons/domain';
import { DomainEvent } from '@shared/domain';

export class PokemonsUpdated implements DomainEvent {
  eventType = this.constructor.name;
  payload: { list: Pokemon[] };

  private constructor(list: Pokemon[]) {
    this.payload = { list };
  }

  static create(list: Pokemon[]): DomainEvent<{ list: Pokemon[] }> {
    return new PokemonsUpdated(list);
  }
}
