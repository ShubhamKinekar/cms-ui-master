import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import {
  BaseDataService,
  BranchService,
  LoginService,
} from 'src/app/shared/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { BaseDetailComponent } from 'src/app/shared/base';
import { SystemConfigurationModel } from 'src/app/shared/models/system-configuration.model';
import { SystemConfigurationService } from 'src/app/shared/services/uam/system-configuration.service';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
interface status {
  value: string;
  text: string;
}


@Component({
  selector: 'app-system-configuration-detail',
  templateUrl: './system-configuration-detail.component.html',
  styleUrls: ['./system-configuration-detail.component.css'],
})
export class SystemConfigurationDetailComponent
  extends BaseDetailComponent<SystemConfigurationModel>
  implements OnInit
{
  Status: status[] = [
    { value: 'ACTIVE', text: 'ACTIVE' },
    { value: 'INACTIVE', text: 'INACTIVE' },
  ];
  isEdit = false;
  properties: any = {
    key: 'key',
    value: 'value',
    description: 'description',
    status: 'status',
  };
  SystemConfigurationList: any;

  constructor(
    private systemconfigurationService: SystemConfigurationService,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService,
    allocationService: AllocationService,
    notifyService: NotificationService,
    router: Router,
    branchService: BranchService
  ) {
    super(
      dialog,
      activatedRoute,
      location,
      frontendHelperService,
      notifyService,
      loginService,
      allocationService,
      router,
      branchService
    );
    this.initForm();
  }
  onBack(){
    this.router.navigate(['/admin/systemconfiguration'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getEmployeesDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.SystemConfigurationList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        
      }
    });

  }
  initForm() {
    this.formInput = new FormGroup({
      key: new FormControl('', [Validators.required, validateWhiteSpace]),
      value: new FormControl('', [Validators.required, validateWhiteSpace]),
      description: new FormControl('', [Validators.required, validateWhiteSpace]),
      status: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }
  getEmployeesDetails() {
    const cmsSysVariablesId = {
       
        "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.systemconfigurationService.getDataById(cmsSysVariablesId)
    .subscribe((response) => {
      this.entity = response;
      this.isEdit = true;
      console.log(this.entity)
    console.log(response.cmsSysVariablesId);
     this.formInput.patchValue({
      key: this.entity.key,
      value:this.entity.value,
      description:this.entity.description,
      status:this.entity.status,       
});
    });
  
}

 
rolePostData() {  
  // const empId =  this.entity && this.entity?.employeeId > 0 ? this.entity?.employeeId : 0;
  const data = {
  key : this.formInput.controls[this.properties.key].value,
  value : this.formInput.controls[this.properties.value].value,
  description : this.formInput.controls[this.properties.description].value,
  status : this.formInput.controls[this.properties.status].value,

  };
  //this.postData = data;
  this.systemconfigurationService.addData(data).subscribe((resp: any) => {
    console.log(resp);
    this.router.navigate(['/admin/systemconfiguration'],{skipLocationChange: true});
    this.notifyService.showSuccess('Data','Create Successfully');
  });
}
updatePostData(){
  this.isEdit = !this.isEdit;
  const SysId =  this.entity && this.entity?.cmsSysVariablesId > 0 ? this.entity?.cmsSysVariablesId : 0;
  console.log(SysId)
  const data = {
    cmsSysVariablesId : SysId,
  key : this.formInput.controls[this.properties.key].value,
  value : this.formInput.controls[this.properties.value].value,
   description : this.formInput.controls[this.properties.description].value,
   status : this.formInput.controls[this.properties.status].value,
};
if(this.recId > 0){ 
  this.systemconfigurationService.updateData(SysId, data).subscribe((resp : any)=>{
    console.log(resp)
    this.router.navigate(['/admin/systemconfiguration'],{skipLocationChange: true});
    this.notifyService.showSuccess('Data','Update Successfully');
  })
}
}

}
