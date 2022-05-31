import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getData() {
    return this.http.get(
      'https://quotes-280e4-default-rtdb.firebaseio.com/quotes.json'
    );
  }
}
