import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { QuoteCalculatorComponent } from './pages/quote-calculator/quote-calculator.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { RepaymentsComponent } from './pages/repayments/repayments.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { SuccessComponent } from './pages/success/success.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    QuoteCalculatorComponent,
    LoanFormComponent,
    RepaymentsComponent,
    AccountFormComponent,
    SuccessComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toastr-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
