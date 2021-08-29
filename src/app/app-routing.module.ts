import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsFindGuard } from './guards/friends-find.guard';
import { FriendsGuard } from './guards/friends.guard';
import { ProfileGuard } from './guards/profile.guard';
import { FriendsFindComponent } from './pageComponents/friends-find/friends-find.component';
import { FriendsComponent } from './pageComponents/friends/friends.component';
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
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'library',
    redirectTo: 'login',
    pathMatch: 'full',
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
