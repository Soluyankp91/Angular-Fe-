import { Injectable } from '@angular/core';
import { catchError, map, retry, take } from 'rxjs/operators';
import { DataStorage } from './data-storage';
import { HttpService } from './http.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Data } from '@angular/router';

export interface Game {
  id?: number;
  name: string;
  description: string;
  price: number;
  genres: Array<string>;
}
@Injectable({
  providedIn: 'root',
})
export class LibraryService extends DataStorage {
  private readonly API_URL_1: string =
    'http://localhost:8080/api/me/games/current';
  constructor(private readonly httpService: HttpService) {
    super();
  }
  public getData() {
    return this.getState$().pipe(
      map((data) => {
        if (!data) {
          return data;
        }
        let { games } = data;
        return {
          games: Object.values(games),
        };
      })
    );
  }
  public fetchGamesInfo() {
    this.httpService
      .get(this.API_URL_1)
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((data) => {
        let games = Object.assign(data as object);
        console.log(games.games);
        let acc_1 = (games.games as Array<Game>).reduce(
          (acc: any, cur: any): {} => {
            return { ...acc, [cur._id]: cur };
          },
          {}
        );
        console.log({ games: { ...acc_1 } });
        this.setState$({ games: { ...acc_1 } });
      });
  }
}
