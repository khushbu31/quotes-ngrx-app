import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuoteModel } from 'src/app/models/quote.model';
import { AppState } from 'src/app/store/app.state';
import { deleteQuote, loadQuotes } from 'src/app/store/quotes.actions';
import {
  getAllQuotes,
  getCurrentLoadStatus,
} from 'src/app/store/quotes.selector';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  quotes$!: Observable<QuoteModel[]>;
  showSpinner!: boolean;
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuotes());
    this.quotes$ = this.store.select(getAllQuotes);
    this.store.select(getCurrentLoadStatus).subscribe((res) => {
      if (res === 'error') {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong', 'Ok', { duration: 3000 });
      }
      if (res === 'loading') {
        this.showSpinner = true;
      }
      if (res === 'success') {
        this.showSpinner = false;
        this.snackbar.open('Successfully Done', 'Thank you', {
          duration: 3000,
        });
      }
    });
  }

  deleteQuote(quote: QuoteModel) {
    this.store.dispatch(deleteQuote({ quote }));
  }

  updateQuote(quote: QuoteModel) {
    this.router.navigate(['edit-quote'], { state: { quote } });
  }

  sortData() {}
}
