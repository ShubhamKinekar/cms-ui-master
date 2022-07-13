import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { CDSLBankModel } from 'src/app/shared/models';
import { LoginService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { CDSLBankService } from 'src/app/shared/services/transaction/cdsl-bank.service';

@Component({
  selector: 'app-cdsl-bank-list',
  templateUrl: './cdsl-bank-list.component.html',
  styleUrls: ['./cdsl-bank-list.component.css'],
})
export class CDSLBankListComponent
  extends BaseListComponent<CDSLBankModel>
  implements OnInit
{
  constructor(
    service: CDSLBankService,
    location: Location, frontendHelperService: FrontendHelperService,
    public dialogRef: MatDialogRef<CDSLBankListComponent>,
    loginService: LoginService,router:Router
  ) {
    super(service, location, frontendHelperService, loginService,router);
    
    this.defaultPageSize = 10;
    this.displayColumns = new CDSLBankModel().displayColumns();
    this.getData();
  }

  ngOnInit(): void {}

  selectAction(Bankes: CDSLBankModel[]) {
    this.dialogRef.close(Bankes[0]);
  }
}
