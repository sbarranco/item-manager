import { Item } from '../models/item.model';

export interface AppState {
  items: Item[];
  favoriteItems: Item[];
  loading: boolean;
}

export interface ItemState {
  APP_STATE: AppState;
}
