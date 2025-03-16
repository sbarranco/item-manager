import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('APP_STATE');

export const selectAllItems = createSelector(
  selectAppState,
  (state) => state?.items
);
export const selectLoading = createSelector(
  selectAppState,
  (state) => state?.loading
);
export const selectFavoriteItems = createSelector(
  selectAppState,
  (state) => state?.favoriteItems
);
export const selectCombinedItems = createSelector(
  selectAllItems,
  selectFavoriteItems,
  (items, favoriteItems) => {
    return items.map((item) => ({
      ...item,
      isFavorite: favoriteItems.some((favItem) => favItem.title === item.title),
    }));
  }
);
