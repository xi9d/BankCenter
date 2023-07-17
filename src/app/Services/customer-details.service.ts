import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Customer, CustomerDetails} from '../classes/customer-details';
import {AccountDetails} from "../classes/account-details"; // Import the RegistrationRequest class from the appropriate file

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  // Base URL
  private Registration_baseUrl = "http://localhost:8080/api/v1/auth";
  private Customer_baseUrl = "http://localhost:8080/api/v1/customer";

  constructor(private http: HttpClient) { }

  registerCustomer(request: AccountDetails): Observable<any> {
    let url = this.Registration_baseUrl + "/register";
    return this.http.post(url, request).pipe(
      catchError((error: any) => {
        console.error('Registration Error:', error);
        throw error;
      })
    );
  }

  authenticateCustomer(request: Customer): Observable<any> {
    let url = this.Registration_baseUrl + "/authenticate";
    return this.http.post(url, request).pipe(
      catchError((error: any) => {
        console.error('Authentication Error:', error);
        throw error;
      })
    );
  }

  getCustomerDetail(): Observable<Customer> {
    let url = this.Customer_baseUrl;
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    let options = {
      headers: headers
    };

    return this.http.get<Customer>(url, options).pipe(
      catchError((error: any) => {
        console.error('Get Customer Details Error:', error);
        throw error;
      })
    );
  }
  isLoggedIn(): boolean {
    // Check if the 'token' key is present in localStorage
    return !!localStorage.getItem('token');
  }
}


