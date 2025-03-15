import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private observer!: IntersectionObserver;

  setupIntersectionObserver(
    scrollAnchor: ElementRef,
    callback: () => void
  ): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    this.observer.observe(scrollAnchor.nativeElement);
  }

  disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
