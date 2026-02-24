import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string = '';
  dropdownOpen = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    // Subscribe to user$ BehaviorSubject in AuthService
    this.auth.user$.subscribe(user => {
      // Replace 'username' with whatever property your AuthResponse contains
      this.username = (user as any)?.username ?? '';
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    // Call your backend logout via AuthService
    this.auth.logout().subscribe({
      next: () => {
        this.dropdownOpen = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        // Still navigate to login even if backend fails
        this.dropdownOpen = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
