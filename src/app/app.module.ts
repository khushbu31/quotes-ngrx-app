import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, QuotesComponent, AddQuoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
