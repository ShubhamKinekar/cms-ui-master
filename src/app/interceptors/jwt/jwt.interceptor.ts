import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  allowAnonymous: string[] = ['/auth/login', '/forgot-password' ,'/user/gettokenforresetpassword','/user/resetPassword','/user/passwordAssistance'];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private notifyService: NotificationService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    console.log(request.url);
    if (!this.allowAnonymous.find(f => request.url.toLowerCase().indexOf(f.toLowerCase())>-1)) {
      const currentUser = this.loginService.GetUser();
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        return this.handleRequest(next, request);
      } else {
        this.unAuthorizedAccess();
        throw new Error('Unauthorized');
      }
    } else {
      return this.handleRequest(next, request);
    }
  }
  handleRequest(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          const token = evt.headers.get('access_token');
          if (token) {
            this.loginService.refreshToken(token);
          }
        }
      }),
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.unAuthorizedAccess();
        }
        //const error = err.error.message || err.statusText;
        return throwError(err);
      }));
  }
  unAuthorizedAccess() {
    this.loginService.unauthorizedAccess();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
    this.throwError();

  }
  throwError() {
    this.notifyService.showError(
      'Unathorized',
      'Unauthorized user or session expired, redirecting to login page '
    );
  }
}
