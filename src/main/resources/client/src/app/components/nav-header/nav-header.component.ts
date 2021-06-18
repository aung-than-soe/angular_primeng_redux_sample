import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "src/app/store/app-meta.reducer";
import * as AuthActions from 'src/app/store/auth/auth.actions';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('on logout')
    this.store.dispatch(AuthActions.logout());
  }

}
