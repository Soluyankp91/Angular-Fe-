import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsServiceService } from '../services/friends-service.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsGuard implements CanActivate {
  constructor(private readonly friendsService: FriendsServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      this.friendsService.fetchFriendsInfo();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
