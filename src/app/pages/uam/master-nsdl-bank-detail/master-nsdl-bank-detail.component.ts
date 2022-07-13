import { Component, OnInit } from '@angular/core';
import { MasterNsdlBankService } from 'src/app/shared/services/uam/master-nsdl-bank.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { BaseDataService, BranchService, LoginService } from 'src/app/shared/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { MasterNsdlBankModel } from 'src/app/shared/models/master-nsdl-bank.model';
import { BaseDetailComponent } from 'src/app/shared/base';

import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-master-nsdl-bank-detail',
  templateUrl: './master-nsdl-bank-detail.component.html',
  styleUrls: ['./master-nsdl-bank-detail.component.css']
})
export class MasterNsdlBankDetailComponent 
extends BaseDetailComponent<MasterNsdlBankModel> 
implements OnInit {

  isEdit = false;
  properties: any = {
    bankName: 'bankName',
    branchName: 'branchName',
    ifscCode: 'ifscCode',
    micrCode: 'micrCode',
    address1: 'address1',
    address2: 'address2',
    city: 'city',
    state: 'state',
    zip: 'zip',
    country: 'country'
  };
  MasterNsdlBankList: any;

  constructor(

    private masternsdlbankService: MasterNsdlBankService,
    dialog: MatDialog, 
    activatedRoute: ActivatedRoute,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService,
    allocationService: AllocationService,
    notifyService: NotificationService,
    router: Router,
    branchService:BranchService
  ) {
    super(dialog,activatedRoute, location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
           this.initForm();
  }

  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getEmployeesDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.MasterNsdlBankList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        
      }
    });
  }
  initForm() {
    this.formInput = new FormGroup({
      bankName: new FormControl('', [Validators.required, validateWhiteSpace]),
      branchName: new FormControl('', [Validators.required, validateWhiteSpace]),
      ifscCode: new FormControl('', [Validators.required, validateWhiteSpace]),
      micrCode: new FormControl('', [Validators.required, validateWhiteSpace]),
      address1: new FormControl('', [Validators.required, validateWhiteSpace]),
      address2: new FormControl('', [Validators.required, validateWhiteSpace]),
      city: new FormControl('', [Validators.required, validateWhiteSpace]),
      state: new FormControl('', [Validators.required, validateWhiteSpace]),
      zip: new FormControl('', [Validators.required, validateWhiteSpace]),
      country: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }
  getEmployeesDetails() {
    const masternsdlbankId = {
       
        "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.masternsdlbankService.getDataById(masternsdlbankId)
    .subscribe((response) => {
      this.entity = response;
      this.isEdit = true;
      console.log(this.entity)
      console.log(response.masternsdlbankId);
      this.formInput.patchValue({
        bankName: this.entity.bankName,
        branchName: this.entity.branchName,
        ifscCode:this.entity.ifscCode,
        micrCode:this.entity.micrCode,
        address1:this.entity.address1,
        address2: this.entity.address2,
        city: this.entity.city, 
        state: this.entity.state,
        zip: this.entity.zip, 
        country: this.entity.country 
 
        
});
         
    });
  
}
  rolePostData() {
    const data = {
      bankName : this.formInput.controls[this.properties.lovName].value,
      vbranchNamealue : this.formInput.controls[this.properties.branchName].value,
      ifscCode : this.formInput.controls[this.properties.ifscCode].value,
      micrCode : this.formInput.controls[this.properties.micrCode].value,
      address1 : this.formInput.controls[this.properties.address1].value,
      address2: this.formInput.controls[this.properties.address2].value,
      city: this.formInput.controls[this.properties.city].value, 
      state: this.formInput.controls[this.properties.state].value, 
      zip: this.formInput.controls[this.properties.zip].value, 
      country: this.formInput.controls[this.properties.country].value, 
 
    };
    //this.postData = data;
    this.masternsdlbankService.addData(data).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(['/admin/lov/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('Data','Create Successfully');
    });
  }
  updatePostData(){
    this.isEdit = !this.isEdit;
    const bankId =  this.entity && this.entity?.masternsdlbankId > 0 ? this.entity?.masternsdlbankId : 0;
    console.log(bankId);
    const data = {
    masternsdlbankId : bankId,
    bankName : this.formInput.controls[this.properties.bankName].value,
    vbranchNamealue : this.formInput.controls[this.properties.branchName].value,
    ifscCode : this.formInput.controls[this.properties.ifscCode].value,
    micrCode : this.formInput.controls[this.properties.micrCode].value,
    address1 : this.formInput.controls[this.properties.address1].value,
    address2: this.formInput.controls[this.properties.address2].value,
    city: this.formInput.controls[this.properties.city].value, 
    state: this.formInput.controls[this.properties.state].value, 
    zip: this.formInput.controls[this.properties.zip].value, 
    country: this.formInput.controls[this.properties.country].value, 
  };
  if(this.recId > 0){ 
    this.masternsdlbankService.updateData(bankId, data).subscribe((res : any)=>{
      console.log(res)
      this.router.navigate(['/admin/lov/list/:id'],{skipLocationChange: true});
      this.notifyService.showSuccess('Data','Update Successfully');
    })
  }
  }

}
