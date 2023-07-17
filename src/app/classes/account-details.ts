import { Customer } from './customer-details'; // Import the Customer class from the appropriate file
import { Transaction } from './transaction-details'; // Import the Transaction class from the appropriate file

export class AccountDetails {
  id: number;
  accountName: string;
  balance: number;
  accountRefID: string;
  customer: Customer;
  transactions: Transaction[];

  constructor(
    id: number,
    accountName: string,
    balance: number,
    accountRefID: string,
    customer: Customer,
    transactions: Transaction[]
  ) {
    this.id = id;
    this.accountName = accountName;
    this.balance = balance;
    this.accountRefID = accountRefID;
    this.customer = customer;
    this.transactions = transactions;
  }

  toString() {
    return `AccountDetails { id: ${this.id}, accountName: ${this.accountName}, balance: ${this.balance}, accountRefID: ${this.accountRefID}, customer: ${this.customer}, transactions: ${this.transactions} }`;
  }
}

export class Account {
}
