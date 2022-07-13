import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MasterCdslAccountModel } from 'src/app/shared/models/master-cdsl-account.model';
import { MasterNsdlAccountModel } from 'src/app/shared/models/master-nsdl-account.model';
import { MasterNsdlAccountService } from 'src/app/shared/services/uam/master-nsdl-account.service';

@Component({
  selector: 'app-master-nsdl-account-list',
  templateUrl: './master-nsdl-account-list.component.html',
  styleUrls: ['./master-nsdl-account-list.component.css']
})
export class MasterNsdlAccountListComponent
extends BaseListComponent<MasterNsdlAccountModel> 
 implements OnInit {

  constructor(
    service: MasterNsdlAccountService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService, router);

    this.displayColumns = new MasterNsdlAccountModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData();
  }

  rowAction(masternsdlaccount: MasterNsdlAccountModel) {
    this.router.navigate(['/admin/masternsdlaccount/details/', masternsdlaccount.masternsdlaccountId]);
  }
}




 
