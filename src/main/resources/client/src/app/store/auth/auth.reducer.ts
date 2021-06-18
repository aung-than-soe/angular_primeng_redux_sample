import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  username: string;
  password: string;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  username: null,
  password: null,
  isAuthenticated: false
};

const AUTH_REDUCER = createReducer(initialAuthState,
  on(AuthActions.login, (state, {username, password}) => ({...state, username, password })),
  on(AuthActions.loginSuccess, (state, {authenticated}) =>({...state, isAuthenticated: authenticated}))
);

export const authReducer = (state: AuthState | undefined, action: Action) => AUTH_REDUCER(state, action);
