import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public data$: Observable<Data | null> = new Observable();
  constructor(private readonly dataService: GamesService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getData() as Observable<Data | null>;
  }
}
