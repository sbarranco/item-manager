import { appReducerReducerFunction } from './app.reducer';
import * as itemActions from '../actions/app.actions';
import { AppState } from '../app.state';
import { Item } from '../../models/item.model';

describe('App Reducer', () => {
  const initialState: AppState = {
    items: [],
    favoriteItems: [],
    loading: false,
  };

  it('should set loading to true on loadItems action', () => {
    const pagination = { limit: 5, offset: 0 };
    const action = itemActions.LoadItemsActions.loadItems({ pagination });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update items on loadItemsSuccess action', () => {
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
    const action = itemActions.LoadItemsActions.loadItemsSuccess({ items });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(items);
  });

  it('should set loading to false on loadItemsFailure action', () => {
    const action = itemActions.LoadItemsActions.loadItemsFailure();
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('should set loading to true on searchItems action', () => {
    const action = itemActions.SearchItemsActions.searchItems({ query: {} });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update items on searchItemsSuccess action', () => {
    const items: Item[] = [
      {
        title: 'Item 1',
        description: 'Description 1',
        price: 100,
        email: 'test@example.com',
        image: 'image1.jpg',
      },
    ];
    const action = itemActions.SearchItemsActions.searchItemsSuccess({ items });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(items);
  });

  it('should set loading to false on searchItemsFailure action', () => {
    const action = itemActions.SearchItemsActions.searchItemsFailure();
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('should add item to favoriteItems on addFavoriteItem action', () => {
    const item: Item = {
      title: 'Item 1',
      description: 'Description 1',
      price: 100,
      email: 'test@example.com',
      image: 'image1.jpg',
    };
    const action = itemActions.AddFavoriteItem.addFavoriteItem({ item });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.favoriteItems).toContain(item);
  });

  it('should remove item from favoriteItems on deleteFavoriteItem action', () => {
    const item: Item = {
      title: 'Item 1',
      description: 'Description 1',
      price: 100,
      email: 'test@example.com',
      image: 'image1.jpg',
    };
    const initialStateWithFavorite: AppState = {
      ...initialState,
      favoriteItems: [item],
    };
    const action = itemActions.AddFavoriteItem.deleteFavoriteItem({ item });
    const state = appReducerReducerFunction(initialStateWithFavorite, action);
    expect(state.favoriteItems).not.toContain(item);
  });
});
