import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { QuotesState } from './quotes.reducer';

export const getAllQuotes = createSelector(
  (state: AppState) => state.quotes, // Get the only state of quotes from whole APPState
  (state: QuotesState) => state.quotes // It will display only quotes data from quotes state
);

export const getCurrentLoadStatus = createSelector(
  (state: AppState) => state.quotes,
  (state: QuotesState) => state.status
);
