import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { QuoteModel } from '../models/quote.model';
import { QuotesState } from '../store/quotes.reducer';

const QUOTES_DATA = [
  {
    id: '1',
    quote: 'Learning NgRx is great!',
    author: 'Khushbu Choksi',
  },
  {
    id: '2',
    quote: 'Learning NgRx is Fun!',
    author: 'Khushbu Choksi',
  },
  {
    id: '3',
    quote: `Don't wait for one day, Start day one`,
    author: 'Khushbu Choksi',
  },
];

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  quotes = QUOTES_DATA;
  constructor(private http: HttpClient) {}

  getData(): Observable<QuoteModel[]> {
    return this.http
      .get<QuoteModel[]>(
        'https://quotes-280e4-default-rtdb.firebaseio.com/quotes.json'
      )
      .pipe(
        tap((data) => Object.keys(data)),
        map((data) => {
          const keys = Object.keys(data);
          return keys.map((quote: any, index) => {
            return {
              id: data[quote].id,
              quote: data[quote].quote,
              author: data[quote].author,
              objectId: quote,
            };
          });
        })
      );
  }

  addQuote(quote: QuoteModel): Observable<any> {
    return this.http.post<any>(
      'https://quotes-280e4-default-rtdb.firebaseio.com/quotes.json',
      quote
    );
  }

  deleteQuote(quote: QuoteModel): Observable<any> {
    return this.http.delete<any>(
      `https://quotes-280e4-default-rtdb.firebaseio.com/quotes/` +
        quote.objectId + `.json`
    );
  }

  updateQuote(quote: QuoteModel): Observable<any> {
    return this.http.put<QuotesState>(
      `https://quotes-280e4-default-rtdb.firebaseio.com/quotes/` +
        quote.objectId + `.json`,
      { ...quote }
    );
  }
}
