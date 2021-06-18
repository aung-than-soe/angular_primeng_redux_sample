import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import { AppState } from '../app-meta.reducer';
import * as AuthActions from './auth.actions';
import {catchError, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {AuthService} from "@services";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import * as EmployeeActions from '../employee/employee.actions';
import {HttpResponse} from "@angular/common/http";
import {isAuthenticated} from "./auth.selectors";

@Injectable()
export class AuthEffect {

  constructor(private actions: Actions, private store: Store<AppState>, private authService: AuthService, private router: Router) {

  }

  onLogin = createEffect(() => this.actions.pipe(
    ofType(AuthActions.login.type),
    mergeMap(({username, password}) => this.authService.login(username, password).pipe(
      map((res: HttpResponse<any>) => {
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

  onLogout$ =  createEffect(() => this.actions.pipe(
    ofType(AuthActions.logout),
    mergeMap(_ => this.authService.logout().pipe(
      map((res: HttpResponse<any>) => {
        if(res.status === 200) {
          this.router.navigateByUrl("/");
        }
      })
    ))
  ), { dispatch: false, useEffectsErrorHandler: false });

  onInit$ = createEffect(() => this.actions.pipe(
    ofType(ROOT_EFFECTS_INIT),
    withLatestFrom(this.store.select(isAuthenticated)),
    map(isAuthenticated => isAuthenticated ? EmployeeActions.loadAlEmployee() : AuthActions.logout())
    ), {useEffectsErrorHandler: false})

}
