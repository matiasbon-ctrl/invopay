import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevenuesResponse } from '../models/revenueResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RevenueDetail } from '../models/revenueDetail';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  private readonly apiUrl='https://api.130.211.34.27.nip.io/api/v1/invopay/revenue'
  constructor(private http: HttpClient) {}

   getRevenues(): Observable<RevenuesResponse> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer `,
        'Content-Type': 'application/json'
      });
      return this.http.get<RevenuesResponse>(`${this.apiUrl}`, {headers});
    }

    getRevenue(id: string): Observable<RevenueDetail> {

      return this.http.get<RevenueDetail>(`${this.apiUrl}/${id}`);
    }
  

}
