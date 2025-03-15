import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Item, Pagination } from '../../models/item.model';

export const LoadItemsActions = createActionGroup({
  source: '[Item] Load Items',
  events: {
    'Load Items': props<{
      pagination: Pagination;
    }>(),

    'Load Items Success': props<{
      items: Item[];
      pagination: Pagination;
    }>(),
    'Load Items Failure': emptyProps(),
  },
});

export const SearchItemsActions = createActionGroup({
  source: '[Item]  Search Items',
  events: {
    ' Search Items': props<{
      query: string;
    }>(),

    ' Search Items Success': props<{
      items: Item[];
    }>(),
    ' Search Items Failure': emptyProps(),
  },
});

export const AddFavoriteItem = createActionGroup({
  source: '[Item] Add Favorite Item',
  events: {
    'Add Favorite Item': props<{
      item: Item;
    }>(),
    'Delete Favorite Item': props<{
      item: Item;
    }>(),
  },
});
