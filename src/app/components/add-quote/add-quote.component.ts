import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { submitQuote, updateQuote } from 'src/app/store/quotes.actions';
import { getCurrentLoadStatus } from 'src/app/store/quotes.selector';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent implements OnDestroy {
  quoteForm: FormGroup;
  quoteTobeEdited: any;
  showSpinner = false;
  subscription!: Subscription;
  constructor(private store: Store<AppState>, private router: Router, private snackbar: MatSnackBar) {
    this.quoteTobeEdited =
      this.router.getCurrentNavigation()?.extras.state?.['quote'];

    this.quoteForm = new FormGroup({
      quote: new FormControl(
        this.quoteTobeEdited ? this.quoteTobeEdited.quote : ''
      ),
      author: new FormControl(
        this.quoteTobeEdited ? this.quoteTobeEdited.author : ''
      ),
    });
  }

  submitQuote() {
  this.showSpinner = true;
    const quote = this.quoteForm.value;
    if (this.quoteTobeEdited) {
      quote.id = this.quoteTobeEdited.id;
      quote.objectId = this.quoteTobeEdited.objectId;
      this.store.dispatch(updateQuote({ quote }));
    } else {
      quote.id = Date.now().toString();
      this.store.dispatch(submitQuote({ quote }))
    }
    this.subscription = this.store.select(getCurrentLoadStatus).subscribe((res) => {
      if (res === 'error') {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong', '', { duration: 3000 });
      }
      if (res === 'loading') {
        this.showSpinner = true;
      }
      if (res === 'success') {
        const msg = this.quoteTobeEdited ? 'Quote updated successfully!' : 'Quote Added successfully!'
        this.snackbar.open(msg, '', { duration: 3000 });
        this.router.navigate(['quotes']);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
