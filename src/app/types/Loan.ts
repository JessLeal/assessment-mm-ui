export interface LoanDetail {
  accountId: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: string;
  amount: number;
  term: number;
  product: string;
  isSaveRepayment: boolean;
}

export interface LoanFinanceDetail {
  amount: number;
  term: number;
  product: string;
}
