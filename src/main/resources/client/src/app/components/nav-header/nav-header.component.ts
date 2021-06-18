import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/app-meta.reducer";
import * as AuthActions from 'src/app/store/auth/auth.actions';
import {environment} from "@environments";
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  logoUrl = `${environment.production ? '': 'assets'}/images/primeng-logo-dark.svg`;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
