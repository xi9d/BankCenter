import {Account} from "./account";
import {Token} from "./token";

export interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pin: string;
  customerId: string;

  account: Account;
  token: Token[];
}
