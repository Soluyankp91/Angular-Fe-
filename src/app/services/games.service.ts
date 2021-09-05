import { Injectable } from '@angular/core';
import { DataStorage } from './data-storage';
import { HttpService } from './http.service';
import { catchError, map, retry, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Game } from './library.service';
import { state } from '@angular/animations';

interface filter {
  search: string;
  Indie: boolean;
  Adventure: boolean;
  Action: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class GamesService extends DataStorage {
  private readonly API_URL_1: string =
    'http://localhost:8080/api/me/games/available';
  private readonly API_URL_2: string =
    'http://localhost:8080/api/me/games/addToUser/';
  constructor(private readonly httpService: HttpService) {
    super();
  }
  public getData() {
    return this.getState$().pipe(
      map((data) => {
        if (!data) {
          return;
        }
        let { games, filteredItems } = data;
        return {
          games: Object.values(games),
          filteredItems: Object.values(filteredItems),
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
        let acc_1 = (games.games as Array<Game>).reduce(
          (acc: any, cur: any): {} => {
            return { ...acc, [cur._id]: { ...cur } };
          },
          {}
        );
        console.log({ games: { ...acc_1 } });
        this.setState$({ games: { ...acc_1 }, filteredItems: { ...acc_1 } });
      });
  }
  public changeFiltersState(filterObject: filter) {
    this.getState$()
      .pipe(
        take(1),
        map((value) => {
          return Object.values(value.games);
        })
      )
      .subscribe((data) => {
        let copy: Array<{}> = data.reduce((a, b) => {
          (a as Array<{}>).push({
            ...(b as object),
            genres: { ...(b as Game).genres },
          });
          return a;
        }, []) as Array<{}>;
        let res = copy.filter((element: any, index) => {
          if (
            element.name
              .toLowerCase()
              .includes(filterObject.search.toLowerCase() || '')
          ) {
            if (
              (!filterObject.Adventure ||
                filterObject.Adventure === element.genres.Adventure) &&
              (!filterObject.Indie ||
                filterObject.Indie === element.genres.Indie) &&
              (!filterObject.Action ||
                filterObject.Action === element.genres.Action)
            ) {
              return true;
            } else {
              return false;
            }
          }
          return false;
        });
        let finalState = res.reduce((acc: any, current: any): {} => {
          return { ...acc, [current._id]: { ...current } };
        }, {});
        this.setState$({ filteredItems: { ...finalState } });
      });
  }
  public addGameToLibrary(gameId: string) {
    this.httpService
      .post(this.API_URL_2 + `${gameId}`, {})
      .pipe(take(1))
      .subscribe(() => {
        this.getState$()
          .pipe(take(1))
          .subscribe((data) => {
            delete data.games[gameId];
            delete data.filteredItems[gameId];
            this.setState$({ ...data });
          });
      });
  }
}
