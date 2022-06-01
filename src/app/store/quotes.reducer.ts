import { createReducer, on } from '@ngrx/store';
import { QuoteModel } from '../models/quote.model';
import {
  deleteQuote,
  loadQuotes,
  loadQuotesFailure,
  loadQuotesSuccess,
  sumbitQuote,
  updateQuote,
} from './quotes.actions';

/**
 * 1. What are Reducres ?
 * -> Reducers are responsible for handling transitions from one state to the next state in application.
 * -> Reducres are pure functions.
 * -> Pure functions function that always returns the same result if the same arguments are passed. It does not     depend on any state or data change during a program’s execution. Rather, it only depends on its input arguments.
 * */

export interface QuotesState {
  quotes: QuoteModel[];
  error: string | null;
  status: 'loading' | 'error' | 'success';
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

  on(sumbitQuote, (state, { quote }) => ({
    ...state,
    quotes: [
      ...state.quotes,
      {
        id: quote.id,
        quote: quote.quote,
        author: quote.author,
      },
    ],
  })),

  on(deleteQuote, (state, { quote }) => ({
    ...state,
    quotes: [...state.quotes.filter((quoteData) => quoteData.id !== quote.id)],
  })),

  on(updateQuote, (state, { quote }) => {
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
    };
  })
);
