import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ItemState } from '../item.state';

export const selectItemState = createFeatureSelector<ItemState>('item');

export const selectAllItems = createSelector(
  selectItemState,
  (state) => state.items
);
export const selectLoading = createSelector(
  selectItemState,
  (state) => state.loading
);
export const selectFavoriteItems = createSelector(
  selectItemState,
  (state) => state.favoriteItems
);
