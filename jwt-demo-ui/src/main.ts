import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app-routing.module";
import { provideHttpClient, withInterceptors } from "@angular/common/http"
import { authInterceptor } from "./app/intereptors/auth.interceptor";
import { AuthService } from "./app/services/auth.service";
import { APP_INITIALIZER, importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { authReducer } from "./app/store/Auth/auth.reducer";
import { AuthEffects } from './app/store/Auth/auth.effects';

function initializeAuth(auth: AuthService){
  return () => auth.initAuth()
}

bootstrapApplication(AppComponent, {providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
        provide: APP_INITIALIZER,
        useFactory: initializeAuth,
        deps: [AuthService],
        multi: true
    },
    importProvidersFrom(BrowserAnimationsModule, BrowserAnimationsModule),
    importProvidersFrom(MatPaginator),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects])

]})