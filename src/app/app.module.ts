import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './store/quotes.effect';
import { quoteReducer } from './store/quotes.reducer';

@NgModule({
  declarations: [AppComponent, QuotesComponent, AddQuoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot({ quotes: quoteReducer }),
    EffectsModule.forRoot([QuoteEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
