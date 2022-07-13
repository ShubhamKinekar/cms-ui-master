import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../base';
import { EmployeeModel } from '../../models';
import { LoginService } from '../../services';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';
import { EmployeeService } from '../../services/uam/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent
  extends BaseListComponent<EmployeeModel>
  implements OnInit
{
  constructor(
    service: EmployeeService,
    location: Location, frontendHelperService: FrontendHelperService,
    public dialogRef: MatDialogRef<EmployeeListComponent>,
    loginService: LoginService, router:Router
  ) {
    super(service, location, frontendHelperService, loginService,router);
    
    this.defaultPageSize = 10;
    this.displayColumns = new EmployeeModel().displayColumns();
    this.getData();
  }

  ngOnInit(): void {}

  selectAction(employees: EmployeeModel[]) {
    this.dialogRef.close(employees[0]);
  }
}
