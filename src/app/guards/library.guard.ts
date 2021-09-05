import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LibraryService } from '../services/library.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryGuard implements CanActivate {
  constructor(private readonly dataService:LibraryService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try{
      this.dataService.fetchGamesInfo();
      return true;
    }
    catch(err){
      console.log(err.message);
      return false;
    }
  }
  
}
