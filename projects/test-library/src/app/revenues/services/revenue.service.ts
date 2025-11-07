import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingRevenuesResponse, RevenuesResponse } from '../models/revenueResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RevenueDetail } from '../models/revenueDetail';
import { environment } from 'projects/test-library/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  private readonly apiUrl=  environment.api+'/invopay/revenue'
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

    getPendingRevenues(start:string,end:string): Observable<PendingRevenuesResponse> {
       return this.http.get<PendingRevenuesResponse>(`${this.apiUrl}/by-due-date?fromDueDate=${start}&toDueDate=${end}`, {
        });      
    }
    getExpiryRevenues(): Observable<PendingRevenuesResponse> {
        //TODO: url ventas vencidas
       return this.http.get<PendingRevenuesResponse>(`${this.apiUrl}/overdue`, {
      });
    }
  

}
