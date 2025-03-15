import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Item } from '../state/models/item.model';
import { ItemService } from './items.service';
import {
  createMockItem,
  createMockItemList,
} from '../state/models/__mocks__/item.model.mock';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
      ],
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getItems', () => {
    it('should return an Observable<{ items: Item[] }>', () => {
      const dummyItems: Item[] = createMockItemList();

      service.getItems(5, 0).subscribe((response) => {
        expect(response.items.length).toBe(2);
        expect(response.items).toEqual(dummyItems);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}?_limit=5&_start=0`);
      expect(req.request.method).toBe('GET');
      req.flush({ items: dummyItems });
    });
  });

  describe('searchItems', () => {
    it('should return an Observable<{ items: Item[] }>', () => {
      const dummyItems: Item[] = [createMockItem()];

      service.searchItems('Item 1').subscribe((response) => {
        expect(response.items.length).toBe(1);
        expect(response.items).toEqual(dummyItems);
      });

      const req = httpMock.expectOne(
        `${service['apiUrl']}/filter?search=Item 1`
      );
      expect(req.request.method).toBe('GET');
      req.flush({ items: dummyItems });
    });
  });
});
