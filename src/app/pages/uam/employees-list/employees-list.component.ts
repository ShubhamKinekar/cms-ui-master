
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService} from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { EmployeesModel } from 'src/app/shared/models/employees.model';
import { EmployeesService } from 'src/app/shared/services/uam/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent
  extends BaseListComponent<EmployeesModel>
  implements OnInit
{
  constructor(
    service: EmployeesService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new EmployeesModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin/lov-master'],{skipLocationChange: true});  
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(employees: EmployeesModel) {
    this.router.navigate(['/admin/employees/details/', employees.employeeId]);
  }
}



  

