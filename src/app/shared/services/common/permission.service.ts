import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { LoginService } from '..';
import { PermissionType } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private loginService: LoginService,) { }

  isPermissionExists(permissions: PermissionType[]) {
const userPerms = this.loginService.getUserPermissions();
    if (permissions == null) {
      return true;
    }

    let allPermissionsExists = false;
    
    permissions.forEach((permission) => {
      if (userPerms == null) {
        return false;
      }
      allPermissionsExists = userPerms.includes(permission);
      if (allPermissionsExists === false) {
        return false;
      }
      return allPermissionsExists;
    });

    return allPermissionsExists;
  }
}
