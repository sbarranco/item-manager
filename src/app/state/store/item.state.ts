import { Item } from '../models/item.model';

export interface ItemState {
  items: Item[];
  favoriteItems: Item[];
  loading: boolean;
}

export const initialItemState: ItemState = {
  items: [],
  favoriteItems: [],
  loading: false,
};
