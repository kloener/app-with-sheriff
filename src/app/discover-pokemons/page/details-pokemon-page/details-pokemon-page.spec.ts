import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPokemonPage } from './details-pokemon-page';

describe('DetailsPokemonPage', () => {
  let component: DetailsPokemonPage;
  let fixture: ComponentFixture<DetailsPokemonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPokemonPage],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
