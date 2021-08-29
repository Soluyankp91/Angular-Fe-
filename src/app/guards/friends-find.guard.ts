import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsFindService } from '../services/friends-find.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsFindGuard implements CanActivate {
  constructor(private readonly friendsFindService: FriendsFindService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    try {
      this.friendsFindService.fetchData();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
