import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Account } from '../Model/account';
import { Transaction} from "../Model/transaction";
import {Customer} from "../Model/customer";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiUrl = 'http://localhost:8080/api/v1/customer';

  constructor(private http: HttpClient) {}

  createAccount(customerId: number, account: Account): Observable<Account> {
    const createAccountUrl = `${this.apiUrl}/${customerId}/account/create`;
    return this.http.post<Account>(createAccountUrl, account).pipe(
      catchError(this.handleError)
    );
  }
  getCustomerDetails(customerId: number): Observable<Customer> {
    const customerDetailsUrl = `${this.apiUrl}/${customerId}`;
    return this.http.get<Customer>(customerDetailsUrl).pipe(
      catchError(this.handleError)
    );
  }

  deposit(customerId: number, accountId: number, amount: number): Observable<Account> {
    const depositUrl = `${this.apiUrl}/${customerId}/account/${accountId}/deposit`;
    const transaction: Transaction = <Transaction>{ amount: amount };
    return this.http.post<Account>(depositUrl, transaction).pipe(
      catchError(this.handleError)
    );
  }

  withdraw(customerId: number, accountId: number, amount: number): Observable<Account> {
    const withdrawUrl = `${this.apiUrl}/${customerId}/account/${accountId}/withdraw`;
    const transaction: Transaction = <Transaction>{ amount: amount };
    return this.http.post<Account>(withdrawUrl, transaction).pipe(
      catchError(this.handleError)
    );
  }

  getTransactions(customerId: number, accountId: number): Observable<Transaction[]> {
    const transactionsUrl = `${this.apiUrl}/${customerId}/account/${accountId}/transactions`;
    return this.http.get<Transaction[]>(transactionsUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Helper function to handle errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error occurred
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
