import { createAction, props } from '@ngrx/store';
import { QuoteModel } from '../models/quote.model';

export const loadQuotes = createAction('[QUOTES PAGE] LOAD QUOTES');

export const loadQuotesSuccess = createAction(
  '[QUOTES PAGE] LOAD QUOTES SUCCESS',
  props<{ quotes: QuoteModel[] }>()
);
export const loadQuotesFailure = createAction(
  '[QUOTES PAGE] LOAD QUOTES FAIL',
  props<{ error: string }>()
);

export const sumbitQuote = createAction(
  '[ADD QUOTE] SUBMIT QUOTE',
  props<{ quote: QuoteModel }>()
);

export const deleteQuote = createAction(
  '[QUOTE PAGE] DELETE QUOTE',
  props<{ quote: QuoteModel }>()
);

export const updateQuote = createAction(
  '[QUOTE PAGE] UPDATE QUOTE',
  props<{ quote: QuoteModel }>()
);

export const sortQuotes = createAction(
  '[QUOTE PAGE] SORT QUOTE',
  props<{ sortType: string }>()
);
