import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MasterCdslAccountModel } from 'src/app/shared/models/master-cdsl-account.model';
import { MasterCdslAccountService } from 'src/app/shared/services/uam/master-cdsl-account.service';

@Component({
  selector: 'app-master-cdsl-account-list',
  templateUrl: './master-cdsl-account-list.component.html',
  styleUrls: ['./master-cdsl-account-list.component.css']
})
export class MasterCdslAccountListComponent
extends BaseListComponent<MasterCdslAccountModel> 
implements OnInit {

  constructor(
    service: MasterCdslAccountService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService, router);

    this.displayColumns = new MasterCdslAccountModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(mastercdslaccount: MasterCdslAccountModel) {
    this.router.navigate(['/admin/mastercdslaccount/details/', mastercdslaccount.mastercdslaccountId]);
  }
}




 
