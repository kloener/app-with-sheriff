import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFullImage } from './pokemon-full-image';

describe('PokemonFullImage', () => {
  let component: PokemonFullImage;
  let fixture: ComponentFixture<PokemonFullImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonFullImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonFullImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
