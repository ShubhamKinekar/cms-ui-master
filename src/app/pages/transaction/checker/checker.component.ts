import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { BaseListModel, CheckerModel, DataEntryModel, DynamicRequestModel, DynamicRequestTypeModel, FormValidityModel, LovModel, SubLovModel } from 'src/app/shared/models';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseDataService, BranchService, LoginService, LOVService } from 'src/app/shared/services';
import { DynamicRequestTypeService } from 'src/app/shared/services/common/dynamic-request-type.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { DataEntryService } from 'src/app/shared/services/transaction/data-entry/data-entry.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { EmitType, LOV, PatternValidation, Status } from 'src/app/shared/enums';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import * as _ from 'lodash';
import { CheckerService } from 'src/app/shared/services/transaction/checker.service';
import { AddressModificationCorrespondenceComponent } from 'src/app/shared/components/data-entry/address-modification-correspondence/address-modification-correspondence.component';
import { AddressModificationPermanentComponent } from 'src/app/shared/components/data-entry/address-modification-permanent/address-modification-permanent.component';
import { ContactDetailsModificationComponent } from 'src/app/shared/components/data-entry/contact-details-modification/contact-details-modification.component';
import { BankDetailsModificationComponent } from 'src/app/shared/components/data-entry/bank-details-modification/bank-details-modification.component';
import { IncomeRangeRequestComponent } from 'src/app/shared/components/data-entry/income-range-request/income-range-request.component';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { AccountClosureComponent } from 'src/app/shared/components/data-entry/account-closure/account-closure.component';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.css']
})
export class CheckerComponent extends BaseDetailComponent<CheckerModel> implements OnInit {
  @Input() formTitle = 'Checker'
  userType = 'Existing user';
  isholdButton: boolean = false;
  isReadOnly = true;
  allocateButton: boolean = false;
  selectedRequestTypes: LovModel[] = [];
  checkerStatuses: LovModel[] = [];
  changesApplicableList: LovModel[] = [];
  requestTypeList: LovModel[] = [];
  formValidity: FormValidityModel[] = [];
  dynamicRequestTypes: DynamicRequestModel[] = [];
  rejectionRemarks: SubLovModel[] = [];
  filteredRejectionRemarks: SubLovModel[] = [];
  isOtherRejectionSelected: boolean = false;
  isRejectStatusSelected: boolean = false;
  isRequiredField: boolean = true;
  requestNewUser:boolean = false;
  isdemat: boolean = false;
  istrading: boolean = false;
  selectedChangesApplicableTo: LovModel[] = [];
  //filteredRejectionRemarks: SubLovModel[] = [];
  selecteddRejectionRemarks: SubLovModel[] = [];

  caseInitiationDetailSub!: Subscription;
  cmsDataEntryId: number = 0;
  entity = new CheckerModel();
  record ={ docReceived: true };
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
    checkerStatus: 'checkerStatus',
    checkerRemark: 'checkerRemark',
    rejectionRemarks: 'rejectionRemarks',
    rejectionRemarkInput: 'rejectionRemarkInput',
    branchCodeEmail: 'branchCodeEmail',
    branchCode: 'branchCode',
    bacode:'bacode',
    requesttypeOther:'requesttypeOther',
    employeeCode: 'employeeCode',
    selectAccount: 'selectAccount',
    selectAccountFiled: 'selectAccountFiled',
    otherRequestTypeValue: 'otherRequestTypeValue',
    changesApplicable: 'changesApplicable',
    otherRejectionRemarks: 'otherRejectionRemarks'
  };

  @ViewChild(AddressModificationCorrespondenceComponent) addressCoressComp?: AddressModificationCorrespondenceComponent;
  @ViewChild(AddressModificationPermanentComponent) addressPermComp?: AddressModificationPermanentComponent;
  @ViewChild(ContactDetailsModificationComponent) contactComp?: ContactDetailsModificationComponent;
  @ViewChild(BankDetailsModificationComponent) bankingComp?: BankDetailsModificationComponent;
  @ViewChild(IncomeRangeRequestComponent) incomeComp?: IncomeRangeRequestComponent;
  @ViewChild(AccountClosureComponent) accountCloComp?:AccountClosureComponent;
  isVisibledata: boolean = false;

  constructor(
    private route: ActivatedRoute,
    router: Router, 
    private lovService: LOVService,
    private checkerService: CheckerService,
    private dynamicRequestTypeService: DynamicRequestTypeService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService,branchService: BranchService
  ) {
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();
    this.caseInitiationDetailSub = this.route.params.subscribe((params) => {
      this.recId = params['id'] ? +params['id'] : 0;
    });
  }
  onBack(){
    var url = this.router.url 
    var CurrentRoute = url.split('/',)

    if(CurrentRoute[1] === 'case-summary'){
      this.router.navigate(['/case-summary']);  
    } else {
    this.router.navigate(['/checker']);  
    }
  }
  ngOnInit(): void {
    
    // this.formInput.controls[this.properties.barcode].setValidators([Validators.required, validateWhiteSpace]);
    // this.formInput.controls[this.properties.panNo].setValidators([Validators.required, validateWhiteSpace,
    // Validators.pattern(PatternValidation.PanCard),
    // ]);
    // this.formInput.controls[this.properties.changesApplicable].setValidators([Validators.required, validateWhiteSpace]);
    // this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);

    this.frontendHelperService.formValidObservable
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
        this.isSubmitDisabled();
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
      checkerStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      checkerRemark: new FormControl(''),
      clientNameTrading: new FormControl(''),
      clientNameDemat: new FormControl(''),
      customerEmail: new FormControl(''),
      customerMobile: new FormControl(''),
      branchCodeEmail: new FormControl(''),
      branchCode: new FormControl(''),
      bacode: new FormControl(''),
      otherRejectionRemarks: new FormControl(''),
      requesttypeOther: new FormControl(''),
      employeeCode: new FormControl(''),
      requestType: new FormControl(null, [Validators.required, validateWhiteSpace]),
      selectAccountFiled: new FormControl(null, []),
      selectAccount: new FormControl(null, []),
     // changesApplicable: new FormControl('', [Validators.required, validateWhiteSpace]),
      rejectionRemarks: new FormControl(''),
      rejectionRemarkInput: new FormControl(''),
      docReceived:new FormControl( this.docReceived),
    });
  }

  initData() {
    this.dynamicRequestTypeService.service = this.serviceType.Checker;

    const requests: Observable<any>[] = [];
    requests.push(this.getRequestType());
    requests.push(this.getCheckerStatus());
    requests.push(this.getChangesApplicableTo());
    requests.push(this.getRejectRemarks());
    if (this.recId) {
      requests.push(this.getData());
      requests.push(this.getDynamicRequestTypes());
    }

    forkJoin(requests).subscribe((responses) => {

      this.requestTypeList = responses[0].data;
      this.checkerStatuses = responses[1].data;
      this.changesApplicableList = responses[2].data;
      this.rejectionRemarks = responses[3].data;
      if (this.recId > 0) {
        this.entity = responses[4];
        this.dynamicRequestTypes = responses[5];
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
       // this.formInput.controls[this.properties.ChangesApplicableTo].setValidators([Validators.required, validateWhiteSpace]);

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
      //this.formInput.controls[this.properties.ChangesApplicableTo].clearValidators();
      this.formInput.controls[this.properties.requestType].clearValidators();
     // this.formInput.controls[this.properties.].clearValidators();
      //this.formInput.controls[this.properties.ChangesApplicableTo].setValidators([Validators.required]);
    }
    this.formInput.controls[this.properties.barcode].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();
    this.formInput.controls[this.properties.panNo].updateValueAndValidity();
    //this.formInput.controls[this.properties.ChangesApplicableTo].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();

  }

  setData() {

    this.cmsDataEntryId = this.entity && this.entity?.cmsDataEntryId ? this.entity?.cmsDataEntryId : 0;

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

    if(this.entity.checkerStatus){
      this.onStatusSelection(this.entity.checkerStatus);
    }

    if(this.entity.requestType){
      this.onRequestTypeSelectionOutput(this.entity.requestType);
    }

    this.selectedChangesApplicableTo = this.changesApplicableList.filter(f =>
      this.entity?.changesApplicableTo?.split(',')
        .includes(f.cmsMasterLovId ? f.cmsMasterLovId.toString() : '0'));
    console.log(this.entity);
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
      branchCode:this.entity?.branchCode,
      bacode:this.entity?.bacode,
      requesttypeOther:this.entity?.requesttypeOther,
      //   rmCodeEmail: this.entity?.rmCodeEmail,
      requestType: this.selectedRequestTypes,
      fileUpload1: this.entity?.fileUpload1,
      fileUpload2: this.entity?.fileUpload2,
      fileUpload3: this.entity?.fileUpload3,
      checkerStatus: this.entity?.checkerStatus,
      checkerRemark: this.entity?.checkerRemark,
      otherRejectionRemarks:this.entity?.otherRejectionRemarks,
      rejectionRemarks: this.entity?.rejectionRemarks?.split(','),
     // changesApplicable: this.selectedChangesApplicableTo

    });
    this.isExistingUser = this.entity.isUserExist == 'Y';
    this.docReceived = this.entity.docReceived == 'Y' ;
    this.rmCodes = this.entity.rmCodeEmail;
    if (this.loginService.GetUser().userId != this.entity.allocatedTo && 
    this.entity.status != Status.CheckerProcessed) {
    this.formInput.disable();
    this.allocateButton = true;
    this.disableForm = true;
  }
  this.userTypeChange(this.isExistingUser);

  if (this.entity.status === Status.CheckerHold) {
    this.isholdButton = true;
    this.allocateButton = false;
  }
    if (this.entity?.status == Status.CheckerProcessed) {
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

  getCheckerStatus(): Observable<BaseListModel<LovModel>> {
    return this.lovService.getLOVData(LOV.CheckerStatus);
  }

  getData(): Observable<CheckerModel> {
    return this.checkerService.getDataById(this.recId);
  }

  getFormValues(status: Status) {
    let model: CheckerModel = new CheckerModel();
    if (this.entity) {
      model = this.entity;
    }
    model.cmsCheckerId = this.entity ? this.entity.cmsCheckerId : 0;
    model.cmsDataEntryId = this.cmsDataEntryId;
    model.cmsScrutinyId = this.entity ? this.entity.cmsScrutinyId : 0;
    model.cmsCaseInitiationId = this.entity ? this.entity.cmsCaseInitiationId : 0;
    model.barcode = this.formInput.controls[this.properties.barcode].value as string;
    model.otherRejectionRemarks = this.formInput.controls[this.properties.otherRejectionRemarks].value as string;
    model.tradingAccountNo = this.formInput.controls[this.properties.tradingAccountNo].value as string;
    model.dematAccountNo = this.formInput.controls[this.properties.dematAccountNo].value as number;
    model.panNo = this.formInput.controls[this.properties.panNo].value as string;
    model.isUserExist = this.isExistingUser ? 'Y' : 'N';
    model.docReceived = this.docReceived ? 'Y' : 'N';
    model.rmCodeEmail = this.rmCodes; 
    // model.awbNo = this.formInput.controls[this.properties.awbNo].value as string;
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
    model.checkerStatus = this.formInput.controls[this.properties.checkerStatus].value as string;
    model.checkerRemark = this.formInput.controls[this.properties.checkerRemark].value as string;

    const rejMarks = this.formInput.controls[this.properties.rejectionRemarks].value as number[];
    model.rejectionRemarks = rejMarks ? rejMarks.toString() : '';

    const requestTypes = this.formInput.controls[this.properties.requestType].value as LovModel[];
    model.requestType = requestTypes.map(f => f.cmsMasterLovId).toString();

   // const changesApplicable = this.formInput.controls[this.properties.changesApplicable].value as LovModel[];
   // model.changesApplicableTo = changesApplicable.map(f => f.cmsMasterLovId).toString();
   // model.status = status;
   const newStatus: any = status ? status : 'CHECKER ' + this.checkerStatuses.find(f => f.cmsMasterLovId == model.checkerStatus)?.value?.toUpperCase();
    model.status = newStatus;
    return model;
  }

  getDynamicFormValues() {
    const model = new DynamicRequestTypeModel();
    model.cmsCheckerId = this.recId;
    model.cmsDataEntryId = this.cmsDataEntryId;
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
    model.checkerDynamicRTSubList = values;
    return model;
  }

  onRejectRemarkSelection(value: any[]) {
    if (value.includes('0')) {
      this.isOtherRejectionSelected = true;
      this.formInput.controls[this.properties.otherRejectionRemarks].enable();
    } else {
      this.isOtherRejectionSelected = false;
      this.formInput.controls[this.properties.otherRejectionRemarks].clearValidators();
    }
    this.formInput.controls[this.properties.otherRejectionRemarks].updateValueAndValidity();
  }

  onRequestTypeSelectionOutput(value:string) {
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


  onStatusSelection(value:string) {
    //var searchResult = this.scrutinyStatusList.find((c) => c.cmsMasterLovId == 24);
    //console.log(searchResult)
    if (value.includes('56')) {
      this.isRejectStatusSelected = true;
      this.isRequiredField = false;
      this.isdemat = false;
      this.istrading = false;
      this.formInput.controls['rejectionRemarks'].setValidators([Validators.required]);
      this.formInput.controls[this.properties.panNo].clearValidators();
      this.formInput.controls[this.properties.barcode].clearValidators();
      this.formInput.controls[this.properties.requestType].clearValidators();
      //this.formInput.controls[this.properties.changesApplicable].clearValidators();
      !this.isSubmitDisabled();
    } else {
      this.isRejectStatusSelected = false;
      this.formInput.controls['rejectionRemarks'].clearValidators();
      this.formInput.controls[this.properties.panNo].updateValueAndValidity();
      this.formInput.controls[this.properties.barcode].updateValueAndValidity();
      this.formInput.controls[this.properties.requestType].updateValueAndValidity();
      //this.formInput.controls[this.properties.changesApplicable].updateValueAndValidity();

    }
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

 

  setValidations(data: any) {
    if (data.value == 'Demat Account') {
      this.isOtherRejectionSelected = true;
      this.formInput.controls['selectAccount'].enable();
    } else {
      this.isOtherRejectionSelected = false;
      this.formInput.controls['selectAccount'].clearValidators();
    }
  }

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
        this.checkerService.updateData(this.recId, this.getFormValues(status))
          .subscribe(resp => {
            this.notifyService.showSuccess("Data Saved", "successfully");
            this.router.navigate(['/checker'],{skipLocationChange: true});
          });
      }
      
    });
  }

  getSaveRequests(status: Status) {

    const requests = [];
    // if (this.recId > 0) {
    //   requests.push(this.checkerService.updateData(this.recId, this.getFormValues(status)));
    // }
    // else {
    //   requests.push(this.checkerService.addData(this.getFormValues(status)));
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

}
