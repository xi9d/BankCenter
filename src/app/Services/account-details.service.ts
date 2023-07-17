import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../classes/account-details'; // Import the Account class from the appropriate file

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
  private baseUrl = "http://localhost:8080/api/v1/customer/account";

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/create`, account).pipe(
      catchError((error: any) => {
        console.error('Create Account Error:', error);
        throw error;
      })
    );
  }

  getAccountBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/balance`).pipe(
      catchError((error: any) => {
        console.error('Get Account Balance Error:', error);
        throw error;
      })
    );
  }

  removeAccount(accountId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${accountId}`).pipe(
      catchError((error: any) => {
        console.error('Remove Account Error:', error);
        throw error;
      })
    );
  }
}
