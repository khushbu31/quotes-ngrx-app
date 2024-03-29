import { createReducer, on } from '@ngrx/store';
import { QuoteModel } from '../models/quote.model';
import {
  addQuotesSuccess,
  deleteQuote,
  deleteQuotesSuccess,
  loadQuotes,
  loadQuotesFailure,
  loadQuotesSuccess,
  sortQuotes,
  submitQuote,
  updateQuote,
  updateQuotesSuccess,
} from './quotes.actions';

/**
 * 1. What are Reducers ?
 * -> Reducers are responsible for handling transitions from one state to the next state in application.
 * -> Reducers are pure functions.
 * -> Pure functions are function that always returns the same result if the same arguments are passed. It does not
 *    depend on any state or data change during a program’s execution. Rather, it only depends on its input arguments.
 * */

export interface QuotesState {
  quotes: QuoteModel[];
  error: string | null;
  status: 'loading' | 'error' | 'success'
}

export const initialState: QuotesState = {
  quotes: [],
  error: null,
  status: 'loading',
};

export const quoteReducer = createReducer(
  initialState,
  on(loadQuotes, (state) => ({ ...state, status: 'loading' })),

  on(loadQuotesSuccess, (state, { quotes }) => ({
    ...state,
    quotes: quotes,
    error: null,
    status: 'success',
  })),

  on(loadQuotesFailure, (state) => ({ ...state, status: 'error' })),

  on(submitQuote, (state) => {
    return {
      ...state,
      status: 'loading'
    }
  }),

  on(deleteQuote, (state) => ({
    ...state,
    status: 'loading'
  })),

  on(updateQuote, (state) => ({
      ...state,
      status: 'loading',
  })),

  on(updateQuotesSuccess, (state, { quote }) => {
    const allQuotes = [...state.quotes];
    const quoteIndex = allQuotes.findIndex(
      (element) => element.id === quote.id
    );
    if (quoteIndex !== -1) {
      allQuotes[quoteIndex] = quote;
    }
    return {
      ...state,
      quotes: allQuotes,
      status: 'success',
    };
  }),

  on(addQuotesSuccess, (state, { quote }) => {
    const allQuotes = [...state.quotes];
    allQuotes.push(quote);
    return {
      ...state,
      quotes: allQuotes,
      status: 'success'
    };
  }),

  on(deleteQuotesSuccess, (state, { quote }) => {
    const allQuotes = [...state.quotes];
    return {
      ...state,
      quotes: allQuotes.filter((element) => element.id !== quote.id),
      status: 'success'
    };
  }),

  on(sortQuotes, (state, { sortType }) => {
    const allQuotes = [...state.quotes];
    let quotes;
    if (sortType === 'asc') {
      quotes = allQuotes.sort((a, b) =>
        a.quote.toLocaleLowerCase() >= b.quote.toLocaleLowerCase() ? 1 : -1
      );
    } else {
      quotes = allQuotes.sort((a, b) =>
        a.quote.toLocaleLowerCase() <= b.quote.toLocaleLowerCase() ? 1 : -1
      );
    }
    return {
      ...state,
      quotes,
    };
  })
);
