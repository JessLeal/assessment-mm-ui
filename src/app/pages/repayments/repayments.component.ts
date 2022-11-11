import { ActivatedRoute, Router } from '@angular/router';
import { AccountDetail } from './../../types/Account';
import { LoanFinanceDetail } from './../../types/Loan';
import { TITLE_OPTIONS } from '../../constants/titleConstants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Repayment } from 'src/app/types/Repayment';
import * as moment from 'moment';
import { RepaymentService } from 'src/app/services/repayment.service';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'moneyme-repayments',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RepaymentsComponent implements OnInit {
  id: string = String(this.route.snapshot.paramMap.get('id'));
  repaymentDetail: Repayment;
  repaymentForm: FormGroup;
  isLoanEdit: boolean = false;
  isAccountEdit: boolean = false;
  isLoading: boolean = false;

  currentLoanFinance: LoanFinanceDetail;
  currentAccountDetail: AccountDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private repaymentService: RepaymentService
  ) {}

  ngOnInit(): void {
    var repaymentResponse = JSON.parse(
      localStorage.getItem('repayments') || ''
    );

    var repaymentTransformed = this.transformLoanDetail(repaymentResponse);

    this.repaymentForm = this.formBuilder.group({
      amountRepayment: [repaymentTransformed.amount],
      establishmentFee: [repaymentTransformed.establishmentFee],
      interest: [repaymentTransformed.interest],
      totalRepayment: [repaymentTransformed.totalRepayment],
      title: [repaymentTransformed.loan.title],
      firstName: [repaymentTransformed.loan.firstName],
      lastName: [repaymentTransformed.loan.lastName],
      dateOfBirth: [repaymentTransformed.loan.dateOfBirth],
      email: [repaymentTransformed.loan.email],
      mobile: [repaymentTransformed.loan.mobile],
      amount: [repaymentTransformed.loan.amount],
      term: [repaymentTransformed.loan.term],
      product: [repaymentTransformed.loan.product],
    });
  }

  onAccountSubmit() {
    localStorage.setItem(
      'repayments',
      JSON.stringify(this.repaymentForm.value)
    );

    this.isAccountEdit = false;
  }

  onAccountCancel() {
    this.repaymentForm.patchValue(this.currentAccountDetail);

    this.isAccountEdit = false;
  }

  onAccountEditClick() {
    const { title, firstName, lastName, dateOfBirth, email, mobile } =
      this.repaymentForm.value;

    this.currentAccountDetail = {
      title,
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobile,
    };

    this.isAccountEdit = true;
  }

  onFinanceSubmit() {
    this.isLoading = true;

    this.repaymentService
      .updateRepaymentCalculation(this.repaymentForm.value, this.id)
      .subscribe((repaymentValue) => {
        if (repaymentValue != null) {
          this.repaymentForm.patchValue({
            amountRepayment: repaymentValue.amount,
            establishmentFee: repaymentValue.establishmentFee,
            interest: repaymentValue.interest,
            totalRepayment: repaymentValue.totalRepayment,
          });

          localStorage.setItem('repayments', JSON.stringify(repaymentValue));
          this.isLoading = false;
          this.isLoanEdit = false;
        }
      });
  }

  onFinanceCancel() {
    this.repaymentForm.patchValue(this.currentLoanFinance);

    this.isLoanEdit = false;
  }

  onFinanceEditClick() {
    const { amount, term, product } = this.repaymentForm.value;

    this.currentLoanFinance = {
      amount,
      term,
      product,
    };

    this.isLoanEdit = true;
  }

  onClick() {
    this.repaymentService
      .createRepayment(this.repaymentForm.value, this.id)
      .subscribe((repaymentValue) => {
        if (repaymentValue != null) {
          this.repaymentForm.patchValue({
            amountRepayment: repaymentValue.amount,
            establishmentFee: repaymentValue.establishmentFee,
            interest: repaymentValue.interest,
            totalRepayment: repaymentValue.totalRepayment,
          });

          localStorage.setItem('repayments', JSON.stringify(repaymentValue));

          this.router.navigateByUrl(`/success/${this.id}`);
        }
      });
  }

  transformLoanDetail(repayment: Repayment): Repayment {
    const newDetail: Repayment = { ...repayment };

    //Title
    newDetail.loan.title =
      TITLE_OPTIONS.find((title) => newDetail.loan.title === title.value)
        ?.value || TITLE_OPTIONS[0].value;

    //Date of birth
    newDetail.loan.dateOfBirth = moment(repayment.loan.dateOfBirth).format(
      'YYYY-MM-DD'
    );

    return newDetail;
  }
}
