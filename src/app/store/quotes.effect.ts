import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { QuoteService } from '../services/quote.service';
import { AppState } from './app.state';
import {
  addQuotesSuccess,
  deleteQuote,
  deleteQuotesSuccess,
  loadQuotes,
  loadQuotesFailure,
  loadQuotesSuccess,
  sumbitQuote,
  updateQuote,
  updateQuotesSuccess,
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
        switchMap(({ quote }) =>
          from(
            this.quoteService.addQuote(quote).pipe(
              map((quotes) => addQuotesSuccess({ quote })),
              catchError((error) => of(loadQuotesFailure(error)))
            )
          )
        )
      ),
    // { dispatch: false } // Most effects dispatch another action, but this one is just a "fire and forget" effect
  );

  deleteQuote$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(deleteQuote),
        switchMap(({ quote }) =>
          this.quoteService
            .deleteQuote(quote)
            .pipe(
              map((res) => deleteQuotesSuccess({ quote })),
              catchError((error) => of(loadQuotesFailure({ error })))
            )
        )
      ),
  );

  updateQuote$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateQuote),
      switchMap(({ quote }) =>
        from(
          this.quoteService.updateQuote(quote).pipe(
            map((quotes) => updateQuotesSuccess({ quote })),
            catchError((error) => of(loadQuotesFailure(error)))
          )
        )
      )
    )
  );
}
