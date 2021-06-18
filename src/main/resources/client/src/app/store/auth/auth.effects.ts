import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app-meta.reducer';
import * as AuthActions from './auth.actions';
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {AuthService} from "@services";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import * as EmployeeActions from '../employee/employee.actions';

@Injectable()
export class AuthEffect {

  constructor(private actions: Actions, private store: Store<AppState>, private authService: AuthService, private router: Router) {

  }

  onLogin = createEffect(() => this.actions.pipe(
    ofType(AuthActions.login.type),
    mergeMap(({username, password}) => this.authService.login(username, password).pipe(
      map((res: any) => {
        console.log(res)
        if(res.status === 200) {
          return AuthActions.loginSuccess({authenticated: true})
        }
        throw new Error("Unauthorized!")
      }),
      catchError((err) => {
        console.error(err)
        return throwError(err);
      })
    ))
  ), { useEffectsErrorHandler: false});

  onLoginSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AuthActions.loginSuccess.type),
    tap(({authenticated}) => {
      if(authenticated) {
        this.router.navigateByUrl('/employee')
      }
    }),
    map(_ => EmployeeActions.loadAlEmployee())
  ), { useEffectsErrorHandler: false })

  onLogout =  createEffect(() => this.actions.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.router.navigateByUrl("/");
    })
  ), { dispatch: false, useEffectsErrorHandler: false });

}
