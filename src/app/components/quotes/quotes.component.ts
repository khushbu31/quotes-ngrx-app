import { Component, OnInit } from '@angular/core';
import { QuoteModel } from 'src/app/models/quote.model';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  quotes: QuoteModel[] = [];
  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quotes = this.quoteService.quotes;
    this.quoteService.getData().subscribe((res) => console.log(res));
  }
}
