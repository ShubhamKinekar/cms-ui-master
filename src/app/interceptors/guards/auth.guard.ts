import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Condition, PermissionType } from 'src/app/shared/enums';
import { LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { PermissionService } from 'src/app/shared/services/common/permission.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private permissionService: PermissionService,
        private notifyService: NotificationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.loginService.GetUser();
        const isLoggedIn = currentUser && currentUser.token;
        if (isLoggedIn) {
            const permissions = route.data.permissions as Array<PermissionType>;
            let operator = route.data.condition as Condition;
            let isUserAllowedToAccess = true;
            if (permissions) {
                if (operator === Condition.And) {
                    isUserAllowedToAccess = this.permissionService.isPermissionExists(permissions);
                } else {
                    isUserAllowedToAccess = false;
                    for (const p of permissions) {
                        isUserAllowedToAccess = this.permissionService.isPermissionExists([p]);
                        if (isUserAllowedToAccess) {
                            break;
                        }
                    }
                }
            }
            if(!isUserAllowedToAccess){
                this.notifyService.showError(
                    'Unathorized',
                    'You dont have permissions redirecting to dashboard, please contact administrator for permissions'
                ); 
                this.router.navigate(['/login']);
            }
            return isUserAllowedToAccess;
        }
        else {
            this.notifyService.showError(
                'Unathorized',
                'Unauthorized user or session expired, redirecting to login page '
            );
            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 2000);
        }

        return false;
    }
}
