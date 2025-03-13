import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ItemService } from './items.service';
import { Item } from '../state/models/item.model';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService],
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getItems', () => {
    it('should return an Observable<{ items: Item[] }>', () => {
      const dummyItems: Item[] = [
        {
          id: 1,
          title: 'Item 1',
          description: 'Description 1',
          price: 100,
          email: 'test@example.com',
          image: 'image1.jpg',
        },
        {
          id: 2,
          title: 'Item 2',
          description: 'Description 2',
          price: 200,
          email: 'test2@example.com',
          image: 'image2.jpg',
        },
      ];

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
      const dummyItems: Item[] = [
        {
          id: 1,
          title: 'Item 1',
          description: 'Description 1',
          price: 100,
          email: 'test@example.com',
          image: 'image1.jpg',
        },
      ];

      service.searchItems('Item 1').subscribe((response) => {
        expect(response.items.length).toBe(1);
        expect(response.items).toEqual(dummyItems);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}?q=Item 1`);
      expect(req.request.method).toBe('GET');
      req.flush({ items: dummyItems });
    });
  });
});
