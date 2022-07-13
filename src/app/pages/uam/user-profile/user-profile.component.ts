import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base';
import { EmployeeListComponent } from 'src/app/shared/components/employee-list/employee-list.component';
import { LOV } from 'src/app/shared/enums';
import { RoleModel, EmployeeModel, SortFilterModel, UserModel } from 'src/app/shared/models';
import { BaseDataService, BranchService, LoginService, LOVService, RoleService, UserService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

interface status {
  value: string;
  text: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseDetailComponent<UserModel> implements OnInit {

  selectedRequestTypes: any[] = [];
  roleList: RoleModel[] = [];

  Status: status[] = [
    { value: 'ACTIVE', text: 'Active' },
    { value: 'INACTIVE', text: 'Inactive' }

  ];

  matcher = new ErrorState();
  properties: any = {
    employeeId: 'employeeId',
    userName: 'userName',
    name: 'name',
    userType: 'userType',
    emailId: 'emailId',
    role: 'role',
    status:'status',
  };
  inWordModelist: any;
  userList: any[] = [];
  selectedEmployee: EmployeeModel = new EmployeeModel();
  formInput: any;
  dialog: any;
  entity: any;
  constructor(
    private lovService: LOVService,
    private roleService: RoleService,
    private userService: UserService,
    private httpClient: WebHttpClient,
    dialog: MatDialog, activatedRoute: ActivatedRoute, location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,router: Router,branchService:BranchService
  ) {

    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();
  }

  ngOnInit(): void {
    if (this.recId > 0) {
      this.getUserDetails();
      this.formInput.disable();
      this.disableForm = true;
    }
    this.getAllRoles();
    this.getUserType();
  }

  initForm() {
    this.formInput = new FormGroup({
      employeeId: new FormControl('', [Validators.required, validateWhiteSpace]),
      userName: new FormControl('', [Validators.required, validateWhiteSpace]),
      name: new FormControl('', [Validators.required, validateWhiteSpace]),
      userType: new FormControl('', [Validators.required, validateWhiteSpace]),
      emailId: new FormControl('', [Validators.required, validateWhiteSpace]),
      role: new FormControl('', [Validators.required, validateWhiteSpace]),
      status: new FormControl('', [Validators.required, validateWhiteSpace])
    });
  }

  getAllRoles() {
    const model: SortFilterModel = new SortFilterModel();
    model.length = 1000;
    this.roleService.getAllData(model).subscribe((response: any) => {
      this.roleList = response.data;
    });
  }


  searchEmployee() {
    const dialogRef = this.dialog.open(EmployeeListComponent);
    dialogRef.afterClosed().subscribe((res: EmployeeModel) => {
      //TODO: Binding to elements
      this.selectedEmployee = res;
      this.formInput.patchValue({
        employeeId: res.employeeCode,
        name: res.name,
        userName: res.employeeCode,
        emailId: res.emailCompany,
        status: res.status,
      });
    });
  }

  onRequestTypeSelected(event: any) {
    this.selectedRequestTypes = this.roleList.filter((e) => { });
  }

  getUserDetails() {
    this.userService.getDataById(this.recId).subscribe((response) => {
      this.entity = response;
      this.formInput.patchValue({
        userName: this.entity.userName,
        employeeID: this.entity.employeeId,
        name: this.entity.name,
        emailId: this.entity.email,
        status: this.entity.status,
        userType:this.entity.userType,
      });
    });
  }

  getUserType() {
    this.lovService.getLOVData(LOV.UserType).subscribe((response: any) => {
      this.userList = response.data;
    });
  }

  userPostData() {
    const data = {
      userId: this.entity && this.entity?.userId > 0 ? this.entity?.userId : 0,
      employeeId: this.selectedEmployee.employeeId,
      userName: this.formInput.controls[this.properties.userName].value,
      name: this.formInput.controls[this.properties.name].value,
      email: this.formInput.controls[this.properties.emailId].value,
      userType: this.formInput.controls[this.properties.userType].value,
      //status: Status.Active,
      status : this.formInput.controls[this.properties.status].value,
      userRoleDTOList: this.formInput.controls['role'].value as any[],
    };

    this.httpClient.post('uam/user/saveUser', data).subscribe((resp: any) => {

    });
  }

}
