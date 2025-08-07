import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { GetAllPokémonUseCase } from '@discover-pokémons/application';
import { Pokémon } from '@discover-pokémons/domain';
import { render } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  const setup = () => {
    return render(App, {
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
        {
          provide: GetAllPokémonUseCase,
          useValue: {
            execute: () =>
              Promise.resolve([
                new Pokémon(
                  '1',
                  'Bulbasaur',
                  1,
                  45,
                  49,
                  'https://example.com/bulbasaur.png?1',
                  'https://example.com/bulbasaur.png?2',
                  'https://example.com/bulbasaur.png?3',
                ),
              ]),
          },
        },
      ],
    });
  };

  it('should render title', async () => {
    const { findByText } = await setup();

    expect(await findByText('Discover Pokémons')).toBeTruthy();
  });

  it('should render pokémons', async () => {
    const { findByRole } = await setup();

    expect(await findByRole('list')).toBeTruthy();
    expect(await findByRole('listitem')).toBeTruthy();
    expect(await findByRole('img')).toBeTruthy();
  });
});
