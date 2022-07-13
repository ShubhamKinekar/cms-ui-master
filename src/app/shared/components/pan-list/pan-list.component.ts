import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../base';
import { BankModel, BranchModel, ClientViewModel } from '../../models';
import { BranchService, LoginService } from '../../services';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';
import { ClientViewService } from '../../services/transaction/client-view.service';

@Component({
  selector: 'app-pan-list',
  templateUrl: './pan-list.component.html',
  styleUrls: ['./pan-list.component.css'],
})
export class PanListComponent
  extends BaseListComponent<ClientViewModel>
  implements OnInit
{
  constructor(
    service: ClientViewService,
    location: Location, frontendHelperService: FrontendHelperService,
    public dialogRef: MatDialogRef<PanListComponent>,
    loginService: LoginService, router: Router
  ) {
    super(service, location, frontendHelperService, loginService,router);
    
    this.defaultPageSize = 10;
    this.displayColumns = new ClientViewModel().displayColumns();
    //this.getData();
  }

  ngOnInit(): void {}

  selectAction(branches: ClientViewModel[]) {
    this.dialogRef.close(branches[0]);
  }
}
