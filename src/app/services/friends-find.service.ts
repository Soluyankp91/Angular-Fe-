import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataStorage } from './data-storage';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsFindService extends DataStorage {
  private readonly API_URL_1 =
    'http://localhost:8080/api/user/me/availableFriends';
  private readonly API_URL_2 = 'http://localhost:8080/api/user/me/sendInvite';
  private readonly API_URL_3 = 'http://localhost:8080/api/user/me/cancelInvite';
  constructor(private readonly httpService: HttpService) {
    super();
  }
  public getData() {
    return this.getState$().pipe(
      map((data) => {
        if (!data) {
          return data;
        }
        let { searchedPeople } = data;
        return {
          searchedPeople: Object.values(searchedPeople),
        };
      })
    );
  }
  public fetchData() {
    this.httpService
      .get(this.API_URL_1)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((data: any) => {
        let result = Array.from(data).reduce((acc: any, cur: any) => {
          return {
            ...acc,
            [cur.value._id]: { ...cur.value, sended: cur.sended },
          };
        }, {});
        // console.log({ searchedPeople: result });
        this.setState$({ searchedPeople: result });
      });
  }
  public sendInvite(id: string) {
    this.httpService
      .post(this.API_URL_2, { friendId: id })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(() => {
        let state = this.state$.getValue();
        let Data: any = {};
        for (let i in state.searchedPeople) {
          Data[i] = { ...state.searchedPeople[i] };
        }
        let boolean = !Data[id].sended;
        Data[id].sended = boolean;
        this.setState$({ searchedPeople: Data });
      });
  }
  public cancelInvite(id: string) {
    // console.log(id);
    this.httpService
      .post(this.API_URL_3, { friendId: id })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(() => {
        let state = this.state$.getValue();
        let Data: any = {};
        for (let i in state.searchedPeople) {
          Data[i] = { ...state.searchedPeople[i] };
        }
        let boolean = !Data[id].sended;
        Data[id].sended = boolean;
        this.setState$({ searchedPeople: Data });
      });
  }
}
