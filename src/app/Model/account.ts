import { Customer } from './customer';
import { Transaction } from './transaction';

export interface Account {
  id: number;
  accountName: string;
  balance: number;
  customer: Customer;
  transactions: Transaction[];
}

