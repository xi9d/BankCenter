import { Customer } from './customer'; // Assuming you have created the Customer interface

export interface Token {
  id: number;
  token: string;
  customer: Customer;
}
