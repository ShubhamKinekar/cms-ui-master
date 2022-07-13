import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { EmitType, LOV, PatternValidation, ServiceType, Status } from 'src/app/shared/enums';
import { BaseListModel, DataEntryModel, DynamicRequestModel, DynamicRequestTypeModel, FormValidityModel, LovModel, SubLovModel } from 'src/app/shared/models';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { DataEntryService } from 'src/app/shared/services/transaction/data-entry/data-entry.service';
import { BaseDataService, BranchService, LoginService, LOVService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { DynamicRequestTypeService } from 'src/app/shared/services/common/dynamic-request-type.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { AddressModificationCorrespondanceService } from 'src/app/shared/services/transaction/data-entry/address-modification-correspondance.service';
import { AddressModificationCorrespondenceComponent } from 'src/app/shared/components/data-entry/address-modification-correspondence/address-modification-correspondence.component';
import { AddressModificationPermanentComponent } from 'src/app/shared/components/data-entry/address-modification-permanent/address-modification-permanent.component';
import { ContactDetailsModificationComponent } from 'src/app/shared/components/data-entry/contact-details-modification/contact-details-modification.component';
import { BankDetailsModificationComponent } from 'src/app/shared/components/data-entry/bank-details-modification/bank-details-modification.component';
import { IncomeRangeRequestComponent } from 'src/app/shared/components/data-entry/income-range-request/income-range-request.component';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { AccountClosureComponent } from 'src/app/shared/components/data-entry/account-closure/account-closure.component';

interface accountdetails {
  value: string;
  text: string;
}

interface accountType {
  value: string;
  text: string;
}

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
})
export class DataEntryComponent
  extends BaseDetailComponent<DataEntryModel>
  implements OnInit, OnDestroy {
  caseInitiationDetailSub!: Subscription;
  userType = 'Existing user';
  isReadOnly = true;
  selectedToppings: any;
  isExistingUser = true;
  isholdButton: boolean = false;
  allocateButton: boolean = false;
  entity = new DataEntryModel();
  properties: any = {
    cmsDataEntryId: 'cmsDataEntryId',
    barcode: 'barcode',
    panNo: 'panNo',
    awbNo: 'awbNo',
    tradingAccountNo: 'tradingAccountNo',
    dematAccountNo: 'dematAccountNo',
    clientNameTrading: 'clientNameTrading',
    clientNameDemat: 'clientNameDemat',
    customerEmail: 'customerEmail',
    customerMobile: 'customerMobile',
    requestType: 'requestType',
    dataEntryStatus: 'dataEntryStatus',
    dataEntryRemark: 'dataEntryRemark',
    rejectionRemarks: 'rejectionRemarks',
    otherRejectionRemarks: 'otherRejectionRemarks',
    branchCodeEmail: 'branchCodeEmail',
    branchCode: 'branchCode',
    employeeCode: 'employeeCode',
    // selectAccount: 'selectAccount',
    // selectAccountFiled: 'selectAccountFiled',
    otherRequestTypeValue: 'otherRequestTypeValue',
    changesApplicable: 'changesApplicable',
    bacode: 'bacode',
    requesttypeOther: 'requesttypeOther'
  };

  selectedRequestTypes: LovModel[] = [];
  dataEntryStatuses: LovModel[] = [];
  changesApplicableList: LovModel[] = [];
  requestTypeList: LovModel[] = [];
  formValidity: FormValidityModel[] = [];
  dynamicRequestTypes: DynamicRequestModel[] = [];

  rejectionRemarks: SubLovModel[] = [];
  filteredRejectionRemarks: SubLovModel[] = [];
  selecteddRejectionRemarks: SubLovModel[] = [];
  isOtherRejectionSelected: boolean = false;
  isRejectStatusSelected: boolean = false;
  isRequiredField: boolean = true;
  isdemat: boolean = false;
  requestNewUser:boolean = false;
  istrading: boolean = false;
  selectedChangesApplicableTo: LovModel[] = [];

  @ViewChild(AddressModificationCorrespondenceComponent) addressCoressComp?: AddressModificationCorrespondenceComponent;
  @ViewChild(AddressModificationPermanentComponent) addressPermComp?: AddressModificationPermanentComponent;
  @ViewChild(ContactDetailsModificationComponent) contactComp?: ContactDetailsModificationComponent;
  @ViewChild(BankDetailsModificationComponent) bankingComp?: BankDetailsModificationComponent;
  @ViewChild(IncomeRangeRequestComponent) incomeComp?: IncomeRangeRequestComponent;
  @ViewChild(AccountClosureComponent) accountCloComp?: AccountClosureComponent;
  isVisibledata: boolean = false;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    private lovService: LOVService,
    private dataEntryService: DataEntryService,
    private dynamicRequestTypeService: DynamicRequestTypeService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService, branchService: BranchService
  ) {
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
      allocationService, router, branchService);
    this.initForm();
    this.caseInitiationDetailSub = this.route.params.subscribe((params) => {
      this.recId = params['id'] ? +params['id'] : 0;
    });
  }
  ngOnDestroy(): void {
    this.frontendHelperSub?.unsubscribe();
  }
  ngOnInit(): void {
    // this.formInput.controls[this.properties.barcode].setValidators([Validators.required, validateWhiteSpace]);
    // this.formInput.controls[this.properties.panNo].setValidators([Validators.required, validateWhiteSpace,
    // Validators.pattern(PatternValidation.PanCard),
    // ]);
    // this.formInput.controls[this.properties.changesApplicable].setValidators([Validators.required, validateWhiteSpace]);
    // this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);

    this.frontendHelperSub = this.frontendHelperService.formValidObservable
      .subscribe((validity) => {
        if (validity.emitType) {
          const indx = this.formValidity.findIndex(f => f.emitType == validity.emitType);
          if (indx == -1) {
            this.formValidity.push(validity);
          }
          else {
            this.formValidity[indx] = validity;
          }
          if (validity.isDestroyed) {
            this.formValidity = this.formValidity.filter(f => f.emitType != validity.emitType);
          }
        }
        !this.isSubmitDisabled();
      });
    this.initData();
  }
  isSubmitDisabled() {
    if (this.isRejectStatusSelected) {
      this.addDynamicRequestTypes(false);
      this.formInput.updateValueAndValidity();
    }
    return !(this.formValidity
      .filter(f => f.isValid).length == this.selectedRequestTypes.filter(f => f.isDynamic != 'N').length
      && this.formInput.valid);
  }
 

  initForm() {
    this.formInput = new FormGroup({
      barcode: new FormControl(''),
      awbNo: new FormControl(''),
      panNo: new FormControl(''),
      dematAccountNo: new FormControl(''),
      tradingAccountNo: new FormControl(''),
      dataEntryStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      dataEntryRemark: new FormControl(''),
      clientNameTrading: new FormControl(''),
      clientNameDemat: new FormControl(''),
      customerEmail: new FormControl(''),
      customerMobile: new FormControl(''),
      branchCodeEmail: new FormControl(''),
      branchCode: new FormControl(''),
      bacode: new FormControl(''),
      requesttypeOther: new FormControl(''),
      employeeCode: new FormControl(''),
      requestType: new FormControl(null),
      // selectAccountFiled: new FormControl(null, []),
      // selectAccount: new FormControl(null, []),
      changesApplicable: new FormControl(''),
      rejectionRemarks: new FormControl(''),
      otherRejectionRemarks: new FormControl(''),
      docReceived: new FormControl(this.docReceived)
    });
  }

  initData() {
    this.dynamicRequestTypeService.service = ServiceType.DataEntry;

    const requests: Observable<any>[] = [];
    requests.push(this.getRequestType());
    requests.push(this.getDataEntryStatus());
    requests.push(this.getChangesApplicableTo());
    if (this.recId) {
      requests.push(this.getData());
      requests.push(this.getDynamicRequestTypes());
    }
    requests.push(this.getRejectRemarks());

    forkJoin(requests).subscribe((responses) => {

      this.requestTypeList = responses[0].data;
      this.dataEntryStatuses = responses[1].data;
      this.changesApplicableList = responses[2].data;
      if (this.recId > 0) {
        this.entity = responses[3];
        this.dynamicRequestTypes = responses[4];
        this.rejectionRemarks = responses[5].data;
        this.setData();
      }
    });
  }
  getRejectRemarks() {
    return this.lovService
      .getSubLOVData(LOV.RejectionRemarks)
    // .subscribe((response: any) => {
    //   this.rejectionRemarks = response.data;
    // });
  }

  getChangesApplicableTo() {
    return this.lovService
      .getLOVData(LOV.ChangesApplicableTo);
    // .subscribe((response: any) => {
    //   this.changesApplicableList = response.data;
    // });
  }
  getDynamicRequestTypes(): Observable<DynamicRequestModel[]> {
    return this.dynamicRequestTypeService.getDataByDependentId(this.recId);
  }

  userTypeChange(isUserExist:boolean){
    this.isExistingUser = isUserExist; 
    if(this.isExistingUser){
      this.isRequiredField = true;
      //this.isdemat=true;
      this.requestNewUser = false;
      //this.istrading=true;
      this.formInput.controls[this.properties.barcode].setValidators([Validators.required, validateWhiteSpace]);
      this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);
      this.formInput.controls[this.properties.panNo].setValidators( [Validators.required, validateWhiteSpace,
        Validators.pattern(PatternValidation.PanCard),
        ]);
       // this.formInput.controls[this.properties.changesApplicableTo].setValidators([Validators.required, validateWhiteSpace]);

     // this.setDematValidators();
    } else {
     // this.isRejectStatusSelected = false;
      this.isRequiredField = false;
      this.isdemat=false;
      this.requestNewUser = true;
      this.istrading=false;
      this.formInput.controls[this.properties.barcode].setValidators([Validators.required, validateWhiteSpace]);
      this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);
      this.formInput.controls[this.properties.panNo].clearValidators();
      //this.formInput.controls[this.properties.changesApplicableTo].clearValidators();
      this.formInput.controls[this.properties.requestType].clearValidators();
     // this.formInput.controls[this.properties.].clearValidators();
      //this.formInput.controls[this.properties.changesApplicableTo].setValidators([Validators.required]);
    }
    this.formInput.controls[this.properties.barcode].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();
    this.formInput.controls[this.properties.panNo].updateValueAndValidity();
   // this.formInput.controls[this.properties.changesApplicableTo].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();

  }

  setData() {
    this.selectedRequestTypes = this.requestTypeList.filter(f =>
      this.entity?.requestType?.split(',')
        .includes(f.cmsMasterLovId ? f.cmsMasterLovId.toString() : '0'));
    this.addDynamicRequestTypes(true);
    this.setRejectionRemarks();
    if (this.entity?.rejectionRemarks) {
      //this.onRejectRemarkSelection(this.entity.rejectionRemarks?.split(','));
      this.onRejectRemarkSelection(this.entity.rejectionRemarks?.split(','));
      this.selecteddRejectionRemarks = this.filteredRejectionRemarks.filter(f =>
        this.entity?.rejectionRemarks?.split(',')
          .includes(f.cmsMasterLovSub ? f.cmsMasterLovSub.toString() : '0'));
    }

    if (this.entity.dataEntryStatus) {
      this.onStatusSelection(this.entity.dataEntryStatus);
    }

    if (this.entity.requestType) {
      this.onRequestTypeSelection(this.entity.requestType);
    }

    this.selectedChangesApplicableTo = this.changesApplicableList.filter(f =>
      this.entity?.changesApplicableTo?.split(',')
        .includes(f.cmsMasterLovId ? f.cmsMasterLovId.toString() : '0'));

    this.formInput.patchValue({
      barcode: this.entity?.barcode,
      awbNo: this.entity?.awbNo,
      tradingAccountNo: this.entity?.tradingAccountNo,
      dematAccountNo: this.entity?.dematAccountNo,
      panNo: this.entity?.panNo,
      receiptDate: this.entity?.receiptDate,
      // inwardMode: this.entity?.inwardMode,
      clientNameTrading: this.entity?.clientNameTrading,
      clientNameDemat: this.entity?.clientNameDemat,
      customerEmail: this.entity?.customerEmail,
      customerMobile: this.entity?.customerMobile,
      branchCodeEmail: this.entity?.branchCodeEmail,
      branchCode: this.entity?.branchCode,
      bacode: this.entity?.bacode,
      otherRejectionRemarks: this.entity?.otherRejectionRemarks,
      requesttypeOther: this.entity?.requesttypeOther,
      //   rmCodeEmail: this.entity?.rmCodeEmail,
      requestType: this.selectedRequestTypes,
      fileUpload1: this.entity?.fileUpload1,
      fileUpload2: this.entity?.fileUpload2,
      fileUpload3: this.entity?.fileUpload3,
      dataEntryStatus: this.entity?.dataEntryStatus,
      dataEntryRemark: this.entity?.dataEntryRemark,
      rejectionRemarks: this.entity?.rejectionRemarks?.split(','),
      changesApplicable: this.selectedChangesApplicableTo
    });
    this.isExistingUser = this.entity.isUserExist == 'Y';
    this.docReceived = this.entity.docReceived == 'Y';
    this.rmCodes = this.entity.rmCodeEmail;
    if (this.loginService.GetUser().userId != this.entity.allocatedTo &&
      this.entity.status != Status.DataEntryProcessed) {
      this.formInput.disable();
      this.allocateButton = true;
      this.disableForm = true;
    }
 
    this.userTypeChange(this.isExistingUser);

    if (this.entity.status === Status.DataEntryHold) {
      this.isholdButton = true;
      this.allocateButton = false;
    }
    if (this.entity?.status == Status.DataEntryProcessed) {
      this.formInput.disable();
      this.disableForm = true;
    }
    if(this.checkFormStage()){
      this.isholdButton = false;
      this.allocateButton = false;
    }

  }

  getRequestType(): Observable<BaseListModel<LovModel>> {
    return this.lovService.getLOVData(LOV.RequestType);
  }

  getDataEntryStatus(): Observable<BaseListModel<LovModel>> {
    return this.lovService.getLOVData(LOV.DataEntryStatus);
  }

  getData(): Observable<DataEntryModel> {
    return this.dataEntryService.getDataById(this.recId);
  }

  getFormValues(status: Status) {
    let model: DataEntryModel = new DataEntryModel();
    if (this.entity) {
      model = this.entity;
    }
    model.cmsDataEntryId = this.entity ? this.entity.cmsDataEntryId : 0;
    model.cmsCaseInitiationId = this.entity ? this.entity.cmsCaseInitiationId : 0;
    model.cmsScrutinyId = this.entity ? this.entity.cmsScrutinyId : 0;
    model.barcode = this.formInput.controls[this.properties.barcode].value as string;
    model.tradingAccountNo = this.formInput.controls[this.properties.tradingAccountNo].value as string;
    model.dematAccountNo = this.formInput.controls[this.properties.dematAccountNo].value as number;
    model.panNo = this.formInput.controls[this.properties.panNo].value as string;
    model.awbNo = this.formInput.controls[this.properties.awbNo].value as string;
    //model.receiptDate = ;
    //model.inwardMode = ;
    model.clientNameTrading = this.formInput.controls[this.properties.clientNameTrading].value as string;
    model.clientNameDemat = this.formInput.controls[this.properties.clientNameDemat].value as string;
    model.customerEmail = this.formInput.controls[this.properties.customerEmail].value as string;
    model.customerMobile = this.formInput.controls[this.properties.customerMobile].value as number;
    model.branchCodeEmail = this.formInput.controls[this.properties.branchCodeEmail].value as string;
    model.branchCode = this.formInput.controls[this.properties.branchCode].value as string;
    model.bacode = this.formInput.controls[this.properties.bacode].value as string;
    model.requesttypeOther = this.formInput.controls[this.properties.requesttypeOther].value as string;
    model.dataEntryStatus = this.formInput.controls[this.properties.dataEntryStatus].value as string;
    model.dataEntryRemark = this.formInput.controls[this.properties.dataEntryRemark].value as string;
    model.otherRejectionRemarks = this.formInput.controls[this.properties.otherRejectionRemarks].value as string;
    const rejMarks = this.formInput.controls[this.properties.rejectionRemarks].value as number[];
    model.rejectionRemarks = rejMarks ? rejMarks.toString() : '';
    //.isUserExist = this.isExistingUser;
    model.isUserExist = this.isExistingUser ? 'Y' : 'N';
    model.docReceived = this.docReceived ? 'Y' : 'N';
    //model.employeeCode = this.formInput.controls[this.properties.employeeCode].value as string;
    model.rmCodeEmail = this.rmCodes;
    const requestTypes = this.formInput.controls[this.properties.requestType].value as LovModel[];
    model.requestType = requestTypes.map(f => f.cmsMasterLovId).toString();

    const changesApplicable = this.formInput.controls[this.properties.changesApplicable].value as LovModel[];
    model.changesApplicableTo = changesApplicable.map(f => f.cmsMasterLovId).toString();
    //model.status = status;
    const newStatus: any = status ? status : 'DATA ENTRY ' + this.dataEntryStatuses.find(f => f.cmsMasterLovId == model.dataEntryStatus)?.value?.toUpperCase();
    model.status = newStatus;
    return model;
  }

  getDynamicFormValues() {
    const model = new DynamicRequestTypeModel();
    model.cmsDataEntryId = this.recId;
    const values: DynamicRequestModel[] = [];
    Object.keys(this.formInput.controls).forEach(key => {
      if (key.includes('otherRequestTypeValue')) {
        const req = new DynamicRequestModel();
        req.field = key.replace('otherRequestTypeValue', '');
        req.value = this.formInput.controls[key].value as string;
        req.lovRequestId = parseInt(req.field);
        values.push(req);
      }
    });
    model.dedynamicRTSubList = values;
    return model;
  }

  onRejectRemarkSelection(value: any[]) {
    if (value.includes('0')) {
      this.isOtherRejectionSelected = true;
      this.formInput.controls[this.properties.otherRejectionRemarks].setValidators([Validators.required]);
    } else {
      this.isOtherRejectionSelected = false;
      this.formInput.controls[this.properties.otherRejectionRemarks].clearValidators();
    }
    this.formInput.controls[this.properties.otherRejectionRemarks].updateValueAndValidity();
  }

  onRequestTypeSelection(value: string) {
    if (value.includes('15')) {
      this.isVisibledata = true;
      this.formInput.controls[this.properties.requesttypeOther].setValidators([Validators.required]);
    } else {
      this.isVisibledata = false;
      this.formInput.controls[this.properties.requesttypeOther].clearValidators();
    }
    this.formInput.controls[this.properties.requesttypeOther].updateValueAndValidity();
    //  }
  }

  onStatusSelection(value: string) {

    if (value.includes('44')) {
      this.isRejectStatusSelected = true;
      this.isRequiredField = false;
      this.isdemat = false;
      this.istrading = false;
      this.formInput.controls[this.properties.rejectionRemarks].setValidators([Validators.required]);
      this.formInput.controls[this.properties.panNo].clearValidators();
      this.formInput.controls[this.properties.barcode].clearValidators();
      this.formInput.controls[this.properties.requestType].clearValidators();
      this.formInput.controls[this.properties.changesApplicable].clearValidators();
      !this.isSubmitDisabled();
    } else {
      this.isRejectStatusSelected = false;
      this.formInput.controls[this.properties.rejectionRemarks].clearValidators();
    }
    this.formInput.controls[this.properties.requesttypeOther].updateValueAndValidity();
    this.formInput.controls[this.properties.panNo].updateValueAndValidity();
    this.formInput.controls[this.properties.barcode].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();
    this.formInput.controls[this.properties.changesApplicable].updateValueAndValidity();
    this.formInput.controls[this.properties.rejectionRemarks].updateValueAndValidity();


  }

  onRequestTypeSelected(reqTypes: LovModel[]) {
    this.selectedRequestTypes = reqTypes;
    this.addDynamicRequestTypes(true);
    this.setRejectionRemarks();
  }

  setRejectionRemarks() {
    this.filteredRejectionRemarks = this.rejectionRemarks
      .filter(f => f.cmsLovId && this.selectedRequestTypes.find(x => x.cmsMasterLovId == f.cmsLovId));
    const others = new SubLovModel();
    others.cmsMasterLovSub = 0;
    others.value = "Other";
    this.filteredRejectionRemarks.push(others);
    this.filteredRejectionRemarks = _.uniqBy(this.filteredRejectionRemarks, (e) => {
      return e.value;
    });
  }

  addDynamicRequestTypes(mandatoryReq:boolean) {
    this.requestTypeList.forEach((v, i) => {
      const id: any = v.cmsMasterLovId;
      const currControl = this.formInput.controls['otherRequestTypeValue' + id];
      const indx = this.selectedRequestTypes.findIndex(f => f.cmsMasterLovId == v.cmsMasterLovId);
      if (indx == -1 && currControl) {
        this.formInput.removeControl('otherRequestTypeValue' + id);
      }
      else {
        if (v.isDynamic == 'N' && indx > -1 && !currControl) {
          const valu = this.dynamicRequestTypes.find(f => f.lovRequestId == id);
          this.formInput.addControl('otherRequestTypeValue' + id,
            new FormControl(valu ? valu.value : null, mandatoryReq ? [Validators.required] : []));
        }
      }
      if (currControl && indx> -1) {
        if (mandatoryReq) {
          this.formInput.controls['otherRequestTypeValue' + id].setValidators([Validators.required]);
        }
        else{
          this.formInput.controls['otherRequestTypeValue' + id].clearValidators();
        }
        this.formInput.controls['otherRequestTypeValue' + id].updateValueAndValidity();
      }
    });
  }

  setUserType(e: any) {
    if (e.checked) this.userType = 'New user';
    else this.userType = 'Existing user';
  }

  // setValidations(data: any) {
  //   if (data.value == 'Demat Account') {
  //     this.isOtherRejectionSelected = true;
  //     this.formInput.controls['selectAccount'].enable();
  //   } else {
  //     this.isOtherRejectionSelected = false;
  //     this.formInput.controls['selectAccount'].clearValidators();
  //   }
  // }

  onChangesApplicableSelection(changes: LovModel[]) {
    this.selectedChangesApplicableTo = changes;
  }
  checkDematAccount(currChange: LovModel) {
    if (currChange.value && currChange.value?.toLowerCase().indexOf('nsdl') > -1) {
      return this.selectedChangesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('cdsl') > -1) > -1;
    }
    if (currChange.value && currChange.value?.toLowerCase().indexOf('cdsl') > -1) {
      return this.selectedChangesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('nsdl') > -1) > -1;
    }
    return false;
  }

  saveData(status: Status) {
    const requests = this.getSaveRequests(status);
    forkJoin(requests).subscribe((res) => {
      this.formValidity = [];
      if (this.recId > 0) {
        this.dataEntryService.updateData(this.recId, this.getFormValues(status))
          .subscribe(resp => {
            this.notifyService.showSuccess("Data Saved", "successfully");
            this.router.navigate(['/data-entry'],{skipLocationChange: true});
          });
      }

    });

  }
  getSaveRequests(status: Status) {

    const requests = [];
    // if (this.recId > 0) {
    //   requests.push(this.dataEntryService.updateData(this.recId, this.getFormValues(status)));
    // }
    // else {
    //   requests.push(this.dataEntryService.addData(this.getFormValues(status)));
    // }
    requests.push(this.dynamicRequestTypeService.saveData(this.getDynamicFormValues()));
    this.formValidity.forEach((elem) => {
      if (elem.emitType) {
        switch (elem.emitType) {
          case EmitType.AddressModificationCorrespondence:
            if (this.addressCoressComp) {
              requests.push(this.addressCoressComp?.saveData());
            }
            break;
          case EmitType.AddressModificationPermanent:
            if (this.addressPermComp) {
              requests.push(this.addressPermComp?.saveData());
            }
            break;
          case EmitType.ContactDetails:
            if (this.contactComp) {
              requests.push(this.contactComp?.saveData());
            }
            break;
          case EmitType.BankDetails:
            if (this.bankingComp) {
              requests.push(this.bankingComp?.saveData());
            }
            break;
          case EmitType.IncomeRange:
            if (this.incomeComp) {
              requests.push(this.incomeComp?.saveData());
            }
            break;
          case EmitType.AccountClosure:
            if (this.accountCloComp) {
              requests.push(this.accountCloComp?.saveData());
            }
            break;
        }

      }
    });
    return requests;
  }
  onBack(){  
    var url = this.router.url 
    var CurrentRoute = url.split('/',)
  
    if(CurrentRoute[1] === 'case-summary'){
      this.router.navigate(['/case-summary']);  
    } else {
      this.router.navigate(['/data-entry']);  
    }
  }
}
