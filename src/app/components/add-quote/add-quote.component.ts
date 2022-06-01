import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { sumbitQuote, updateQuote } from 'src/app/store/quotes.actions';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  quoteTobeEdited: any;
  constructor(private store: Store<AppState>, private router: Router) {
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

  ngOnInit(): void {}

  submitQuote() {
    const quote = this.quoteForm.value;
    if (this.quoteTobeEdited) {
      quote.id = this.quoteTobeEdited.id;
      quote.objectId = this.quoteTobeEdited.objectId;
      this.store.dispatch(updateQuote({ quote }));
    } else {
      quote.id = Date.now().toString();
      this.store.dispatch(sumbitQuote({ quote }));
    }
    this.router.navigate(['quotes']);
  }
}
