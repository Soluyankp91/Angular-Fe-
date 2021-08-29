import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}
  public get<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(url, { params });
  }
  public post<T>(url: string, body: any, params?: any): Observable<T> {
    return this.httpClient.post<T>(url, body, { params });
  }
  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
