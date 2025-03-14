import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AppEffects } from './app.effects';
import { ItemService } from '../../../services/items.service';
import * as fromItemActions from '../actions/app.actions';
import { Item } from '../../models/item.model';
import { Action } from '@ngrx/store';

describe('AppEffects', () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;
  let itemService: jest.Mocked<ItemService>;

  beforeEach(() => {
    const itemServiceMock = {
      getItems: jest.fn(),
      searchItems: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: ItemService, useValue: itemServiceMock },
      ],
    });

    effects = TestBed.inject(AppEffects);
    itemService = TestBed.inject(ItemService) as jest.Mocked<ItemService>;
  });

  describe('loadItems$', () => {
    it('should return a loadItemsSuccess action with items on success', () => {
      const items: Item[] = [
        {
          title: 'Item 1',
          description: 'Description 1',
          price: 100,
          email: 'test@example.com',
          image: 'image1.jpg',
        },
        {
          title: 'Item 2',
          description: 'Description 2',
          price: 200,
          email: 'test2@example.com',
          image: 'image2.jpg',
        },
      ];
      const action = fromItemActions.LoadItemsActions.loadItems({
        pagination: { limit: 5, offset: 0 },
      });
      const outcome = fromItemActions.LoadItemsActions.loadItemsSuccess({
        items,
      });

      actions$ = of(action);
      itemService.getItems.mockReturnValue(of({ items }));

      effects.loadItems$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(itemService.getItems).toHaveBeenCalledWith(5, 0);
      });
    });

    it('should return a loadItemsFailure action on failure', () => {
      const action = fromItemActions.LoadItemsActions.loadItems({
        pagination: { limit: 5, offset: 0 },
      });
      const outcome = fromItemActions.LoadItemsActions.loadItemsFailure();

      actions$ = of(action);
      itemService.getItems.mockReturnValue(throwError(new Error('Error')));

      effects.loadItems$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(itemService.getItems).toHaveBeenCalledWith(5, 0);
      });
    });
  });

  describe('searchItems$', () => {
    it('should return a searchItemsSuccess action with items on success', () => {
      const items: Item[] = [
        {
          title: 'Item 1',
          description: 'Description 1',
          price: 100,
          email: 'test@example.com',
          image: 'image1.jpg',
        },
      ];
      const query = { title: 'Item 1' };
      const action = fromItemActions.SearchItemsActions.searchItems({ query });
      const outcome = fromItemActions.SearchItemsActions.searchItemsSuccess({
        items,
      });

      actions$ = of(action);
      itemService.searchItems.mockReturnValue(of({ items }));

      effects.searchItems$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(itemService.searchItems).toHaveBeenCalledWith(query);
      });
    });

    it('should return a searchItemsFailure action on failure', () => {
      const query = { title: 'Item 1' };
      const action = fromItemActions.SearchItemsActions.searchItems({ query });
      const outcome = fromItemActions.SearchItemsActions.searchItemsFailure();

      actions$ = of(action);
      itemService.searchItems.mockReturnValue(throwError(new Error('Error')));

      effects.searchItems$.subscribe((result) => {
        expect(result).toEqual(outcome);
        expect(itemService.searchItems).toHaveBeenCalledWith(query);
      });
    });
  });
});
