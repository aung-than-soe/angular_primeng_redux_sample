import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-meta.reducer';
import * as AuthActions from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["admin", Validators.required],
      password: ["admin", Validators.required]
    });
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.store.dispatch(AuthActions.login({username: this.username.value, password: this.password.value}));
      this.submitted = false;
      this.loginForm.reset();
    }
  }
}
