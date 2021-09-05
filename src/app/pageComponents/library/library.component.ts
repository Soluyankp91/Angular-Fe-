import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  public data$: Observable<Data | null> = new Observable();
  constructor(private readonly dataService: LibraryService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getData();
  }
}
