import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private route: Router) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
  }
}
