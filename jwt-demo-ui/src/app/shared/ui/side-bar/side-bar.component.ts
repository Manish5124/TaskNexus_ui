import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/Auth/auth.actions';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

 constructor(
    private store: Store,
    private router: Router
  ) {}

  logout() {

      localStorage.removeItem("username")
    /* Dispatch logout action */
    this.store.dispatch(logout());

    /* Navigate to login */
    this.router.navigate(['/login']);
  }
  

}
