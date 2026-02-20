import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from 'src/app/models/auth';
import { Store } from '@ngrx/store';
import { selectAuthState, selectLoading } from 'src/app/store/Auth/auth.selectors';
import { login } from 'src/app/store/Auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  errorMessage: string =''
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store,private authService: AuthService, private router: Router) {}

ngOnInit(): void {

    /* Listen to Auth State */
    this.store.select(selectAuthState).subscribe(state => {

      if (state.auth?.role) {

        localStorage.setItem(
          'username',
          this.loginForm.value.username!
        );

        if (state.auth.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
        else if (state.auth.role === 'PROJECT_MANAGER') {
          this.router.navigate(['/sprint-lists']);
        }
      }

      if (state.error) {
        this.errorMessage = 'Invalid username / password';
      }
    });
  }

  handleSubmit() {
    this.errorMessage = '';

    if (this.loginForm.valid) {

      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      };

      /* Dispatch action instead of calling service */
      this.store.dispatch(
        login({ request: loginRequest })
      );

    } else {
      this.errorMessage = 'Invalid username / password';
    }
  }

  // handleSubmit(){
  //   this.errorMessage =''
  //   if(this.loginForm.valid){
  //     const loginRequest: LoginRequest = {
  //       username: this.loginForm.value.username!,
  //       password: this.loginForm.value.password!
  //     }
     
  //     this.authService.login(loginRequest).subscribe({
  //       next: res => {    
  //       localStorage.setItem("username", loginRequest.username)   
  //       if(res.role == "ADMIN"){
  //         this.router.navigate(['/admin'])
  //       }
  //       else if(res.role == "PROJECT_MANAGER"){
  //         this.router.navigate(['/sprint-lists'])
  //       }
  //       else {
  //         this.router.navigate(['/login'])
  //       }
  //     },
  //     error: () => {
  //       this.errorMessage ='Invalid username / password'
  //     }
  //   })
  //   }else{
  //     this.errorMessage ='Invalid username / password'
  //   }
  // }
}
