import { appReducerReducerFunction } from './app.reducer';
import * as itemActions from '../actions/app.actions';
import { AppState } from '../app.state';
import { Item } from '../../models/item.model';
import {
  createMockItem,
  createMockItemList,
} from '../../models/__mocks__/item.model.mock';

describe('App Reducer', () => {
  const initialState: AppState = {
    items: [],
    favoriteItems: [],
    loading: false,
  };

  it('should set loading to true on loadItems action', () => {
    const pagination = { limit: 5, start: 0 };
    const action = itemActions.LoadItemsActions.loadItems({ pagination });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update items on loadItemsSuccess action', () => {
    const items: Item[] = createMockItemList();
    const action = itemActions.LoadItemsActions.loadItemsSuccess({
      items,
      pagination: { limit: 5, start: 0 },
    });
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
    const action = itemActions.SearchItemsActions.searchItems({ query: '' });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set loading to false and update items on searchItemsSuccess action', () => {
    const items: Item[] = [createMockItem()];
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
    const item: Item = createMockItem();
    const action = itemActions.AddFavoriteItem.addFavoriteItem({ item });
    const state = appReducerReducerFunction(initialState, action);
    expect(state.favoriteItems).toContain(item);
  });

  it('should remove item from favoriteItems on deleteFavoriteItem action', () => {
    const item: Item = createMockItem();
    const initialStateWithFavorite: AppState = {
      ...initialState,
      favoriteItems: [item],
    };
    const action = itemActions.AddFavoriteItem.deleteFavoriteItem({ item });
    const state = appReducerReducerFunction(initialStateWithFavorite, action);
    expect(state.favoriteItems).not.toContain(item);
  });
});
