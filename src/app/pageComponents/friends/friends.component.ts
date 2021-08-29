import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FriendsServiceService } from 'src/app/services/friends-service.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public data$: Observable<Data | null> = new Observable();
  constructor(private readonly dataService: FriendsServiceService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getData();
  }
  public show(el: HTMLElement) {
    // console.log(el.id);
  }
  public removeFriend(el: HTMLElement) {
    this.dataService.removeFriend(el.id);
  }
  public acceptFriend(el: HTMLElement) {
    this.dataService.acceptFriend(el.id);
  }
}
