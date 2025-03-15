import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as itemActions from '../actions/app.actions';
import { AppState, ItemState } from '../app.state';

const initialAppState: AppState = {
  items: [],
  favoriteItems: [],
  loading: false,
};

const appReducer = createReducer(
  initialAppState,
  on(itemActions.LoadItemsActions.loadItems, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(itemActions.LoadItemsActions.loadItemsSuccess, (state, action) => {
    const isInitialLoad = action.pagination.start === 0;
    return {
      ...state,
      loading: false,
      items: isInitialLoad ? action.items : [...state.items, ...action.items],
    };
  }),
  on(itemActions.LoadItemsActions.loadItemsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(itemActions.SearchItemsActions.searchItems, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(itemActions.SearchItemsActions.searchItemsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      items: action.items,
    };
  }),
  on(itemActions.SearchItemsActions.searchItemsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(itemActions.AddFavoriteItem.addFavoriteItem, (state, action) => {
    return {
      ...state,
      favoriteItems: [...state.favoriteItems, action.item],
    };
  }),
  on(itemActions.AddFavoriteItem.deleteFavoriteItem, (state, action) => {
    return {
      ...state,
      favoriteItems: state.favoriteItems.filter(
        (item) => item.title !== action.item.title
      ),
    };
  })
);

export function appReducerReducerFunction(
  state: AppState | undefined,
  action: Action
) {
  return appReducer(state, action);
}

export const reducers: ActionReducerMap<ItemState> = {
  APP_STATE: appReducerReducerFunction,
};
