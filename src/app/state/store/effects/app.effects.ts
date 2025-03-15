import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemService } from '../../../services/items/items.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromItemActions from '../actions/app.actions';
import { toQueryString } from '../../../utils/query-string.util';

@Injectable()
export class AppEffects {
  private readonly actions$ = inject(Actions);
  private readonly itemService = inject(ItemService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromItemActions.LoadItemsActions.loadItems),
      mergeMap((action) =>
        this.itemService
          .getItems(action.pagination?.limit, action.pagination?.start)
          .pipe(
            map((response) =>
              fromItemActions.LoadItemsActions.loadItemsSuccess({
                items: response.items,
                pagination: action.pagination,
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
      mergeMap((action) => {
        const queryString = toQueryString(action.query);
        return this.itemService.searchItems(queryString).pipe(
          map((response) =>
            fromItemActions.SearchItemsActions.searchItemsSuccess({
              items: response.items,
            })
          ),
          catchError(() =>
            of(fromItemActions.SearchItemsActions.searchItemsFailure())
          )
        );
      })
    )
  );
}
