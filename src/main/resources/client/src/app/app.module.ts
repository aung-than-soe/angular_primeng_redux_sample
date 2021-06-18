import { AuthEffect } from './store/auth/auth.effects';
import { PrimeNGModule } from './primeng.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS, metaReducers } from './store/app-meta.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments';
import { LoginComponent, EmployeeListComponent } from '@pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EmployeeService, AuthService } from '@services';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import {RequestInterceptor} from "./services/request.interceptor";
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import {EmployeeEffect} from "./store/employee/employee.effect";
import {AuthGuard} from "./guard/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    NavHeaderComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimeNGModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers
    }),
    EffectsModule.forRoot([AuthEffect, EmployeeEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: environment.production
    })
  ],
  providers: [
    AuthService,
    EmployeeService,
    AuthGuard,
    {
    provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
