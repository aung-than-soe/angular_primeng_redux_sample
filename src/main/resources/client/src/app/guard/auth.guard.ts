import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app-meta.reducer";
import {isAuthenticated} from "../store/auth/auth.selectors";
import {take, tap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isAuthenticated).pipe(take(1), tap(isAuthenticated => {
      if(!isAuthenticated) {
        this.router.navigateByUrl("/");
      }
    }))
  }

}
