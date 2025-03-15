import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppFacade } from './app.facade';
import * as fromItemActions from '../store/actions/app.actions';
import { Item, Pagination } from '../models/item.model';
import {
  selectAllItems,
  selectLoading,
  selectFavoriteItems,
} from '../store/selectors/app.selectors';

describe('AppFacade', () => {
  let facade: AppFacade;
  let store: MockStore;
  const initialState = {
    items: [],
    favoriteItems: [],
    loading: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFacade, provideMockStore({ initialState })],
    });

    facade = TestBed.inject(AppFacade);
    store = TestBed.inject(MockStore);
  });

  it('should dispatch loadItems action', () => {
    const pagination: Pagination = { limit: 5, start: 0 };
    const spy = jest.spyOn(store, 'dispatch');
    facade.loadItems(pagination);
    expect(spy).toHaveBeenCalledWith(
      fromItemActions.LoadItemsActions.loadItems({ pagination })
    );
  });

  it('should dispatch searchItems action', () => {
    const query = 'Item 1';
    const spy = jest.spyOn(store, 'dispatch');
    facade.searchItems(query);
    expect(spy).toHaveBeenCalledWith(
      fromItemActions.SearchItemsActions.searchItems({ query })
    );
  });

  it('should dispatch addFavoriteItem action', () => {
    const item: Item = {
      title: 'Item 1',
      description: 'Description 1',
      price: 100,
      email: 'test@example.com',
      image: 'image1.jpg',
    };
    const spy = jest.spyOn(store, 'dispatch');
    facade.addFavoriteItem(item);
    expect(spy).toHaveBeenCalledWith(
      fromItemActions.AddFavoriteItem.addFavoriteItem({ item })
    );
  });

  it('should dispatch deleteFavoriteItem action', () => {
    const item: Item = {
      title: 'Item 1',
      description: 'Description 1',
      price: 100,
      email: 'test@example.com',
      image: 'image1.jpg',
    };
    const spy = jest.spyOn(store, 'dispatch');
    facade.deleteFavoriteItem(item);
    expect(spy).toHaveBeenCalledWith(
      fromItemActions.AddFavoriteItem.deleteFavoriteItem({ item })
    );
  });

  it('should select all items', (done) => {
    store.overrideSelector(selectAllItems, []);
    facade.items$.subscribe((items) => {
      expect(items).toEqual([]);
      done();
    });
  });

  it('should select loading', (done) => {
    store.overrideSelector(selectLoading, false);
    facade.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
      done();
    });
  });

  it('should select favorite items', (done) => {
    store.overrideSelector(selectFavoriteItems, []);
    facade.favoriteItems$.subscribe((favoriteItems) => {
      expect(favoriteItems).toEqual([]);
      done();
    });
  });
});
