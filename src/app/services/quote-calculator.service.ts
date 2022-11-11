import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoanDetail } from '../types/Loan';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteCalculatorService {
  //TODO: Put url in env variable
  private apiUrl = 'https://localhost:7098/api/loan';

  constructor(private httpClient: HttpClient) {}

  getQuoteCalculatorDetails(id: string): Observable<LoanDetail> {
    const response = this.httpClient.get<LoanDetail>(`${this.apiUrl}/${id}`);
    return response;
  }
}
