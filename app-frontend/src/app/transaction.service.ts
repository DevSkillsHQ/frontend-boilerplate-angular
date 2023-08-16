import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8000/api';


  constructor(private http: HttpClient) { }

   getTransactions(): Observable<any[]> {
    const url = `${this.baseUrl}/transactions`;
    return this.http.get<any[]>(url);
  }

  getAccountDetails(accountId: string): Observable<any> {
    const url = `${this.baseUrl}/accounts/${accountId}`;
    return this.http.get<any>(url);
  }

  createTransaction(transactionData: any): Observable<any> {
    const url = `${this.baseUrl}/transactions`;
    console.log('Creating transaction at:', url);
    console.log('Transaction data:', transactionData);
    return this.http.post<any>(url, transactionData);
  }
}
