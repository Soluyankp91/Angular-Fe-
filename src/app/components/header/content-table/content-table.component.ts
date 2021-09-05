import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.scss'],
})
export class ContentTableComponent implements OnInit {
  @Input() item$: Observable<Data | null> = new Observable();
  @Input() gamesModeOn: boolean = false;
  public userForm: FormGroup = new FormGroup({});
  constructor(private readonly gamesService: GamesService) {
    this.item$.subscribe((data) => {
      console.log(data);
    });
    this.userForm = new FormGroup({
      search: new FormControl(''),
      Indie: new FormControl(false),
      Adventure: new FormControl(false),
      Action: new FormControl(false),
    });
  }
  public onFiltersChange(event: Event) {
    event.preventDefault();
    this.gamesService.changeFiltersState(this.userForm.value);
  }
  public addGameToLibrary(el: HTMLElement, event: Event) {
    event.preventDefault();
    console.log(el.id);
    this.gamesService.addGameToLibrary(el.id);
  }
  ngOnInit(): void {}
}
