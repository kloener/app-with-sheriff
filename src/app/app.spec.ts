import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { render } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  const setup = async () =>
    render(App, {
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    });

  it('should render title', async () => {
    const { findByText } = await setup();

    expect(await findByText('Discover Pokemons')).toBeTruthy();
  });
});
