import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base';
import { ConfirmationPopupComponent } from 'src/app/shared/components/confirmation-popup/confirmation-popup.component';
import { EmployeeModel, LovModel, RoleModel, SortFilterModel, UserModel } from 'src/app/shared/models';
import { BaseDataService, BranchService, LoginService, LOVService, RoleService, UserService } from 'src/app/shared/services';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { LOV, Status } from 'src/app/shared/enums';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { EmployeeListComponent } from 'src/app/shared/components/employee-list/employee-list.component';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { PermissionModel } from 'src/app/shared/models/permission.model';
import { BarcodePopupComponent } from 'src/app/shared/components/barcode-popup/barcode-popup.component';

interface status {
  value: string;
  text: string;
}
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent extends BaseDetailComponent<UserModel> implements OnInit {
  selectedRequestTypes: any[] = [];
  roleList: RoleModel[] = [];
  selectedOption = 0;
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
  roleId: LovModel[] = [];
  inWordModelist: any;
  userList: any[] = [];
  isReadOnly: boolean = false;
  selectedEmployee: EmployeeModel = new EmployeeModel();
  selectedPermission: PermissionModel[] = [];
  selectedRole:any;
  permissionList: PermissionModel[] = [];
  userData: any;
  entity = new UserModel();
  role: any;
  constructor(
    private lovService: LOVService,
    private roleService: RoleService,
    private userService: UserService,
    private httpClient: WebHttpClient,
    dialog: MatDialog, activatedRoute: ActivatedRoute, location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,router: Router,branchService: BranchService
  ) {

    super(dialog, activatedRoute, location, frontendHelperService,  notifyService, loginService,
      allocationService, router,branchService);
    this.initForm();
  }
  onBack(){
    this.router.navigate(['/admin/user'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    this.getAllRoles();
    this.getUserType();
    this.disableForm = true;
    if (this.recId > 0) {
      this.getUserDetails();
      this.isReadOnly = true;
      this.disableForm = false;
      this.formInput.controls[this.properties.employeeId].disable();
    }
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
     this.permissionList = response.data;
   //  this.roleList = _.uniqBy(this.roleList)
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
    this.selectedRequestTypes = this.permissionList.filter((e) => { });
  }

  onPermissionSelection(perms: PermissionModel[]) {
    this.selectedPermission = perms;
  }
  
  getUserDetails() {

   let request =  this.userService.getDataById(this.recId);
   request.subscribe((response) => {
     this.entity = response;
     //console.log(this.entity)
     const perIds = this.entity && this.entity.userRoleDTOList? this.entity.userRoleDTOList.map((f) => f.roleId) : [];
    this.selectedPermission = this.permissionList.filter(f =>
      perIds.includes(f.roleId));
      this.formInput.patchValue({
        userType: this.entity.userType,
        userName:this.entity.userName,
        employeeId:this.entity.userName,
        name:this.entity.name,
        emailId:this.entity.email,
        status:this.entity.status,
        role:this.selectedPermission
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
      if(resp.message === 'User already exists!'){
        const confirmDialog = this.dialog.open(BarcodePopupComponent, {
          data: {
            title: 'Alert',
            message: 'User already exists!'
        }
       });
      } else{
      this.notifyService.showSuccess('User','Created Successfully');
      this.router.navigate(['/admin/user'],{skipLocationChange: true});
      }
    });
  }
}
