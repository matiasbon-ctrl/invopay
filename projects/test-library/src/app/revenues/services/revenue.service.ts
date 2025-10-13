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
  private readonly temporalToken ='eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.MjAr9xEHyZcV02NVAysfujHVHsZ-PJFim6QBFNoUVok_7SRN7DySm4db0--Fhcn22mmQm2fkW8e00xprILcRcDvkgVg-2oytPvvdK_sq6zbZ1rK0SI4Y25oLiqxWLZI_RawK44-Xbau5ZULZlrJ6dV1ToKwW8kq49x0Q1J51u3b4niuuKbooHq3o04C6rTqNwNA31RIjTGogh3BZR3KlmyhhwR_raBMP1YV2LkM-rBUHxDnrq9Ex2umuVJzrki9xEuuAsj9ISqgsWXjnHsuUIDh9xZ6kRgRrJLpiCGJmljWWQmSFD6CvLLiAmVK3YzgOdZut_MW6H787fpN5BobanA.hxflUz16oaS587IZ.iCiW5N5C3egj2DFvPJBEm0QnMF1uum3Z2Slu7RegWdmrri0ubel5m4Jfm5kkXtO4W-4-AUeY-8Iid0tdTveNaNMsSCepFZD67WU8YPPbaXIw55KqAqw1YPKoefNhfeOqHtktVQsKISrvd6DIi5b-uV8Y0ZDHteKTMiYK9xaS_1LXN9Uy9B0FwUiI9c6k4NC9-iu41rR53V0Zd8iGHo-ZWNWtg697-5BN-mJWluXL4u-Dk0bhnp2XXUfnWpC1AUsMnACTaYi2MZwVZbwMRSjh0A.Pa1y6GGFXarux4yrRhaU2A'
  constructor(private http: HttpClient) {}

   getRevenues(): Observable<RevenuesResponse> {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.temporalToken}`,
        'Content-Type': 'application/json'
      });
      return this.http.get<RevenuesResponse>(`${this.apiUrl}`, {headers});
    }

    getRevenue(id: string): Observable<RevenueDetail> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.temporalToken}`,
        'Content-Type': 'application/json'
  
      });

      return this.http.get<RevenueDetail>(`${this.apiUrl}/${id}`, { headers });
    }
  

}
