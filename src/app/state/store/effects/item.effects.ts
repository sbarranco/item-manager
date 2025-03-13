import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemService } from '../../../services/items.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromItemActions from '../actions/item.actions';

@Injectable()
export class ItemEffects {
  private readonly actions$ = inject(Actions);
  private readonly itemService = inject(ItemService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromItemActions.LoadItemsActions.loadItems),
      mergeMap((action) =>
        this.itemService.getItems(action.limit, action.offset).pipe(
          map((response) =>
            fromItemActions.LoadItemsActions.loadItemsSuccess({
              items: response.items,
            })
          ),
          catchError(() =>
            of(fromItemActions.LoadItemsActions.loadItemsFailure())
          )
        )
      )
    )
  );

  searchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromItemActions.SearchItemsActions.searchItems),
      mergeMap((action) =>
        this.itemService.searchItems(action.query).pipe(
          map((response) =>
            fromItemActions.SearchItemsActions.searchItemsSuccess({
              items: response.items,
            })
          ),
          catchError(() =>
            of(fromItemActions.SearchItemsActions.searchItemsFailure())
          )
        )
      )
    )
  );
}
