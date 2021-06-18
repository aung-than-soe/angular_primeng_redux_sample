import { INIT } from '@ngrx/store';
import { environment } from '@environments';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAuth from '../store/auth/auth.reducer';
import * as AuthActions from './auth/auth.actions';
import * as fromEmployee from './employee/employee.reducer';
import {localStorageSync} from "ngrx-store-localstorage";

export interface AppState {
  auth: fromAuth.AuthState;
  employee: fromEmployee.EmployeeState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  employee: fromEmployee.employeeReducer
};

export function logout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    if ( action != null && action.type === AuthActions.logout.type) {
      window.sessionStorage.clear();
      return reducer( undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}

function synchronizer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({
    keys: [
      { auth: ['isAuthenticated']},
    ],
    rehydrate: true,
    removeOnUndefined: true,
    storage: window.sessionStorage
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [logout, synchronizer] : [logout, synchronizer];
