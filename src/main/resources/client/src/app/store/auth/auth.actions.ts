import { createAction, props } from '@ngrx/store';


export const login = createAction('[Auth State] Login', props<{username: string, password: string}>());
export const loginSuccess = createAction('[Auth State] Login Success', props<{authenticated: boolean}>());
export const logout = createAction('[App State] Logout');
