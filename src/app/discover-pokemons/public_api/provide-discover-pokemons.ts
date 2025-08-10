import { Provider } from '@angular/core';
import { GetAllPokemonUseCase } from '@discover-pokemons/application';
import { HttpPokemonRepository } from '@discover-pokemons/infrastructure';

export const provideDiscoverPokemons = (): Provider[] => [
  {
    provide: GetAllPokemonUseCase,
    useFactory: (httpPokemonRepository: HttpPokemonRepository) =>
      new GetAllPokemonUseCase(httpPokemonRepository),
    deps: [HttpPokemonRepository],
  },
];
