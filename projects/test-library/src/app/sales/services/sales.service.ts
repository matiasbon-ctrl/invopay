import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesResponse } from '../models/salesResponse';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
 private apiUrl = 'https://api.130.211.34.27.nip.io/api/v1/invopay';

  constructor(private http: HttpClient) {}

  getSales(): Observable<SalesResponse> {
    return this.http.get<SalesResponse>(`${this.apiUrl}/sale`, {
    });
  }
}
