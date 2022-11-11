import { LoanDetail } from './Loan';

export interface Repayment {
  amount: number;
  establishmentFee: number;
  interest: number;
  totalRepayment: number;
  loan: LoanDetail;
}
