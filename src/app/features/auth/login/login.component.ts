import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  model: LoginRequest;
  loginSubscribtion?: Subscription;
  constructor(
    private authService: AuthService,
    private cookies: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }
  ngOnDestroy(): void {
    this.loginSubscribtion?.unsubscribe();
  }

  onFormSubmit(): void {
    this.loginSubscribtion = this.authService
      .login(this.model)
      .subscribe((response) => {
        this.cookies.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        this.authService.setUser({
          email: response.email,
          roles: response.roles,
        });
        this.router.navigateByUrl('/');
      });
  }
}
