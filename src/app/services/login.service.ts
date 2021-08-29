import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL = 'http://localhost:8080/api/login';
  constructor(private readonly httpService: HttpService) {}
  public getAndSaveAuthorizationToken$(email: string, password: string) {
    return this.httpService
      .post(this.API_URL, {
        email: email,
        password: password,
      })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
