import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepaymentService } from 'src/app/services/repayment.service';
import { Repayment } from 'src/app/types/Repayment';

@Component({
  selector: 'moneyme-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  id: string = String(this.route.snapshot.paramMap.get('id'));
  repaymentDetail: Repayment = {
    amount: 0,
    establishmentFee: 0,
    interest: 0,
    totalRepayment: 0,
    loan: {
      accountId: this.id,
      title: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      mobile: '',
      amount: 0,
      term: 0,
      product: '',
      isSaveRepayment: false,
    },
  };
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private repaymentService: RepaymentService
  ) {}

  ngOnInit(): void {
    this.getRepaymentDetails();
  }

  getRepaymentDetails(): void {
    this.isLoading = true;

    this.repaymentService.getRepaymentDetail(this.id).subscribe(
      (repaymentDetail) => {
        if (repaymentDetail) {
          this.repaymentDetail = repaymentDetail;
          this.isLoading = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
