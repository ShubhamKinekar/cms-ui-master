import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseListComponent } from 'src/app/shared/base';
import { RoleModel } from 'src/app/shared/models';
import { LoginService, RoleService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent
  extends BaseListComponent<RoleModel>
  implements OnInit {
  constructor(
    service: RoleService,
    router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);


    this.displayColumns = new RoleModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(role: RoleModel) {
    this.router.navigate(['/admin/role/details/', role.roleId],{skipLocationChange: true});
  }
}
