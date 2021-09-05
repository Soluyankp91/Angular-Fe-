import { Injectable } from '@angular/core';
import { DataStorage } from './data-storage';
import { HttpService } from './http.service';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.service';
export interface Data {
  friends: User[];
  incomingRequests: User[];
}
@Injectable({
  providedIn: 'root',
})
export class FriendsServiceService extends DataStorage {
  private readonly API_URL_1 = 'http://localhost:8080/api/user/me/friends';
  private readonly API_URL_2 =
    'http://localhost:8080/api/user/me/incomingRequests';
  private readonly API_URL_3 = 'http://localhost:8080/api/user/me/removeFriend';
  private readonly API_URL_4 = 'http://localhost:8080/api/user/me/acceptInvite';
  constructor(private readonly httpService: HttpService) {
    super();
  }
  public getData() {
    return this.getState$().pipe(
      map((data) => {
        if (!data) {
          return data; //filter
        }
        let { friends, incomingRequests } = data;
        return {
          friends: Object.values(friends),
          incomingRequests: Object.values(incomingRequests),
        };
      })
    );
  }
  public fetchFriendsInfo() {
    this.httpService
      .get(this.API_URL_1)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((friends) => {
        // this.setState$( Object(data).user);
        this.httpService
          .get(this.API_URL_2)
          .pipe(
            catchError((err) => {
              return throwError(err);
            })
          )
          .subscribe((incomingRequests) => {
            let acc_1 = (friends as Array<User>).reduce(
              (acc: any, cur: any): {} => {
                return { ...acc, [cur._id]: cur };
              },
              {}
            );
            let acc_2 = (incomingRequests as Array<User>).reduce(
              (acc: any, cur: any): {} => {
                return { ...acc, [cur._id]: cur };
              },
              {}
            );
            this.setState$({
              friends: { ...acc_1 },
              incomingRequests: { ...acc_2 },
            });
          });
      });
  }
  public removeFriend(id: string) {
    this.httpService
      .delete(this.API_URL_3 + `/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return throwError(err);
        })
      )
      .subscribe(() => {
        let state = this.state$.getValue();
        let Data = {
          friends: { ...state.friends },
          incomingRequests: { ...state.incomingRequests },
        };
        delete Data.friends[id];
        this.setState$({
          friends: Data.friends,
          incomingRequests: Data.incomingRequests,
        });
      });
  }
  public acceptFriend(id: string) {
    this.httpService
      .post(this.API_URL_4, { friendId: id })
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return throwError(err);
        })
      )
      .subscribe(() => {
        let state = this.state$.getValue();
        console.log(state);
        let Data = {
          friends: {
            ...state.friends,
          },
          incomingRequests: { ...state.incomingRequests },
        };
        Data.friends[id] = { ...Data.incomingRequests[id] };
        delete Data.incomingRequests[id];
        console.log(Data);
        this.setState$({
          friends: Data.friends,
          incomingRequests: Data.incomingRequests,
        });
      });
  }
}
