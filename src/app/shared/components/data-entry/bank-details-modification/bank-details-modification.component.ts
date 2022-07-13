import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent } from '../../../base';
import { BankModel, CDSLBankModel, NSDLBankModel, LovModel } from '../../../models';
import { Location } from "@angular/common";
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { CDSLBankListComponent } from '../../bank-list/cdsl/cdsl-bank-list.component';
import { NSDLBankListComponent } from '../../bank-list/nsdl/nsdl-bank-list.component';
import { EmitType, ServiceType } from 'src/app/shared/enums';
import { BankService } from 'src/app/shared/services/transaction/data-entry/bank.service';
import { forkJoin, Observable } from 'rxjs';
import { BaseDataService, BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

@Component({
  selector: 'app-bank-details-modification',
  templateUrl: './bank-details-modification.component.html',
  styleUrls: ['./bank-details-modification.component.css'],
})
export class BankDetailsModificationComponent
  extends BaseDetailComponent<BankModel>
  implements OnInit, OnChanges {

  @Input() changesApplicableTo: LovModel[] = [];
  @Input() service: ServiceType = ServiceType.None;
  @Input() cmsDataEntryId: number = 0;
  @Input() disableForm: boolean = false;


  properties: any = {
    accountType: 'accountType',
    bankName: 'bankName',
    bankCode: 'bankCode',
    bankAccountType: 'bankAccountType',
    bankAccountNo: 'bankAccountNo',
    bankAddress1: 'bankAddress1',
    bankAddress2: 'bankAddress2',
    bankCity: 'bankCity',
    bankPincode: 'bankPincode',
    bankIfscCode: 'bankIfscCode',
    bankMicrCode: 'bankMicrCode',
    accountCurrency: 'accountCurrency',
  };
  bankAccountTypes: LovModel[] = [];
  accountTypes: LovModel[] = [];
  constructor(private bankService: BankService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,router: Router,branchService:BranchService) {
      super(dialog,activatedRoute, location,frontendHelperService,
        notifyService, loginService,
         allocationService, router,branchService);    this.formInit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.changesApplicableTo && changes.changesApplicableTo.currentValue
      && changes && changes.service && changes.service.currentValue) {
      this.changesApplicableTo = changes.changesApplicableTo.currentValue;
      this.onChanges();
      if(changes.disableForm.currentValue){
        this.disableForm = changes.disableForm.currentValue;
      }
      if(this.disableForm){
        this.formInput.disable();
      }
    }
    if (changes && changes.service && changes.service.currentValue) {
      this.service = changes.service.currentValue;
      this.bankService.service = this.service;
    }
    if (this.service != ServiceType.None && this.changesApplicableTo.length > 0) {
      this.onChanges();
    }
    

  }
  onChanges() {
    this.entity = null;
    this.initData();
  }

  ngOnInit(): void {
    this.formInput.statusChanges.subscribe(() => {
      this.isFormValid();
    });
  }

  saveData() {
    return this.bankService.updateData(this.recId, this.getFormValues());
   
  }
  getFormValues(): BankModel {
    const model: BankModel = this.entity ? this.entity : new BankModel();
    model.cmsBankDetailsId = this.entity && this.entity.cmsBankDetailsId ? this.entity?.cmsBankDetailsId : 0;
    model.cmsDataEntryId = this.recId;
    if (this.service == ServiceType.Checker) {
      model.cmsDataEntryId = this.cmsDataEntryId;
      model.cmsCheckerId = this.recId;
    }
    model.accountType = this.formInput.controls[this.properties.accountType].value as number;
    model.bankName = this.formInput.controls[this.properties.bankName].value as string;
    model.bankIfscCode = this.formInput.controls[this.properties.bankIfscCode].value as string;
    model.bankCode = this.formInput.controls[this.properties.bankCode].value as string;
    model.bankAccountType = this.formInput.controls[this.properties.bankAccountType].value as string;
    model.bankAccountNo = this.formInput.controls[this.properties.bankAccountNo].value as string;
    model.bankAddress1 = this.formInput.controls[this.properties.bankAddress1].value as string;
    model.bankAddress2 = this.formInput.controls[this.properties.bankAddress2].value as string;
    model.bankCity = this.formInput.controls[this.properties.bankCity].value as string;
    model.bankPincode = this.formInput.controls[this.properties.bankPincode].value as string;
    model.bankMicrCode = this.formInput.controls[this.properties.bankMicrCode].value as string;
    model.accountCurrency = this.formInput.controls[this.properties.accountCurrency].value as string;
    return model;
  }

  initData() {
    const requests: Observable<any>[] = [];
    if (this.recId > 0) {
      requests.push(this.getData());
    }
    forkJoin(requests).subscribe(responses => {
      this.entity = responses[0];
      this.setData();
      this.isFormValid();
    });
  }
  setData() {
    this.formInput.patchValue({
      //accountType: new FormControl(''),
      bankName: this.entity?.bankName,
      bankCode: this.entity?.bankCode,
      bankAccountType: this.entity?.bankAccountType,
      bankAccountNo: this.entity?.bankAccountNo,
      bankAddress1: this.entity?.bankAddress1,
      bankAddress2: this.entity?.bankAddress2,
      bankPincode: this.entity?.bankPincode,
      bankCity: this.entity?.bankCity,
      bankIfscCode: this.entity?.bankIfscCode,
      bankMicrCode: this.entity?.bankMicrCode,
      accountCurrency: this.entity?.accountCurrency,
    });
  }

  getData(): Observable<any> {
    return this.bankService.getDataByDependentId(this.recId);
  }

  formInit() {
    this.formInput = new FormGroup({
      accountType: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankName: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankCode: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankAccountType: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankAccountNo: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankAddress1: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankAddress2: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankPincode: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankCity: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankIfscCode: new FormControl('',[Validators.required, validateWhiteSpace]),
      bankMicrCode: new FormControl('',[Validators.required, validateWhiteSpace]),
      accountCurrency: new FormControl('',[Validators.required, validateWhiteSpace]),
    });
  }

  searchBank() {
    if (this.changesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('cdsl') > -1) > -1) {
      const dialogRef = this.dialog.open(CDSLBankListComponent);
      dialogRef.afterClosed().subscribe((res: CDSLBankModel) => {
        this.formInput.patchValue({
          //accountType: new FormControl(''),
          bankName: res?.bankName,
          bankCode: res?.bankCode,
          bankAddress1: res?.address1,
          bankAddress2: res?.address2,
          bankPincode: res?.zip,
          bankCity: res?.city,
        });
      });
    }
    if (this.changesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('nsdl') > -1) > -1) {
      const dialogRef = this.dialog.open(NSDLBankListComponent);
      dialogRef.afterClosed().subscribe((res: NSDLBankModel) => {
        this.formInput.patchValue({
          //accountType: new FormControl(''),
          bankName: res?.bankName,
          bankAddress1: res?.address1,
          bankAddress2: res?.address2,
          bankPincode: res?.zip,
          bankCity: res?.city,
        });
      });
    }
    else {

    }
  }

  isFormValid(isDestroyed = false) {
    this.frontendHelperService.emitFormValid(EmitType.BankDetails,
      this.formInput.valid,
      isDestroyed);
  }

}
