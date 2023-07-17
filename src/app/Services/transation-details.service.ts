import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../classes/transaction-details'; // Import the Transaction class from the appropriate file

@Injectable({
  providedIn: 'root'
})
export class TransactionDetailsService {
  private baseUrl = "http://localhost:8080/api/v1/customer/account/transact";

  constructor(private http: HttpClient) { }

  depositAmount(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/deposit`, transaction).pipe(
      catchError((error: any) => {
        console.error('Deposit Amount Error:', error);
        throw error;
      })
    );
  }

  withdrawAmount(transaction: Transaction, accountId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/withdraw/${accountId}`, transaction).pipe(
      catchError((error: any) => {
        console.error('Withdraw Amount Error:', error);
        throw error;
      })
    );
  }

  getAllTransactions(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${accountId}`).pipe(
      catchError((error: any) => {
        console.error('Get All Transactions Error:', error);
        throw error;
      })
    );
  }
}
