import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethodResponse } from '../models/paymenMethod';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly apiUrl='https://api.130.211.34.27.nip.io/api/v1/invopay/revenue/payment-entities'
  constructor(private http: HttpClient) {}

   getPaymentMethods(): Observable<PaymentMethodResponse> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer `,
        'Content-Type': 'application/json'
      });
      return this.http.get<PaymentMethodResponse>(`${this.apiUrl}`, {headers});
    }
  
}
