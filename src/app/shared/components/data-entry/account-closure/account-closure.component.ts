import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from '../../../base';
import { AccountClosureModel, LovModel } from '../../../models';
import { Location } from "@angular/common";
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseDataService, BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { EmitType, LOV, ServiceType } from 'src/app/shared/enums';
import { AccountCloserService } from 'src/app/shared/services/transaction/data-entry/account-closer.service';
import * as _ from 'lodash';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-account-closure',
  templateUrl: './account-closure.component.html',
  styleUrls: ['./account-closure.component.css'],
})
export class AccountClosureComponent
  extends BaseDetailComponent<AccountClosureModel>
  implements OnInit,OnChanges {
    @Input() service:ServiceType = ServiceType.None;
    @Input() changesApplicableTo: LovModel[] = [];
    @Input() cmsDataEntryId: number = 0;
    allData: AccountClosureModel[] = [];
  matcher = new ErrorState();
  properties: any = {
    dpId: 'dpId',
    dpHolding: 'dpHolding',
    targetDepository: 'targetDepository',
    targetDpId: 'targetDpId',
    targetClientId: 'targetClientId',
    panNo: 'panNo',
    tcsCode: 'tcsCode',
    tradingClosureStatus: 'tradingClosureStatus'
  };
  tcsCode: any;
  loveName: any;
  tradingStatus: any;
  constructor(dialog: MatDialog, activatedRoute: ActivatedRoute,private accountClosureService:AccountCloserService,
     location: Location, frontendHelperService: FrontendHelperService,
     loginService: LoginService, allocationService: AllocationService,
     notifyService: NotificationService,router: Router,branchService:BranchService) {
      super(dialog,activatedRoute,location,frontendHelperService,
        notifyService, loginService,
         allocationService, router,branchService);    
         this.initForm();
  }
  initForm() {
    this.formInput = new FormGroup({
      dpId: new FormControl('',    ),
      dpHolding: new FormControl('',    ),
      targetDepository: new FormControl('',    ),
      targetDpId: new FormControl('',    ),
      targetClientId: new FormControl('',    ),
      panNo: new FormControl('',    ),
      tcsCode: new FormControl(''),
      tradingClosureStatus: new FormControl('')

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.service && changes.service.currentValue) {
      this.service = changes.service.currentValue;
      this.accountClosureService.service = this.service;
      this.initData();
    }
  }


  ngOnInit(): void {
    this.formInput.statusChanges.subscribe(() => {
      this.isFormValid();
      
    });
    this.getTcsType();
    this.getTradingClosureStatus();
  }

  isFormValid(isDestroyed = false) {
    this.frontendHelperService.emitFormValid
      (EmitType.AccountClosure,
        this.formInput.valid,
        isDestroyed);
  }

  initData() {
   // const requests: Observable<any>[] = [];
    if (this.recId > 0) {
      this.getData();
    }
    // forkJoin(requests).subscribe(responses => {
    //   this.entity = responses[0];
    //   this.setData();
    //   this.isFormValid();
    // });
  }

  setData() {
    this.formInput.patchValue({
      dpId: this.entity?.dpId as string,
      dpHolding: this.entity?.dpHolding as string,
      targetClientId: this.entity?.targetClientId as string,
      targetDepository: this.entity?.targetDepository as string,
      targetDpId: this.entity?.targetDpId as string,
      panNo: this.entity?.panNo as string,
      tcsCode: this.entity?.tcsCode as string,
      tradingClosureStatus: this.entity?.tradingClosureStatus as string,

     
    });
  }

  getData() {
    return this.accountClosureService.getDataByDependentId(this.recId).subscribe(resp => {
      this.entity = resp;
      this.setData();
      this.isFormValid();
    });
    //return this.accountClosureService.getDataByDependentId(this.recId);
  }

  getTcsType() {
    this.accountClosureService.getLOVData(LOV.tscCode).subscribe((response: any) => {
      this.tcsCode = response.data;
    });
  }

  getTradingClosureStatus() {
    this.accountClosureService.getLOVData(LOV.tradingClosureStatus).subscribe((response: any) => {
      this.tradingStatus = response.data;
    });
  }
  
  saveData() {
    return this.accountClosureService.updateData(this.recId, this.getFormValues());
  }

  getFormValues(): AccountClosureModel {
    const model: AccountClosureModel = this.entity ? this.entity : new AccountClosureModel();
    model.cmsAccountCloserId = this.entity && this.entity.cmsAccountCloserId > 0 ? this.entity?.cmsAccountCloserId : 0;
    model.cmsDataEntryId = this.recId;
    if (this.service == ServiceType.Checker) {
      model.cmsDataEntryId = this.cmsDataEntryId;
      model.cmsCheckerId = this.recId;
    }
     model.dpId = this.formInput.controls[this.properties.dpId].value as string;
     model.dpHolding = this.formInput.controls[this.properties.dpHolding].value as string;
     model.targetDepository = this.formInput.controls[this.properties.targetDepository].value as string;
     model.targetDpId = this.formInput.controls[this.properties.targetDpId].value as string;
     model.targetClientId = this.formInput.controls[this.properties.targetClientId].value as string;
     model.panNo = this.formInput.controls[this.properties.panNo].value as string;
     model.tcsCode = this.formInput.controls[this.properties.tcsCode].value as string;
     model.tradingClosureStatus = this.formInput.controls[this.properties.tradingClosureStatus].value as string;

    //model.incomeRangeId = this.formInput.controls[this.properties.incomeRangeId].value?.cmsMasterNSDLIncomeRangeId as number;

    return model;
  }


}
