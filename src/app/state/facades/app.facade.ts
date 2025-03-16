import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromItemActions from '../store/actions/app.actions';
import {
  selectLoading,
  selectFavoriteItems,
  selectCombinedItems,
} from '../store/selectors/app.selectors';
import { Item, Pagination } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  private readonly store = inject(Store);
  items$: Observable<Item[]> = this.store.select(selectCombinedItems);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  favoriteItems$: Observable<Item[]> = this.store.select(selectFavoriteItems);

  loadItems(pagination: Pagination): void {
    this.store.dispatch(
      fromItemActions.LoadItemsActions.loadItems({ pagination })
    );
  }

  searchItems(query: string): void {
    this.store.dispatch(
      fromItemActions.SearchItemsActions.searchItems({ query })
    );
  }

  addFavoriteItem(item: Item): void {
    this.store.dispatch(
      fromItemActions.AddFavoriteItem.addFavoriteItem({ item })
    );
  }

  deleteFavoriteItem(item: Item): void {
    this.store.dispatch(
      fromItemActions.AddFavoriteItem.deleteFavoriteItem({ item })
    );
  }
}
