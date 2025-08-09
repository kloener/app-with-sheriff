import {
  Component,
  input,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ObserveIntersection, WINDOW_TOKEN } from '@shared/ui';
import { assertNotNull } from '@shared/utils';
import { render, screen } from '@testing-library/angular';

describe('ObserveIntersection', () => {
  let observeSpy: jasmine.Spy<jasmine.Func>;
  let unobserveSpy: jasmine.Spy<jasmine.Func>;
  let disconnectSpy: jasmine.Spy<jasmine.Func>;
  let callback: ((entries: IntersectionObserverEntry[]) => void) | null = null;

  const mockEntries = (
    isIntersecting: boolean,
    target = screen.getByText('Lorem'),
  ) => [
    {
      isIntersecting,
      target,
      intersectionRatio: 1,
      boundingClientRect: new DOMRect(0, 0, 100, 100),
      intersectionRect: new DOMRect(0, 0, 100, 100),
      rootBounds: new DOMRect(0, 0, 100, 100),
      time: Date.now(),
    } satisfies IntersectionObserverEntry,
  ];

  @Component({
    selector: 'app-test-bbserve-intersection-component',
    imports: [ObserveIntersection],
    template: `<div
      (appObserveIntersection)="isIntersecting($event)"
      [once]="once()"
    >
      Lorem
    </div>`,
    standalone: true,
  })
  class TestComponent {
    once = input(false);
    isIntersecting(value: boolean) {
      console.log('TestComponent isIntersecting', value);
    }
  }

  const setup = async (
    once = false,
    isIntersectionObserverSupported = true,
  ) => {
    observeSpy = jasmine.createSpy('observe');
    unobserveSpy = jasmine.createSpy('unobserve');
    disconnectSpy = jasmine.createSpy('disconnect');

    class MockIntersectionObserver {
      constructor(arg: typeof callback) {
        callback = arg;
      }

      observe = observeSpy;
      unobserve = unobserveSpy;
      disconnect = disconnectSpy;
    }

    return render(TestComponent, {
      inputs: { once },
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: WINDOW_TOKEN,
          useValue: {
            IntersectionObserver: isIntersectionObserverSupported
              ? MockIntersectionObserver
              : undefined,
          },
        },
      ],
    });
  };

  afterEach(() => {
    callback = null;
  });

  it('should not use IntersectionObserver if not supported', async () => {
    const result = await setup(false, false);

    expect(result.queryByText('Lorem')).toBeTruthy();

    expect(callback).toBeNull();
    expect(observeSpy).not.toHaveBeenCalled();
    expect(unobserveSpy).not.toHaveBeenCalled();
    expect(disconnectSpy).not.toHaveBeenCalled();
  });

  it('should always emit when intersecting (once=false)', async () => {
    const result = await setup();

    const intersectionSpy = spyOn(
      result.fixture.componentInstance,
      'isIntersecting',
    );

    expect(result.queryByText('Lorem')).toBeTruthy();
    expect(observeSpy).toHaveBeenCalledWith(jasmine.any(HTMLElement));

    assertNotNull(callback);
    callback(mockEntries(true));
    callback(mockEntries(true));
    callback(mockEntries(true));

    expect(intersectionSpy).toHaveBeenCalledWith(true);
    expect(intersectionSpy).toHaveBeenCalledTimes(3);
    expect(disconnectSpy).not.toHaveBeenCalled();
    expect(unobserveSpy).not.toHaveBeenCalled();
  });

  it('should not emit when intersecting another element', async () => {
    const result = await setup();

    const intersectionSpy = spyOn(
      result.fixture.componentInstance,
      'isIntersecting',
    );

    assertNotNull(callback);
    callback(mockEntries(true, result.fixture.nativeElement));
    callback(mockEntries(true, document.body));
    callback(mockEntries(true, document.createElement('span')));

    expect(intersectionSpy).not.toHaveBeenCalled();
  });

  it('should emit once when intersecting is true (once=true) and disconnect IntersectionObserver', async () => {
    await setup(true);

    assertNotNull(callback);
    callback(mockEntries(false));
    callback(mockEntries(false));
    callback(mockEntries(true));

    expect(disconnectSpy).toHaveBeenCalled();
    expect(unobserveSpy).toHaveBeenCalled();
  });

  it('should disconnect on destroy', async () => {
    const result = await setup();

    result.fixture.destroy();

    expect(unobserveSpy).toHaveBeenCalledWith(jasmine.any(HTMLElement));
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
