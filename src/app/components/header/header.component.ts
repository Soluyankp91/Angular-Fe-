import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly storeService: StoreService,
    private readonly route: Router
  ) {}

  ngOnInit(): void {}
  public Logout(): void {
    this.storeService.removeI('jwt');
    this.route.navigateByUrl('/login');
  }
}
