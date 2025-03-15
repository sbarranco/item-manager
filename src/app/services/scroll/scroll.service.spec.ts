import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';
import { ElementRef } from '@angular/core';

describe('ScrollService', () => {
  let service: ScrollService;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
    mockElementRef = new ElementRef(document.createElement('div'));

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = jest.fn(function (callback) {
      this.callback = callback;
      this.observe = jest.fn();
      this.unobserve = jest.fn();
      this.disconnect = jest.fn();
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set up IntersectionObserver and call callback when intersecting', () => {
    const callback = jest.fn();
    service.setupIntersectionObserver(mockElementRef, callback);

    // Simulate intersection
    const entries = [{ isIntersecting: true }];
    (service as any).observer.callback(entries);

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when not intersecting', () => {
    const callback = jest.fn();
    service.setupIntersectionObserver(mockElementRef, callback);

    // Simulate no intersection
    const entries = [{ isIntersecting: false }];
    (service as any).observer.callback(entries);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should disconnect the observer', () => {
    service.setupIntersectionObserver(mockElementRef, jest.fn());
    const disconnectSpy = jest.spyOn((service as any).observer, 'disconnect');

    service.disconnectObserver();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});
