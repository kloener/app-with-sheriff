import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GetAllPokémonUseCase } from '../application';
import { provideDiscoverPokemons } from './provide-discover-pokemons';

describe('provideDiscoverPokemons', () => {
  it('should use http repository by default', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideDiscoverPokemons(),
      ],
    });

    const httpController = TestBed.inject(HttpTestingController);
    const getAllPokémonUseCase = TestBed.inject(GetAllPokémonUseCase);

    expect(getAllPokémonUseCase).toBeDefined();
    expect(getAllPokémonUseCase).toBeInstanceOf(GetAllPokémonUseCase);

    // Act
    const promise = getAllPokémonUseCase.execute({ page: 1, pageSize: 20 });

    httpController
      .expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
      .flush({ results: [] });

    expect(await promise).toEqual([]);
  });
});
