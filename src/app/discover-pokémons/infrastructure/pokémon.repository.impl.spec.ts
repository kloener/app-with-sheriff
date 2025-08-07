import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpPokémonRepository } from './pokémon.repository.impl';
import { dtoToPokémon } from './dtoToPokémon';
import mockPokemonListResponse from './mock-pokemon-list-response';
import mockPokemonDetailResponse from './mock-pokemon-detail-response';

describe('HttpPokémonRepository', () => {
  let httpController: HttpTestingController;
  let repository: HttpPokémonRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpController = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(HttpPokémonRepository);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should fetch Pokémon list and their details', async () => {
    // Arrange
    const mockResponseList = mockPokemonListResponse;
    const mockResponseBulbasaur = mockPokemonDetailResponse('bulbasaur')!;
    const mockResponseIvysaur = mockPokemonDetailResponse('ivysaur')!;
    const mockResponseVenusaur = mockPokemonDetailResponse('venusaur')!;
    const promise = repository.findAll(1, 20);

    // Act
    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .flush(mockResponseList);

    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur')
      .flush(mockResponseBulbasaur);

    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon/ivysaur')
      .flush(mockResponseIvysaur);

    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon/venusaur')
      .flush(mockResponseVenusaur);

    // Assert
    expect(await promise).toEqual([
      dtoToPokémon(mockResponseBulbasaur),
      dtoToPokémon(mockResponseIvysaur),
      dtoToPokémon(mockResponseVenusaur),
    ]);
  });
});
