import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TITLE_OPTIONS } from 'src/app/constants/titleConstants';
import { QuoteCalculatorService } from 'src/app/services/quote-calculator.service';
import { RepaymentService } from 'src/app/services/repayment.service';
import { LoanDetail } from 'src/app/types/Loan';

@Component({
  selector: 'moneyme-quote-calculator',
  templateUrl: './quote-calculator.component.html',
  styleUrls: ['./quote-calculator.component.scss'],
})
export class QuoteCalculatorComponent implements OnInit {
  id: string = String(this.route.snapshot.paramMap.get('id'));
  loanForm: FormGroup;
  loanDetailResponse: LoanDetail;
  selectedTitle: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteCalculatorService: QuoteCalculatorService,
    private repaymentService: RepaymentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      title: [TITLE_OPTIONS[0].value],
      firstName: [this.loanDetailResponse?.firstName, Validators.required],
      lastName: [this.loanDetailResponse?.lastName, Validators.required],
      dateOfBirth: [this.loanDetailResponse?.dateOfBirth, Validators.required],
      email: [this.loanDetailResponse?.email, Validators.required],
      mobile: [this.loanDetailResponse?.mobile, Validators.required],
      product: ['ProductA'],
      amount: [this.loanDetailResponse?.amount],
      term: [this.loanDetailResponse?.term],
      isSaveRepayment: [false],
    });
    this.getQuote();
  }

  onClick() {
    this.isLoading = true;

    this.repaymentService
      .updateRepaymentCalculation(this.loanForm.value, this.id)
      .subscribe((repaymentValue) => {
        if (repaymentValue != null) {
          localStorage.setItem('repayments', JSON.stringify(repaymentValue));
          this.router.navigateByUrl(`/repayments/${this.id}`);
          this.isLoading = false;
        }
      });

    this.isLoading = false;
  }

  getQuote(): void {
    this.isLoading = true;

    this.quoteCalculatorService
      .getQuoteCalculatorDetails(this.id)
      .subscribe((calculatorDetail) => {
        console.log(calculatorDetail);

        this.loanDetailResponse = this.transformLoanDetail(calculatorDetail);

        this.loanForm.patchValue({
          ...this.loanDetailResponse,
        });
        this.isLoading = false;
      });
  }

  transformLoanDetail(_loanDetail: LoanDetail): LoanDetail {
    const newDetail: LoanDetail = { ..._loanDetail };

    //Title
    newDetail.title =
      TITLE_OPTIONS.find((title) => newDetail.title === title.value)?.value ||
      TITLE_OPTIONS[0].value;

    //Date of birth
    newDetail.dateOfBirth = moment(_loanDetail.dateOfBirth).format(
      'YYYY-MM-DD'
    );

    return newDetail;
  }
}
