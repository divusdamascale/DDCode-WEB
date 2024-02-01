import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { User } from 'src/app/features/auth/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user?: User;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.verifyLogin();
    this.authService.user().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
