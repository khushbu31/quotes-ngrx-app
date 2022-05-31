import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  constructor() {
    this.quoteForm = new FormGroup({
      quote: new FormControl(''),
      author: new FormControl(''),
    });
  }

  ngOnInit(): void {}
}
