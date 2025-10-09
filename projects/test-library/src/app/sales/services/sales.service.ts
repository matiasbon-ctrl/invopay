import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesResponse } from '../models/salesResponse';
import { Sale } from '../models/sale';
import { saleDetail } from '../models/saleDetail';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
 private apiUrl = 'https://api.130.211.34.27.nip.io/api/v1/invopay';

  constructor(private http: HttpClient) {}

  private temporalToken = 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0.cGm_4msmX0Xnx-6KNeMlJRAjT8lrfMmDDwRObOp-blzWfQiQUn6r0c7rip9Pp4WG3ulEvmpBRLFv55dXFrKAMDToNviTMg0SvPbaLrxN6QtPtASK8m88f4NsV2sVnnbq5dIbJS3EqfpDDls4htOwoP6wTEdj19lIxgodcT8TEV8FzimqO-ZLvFEWnI56WBJ3Q9b0Rpo_eYxkifXEQSDF7ZqCyJH2YoChEpArq8z2GxE2sDUJrOqZoraQ74b-EG717Ynq6HBKsOFPiuQU4l3idHGdBKm4mlA2OsKwkGZQ_EMD4z3XJjlWksnejxXkqftweHi98PnTwP6-wozHovHMhQ.g5ybo_mm2D5Pl7rW.Q0DAw_lFoD75mD_V1bQiB8InLVQRdT-tMJyfXfDp9NLSR5PYA3x1Crg5T8KUbJp7jUvsoUnqyhzgqfSVR8awOKkAg2xLItZxNMGBfopkZX1pwIkGCNaiF-XbHB3_JEpB7Jl-md0mVqQc0s4gInkq7ZWqSL6xWqoqaHifDuY4-N2NzczD_XD6eNkAUzuKPOM9FzFEmRnax9KVjAwobULVYkVE7to8IFGFg4etJMpDa8OSMzFtRK3-Igv0r_3xJXjGlkKJBPX6xLxVKncvoYjwB7VYQYeCQOxZi5I.p9-tY4oYnxgPlY2_-LheSQ'

  getSales(): Observable<SalesResponse> {
    return this.http.get<SalesResponse>(`${this.apiUrl}/sale`, {
    });
  }
  getSale(id: string): Observable<saleDetail> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.temporalToken}`,
      'Content-Type': 'application/json'

    });

    return this.http.get<saleDetail>(`${this.apiUrl}/sale/${id}`, { headers });
  }
}