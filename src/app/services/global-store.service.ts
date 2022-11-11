import { Injectable } from '@angular/core';
import { Repayment } from '../types/Repayment';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  repayment: Repayment;

  constructor() {}

  addRepayment(newRepayment: Repayment) {
    this.repayment = newRepayment;
  }

  getRepayment() {
    return this.repayment;
  }
}
