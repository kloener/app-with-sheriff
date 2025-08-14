import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetPokemonDetailsUseCase } from '@discover-pokemons/application';
import { PokemonBuilder } from '@discover-pokemons/domain';

import { PokemonDetails } from './pokemon-details';

describe('PokemonDetails', () => {
  let component: PokemonDetails;
  let fixture: ComponentFixture<PokemonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetails],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GetPokemonDetailsUseCase,
          useValue: {
            execute: async () =>
              PokemonBuilder.createWithBulbasaurDefaults().build(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetails);
    fixture.componentRef.setInput('idOrName', 'bulbasaur');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
