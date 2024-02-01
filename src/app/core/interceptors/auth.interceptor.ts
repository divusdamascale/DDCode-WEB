import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export function shouldIntercept(req: HttpRequest<any>): boolean {
  return req.urlWithParams.indexOf('addAuth=true', 0) > -1 ? true : false;
}

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  if (shouldIntercept(req) === true) {
    const cookieService = inject(CookieService);
    const token = cookieService.get('Authorization');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }
  }
  return next(req);
};
