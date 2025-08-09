import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { WINDOW_TOKEN } from '@shared/ui/window-token';

/**
 * Emits a boolean whether the element is in view or not.
 * If you only need to know it once, then use the input `once` with `true`.
 */
@Directive({
  selector: '[appObserveIntersection]',
})
export class ObserveIntersection implements OnInit, OnDestroy {
  private readonly global: Window = inject(WINDOW_TOKEN);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  public readonly once = input<boolean>(false);
  public readonly appObserveIntersection = output<boolean>();

  ngOnInit(): void {
    if (
      !('IntersectionObserver' in this.global) ||
      typeof this.global['IntersectionObserver'] !== 'function'
    ) {
      return;
    }

    const clazzIntersectionObserver = this.global.IntersectionObserver as new (
      callback: (entries: IntersectionObserverEntry[]) => void,
    ) => IntersectionObserver;

    this.observer ??= new clazzIntersectionObserver((entries) => {
      entries.forEach((entry) => this.updateIntersectionForEntry(entry));
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.disconnectIntersectionObserver();
  }

  private updateIntersectionForEntry(entry: IntersectionObserverEntry) {
    if (entry.target !== this.elementRef.nativeElement) {
      return;
    }
    this.appObserveIntersection.emit(entry.isIntersecting);
    if (this.once() && entry.isIntersecting) {
      this.disconnectIntersectionObserver();
    }
  }

  private disconnectIntersectionObserver() {
    if (this.observer) {
      this.observer.unobserve(this.elementRef.nativeElement);
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
