import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private url: string;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.url = this.config.getApiUrl();
  }
  getByDays(data: any): Observable<any> {
    return this.http.get<any[]>(`${this.url}api/Report/by-days`, {
      params: data,
    });
  }
  getsaleUnSaleBlank(data: any): Observable<any> {
    return this.http.get<any[]>(`${this.url}api/Report/UnSaled-Blanke`, {
      params: data,
    });
  }
}
