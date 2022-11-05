export interface IOrder {
  to: string;
  date: string;
  amount: string;
  reason: string;
  approver: string;
  investorApprover: string;
  approved: number;
  approvedByInvestor: number;
  finished: boolean;
}
