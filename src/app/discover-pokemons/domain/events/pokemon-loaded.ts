import { Pokemon } from '@discover-pokemons/domain';
import { DomainEvent } from '@shared/domain';

export class PokemonLoaded implements DomainEvent {
  eventType = this.constructor.name;
  payload: { details: Pokemon };

  private constructor(details: Pokemon) {
    this.payload = { details };
  }

  static create(details: Pokemon): DomainEvent<{ details: Pokemon }> {
    return new PokemonLoaded(details);
  }
}
