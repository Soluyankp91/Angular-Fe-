import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from '../services/games.service';

@Injectable({
  providedIn: 'root'
})
export class GamesGuard implements CanActivate {
  constructor(private readonly gamesService:GamesService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try{
      this.gamesService.fetchGamesInfo();
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }
  
}
