import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageNames } from '../../enums';
import { NotificationService } from '../common/notification.service';
import { PermissionService } from '../common/permission.service';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: WebHttpClient,
    private notifyService: NotificationService,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.GetUser(false));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  authenticate(postData: any) {
    return this.http.post('auth/login', postData);
  }

  public GetUser(emit = true): any {
    const currUser: any = sessionStorage.getItem(LocalStorageNames.CurrentUser);
    const sUser = JSON.parse(currUser);
    if (sUser != null && sUser.token) {
      if (emit) {
        this.currentUserSubject.next(sUser);
      }
      return sUser;
    }
    return null;
  }

  
  getUserPermissions() {
    const currUser: any = sessionStorage.getItem(LocalStorageNames.CurrentUser);
    const sUser = JSON.parse(currUser);
    if (sUser != null && sUser.token) {
      return sUser.permissions;
    }
    return [];
  }

  public setUser(v: any) {
    sessionStorage.setItem(LocalStorageNames.CurrentUser, JSON.stringify(v));
    this.currentUserSubject.next(v);
  }

  public refreshToken(token: string) {
    const user = this.GetUser();
    user.token = token;
    this.setUser(user);

  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage .removeItem(LocalStorageNames.CurrentUser);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'],{skipLocationChange: true});
  }



  unauthorizedAccess() {
    this.notifyService.showError('Invalid Session', 'Redirecting to login.');
    this.logout();
  }

  debuggeMode() {
    return this.http.get('trans/sysConfig/getSysConfig/DEBUG');
  }
  
}
