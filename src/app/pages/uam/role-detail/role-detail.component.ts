import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base';
import { ConfirmationPopupComponent } from 'src/app/shared/components/confirmation-popup/confirmation-popup.component';
import { LovModel, RoleModel } from 'src/app/shared/models';
import { PermissionModel } from 'src/app/shared/models/permission.model';
import { RoleService } from 'src/app/shared/services/uam/role.service';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { Status } from 'src/app/shared/enums';
import { forkJoin } from 'rxjs';
import { BaseDataService, BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css'],
})
export class RoleDetailComponent extends BaseDetailComponent<RoleModel> implements OnInit {
  items: any;
  Status = 'Active';
  defaultStatus = 'Y';
  matcher = new ErrorState();
  properties: any = {
    roleId: 'roleId',
    name: 'name',
    isDefault: 'isDefault',
    status: 'status',
    permissions: 'permissions'
  };
  permissionTypeId: LovModel[] = [];
  entity = new RoleModel();
  permissionList: PermissionModel[] = [];
  selectedPermission: PermissionModel[] = [];;
  constructor(
    private roleService: RoleService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,router: Router,branchService:BranchService
  ) {
    super(dialog,activatedRoute, location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
           this.initForm();
  }
  onBack(){
    this.router.navigate(['/admin/role'],{skipLocationChange:true});  
  }
  ngOnInit(): void {
    this.initData();
  }
  initData() {
    const requests: any[] = [];
    requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getRoleDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.permissionList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        this.setData();
      }
    });

  }
  setData() {
    const perIds = this.entity && this.entity.permissionDTOList ? this.entity.permissionDTOList.map(f => f.permissionTypeId) : [];
    this.selectedPermission = this.permissionList.filter(f =>
      perIds.includes(f.permissionTypeId));
    this.formInput.patchValue({
      name: this.entity.name,
      permissions: this.selectedPermission
    });
  }

  initForm() {
    this.formInput = new FormGroup({
      name: new FormControl('', [Validators.required, validateWhiteSpace]),
      permissions: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }

  getPermissions() {
    return this.roleService.getAllPermission();
    // .subscribe((res) => {
    //   this.permissionList = res.data;
    // });
  }

  onPermissionSelection(perms: PermissionModel[]) {
    this.selectedPermission = perms;
  }


  defaultStatusMsg(e: any) {
    if (e.checked) this.defaultStatus = 'YES';
    else this.defaultStatus = 'NO';
  }

  getRoleDetails() {
    return this.roleService.getDataById(this.recId);
    // .subscribe((response) => {
    //   this.entity = response;
    //   this.formInput.patchValue({
    //     name: this.entity.name,
    //     status: this.entity.status,
    //     permissions: this.entity.permissionTypeId?.split(','),
    //   });
    // });
  }

  rolePostData() {
    const data = new RoleModel();
    data.roleId = this.recId > 0 ? this.recId : null;;
    data.name = this.formInput.controls[this.properties.name].value;
    data.status = Status.Active;
    data.isDefault = this.defaultStatus;
    data.permissionDTOList = this.selectedPermission;
    //this.postData = data;
    this.roleService.addData(data).subscribe((resp: any) => {
      this.router.navigate(['/admin/role'],{skipLocationChange: true});
      this.notifyService.showSuccess('Assign Role','Successfully');
    });
  }
}
