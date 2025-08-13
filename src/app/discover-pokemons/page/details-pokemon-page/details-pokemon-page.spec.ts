import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetPokemonDetailsUseCase } from '@discover-pokemons/application';
import { PokemonBuilder } from '@discover-pokemons/domain';

import { DetailsPokemonPage } from './details-pokemon-page';

describe('DetailsPokemonPage', () => {
  let component: DetailsPokemonPage;
  let fixture: ComponentFixture<DetailsPokemonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPokemonPage],
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

    fixture = TestBed.createComponent(DetailsPokemonPage);
    fixture.componentRef.setInput('idOrName', 'bulbasaur');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
