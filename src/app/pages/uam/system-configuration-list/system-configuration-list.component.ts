import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseListComponent } from 'src/app/shared/base';
import { RoleModel } from 'src/app/shared/models';
import { LoginService, RoleService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { SystemConfigurationModel } from 'src/app/shared/models/system-configuration.model';
import { SystemConfigurationService } from 'src/app/shared/services/uam/system-configuration.service';
@Component({
  selector: 'app-system-configuration-list',
  templateUrl: './system-configuration-list.component.html',
  styleUrls: ['./system-configuration-list.component.css']
})
export class SystemConfigurationListComponent
extends BaseListComponent<SystemConfigurationModel>
implements OnInit {

  constructor(

    service: SystemConfigurationService,
    public router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);


    this.displayColumns = new SystemConfigurationModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin/lov-master'],{skipLocationChange:true});  
  }
  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(masterconfiguration: SystemConfigurationModel) {
    this.router.navigate(['/admin/systemconfiguration/details/', masterconfiguration.cmsSysVariablesId],{skipLocationChange: true});
  }

}
