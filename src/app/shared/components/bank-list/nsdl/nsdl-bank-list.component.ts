import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { NSDLBankModel } from 'src/app/shared/models';
import { LoginService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { NSDLBankService } from 'src/app/shared/services/transaction/nsdl-bank.service';

@Component({
  selector: 'app-nsdl-bank-list',
  templateUrl: './nsdl-bank-list.component.html',
  styleUrls: ['./nsdl-bank-list.component.css'],
})
export class NSDLBankListComponent
  extends BaseListComponent<NSDLBankModel>
  implements OnInit
{
  constructor(
    service: NSDLBankService,
    location: Location, frontendHelperService: FrontendHelperService,
    public dialogRef: MatDialogRef<NSDLBankListComponent>,
    loginService: LoginService, router:Router
  ) {
    super(service, location, frontendHelperService, loginService, router);
    
    this.defaultPageSize = 10;
    this.displayColumns = new NSDLBankModel().displayColumns();
    this.getData();
  }

  ngOnInit(): void {}

  selectAction(Bankes: NSDLBankModel[]) {
    this.dialogRef.close(Bankes[0]);
  }
}
