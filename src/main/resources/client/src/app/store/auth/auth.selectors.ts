import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromAuth from './auth.reducer';
import {AppState} from "../app-meta.reducer";
import {AuthState} from "./auth.reducer";

const selectAuthState = createFeatureSelector<AppState, AuthState>(fromAuth.authFeatureKey);

export const isAuthenticated = createSelector(selectAuthState, ({isAuthenticated}) => isAuthenticated);
