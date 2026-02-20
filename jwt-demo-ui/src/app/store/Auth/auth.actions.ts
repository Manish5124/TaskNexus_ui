import { createAction, props } from '@ngrx/store';
import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  RegisterResponse
} from 'src/app/models/auth';

/* =======================
        LOGIN
======================= */

export const login = createAction(
  '[Auth] Login',
  props<{ request: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);


/* =======================
        REGISTER
======================= */

export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: RegisterResponse }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);


/* =======================
        REFRESH TOKEN
======================= */

export const refresh = createAction('[Auth] Refresh');

export const refreshSuccess = createAction(
  '[Auth] Refresh Success',
  props<{ response: AuthResponse }>()
);

export const refreshFailure = createAction(
  '[Auth] Refresh Failure'
);


/* =======================
        LOGOUT
======================= */

export const logout = createAction('[Auth] Logout');