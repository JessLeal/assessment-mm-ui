import { LoanDetail } from '../types/Loan';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repayment } from '../types/Repayment';

@Injectable({
  providedIn: 'root',
})
export class RepaymentService {
  private apiUrl = 'https://localhost:7098/api/repayments';

  constructor(private httpClient: HttpClient) {}

  createRepayment(
    loanDetail: LoanDetail,
    accountId: string
  ): Observable<Repayment> {
    loanDetail.isSaveRepayment = true;

    const response = this.httpClient.post<Repayment>(
      `${this.apiUrl}/${accountId}`,
      loanDetail
    );
    return response;
  }

  updateRepaymentCalculation(
    loanDetail: LoanDetail,
    accountId: string
  ): Observable<Repayment> {
    loanDetail.isSaveRepayment = false;

    const response = this.httpClient.post<Repayment>(
      `${this.apiUrl}/${accountId}`,
      loanDetail
    );
    return response;
  }

  getRepaymentDetail(accountId: string): Observable<Repayment> {
    const response = this.httpClient.get<Repayment>(
      `${this.apiUrl}/${accountId}`
    );
    return response;
  }
}
