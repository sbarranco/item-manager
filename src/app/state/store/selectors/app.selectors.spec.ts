import {
  selectAppState,
  selectAllItems,
  selectLoading,
  selectFavoriteItems,
} from './app.selectors';
import { AppState, ItemState } from '../app.state';

describe('App Selectors', () => {
  const initialState: AppState = {
    items: [
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
    ],
    loading: false,
    favoriteItems: [
      {
        title: 'Item 1',
        description: 'Description 1',
        price: 100,
        email: 'test@example.com',
        image: 'image1.jpg',
      },
    ],
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
});
