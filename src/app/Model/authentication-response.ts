import { Customer} from "./customer";// Assuming you have created the Customer interface

export interface AuthenticationResponse {
  customer: Customer;
  token: string;
}
