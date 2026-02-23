import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(

  initialState,

  /* ======================
          LOGIN
  ====================== */

  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    auth: response,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  /* ======================
          REGISTER
  ====================== */

  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  /* ======================
        REFRESH TOKEN
  ====================== */

  on(AuthActions.refresh, state => ({
    ...state,
    loading: true
  })),

  on(AuthActions.refreshSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    auth: response
  })),

  on(AuthActions.refreshFailure, state => ({
    ...state,
    loading: false,
    auth: null
  })),

  /* ======================
            LOGOUT
  ====================== */

  on(AuthActions.logout, () => initialState)
);