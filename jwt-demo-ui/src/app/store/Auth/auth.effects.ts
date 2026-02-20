import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  /* ======================
          LOGIN
  ====================== */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ request }) =>
        this.authService.login(request).pipe(
          map(response =>
            AuthActions.loginSuccess({ response })
          ),
          catchError(err =>
            of(AuthActions.loginFailure({ error: err.message }))
          )
        )
      )
    )
  );

  /* Navigate After Login */
  loginNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ response }) => {
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'PROJECT_MANAGER') {
            this.router.navigate(['/sprint-lists']);
          } else {
            this.router.navigate(['/login']);
          }
        })
      ),
    { dispatch: false }
  );

  /* ======================
          REGISTER
  ====================== */
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ request }) =>
        this.authService.register(request).pipe(
          map(response =>
            AuthActions.registerSuccess({ response })
          ),
          catchError(err =>
            of(AuthActions.registerFailure({ error: err.message }))
          )
        )
      )
    )
  );

  /* ======================
          REFRESH TOKEN
  ====================== */
  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      mergeMap(() =>
        this.authService.refreshToken().pipe(
          map(response =>
            AuthActions.refreshSuccess({ response })
          ),
          catchError(() =>
            of(AuthActions.refreshFailure())
          )
        )
      )
    )
  );

  /* ======================
          LOGOUT
  ====================== */
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}