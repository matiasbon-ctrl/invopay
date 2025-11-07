import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/test-library/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssuranceNotificationService {
  private readonly apiUrl=  environment.api+'/invopay/revenue'
  constructor(private http: HttpClient) {}

   getNotifications(): Observable<any> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer `,
        'Content-Type': 'application/json'
      });
      return this.http.get<any>(`${this.apiUrl}`, {headers});
    }
}
