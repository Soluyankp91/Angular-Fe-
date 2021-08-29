import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public classForm: FormGroup = new FormGroup({});
  public token: Observable<string> = new Observable();
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly store: StoreService
  ) {}
  private initForm() {
    this.classForm = new FormGroup({
      email: new FormControl('test@gmail.com', [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  public submit() {
    let { email, password } = this.classForm.value;
    this.loginService.getAndSaveAuthorizationToken$(email, password).subscribe(
      (token) => {
        console.log(token);
        this.store.setI('jwt', token);
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        alert('Wrong username or password');
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('jwt'));
    this.initForm();
  }
}
