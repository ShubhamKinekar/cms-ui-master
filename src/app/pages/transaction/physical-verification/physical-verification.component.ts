import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent } from 'src/app/shared/base';
import { BaseDataService, BranchService, LoginService, RoleService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';import { PhysicalVerificationModel } from 'src/app/shared/models/physical-verification.model';
import { PhysicalVerificationService } from 'src/app/shared/services/transaction/physical-verification.service';
import { Status } from 'src/app/shared/enums';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { BarcodePopupComponent } from 'src/app/shared/components/barcode-popup/barcode-popup.component';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
;

@Component({
  selector: 'app-physical-verification',
  templateUrl: './physical-verification.component.html',
  styleUrls: ['./physical-verification.component.css']
})
export class PhysicalVerificationComponent  extends BaseDetailComponent<PhysicalVerificationModel> implements OnInit {

  properties: any = {
    barcode: 'barcode',
    podNo:'podNo',
    receiptDate:'receiptDate'
  };
  constructor(
    private verification: PhysicalVerificationService,
     router: Router,private httpClient: WebHttpClient,
     activatedRoute: ActivatedRoute,dialog: MatDialog,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService:BranchService
  ) { 
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.formInput = new FormGroup({
      barcode: new FormControl('', [Validators.required, validateWhiteSpace]),
      podNo: new FormControl(''),
      receiptDate: new FormControl(''),

    });
  }

  saveData(status: Status) {
    const data = new PhysicalVerificationModel();
    data.barcode = this.formInput.controls[this.properties.barcode].value;
    data.status = status ;
    //this.verification.savePhysicalVerification(data).subscribe((resp: any) => {
    this.httpClient.put('trans/physicalVerification/update', data).subscribe((resp: any) => {
      if( resp.status === "Physical verification already done"){
        const confirmDialog = this.dialog.open(BarcodePopupComponent, {
          data: {
            title: 'Alert',
            message: 'Physical verification already done!'
        }
       });
      } else{
        this.notifyService.showSuccess("Data Saved", "successfully");
        this.formInput.controls[this.properties.barcode].setValue(null);
      }
    });
  
  }
}
