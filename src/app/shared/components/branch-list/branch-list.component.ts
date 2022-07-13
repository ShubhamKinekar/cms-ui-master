import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../base';
import { BankModel, BranchModel } from '../../models';
import { BranchService, LoginService } from '../../services';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css'],
})
export class BranchListComponent
  extends BaseListComponent<BankModel>
  implements OnInit
{
  constructor(
    service: BranchService,
    location: Location, frontendHelperService: FrontendHelperService,
    public dialogRef: MatDialogRef<BranchListComponent>,
    loginService: LoginService, router:Router
  ) {
    super(service, location, frontendHelperService, loginService,router);
    
    this.defaultPageSize = 10;
    this.displayColumns = new BranchModel().displayColumns();
    this.getData();
  }

  ngOnInit(): void {}

  selectAction(branches: BranchModel[]) {
    this.dialogRef.close(branches[0]);
  }
}
