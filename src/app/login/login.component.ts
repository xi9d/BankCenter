import { Component } from '@angular/core';
// @ts-ignore
import { CustomerDetailsService } from '../services/customer-details.service';
import { Customer } from '../classes/customer-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private customerDetailsService: CustomerDetailsService) {}

  login(email: string, pin: string) {
    // Create a registration request with the provided username and password
    const request: Customer = {
      email: email,
      pin: pin
    };

    // Call the authenticateCustomer function from the service
    this.customerDetailsService.authenticateCustomer(request).subscribe(
      (response) => {
        // Handle successful login, e.g., store token in localStorage
        console.log('Authentication successful:', response);
        localStorage.setItem('token', response.token);
        // Redirect to main component or any other desired page
      },
      (error) => {
        // Handle login error
        console.error('Authentication Error:', error);
      }
    );
  }
}
