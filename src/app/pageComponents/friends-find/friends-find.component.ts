import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsFindService } from 'src/app/services/friends-find.service';
@Component({
  selector: 'app-friends-find',
  templateUrl: './friends-find.component.html',
  styleUrls: ['./friends-find.component.scss'],
})
export class FriendsFindComponent implements OnInit {
  public data$: Observable<Data | null> = new Observable();
  constructor(private readonly friendsFindService: FriendsFindService) {}

  ngOnInit(): void {
    this.data$ = this.friendsFindService.getData();
  }
  public sendInvite(el: HTMLElement) {
    this.friendsFindService.sendInvite(el.id);
  }
  public cancelInvite(el: HTMLElement) {
    this.friendsFindService.cancelInvite(el.id);
  }
}
