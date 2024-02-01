import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);
  constructor(private httpClient: HttpClient, private cookie: CookieService) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/auth/login`,
      loginRequest
    );
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  getUser(): User | undefined {
    return this.$user.getValue();
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }
  logout(): void {
    localStorage.clear();
    this.cookie.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  verifyLogin(): void {
    if (this.cookie.get('Authorization')) {
      let userEmail = localStorage.getItem('user-email');
      let userRoles = localStorage.getItem('user-roles')?.split(',');
      let user: User = {
        email: userEmail ? userEmail : '',
        roles: userRoles ? userRoles : [],
      };
      this.$user.next(user);
    }
  }
}
