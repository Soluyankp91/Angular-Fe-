import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsFindGuard } from './guards/friends-find.guard';
import { FriendsGuard } from './guards/friends.guard';
import { GamesGuard } from './guards/games.guard';
import { LibraryGuard } from './guards/library.guard';
import { ProfileGuard } from './guards/profile.guard';
import { FriendsFindComponent } from './pageComponents/friends-find/friends-find.component';
import { FriendsComponent } from './pageComponents/friends/friends.component';
import { GamesComponent } from './pageComponents/games/games.component';
import { LibraryComponent } from './pageComponents/library/library.component';
import { LoginComponent } from './pageComponents/login/login.component';
import { ProfileComponent } from './pageComponents/profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [ProfileGuard],
  },
  {
    path: 'games',
    component: GamesComponent,
    pathMatch: 'full',
    canActivate: [GamesGuard],
  },
  {
    path: 'library',
    component:LibraryComponent,
    pathMatch: 'full',
    canActivate:[LibraryGuard]
  },
  {
    path: 'friends',
    pathMatch: 'full',
    component: FriendsComponent,
    canActivate: [FriendsGuard],
  },
  {
    path: 'friends/find',
    pathMatch: 'full',
    component: FriendsFindComponent,
    canActivate: [FriendsFindGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
