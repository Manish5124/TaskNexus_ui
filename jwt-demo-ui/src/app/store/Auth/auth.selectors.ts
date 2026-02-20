import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

/* ======================
      FEATURE SELECTOR
====================== */

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');


/* ======================
        AUTH OBJECT
====================== */

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth
);


/* ======================
        ACCESS TOKEN
====================== */

export const selectToken = createSelector(
  selectAuth,
  auth => auth?.accessToken ?? null
);


/* ======================
          ROLE
====================== */

export const selectRole = createSelector(
  selectAuth,
  auth => auth?.role ?? null
);





export const selectIsLoggedIn = createSelector(
  selectToken,
  token => !!token
);


/* ======================
        LOADING
====================== */

export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);


/* ======================
          ERROR
====================== */

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);