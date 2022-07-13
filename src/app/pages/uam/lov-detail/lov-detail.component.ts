import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base';
import { SortFilterModel} from 'src/app/shared/models';
import {  BranchService, LoginService } from 'src/app/shared/services';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

import { LovmasterModel } from 'src/app/shared/models/lovmaster.model';
import { LovService } from 'src/app/shared/services/uam/lov.service';
import { toArray } from 'lodash';
interface status {
  value: string;
  text: string;
}
interface isdynamic {
  value: string;
  text: string;
}
interface skipDataentry {
  value: string;
  text: string;
}

@Component({
  selector: 'app-lov-detail',
  templateUrl: './lov-detail.component.html',
  styleUrls: ['./lov-detail.component.css'],
})
export class LovDetailComponent
  extends BaseDetailComponent<LovmasterModel>
  implements OnInit
{
  selectedRequestTypes: any[] = [];
  lovList: LovmasterModel[] = [];
  Status: status[] = [
    { value: 'ACTIVE', text: 'ACTIVE' },
    { value: 'INACTIVE', text: 'INACTIVE' },
  ]; 
  IsDynamic: isdynamic[] = [
    { value: 'Y', text: 'Y' },
    { value: 'N', text: 'N' },
  ];
  SkipDataentry: skipDataentry[] = [
    { value: 'Y', text: 'Y' },
    { value: 'N', text: 'N' },
  ];
  matcher = new ErrorState();
  isEdit = false;

  properties: any = {
    cmsMasterLovId: 'cmsMasterLovId', 
    lovName: 'lovName',
    value: 'value',
    status: 'status',
    isDynamic: 'isDynamic',
    daysRequired: 'daysRequired',
    skipDataEntry: 'skipDataEntry'
  };
  permissionList: LovmasterModel[] = [];
  entity = new LovmasterModel();

  alllovList: any;
  LovList: any;
  isOtherlovSelected: boolean = true;
  otherLov: boolean = true;
  isReadOnly: boolean = false;
 

  // selectedRequestTypes: PermissionModel[];
  constructor(
    
    private activateRoute: ActivatedRoute,
    private lovService: LovService,

    private httpClient: WebHttpClient,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService,
    allocationService: AllocationService,
    notifyService: NotificationService,
    router: Router,
    branchService: BranchService,
    
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
    this.router.navigate(['/admin/lov/list/:id'],{skipLocationChange: true});  
  }
  
  ngOnInit(): void {
    // this.initForm();
         const requests: any[] = [];
    if (this.recId > 0) {
      this.isReadOnly = true;
      requests.push(this.getLovDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.LovList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        
      }
    });
    this.getAllLov();
    this.getLov();

  
    // this.getUserType();
  }

  initForm() {
    this.formInput = new FormGroup({
      lovName: new FormControl('',[Validators.required]),
      value: new FormControl(''),
      status: new FormControl('',),
      isDynamic: new FormControl(''),
      daysRequired: new FormControl(''),
      skipDataEntry :new FormControl('',)
    });
  }
 
  getAllLov() {
    const model: SortFilterModel = new SortFilterModel();
    model.length = 1000;
    this.lovService.getAllData(model).subscribe((response: any) => {
    this.permissionList = response.data;

      //  this.roleList = _.uniqBy(this.roleList)
    });
  }

  onLovSelection(value: any) {
    if (value.includes('REQUESTTYPE')) {
      this.isOtherlovSelected = true;
      this.formInput.controls[this.properties.status].setValidators([Validators.required]);
      this.formInput.controls[this.properties.skipDataEntry].setValidators([Validators.required]); 
      this.formInput.controls[this.properties.value].setValidators([Validators.required]);
      this.formInput.controls[this.properties.isDynamic].setValidators([Validators.required]);
      this.formInput.controls[this.properties.daysRequired].setValidators([Validators.required]);
    } else {
      this.isOtherlovSelected = false;
      this.formInput.controls[this.properties.value].setValidators([Validators.required]);
      this.formInput.controls[this.properties.isDynamic].clearValidators();
      this.formInput.controls[this.properties.daysRequired].clearValidators();
      this.formInput.controls[this.properties.status].setValidators([Validators.required]);
      this.formInput.controls[this.properties.skipDataEntry].clearValidators();
    }
      this.formInput.controls[this.properties.value].updateValueAndValidity(); 
      this.formInput.controls[this.properties.isDynamic].updateValueAndValidity();
      this.formInput.controls[this.properties.daysRequired].updateValueAndValidity();
      this.formInput.controls[this.properties.status].updateValueAndValidity();
      this.formInput.controls[this.properties.skipDataEntry].updateValueAndValidity();

  }
  

  getLov() {
    this.lovService.getlovName().subscribe((response: any) => {
      this.alllovList = response.data;
      console.log(this.alllovList);
      this.onLovSelection(response.data.lovName);
    });
  }

 
  getLovDetails() {
    const cmsMasterLovId = {
       
        "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.lovService.getDataById(cmsMasterLovId)
    .subscribe((response) => {
      this.entity = response;
      this.isEdit = true;
      console.log(this.entity)
      this.onLovSelection(this.entity.lovName);
      // if(this.entity.lovName === "REQUESTTYPE"){
      //   this.isOtherlovSelected = true;
      // } else {
      //   this.isOtherlovSelected = false;
      // }
      console.log(response.cmsMasterLovId);
      this.formInput.patchValue({
      lovName: this.entity.lovName,
      value: this.entity.value,
      status:this.entity.status,
      isDynamic:this.entity.isDynamic,
      daysRequired:this.entity.daysRequired,
      skipDataEntry: this.entity.skipDataEntry 
        
});
         
    });
  
}
  rolePostData() {
    const data = {
      lovName : this.formInput.controls[this.properties.lovName].value,
      value : this.formInput.controls[this.properties.value].value,
      status : this.formInput.controls[this.properties.status].value,
      isDynamic : this.formInput.controls[this.properties.isDynamic].value,
      daysRequired : this.formInput.controls[this.properties.daysRequired].value,
      skipDataEntry: this.formInput.controls[this.properties.skipDataEntry].value 
    };
    //this.postData = data;
    this.lovService.addData(data).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(['/admin/lov/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('Data','Create Successfully');
    });
  }
  updatePostData(){
    this.isEdit = !this.isEdit;
    const lovId =  this.entity && this.entity?.cmsMasterLovId > 0 ? this.entity?.cmsMasterLovId : 0;
    const data = {
    cmsMasterLovId : lovId,
    lovName : this.formInput.controls[this.properties.lovName].value,
    value : this.formInput.controls[this.properties.value].value,
    status : this.formInput.controls[this.properties.status].value,
    isDynamic : this.formInput.controls[this.properties.isDynamic].value,
    daysRequired : this.formInput.controls[this.properties.daysRequired].value,
    skipDataEntry: this.formInput.controls[this.properties.skipDataEntry].value
  };
  if(this.recId > 0){ 
    this.lovService.updateData(lovId, data).subscribe((res : any)=>{
      console.log(res)
      this.router.navigate(['/admin/lov/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('Data','Update Successfully');
    })
  }
  }
}

