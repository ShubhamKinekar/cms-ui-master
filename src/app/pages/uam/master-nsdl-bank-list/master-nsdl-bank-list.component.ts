import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MasterNsdlBankModel } from 'src/app/shared/models/master-nsdl-bank.model';
import { MasterNsdlBankService } from 'src/app/shared/services/uam/master-nsdl-bank.service';

@Component({
  selector: 'app-master-nsdl-bank-list',
  templateUrl: './master-nsdl-bank-list.component.html',
  styleUrls: ['./master-nsdl-bank-list.component.css']
})
export class MasterNsdlBankListComponent
extends BaseListComponent<MasterNsdlBankModel>

implements OnInit {

  constructor(
    service: MasterNsdlBankService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService, router);

    this.displayColumns = new MasterNsdlBankModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(masternsdlbank: MasterNsdlBankModel) {
    this.router.navigate(['/admin/masternsdlbank/details/', masternsdlbank.masternsdlbankId]);
  }
}




 
