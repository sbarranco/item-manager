import { Action, createReducer, on } from '@ngrx/store';
import { ItemState, initialItemState } from '../item.state';
import * as itemActions from '../actions/item.actions';

const itemReducer = createReducer(
  initialItemState,
  on(itemActions.LoadItemsActions.loadItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(itemActions.LoadItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    items,
  })),
  on(itemActions.LoadItemsActions.loadItemsFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(itemActions.SearchItemsActions.searchItems, (state) => ({
    ...state,
    loading: true,
  })),
  on(itemActions.SearchItemsActions.searchItemsSuccess, (state, { items }) => ({
    ...state,
    loading: false,
    items,
  })),
  on(itemActions.SearchItemsActions.searchItemsFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(itemActions.AddFavoriteItem.addFavoriteItem, (state, { item }) => ({
    ...state,
    favoriteItems: [...state.favoriteItems, item],
  })),
  on(itemActions.AddFavoriteItem.deleteFavoriteItem, (state, { item }) => ({
    ...state,
    favoriteItems: state.favoriteItems.filter((i) => i.title !== item.title),
  })),
  on(itemActions.AddFavoriteItem.getFavoriteItems, (state, { items }) => ({
    ...state,
    favorite: items,
  }))
);

export function itemReducerReducerFunction(
  state: ItemState | undefined,
  action: Action
) {
  return itemReducer(state, action);
}
