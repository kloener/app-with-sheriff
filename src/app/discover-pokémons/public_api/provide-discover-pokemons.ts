import { Provider } from '@angular/core';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { HttpPokémonRepository } from '@discover-pokémons/infrastructure';

export const provideDiscoverPokemons = (): Provider[] => [
  {
    provide: GetAllPokémonUseCase,
    useFactory: (httpPokémonRepository: HttpPokémonRepository) =>
      new GetAllPokémonUseCase(httpPokémonRepository),
    deps: [HttpPokémonRepository],
  },
];
