import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { QuoteModel } from 'src/app/models/quote.model';
import { AppState } from 'src/app/store/app.state';
import {
  deleteQuote,
  loadQuotes,
  sortQuotes,
} from 'src/app/store/quotes.actions';
import {
  getAllQuotes,
  getCurrentLoadStatus,
} from 'src/app/store/quotes.selector';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes$!: Observable<QuoteModel[]>;
  showSpinner!: boolean;
  sortType!: boolean;
  subscription!: Subscription;
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuotes());
    this.quotes$ = this.store.select(getAllQuotes);
    this.subscription = this.store.select(getCurrentLoadStatus).subscribe((res) => {
      if (res === 'error') {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong', '', { duration: 3000 });
      }
      if (res === 'loading') {
        this.showSpinner = true;
      }
      if (res === 'success') {
        this.showSpinner = false;
      }
    });
  }

  deleteQuote(quote: QuoteModel) {
    this.store.dispatch(deleteQuote({ quote }));
    this.subscription = this.store.select(getCurrentLoadStatus).subscribe((res) => {
      if (res === 'error') {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong', '', { duration: 3000 });
      }
      if (res === 'loading') {
        this.showSpinner = true;
      }
      if (res === 'success') {
        this.snackbar.open('Quote Deleted Successfully!', '', { duration: 3000 });
        this.showSpinner = false;
      }
    });
  }

  updateQuote(quote: QuoteModel) {
    this.router.navigate(['edit-quote'], { state: { quote } });
  }

  sortData() {
    this.sortType = !this.sortType;
    this.store.dispatch(
      sortQuotes({ sortType: this.sortType ? 'asc' : 'desc' })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
