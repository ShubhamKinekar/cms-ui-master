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
import { MasterBranchService } from 'src/app/shared/services/uam/master-branch.service';
import { MasterBranchModel } from 'src/app/shared/models/master-branch.model';
interface status {
  value: string;
  text: string;
}

@Component({
  selector: 'app-master-branch-detail',
  templateUrl: './master-branch-detail.component.html',
  styleUrls: ['./master-branch-detail.component.css']
})
export class MasterBranchDetailComponent 
extends BaseDetailComponent<MasterBranchModel>
 implements OnInit {
  Status: status[] = [
    { value: 'ACTIVE', text: 'ACTIVE' },
    { value: 'INACTIVE', text: 'INACTIVE' },
  ]; 
  isEdit = false;
  properties: any = {
    masterbranchId: 'masterbranchId',
    solId: 'solId',
    branchName: 'branchName',
    branchZone: 'branchZone',
    address1: 'address1',
    address2: 'address2',
    address3: 'address3',
    city: 'city',
    addState: 'addState',
    country: 'country',
    pin: 'pin',
    brhead: 'brhead',
    brheadTel: 'brheadTel',
    boardNo: 'boardNo',
    fax1: 'fax1',
    ophead: 'ophead',
    opheadTel: 'opheadTel',
    branchCat:'branchCat',
    headquaters: 'headquaters',
    circleHead: 'circleHead',
    branchType: 'branchType',
    hubCode: 'hubCode',
    hubName: 'hubName',
    circleId: 'circleId',
    branchheadEmail:'branchheadEmail',
    operationalheadEmail: 'operationalheadEmail',
    circleName: 'circleName',
    micr: 'micr',
    micrSortCode: 'micrSortCode',
    ifscCode: 'ifscCode',
    dematBranch: 'dematBranch',
    status: 'status',
  }
  MasterBranchList: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private masterbranchService: MasterBranchService,

    protected location: Location, frontendHelperService: FrontendHelperService,
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
    this.router.navigate(['/admin/masterbranch/list/:id'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getMasterBranchDetails());

    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.MasterBranchList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
      }
    });

  }
  
  initForm() {
    this.formInput = new FormGroup({
      solId: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchName: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchZone: new FormControl('', [Validators.required, validateWhiteSpace]),
      address1: new FormControl('', [Validators.required, validateWhiteSpace]),
      address2: new FormControl('', [Validators.required, validateWhiteSpace]),
      address3: new FormControl('', [Validators.required, validateWhiteSpace]),
      city: new FormControl('', [Validators.required, validateWhiteSpace]),
      addState: new FormControl('', [Validators.required, validateWhiteSpace]),
      country: new FormControl('', [Validators.required, validateWhiteSpace]),
      pin: new FormControl('', [Validators.required, validateWhiteSpace]),
      brhead: new FormControl('', [Validators.required, validateWhiteSpace]),
      brheadTel: new FormControl('', [Validators.required, validateWhiteSpace]),
      boardNo: new FormControl('', [Validators.required, validateWhiteSpace]),
      fax1: new FormControl('', [Validators.required, validateWhiteSpace]),
      ophead: new FormControl('', [Validators.required, validateWhiteSpace]),
      opheadTel: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchCat: new FormControl('', [Validators.required, validateWhiteSpace]),
      headquaters: new FormControl('', [Validators.required, validateWhiteSpace]),
      circleHead: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchType: new FormControl('', [Validators.required, validateWhiteSpace]),
      hubCode: new FormControl('', [Validators.required, validateWhiteSpace]),
      hubName: new FormControl('', [Validators.required, validateWhiteSpace]),
      circleId: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchheadEmail: new FormControl('', [Validators.required, validateWhiteSpace]),
      operationalheadEmail: new FormControl('', [Validators.required, validateWhiteSpace]),
      circleName: new FormControl('', [Validators.required, validateWhiteSpace]),
      micr: new FormControl('', [Validators.required, validateWhiteSpace]),
      micrSortCode: new FormControl('', [Validators.required, validateWhiteSpace]),
      ifscCode: new FormControl('', [Validators.required, validateWhiteSpace]),
      dematBranch: new FormControl('',[Validators.required, validateWhiteSpace]),
      status: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }
  getMasterBranchDetails() {
    const masterbranchId = {
       "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.masterbranchService.getDataById(masterbranchId)
    .subscribe((response) => {
      this.entity = response;
      this.isEdit = true;
      console.log(this.entity)
    console.log(response.cmsMasterBranchId);
     this.formInput.patchValue({
      solId: this.entity.solId,
      branchName:this.entity.branchName,
      branchZone:this.entity.branchZone,
      address1:this.entity.address1,
      address2:this.entity.address2,
      address3:this.entity.address3,
      city: this.entity.city,
      addState: this.entity.addState,
      country: this.entity.country,
      pin: this.entity.pin,
      brhead: this.entity.brhead,
      brheadTel: this.entity.brheadTel,
      boardNo: this.entity.boardNo,
      fax1: this.entity.fax1,
      ophead: this.entity.ophead,
      opheadTel: this.entity.opheadTel,
      branchCat: this.entity.branchCat,
      headquaters: this.entity.headquaters,
      circleHead: this.entity.circleHead,
      branchType: this.entity.branchType,
      hubCode: this.entity.hubCode,
      hubName: this.entity.hubName,
      circleId: this.entity.circleId,
      branchheadEmail: this.entity.branchheadEmail,
      operationalheadEmail: this.entity.operationalheadEmail,
      circleName: this.entity.circleName,
      micr: this.entity.micr,
      micrSortCode: this.entity.micrSortCode,
      ifscCode: this.entity.ifscCode,
      dematBranch: this.entity.dematBranch,
      status: this.entity.status
       
});
    });
  }
  rolePostData() {
    const data = {
      solId : this.formInput.controls[this.properties.solId].value,
      branchName : this.formInput.controls[this.properties.branchName].value,
      branchZone : this.formInput.controls[this.properties.branchZone].value,
      address1 : this.formInput.controls[this.properties.address1].value,
      address2 : this.formInput.controls[this.properties.address2].value,
      address3 : this.formInput.controls[this.properties.address3].value,
      addState : this.formInput.controls[this.properties.addState].value,
      country : this.formInput.controls[this.properties.country].value,
      city : this.formInput.controls[this.properties.city].value,
      pin : this.formInput.controls[this.properties.pin].value,
      brhead : this.formInput.controls[this.properties.brhead].value,
      brheadTel : this.formInput.controls[this.properties.brheadTel].value,
      boardNo : this.formInput.controls[this.properties.boardNo].value,
      fax1 : this.formInput.controls[this.properties.fax1].value,
      ophead : this.formInput.controls[this.properties.ophead].value,
      opheadTel : this.formInput.controls[this.properties.opheadTel].value,
      branchCat : this.formInput.controls[this.properties.branchCat].value,
      headquaters : this.formInput.controls[this.properties.headquaters].value,
      circleHead : this.formInput.controls[this.properties.circleHead].value,
      branchType : this.formInput.controls[this.properties.branchType].value,
      hubCode : this.formInput.controls[this.properties.hubCode].value,
      hubName : this.formInput.controls[this.properties.hubName].value,
      circleId : this.formInput.controls[this.properties.circleId].value,
      branchheadEmail : this.formInput.controls[this.properties.branchheadEmail].value,
      operationalheadEmail : this.formInput.controls[this.properties.operationalheadEmail].value,
      circleName : this.formInput.controls[this.properties.circleName].value,
      micr : this.formInput.controls[this.properties.micr].value,
      micrSortCode : this.formInput.controls[this.properties.micrSortCode].value,
      ifscCode : this.formInput.controls[this.properties.ifscCode].value,
      dematBranch : this.formInput.controls[this.properties.dematBranch].value,
      status : this.formInput.controls[this.properties.status].value,
   
    };
    //this.postData = data;
    this.masterbranchService.addData(data).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(['/admin/masterbranch/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('Branch','Create Successfully');
    });
  }
  updatePostData(){
    this.isEdit = !this.isEdit;
    const BranchId =  this.entity && this.entity?.cmsMasterBranchId > 0 ? this.entity?.cmsMasterBranchId : 0;
    const data = {
      cmsMasterBranchId : BranchId,
    solId : this.formInput.controls[this.properties.solId].value,
    branchName : this.formInput.controls[this.properties.branchName].value,
    branchZone : this.formInput.controls[this.properties.branchZone].value,
    address1 : this.formInput.controls[this.properties.address1].value,
    address2 : this.formInput.controls[this.properties.address2].value,
    address3 : this.formInput.controls[this.properties.address3].value,
    addState : this.formInput.controls[this.properties.addState].value,
    country : this.formInput.controls[this.properties.country].value,
    city : this.formInput.controls[this.properties.city].value,
    pin : this.formInput.controls[this.properties.pin].value,
    brhead : this.formInput.controls[this.properties.brhead].value,
    brheadTel : this.formInput.controls[this.properties.brheadTel].value,
    boardNo : this.formInput.controls[this.properties.boardNo].value,
    fax1 : this.formInput.controls[this.properties.fax1].value,
    ophead : this.formInput.controls[this.properties.ophead].value,
    opheadTel : this.formInput.controls[this.properties.opheadTel].value,
    branchCat : this.formInput.controls[this.properties.branchCat].value,
    headquaters : this.formInput.controls[this.properties.headquaters].value,
    operationalheadEmail : this.formInput.controls[this.properties.operationalheadEmail].value,
    circleHead : this.formInput.controls[this.properties.circleHead].value,
    branchType : this.formInput.controls[this.properties.branchType].value,
    hubCode : this.formInput.controls[this.properties.hubCode].value,
    hubName : this.formInput.controls[this.properties.hubName].value,
    circleId : this.formInput.controls[this.properties.circleId].value,
    branchheadEmail : this.formInput.controls[this.properties.branchheadEmail].value,
    circleName : this.formInput.controls[this.properties.circleName].value,
    micr : this.formInput.controls[this.properties.micr].value,
    micrSortCode : this.formInput.controls[this.properties.micrSortCode].value,
    ifscCode : this.formInput.controls[this.properties.ifscCode].value,
    dematBranch : this.formInput.controls[this.properties.dematBranch].value,
    status : this.formInput.controls[this.properties.status].value,
  };
  if(this.recId > 0){ 
    this.masterbranchService.updateData(BranchId, data).subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/admin/masterbranch/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('Branch','Update Successfully');
    })
  }
  }
}
 