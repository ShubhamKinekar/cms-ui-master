import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MasterCdslBankModel } from 'src/app/shared/models/master-cdsl-bank.model';
import { MasterCdslBankService } from 'src/app/shared/services/uam/master-cdsl-bank.service';

@Component({
  selector: 'app-master-cdsl-bank-list',
  templateUrl: './master-cdsl-bank-list.component.html',
  styleUrls: ['./master-cdsl-bank-list.component.css']
})
export class MasterCdslBankListComponent 
extends BaseListComponent<MasterCdslBankModel>
implements OnInit {

 
 

  constructor(
    service: MasterCdslBankService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new MasterCdslBankModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(bankcode: MasterCdslBankModel) {
    this.router.navigate(['/admin/mastercdslaccount/details/', bankcode.bankCode]);
  }
}




 
