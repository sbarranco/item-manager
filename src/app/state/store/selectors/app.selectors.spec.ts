import {
  selectAppState,
  selectAllItems,
  selectLoading,
  selectFavoriteItems,
  selectCombinedItems,
} from './app.selectors';
import { AppState, ItemState } from '../app.state';
import {
  createMockItem,
  createMockItemList,
} from '../../models/__mocks__/item.model.mock';

describe('App Selectors', () => {
  const initialState: AppState = {
    items: createMockItemList(),
    loading: false,
    favoriteItems: [createMockItem()],
  };

  const appState: ItemState = {
    APP_STATE: initialState,
  };

  it('should select the app state', () => {
    const result = selectAppState.projector(appState.APP_STATE);
    expect(result).toEqual(initialState);
  });

  it('should select all items', () => {
    const result = selectAllItems.projector(initialState);
    expect(result).toEqual(initialState.items);
  });

  it('should select loading', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });

  it('should select favorite items', () => {
    const result = selectFavoriteItems.projector(initialState);
    expect(result).toEqual(initialState.favoriteItems);
  });
  it('should select combined items with isFavorite property', () => {
    const result = selectCombinedItems.projector(
      initialState.items,
      initialState.favoriteItems
    );
    const expected = initialState.items.map((item) => ({
      ...item,
      isFavorite: initialState.favoriteItems.some(
        (favItem) => favItem.title === item.title
      ),
    }));
    expect(result).toEqual(expected);
  });
});
