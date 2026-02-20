import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from 'src/app/models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  errorMessage: string =''

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(){
    this.errorMessage =''
    if(this.loginForm.valid){
      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      }
      console.log("loginRequest =>", loginRequest)
      localStorage.setItem("username", loginRequest.username)
      this.authService.login(loginRequest).subscribe({
        next: res => {       
        if(res.role == "ADMIN"){
          this.router.navigate(['/admin'])
        }
        else if(res.role == "PROJECT_MANAGER"){
          this.router.navigate(['/sprint-lists'])
        }
        else {
          this.router.navigate(['/login'])
        }
      },
      error: () => {
        this.errorMessage ='Invalid username / password'
      }
    })
    }else{
      this.errorMessage ='Invalid username / password'
    }
  }
}
