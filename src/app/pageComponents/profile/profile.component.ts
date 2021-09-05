import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [HeaderComponent],
})
export class ProfileComponent implements OnInit {
  public user$: Observable<User | null> = new Observable();
  public userForm: FormGroup = new FormGroup({});
  constructor(
    private readonly header: HeaderComponent,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
    this.userForm = new FormGroup({
      login: new FormControl(),
      email: new FormControl(),
      age: new FormControl(),
    });
  }
  public submit() {
    let newUser = this.userForm.value;
    try {
      this.userService.editUser(newUser);
    } catch (err: any) {
      alert(err.message);
    }
  }
  public show(el: HTMLElement): void {
    console.log(el.id);
  }
}
