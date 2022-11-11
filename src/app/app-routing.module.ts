import { QuoteCalculatorComponent } from './pages/quote-calculator/quote-calculator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepaymentsComponent } from './pages/repayments/repayments.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  { path: 'calculator/:id', component: QuoteCalculatorComponent },
  { path: 'repayments/:id', component: RepaymentsComponent },
  { path: 'success/:id', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
