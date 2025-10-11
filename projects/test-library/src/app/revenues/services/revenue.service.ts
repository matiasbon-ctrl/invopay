import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevenuesResponse } from '../models/revenueResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  private readonly apiUrl='https://api.130.211.34.27.nip.io/api/v1/invopay/revenue'
  private readonly temporalToken ='eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.MdgJ2wUMKk0VVKpGM84eeU3rvo9ONEW44SbUE4Dk1ootnCNjB_8BObDExobBLspppLdZL9QBIYXOMv0iIFYxyjUdN3CGdynppMEKaiKxQgr6haaqa4-M2TBc8gCCFE0nTxXlA9w1WR4e3da31gUS9sQDA1EqfQ_94X7vqjprOqs2uyt7_sZHmoTImZ9036744M5QP543Rk2kfKdZN2do3jajPyGoLILmhk5R4lz5-LzbA7A5-cFA_xeYJWs88TIMQhdB69AoJ9ud6eL0elkPvk2dG5MGjjS0i4ZwbdlqoAa2N8qbVGIEEccSCiluwONbqxuURnXoM63GR3YR6S0Hfg.StRWIZXRXlmiRio_.iXYJgKQkBbSiiFI4Y2FT3oQMlwj53Jo363Uhuh-FTxJSLaOPeABtBYaAueTBt6QSL5u-nJF-ZXNSmICkAPkQwqUwkMEwl3qLmQ-nojKyaM7rCnP_ucL3gmhLs9I8mxS0Vrwu_PvWzTdJ4ycxZlofVsmZYsKapyK6DBQICEwboNAtgAYIJm__uXxsRk6HDoiyooamcganSl0w1eYlFcrHFRhnpVFyi0R8qr0qiv_s5ds1IHkT0_WTz6rl3_q6lxP-ZwpDhHKtWs55rSN8e6pW-2hbOYGH3ETF_Qk.HjSnFwO6kTfyF7MAGAEyzA'
  constructor(private http: HttpClient) {}

   getRevenues(): Observable<RevenuesResponse> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.temporalToken}`,
        'Content-Type': 'application/json'
      });
      return this.http.get<RevenuesResponse>(`${this.apiUrl}`, {headers});
    }
/*
    getRevenue(id: string): Observable<Reve> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.temporalToken}`,
        'Content-Type': 'application/json'
  
      });
  
      return this.http.get<saleDetail>(`${this.apiUrl}/sale/${id}`, { headers });
    }
  */

}
