import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpPokémonRepository } from './pokémon.repository.impl';
import mockPokemonListResponse from './mock-pokemon-list-response';
import { Pokémon } from '@discover-pokémons/domain';

describe('HttpPokémonRepository', () => {
  let httpController: HttpTestingController;
  let repository: HttpPokémonRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });

    httpController = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(HttpPokémonRepository);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should fetch Pokémon list', async () => {
    // Arrange
    const mockResponse = mockPokemonListResponse;
    const promise = repository.findAll(1, 20);

    // Act
    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .flush(mockResponse);

    // Assert
    expect(await promise).toEqual([] satisfies Pokémon[]);
  });
});
