import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BaseDetailComponent } from 'src/app/shared/base';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { forkJoin } from 'rxjs';
import { MasterRmModel } from 'src/app/shared/models/master-rm.model';
import { MasterRmService } from 'src/app/shared/services/uam/master-rm.service';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';

interface status {
  value: string;
  text: string;
}


@Component({
  selector: 'app-master-rm-detail',
  templateUrl: './master-rm-detail.component.html',
  styleUrls: ['./master-rm-detail.component.css']
})
export class MasterRmDetailComponent 
extends BaseDetailComponent<MasterRmModel>
implements OnInit {
  Status: status[] = [
    { value: 'ACTIVE', text: 'ACTIVE' },
    { value: 'INACTIVE', text: 'INACTIVE' },
  ]; 
  
  MasterRmList : any;
  isEdit = false;
  properties: any = {
    cmsMasterRmId: 'cmsMasterRmId',
    employeeId: 'employeeId',
    employeeName: 'employeeName',
    role: 'role',
    solId: 'solId',
    branchName: 'branchName',
    clusterHead: 'clusterHead',
    circle: 'circle',
    rmStatus: 'rmStatus',
    branchCategory: 'branchCategory',
    region: 'region',
    type: 'type',
    status: 'status',
  }
 
  constructor(
    private activateRoute: ActivatedRoute,
    private masterrmService: MasterRmService,
    private httpClient: WebHttpClient,
    protected location: Location, 
    frontendHelperService: FrontendHelperService,
    router: Router,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService:BranchService
  ) {
    super(dialog,activatedRoute,location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();
  }
  onBack(){
    this.router.navigate(['/admin/masterrm/list/:id'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getMasterRmDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.MasterRmList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        
      }
    });

  }
  initForm() {
    this.formInput = new FormGroup({
      employeeId: new FormControl('', [Validators.required, validateWhiteSpace]),
      employeeName: new FormControl('', [Validators.required, validateWhiteSpace]),
      role: new FormControl('', [Validators.required, validateWhiteSpace]),
      solId: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchName: new FormControl('', [Validators.required, validateWhiteSpace]),
      clusterHead: new FormControl('', [Validators.required, validateWhiteSpace]),
      circle: new FormControl('', [Validators.required, validateWhiteSpace]),
      rmStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchCategory: new FormControl('', [Validators.required, validateWhiteSpace]),
      region: new FormControl('', [Validators.required, validateWhiteSpace]),
      type: new FormControl('', [Validators.required, validateWhiteSpace]),
      status: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }
  getMasterRmDetails() {
    const cmsMasterRmId = {
       
        "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.masterrmService.getDataById(cmsMasterRmId)
    .subscribe((response) => {
      this.entity = response;
      this.isEdit = true;
      console.log(this.entity)
    console.log(response.cmsMasterRmId);
     this.formInput.patchValue({
      employeeId: this.entity.employeeId,
      employeeName:this.entity.employeeName,
      role:this.entity.role,
      solId:this.entity.solId,
      branchName:this.entity.branchName,
      clusterHead:this.entity.clusterHead,
      circle: this.entity.circle,
      rmStatus: this.entity.rmStatus,
      branchCategory: this.entity.branchCategory,
      region: this.entity.region,
      type: this.entity.type,
      status: this.entity.status
       
});
    });
  }
  rolePostData() {
    const data = {
    employeeId : this.formInput.controls[this.properties.employeeId].value,
    employeeName : this.formInput.controls[this.properties.employeeName].value,
    role : this.formInput.controls[this.properties.role].value,
    solId : this.formInput.controls[this.properties.solId].value,
    branchName : this.formInput.controls[this.properties.branchName].value,
    clusterHead : this.formInput.controls[this.properties.clusterHead].value,
    circle : this.formInput.controls[this.properties.circle].value,
    rmStatus : this.formInput.controls[this.properties.rmStatus].value,
    branchCategory : this.formInput.controls[this.properties.branchCategory].value,
    region : this.formInput.controls[this.properties.region].value,
    type : this.formInput.controls[this.properties.type].value,
    status : this.formInput.controls[this.properties.status].value,
    };
    //this.postData = data;
    this.masterrmService.addData(data).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(['/admin/masterrm/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('RM','Create Successfully');
    });
  }
  updatePostData(){
    this.isEdit = !this.isEdit;
    const RmId =  this.entity && this.entity?.cmsMasterRmId > 0 ? this.entity?.cmsMasterRmId : 0;
    const data = {
    cmsMasterRmId : RmId,
    employeeId : this.formInput.controls[this.properties.employeeId].value,
    employeeName : this.formInput.controls[this.properties.employeeName].value,
    role : this.formInput.controls[this.properties.role].value,
    solId : this.formInput.controls[this.properties.solId].value,
    branchName : this.formInput.controls[this.properties.branchName].value,
    clusterHead : this.formInput.controls[this.properties.clusterHead].value,
    circle : this.formInput.controls[this.properties.circle].value,
    rmStatus : this.formInput.controls[this.properties.rmStatus].value,
    branchCategory : this.formInput.controls[this.properties.branchCategory].value,
    region : this.formInput.controls[this.properties.region].value,
    type : this.formInput.controls[this.properties.type].value,
    status : this.formInput.controls[this.properties.status].value,
  };
  if(this.recId > 0){ 
    this.masterrmService.updateData(RmId, data).subscribe((res : any)=>{
      console.log(res)
      this.router.navigate(['/admin/masterrm/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('RM','Update Successfully');
    })
  }
  }

  }

