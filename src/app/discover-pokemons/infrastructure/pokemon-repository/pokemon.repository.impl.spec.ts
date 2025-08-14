import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { dtoToPokemon } from './dtoToPokemon';
import mockPokemonDetailResponse from './mock-pokemon-detail-response';
import mockPokemonListResponse from './mock-pokemon-list-response';
import { HttpPokemonRepository } from './pokemon.repository.impl';

describe('HttpPokemonRepository', () => {
  let httpController: HttpTestingController;
  let repository: HttpPokemonRepository;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpController = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(HttpPokemonRepository);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should fetch Pokemon list and their details and map it to Pokemon entities', async () => {
    // Arrange
    const mockResponseList = mockPokemonListResponse;
    const mockResponseBulbasaur = mockPokemonDetailResponse('bulbasaur')!;
    const mockResponseIvysaur = mockPokemonDetailResponse('ivysaur')!;
    const mockResponseVenusaur = mockPokemonDetailResponse('venusaur')!;
    const promise = repository.findAll(1);

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
      dtoToPokemon(mockResponseBulbasaur),
      dtoToPokemon(mockResponseIvysaur),
      dtoToPokemon(mockResponseVenusaur),
    ]);
  });

  it('should return null when Pokemon not found', async () => {
    // Arrange
    const promise = repository.findById('non-existent-id');

    // Act
    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon/non-existent-id')
      .flush(null, { status: 404, statusText: 'Not Found' });

    // Assert
    expect(await promise).toBeNull();
  });
});
