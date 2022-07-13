import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../base';
import { BacodeModel, BankModel, BranchModel } from '../../models';
import { BranchService, LoginService } from '../../services';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';
import { BacodeService } from '../../services/transaction/bacode.service';

@Component({
  selector: 'app-bacode-list',
  templateUrl: './bacode-list.component.html',
  styleUrls: ['./bacode-list.component.css'],
})
export class BacodeListComponent
  extends BaseListComponent<BankModel>
  implements OnInit
{
  constructor(
    service: BacodeService,
    location: Location, frontendHelperService: FrontendHelperService,
    public dialogRef: MatDialogRef<BacodeListComponent>,
    loginService: LoginService, router:Router
  ) {
    super(service, location, frontendHelperService, loginService,router);
    
    this.defaultPageSize = 10;
    this.displayColumns = new BacodeModel().displayColumns();
    this.getData();
  }

  ngOnInit(): void {}

  selectAction(branches: BacodeModel[]) {
    this.dialogRef.close(branches[0]);
  }
}
