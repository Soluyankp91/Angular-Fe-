import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataStorage } from './data-storage';
import { HttpService } from './http.service';

export interface User {
  id?: number;
  login: string;
  email: string;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataStorage {
  private readonly API_URL = 'http://localhost:8080/api/user/me';
  constructor(private readonly httpService: HttpService) {
    super();
  }
  public fetchUserInfo() {
    this.httpService
      .get(this.API_URL)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((data) => {
        this.setState$(Object(data).user);
      });
  }
  public getUser() {
    return this.getState$(); //привязка ссылки
  }
  public editUser(editedUser: User) {
    this.httpService
      .post(this.API_URL + '/ProfileChange', editedUser)
      .subscribe((newUser) => {
        this.setState$(newUser);
      });
  }
}
