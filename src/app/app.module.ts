import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pageComponents/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProfileComponent } from './pageComponents/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FriendsComponent } from './pageComponents/friends/friends.component';
import { FriendsFindComponent } from './pageComponents/friends-find/friends-find.component';
import { LibraryComponent } from './pageComponents/library/library.component';
import { ContentTableComponent } from './components/header/content-table/content-table.component';
import { GamesComponent } from './pageComponents/games/games.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ProfileComponent, HeaderComponent, FriendsComponent, FriendsFindComponent, LibraryComponent, ContentTableComponent, GamesComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
