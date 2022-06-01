import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { QuoteService } from '../services/quote.service';
import { AppState } from './app.state';
import {
  deleteQuote,
  loadQuotes,
  loadQuotesFailure,
  loadQuotesSuccess,
  sumbitQuote,
  updateQuote,
} from './quotes.actions';

@Injectable()
export class QuoteEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private quoteService: QuoteService
  ) {}

  loadQuotes$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadQuotes),
      switchMap(() =>
        from(
          this.quoteService.getData().pipe(
            map((quotes) => loadQuotesSuccess({ quotes })),
            catchError((error) => of(loadQuotesFailure(error)))
          )
        )
      )
    )
  );

  submitQuote$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(sumbitQuote),
        switchMap(({ quote }) => this.quoteService.addQuote(quote))
      ),
    { dispatch: false } // Most effects dispatch another action, but this one is just a "fire and forget" effect
  );

  deleteQuote$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deleteQuote),
        switchMap(({ quote }) =>
          this.quoteService
            .deleteQuote(quote)
            .pipe(catchError((error) => of(loadQuotesFailure({ error }))))
        )
      )
    // { dispatch: false }
  );

  updateQuote$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateQuote),
      switchMap(({ quote }) =>
        from(
          this.quoteService
            .updateQuote(quote)
            .pipe(
              catchError((error) =>
                of(this.store.dispatch(loadQuotesFailure({ error })))
              )
            )
        )
      )
    )
  );
}
