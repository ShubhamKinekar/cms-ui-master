import {
  Component,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { LOV, PatternValidation, Status } from 'src/app/shared/enums';
import {
  BranchModel,
  ClientViewModel,
  LovModel,
  ScrutinyModel,
  SubLovModel,
} from 'src/app/shared/models';
import { BranchService, LoginService, LOVService, ScrutinyService } from 'src/app/shared/services';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import * as _ from 'lodash';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BranchListComponent } from 'src/app/shared/components/branch-list/branch-list.component';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';


@Component({
  selector: 'app-scrutiny',
  templateUrl: './scrutiny.component.html',
  styleUrls: ['./scrutiny.component.css'],
})
export class ScrutinyComponent
  extends BaseDetailComponent<ScrutinyModel>
  implements OnInit {
  caseInitiationDetailSub!: Subscription;
  isReadOnly = true;
  properties: any = {
    cmsCaseInitiationId: 'cmsCaseInitiationId',
    barcode: 'barcode',
    tradingAccountNo: 'tradingAccountNo',
    dematAccountNo: 'dematAccountNo',
    panNo: 'panNo',
    receiptDate: 'receiptDate',
    inwardMode: 'inwardMode',
    clientNameTrading: 'clientNameTrading',
    clientNameDemat: 'clientNameDemat',
    customerEmail: 'customerEmail',
    customerMobile: 'customerMobile',
    AwbNo: 'awbNo',
    bacode: 'bacode',
    branchCodeEmail: 'branchCodeEmail',
    branchCode: 'branchCode',
    employeeCodeRm: 'employeeCodeRm',
    requestType: 'requestType',
    status: 'status',
    scrutinyStatus: 'scrutinyStatus',
    rejectionRemarks: 'rejectionRemarks',
    scrutinyRemark: 'scrutinyRemark',
    otherRejectionRemarks: 'otherRejectionRemarks',
    changesApplicableTo: 'changesApplicableTo',
    requesttypeOther:'requesttypeOther'
  };
  clientData: ClientViewModel[] = [];
  noRecordFound = 'No record found';
  minCharLength = 3;
  panFilterPlaceHolder = `Type ${this.minCharLength} letters of PAN to filter data`;
  panFilterLoadingText = `Type ${this.minCharLength} letters of PAN to filter data`;
  panLoading: boolean = false;
  panNos: any[] = [];
  dematAccountNos: any[] = [];
  tradingAccountNos: any[] = [];
  isholdButton: boolean = false;
  allocateButton: boolean = false;
  selectedRequestTypes: LovModel[] = [];
  scrutinyStatusList: LovModel[] = [];
  rejectionRemarks: SubLovModel[] = [];
  filteredRejectionRemarks: SubLovModel[] = [];
  selecteddRejectionRemarks: SubLovModel[] = [];

  changesApplicableList: LovModel[] = [];
  selectedChangesApplicableTo: LovModel[] = [];
  requestTypeList: LovModel[] = [];
  isOtherRejectionSelected: boolean = false;
  isRejectStatusSelected: boolean = false;
  isRequiredField : boolean = true;
  panDetailsRequired = false;
  matcher = new ErrorState();
  entity = new ScrutinyModel();
  star: boolean = false;
  isVisibledata: boolean = false;
  isdemat: boolean = false;
  requestNewUser:boolean = false;
  istrading: boolean = false;
  //isExistingUser = true;
  constructor(
    private route: ActivatedRoute,
    private lovService: LOVService,
    private service: ScrutinyService,
    router: Router,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService, branchService: BranchService
  ) {
    super(dialog, activatedRoute, location,
      frontendHelperService, notifyService, loginService,
      allocationService, router, branchService);
  }

  initForm() {
    this.formInput = new FormGroup({
      cmsCaseInitiationId: new FormControl('', []),
      barcode: new FormControl(''),
      scrutinyStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      panNo: new FormControl(''),
      tradingAccountNo: new FormControl(''),
      clientNameTrading: new FormControl(''),
      dematAccountNo: new FormControl(''),
      receiptDate: new FormControl(''),
      inwardMode: new FormControl(''),
      clientNameDemat: new FormControl(''),
      customerEmail: new FormControl(''),
      customerMobile: new FormControl(''),
      branchCodeEmail: new FormControl(''),
      branchCode: new FormControl(''),
      employeeCodeRm: new FormControl(''),
      requestType: new FormControl(''),
      scrutinyRemark: new FormControl(''),
      bacode: new FormControl(''),
      rejectionRemarks: new FormControl(''),
      requesttypeOther: new FormControl(''),
      otherRejectionRemarks: new FormControl(''),
      changesApplicableTo: new FormControl(''),
      // scrutinyStatus:  new FormControl('', [Validators.required]),
      docReceived: new FormControl(this.docReceived)
    });

  }

  ngOnInit(): void {
    this.initForm();
    // this.formInput.controls[this.properties.barcode].setValidators([Validators.required, validateWhiteSpace]);
    // this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);
    // this.formInput.controls[this.properties.panNo].setValidators( [Validators.required, validateWhiteSpace,
    //   Validators.pattern(PatternValidation.PanCard),
    //   ]);
    this.caseInitiationDetailSub = this.route.params.subscribe((params) => {
      this.recId = params['id'] ? +params['id'] : 0;
    });
    const requests = [];
    requests.push(this.getRequestType());
    requests.push(this.getScrutinyType());
    requests.push(this.getRejectRemarks());
    requests.push(this.getChangesApplicableTo());
    if (this.recId > 0) {
      requests.push(this.getData());
    } else {
      //this.setPanValidation();
    }
    forkJoin(requests).subscribe((response: any) => {
      this.requestTypeList = response[0].data;
      this.scrutinyStatusList = response[1].data;
      this.rejectionRemarks = response[2].data;
      this.changesApplicableList = response[3].data;
      this.entity = response[4];
      this.setData();
    });
    
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
        this.formInput.controls[this.properties.changesApplicableTo].setValidators([Validators.required, validateWhiteSpace]);

      this.setDematValidators();
    } else {
     // this.isRejectStatusSelected = false;
      this.isRequiredField = false;
      this.isdemat=false;
      this.requestNewUser = true;
      this.istrading=false;
      this.formInput.controls[this.properties.barcode].setValidators([Validators.required, validateWhiteSpace]);
      this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);
      this.formInput.controls[this.properties.panNo].clearValidators();
      this.formInput.controls[this.properties.changesApplicableTo].clearValidators();
      this.formInput.controls[this.properties.requestType].clearValidators();
     // this.formInput.controls[this.properties.].clearValidators();
      //this.formInput.controls[this.properties.ChangesApplicableTo].setValidators([Validators.required]);
    }
    this.formInput.controls[this.properties.barcode].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();
    this.formInput.controls[this.properties.panNo].updateValueAndValidity();
    this.formInput.controls[this.properties.changesApplicableTo].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();

  }
 


  onStatusSelection(value: any) {
    if (value.includes('38')) {
      this.isRejectStatusSelected = true;
      this.isRequiredField = false;
      this.isdemat=false;
      this.istrading=false;
      this.formInput.controls[this.properties.rejectionRemarks].setValidators([Validators.required]);
      this.formInput.controls[this.properties.barcode].clearValidators();
      this.formInput.controls[this.properties.requestType].clearValidators();
      this.formInput.controls[this.properties.panNo].clearValidators();
      this.formInput.controls[this.properties.tradingAccountNo].clearValidators();
      this.formInput.controls[this.properties.dematAccountNo].clearValidators();
      this.formInput.controls[this.properties.changesApplicableTo].clearValidators();
    } else {
      this.isRejectStatusSelected = false;
      this.formInput.controls[this.properties.rejectionRemarks].clearValidators();
    }
    this.formInput.controls[this.properties.rejectionRemarks].updateValueAndValidity();
    this.formInput.controls[this.properties.barcode].updateValueAndValidity();
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();
    this.formInput.controls[this.properties.panNo].updateValueAndValidity();
    this.formInput.controls[this.properties.tradingAccountNo].updateValueAndValidity();
    this.formInput.controls[this.properties.dematAccountNo].updateValueAndValidity();
    this.formInput.controls[this.properties.changesApplicableTo].updateValueAndValidity();
  }

  setValidations() {
    if (Status.CaseSubmitted) {
      this.formInput.controls['receiptDate'].clearValidators();
    } else {
      this.formInput.controls['receiptDate'].enable();
    }

  }

  // userSelectionTypeChange() {
  //   if(this.entity.isUserExist == 'N') {
  //     this.formInput.controls[this.properties.customerEmail].setValidators([Validators.required]);
  //   }else {
  //     this.formInput.controls[this.properties.customerEmail].clearValidators();
  //   }    
  //   this.formInput.controls[this.properties.customerEmail].updateValueAndValidity();  

  // }

  onBack(){
    var url = this.router.url 
  var CurrentRoute = url.split('/',)

  if(CurrentRoute[1] === 'case-summary'){
    this.router.navigate(['/case-summary']);  
  } else {
    this.router.navigate(['/scrutiny']);
  }
  }

  onChangesApplicableSelection(changes: LovModel[]) {
    this.selectedChangesApplicableTo = changes;
    this.setDematValidators();

  }

  checkDematAccount(currChange: LovModel) {
    let retValue = false;
    if (currChange.value && currChange.value?.toLowerCase().indexOf('nsdl') > -1) {
      retValue = this.selectedChangesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('cdsl') > -1) > -1;
    }
    if (currChange.value && currChange.value?.toLowerCase().indexOf('cdsl') > -1) {
      retValue = this.selectedChangesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('nsdl') > -1) > -1;
    }
    return retValue;
  }

  setDematValidators() {
    this.formInput.controls[this.properties.tradingAccountNo].clearValidators();
    this.formInput.controls[this.properties.dematAccountNo].clearValidators();

    for (var a = 0; a < this.selectedChangesApplicableTo.length; a++) {
      if (this.selectedChangesApplicableTo[a].value && (this.selectedChangesApplicableTo[a].value?.toLocaleLowerCase().includes('demat'))) {
        this.isdemat = true;
        this.isRequiredField = true;
        this.formInput.controls[this.properties.dematAccountNo].setValidators([Validators.required]);
      } else if (this.selectedChangesApplicableTo[a].value && (this.selectedChangesApplicableTo[a].value?.toLocaleLowerCase().includes('trading'))) {
        this.istrading = true;
        this.isRequiredField = true;
        this.formInput.controls[this.properties.tradingAccountNo].setValidators([Validators.required]);
      }
    }
    
    this.formInput.controls[this.properties.dematAccountNo].updateValueAndValidity();
    this.formInput.controls[this.properties.tradingAccountNo].updateValueAndValidity();
  }

  getRejectRemarks() {
    return this.lovService
      .getSubLOVData(LOV.RejectionRemarks)
  }

  getScrutinyType() {
    return this.lovService
      .getLOVData(LOV.ScrutinyStatus)
  }


  getChangesApplicableTo() {
    return this.lovService
      .getLOVData(LOV.ChangesApplicableTo)
  }

  getRequestType() {
    return this.lovService.getLOVData(LOV.RequestType);

  }

  getFormValues(status: Status) {
    const model: ScrutinyModel = JSON.parse(JSON.stringify(this.entity));
    model.cmsCaseInitiationId = this.entity.cmsCaseInitiationId;
    model.barcode = this.formInput.controls[this.properties.barcode]
      .value as string;
    model.panNo = this.formInput.controls[this.properties.panNo]
      .value as string;
    model.tradingAccountNo = this.formInput.controls[
      this.properties.tradingAccountNo
    ].value as string;
    model.dematAccountNo = this.formInput.controls[
      this.properties.dematAccountNo
    ].value as number;
    model.clientNameTrading = this.formInput.controls[
      this.properties.clientNameTrading
    ].value as string;
    model.clientNameDemat = this.formInput.controls[
      this.properties.clientNameDemat
    ].value as string;
    model.customerEmail = this.formInput.controls[this.properties.customerEmail]
      .value as string;
    model.customerMobile = this.formInput.controls[
      this.properties.customerMobile
    ].value as number;
    // model.receiptDate = this.formInput.controls[this.properties.receiptDate]
    //   .value as Date;
    model.branchCodeEmail = this.formInput.controls[this.properties.branchCodeEmail]
      .value as string;
    model.branchCode = this.formInput.controls[this.properties.branchCode]
      .value as string;
    model.employeeCodeRm = this.rmCodes;;
    // model.employeeCodeRm = this.formInput.controls[
    //   this.properties.employeeCodeRm
    // ].value as string;
    model.bacode = this.formInput.controls[this.properties.bacode]
      .value as string;
    model.scrutinyStatus = this.formInput.controls[
      this.properties.scrutinyStatus
    ].value as string;
    model.scrutinyRemark = this.formInput.controls[
      this.properties.scrutinyRemark
    ].value as string;
    model.customerEmail = this.formInput.controls[
      this.properties.customerEmail
    ].value as string;
    model.customerMobile = this.formInput.controls[
      this.properties.customerMobile
    ].value as number;
    model.otherRejectionRemarks = this.formInput.controls[
      this.properties.otherRejectionRemarks
    ].value as string;
    var rejMarks = this.formInput.controls[this.properties.rejectionRemarks].value as number[];
    model.rejectionRemarks = rejMarks ? rejMarks.toString() : '';
    var requestTypes = this.formInput.controls[this.properties.requestType]
      .value as LovModel[];
    model.requestType =  requestTypes.map(f => f.cmsMasterLovId).toString();
    const newStatus: any = status ? status : 'SCRUTINY ' + this.scrutinyStatusList.find(f => f.cmsMasterLovId == model.scrutinyStatus)?.value?.toUpperCase();
    model.status = newStatus;
    model.isUserExist = this.isExistingUser ? 'Y' : 'N';
    model.docReceived = this.docReceived ? 'Y' : 'N';
    const changesApplicable = this.formInput.controls[this.properties.changesApplicableTo].value as LovModel[];
    model.changesApplicableTo = changesApplicable.map(f => f.cmsMasterLovId).toString();
    model.requesttypeOther = this.formInput.controls[this.properties.requesttypeOther].value as string;
    // model.changesApplicableTo = this.formInput.controls[this.properties.changesApplicableTo]
    //   .value.toString() as string
    return model;

  }


  onRequestTypeSelection(reqTypes: LovModel[]) {
    this.selectedRequestTypes = reqTypes;
    console.log(this.rejectionRemarks);
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

  saveData(status: Status) {
    if (this.recId > 0) {
      this.service
        .updateData(this.recId, this.getFormValues(status))
        .subscribe(() => {
          this.notifyService.showSuccess("Data Saved", "successfully");
          this.ngOnInit();
          this.router.navigate(['/scrutiny'],{skipLocationChange: true});
        });
    } else {
      this.service.addData(this.getFormValues(status)).subscribe(() => {
        this.notifyService.showSuccess("Data Saved", "successfully");
        this.router.navigate(['/scrutiny'],{skipLocationChange: true});
      });
    }
  }

  getData() {
    return this.service.getDataById(this.recId);
  }
  setData() {
   
    if (this.entity?.requestType) {
      this.selectedRequestTypes = this.requestTypeList.filter(f =>
        this.entity?.requestType?.split(',')
          .includes(f.cmsMasterLovId ? f.cmsMasterLovId.toString() : '0'));
      this.onRequestTypeSelection(this.selectedRequestTypes);
    }
    if (this.entity.rejectionRemarks) {
      this.onRejectRemarkSelection(this.entity.rejectionRemarks?.split(','));
      this.selecteddRejectionRemarks = this.filteredRejectionRemarks.filter(f =>
        this.entity?.rejectionRemarks?.split(',')
          .includes(f.cmsMasterLovSub ? f.cmsMasterLovSub.toString() : '0'));
    }

    // if (this.entity.scrutinyStatus) {
    //   this.onStatusSelection(this.entity.scrutinyStatus);
    // }

    if(this.entity.requestType){
      this.onRequestTypeSelectionOutput(this.entity.requestType);
    }
    
    this.selectedChangesApplicableTo = this.changesApplicableList.filter(f =>
      this.entity?.changesApplicableTo?.split(',')
        .includes(f.cmsMasterLovId ? f.cmsMasterLovId.toString() : '0'));

    this.formInput.patchValue({
      barcode: this.entity.barcode,
      tradingAccountNo: this.entity.tradingAccountNo,
      dematAccountNo: this.entity.dematAccountNo,
      panNo: this.entity.panNo,
     // receiptDate: this.entity.receiptDate,
      inwardMode: this.entity.inwardMode,
      clientNameTrading: this.entity.clientNameTrading,
      clientNameDemat: this.entity.clientNameDemat,
      customerEmail: this.entity.customerEmail,
      customerMobile: this.entity.customerMobile,
      bacode: this.entity.bacode,
      branchCodeEmail: this.entity.branchCodeEmail,
      branchCode: this.entity.branchCode,
      employeeCodeRm: this.entity.employeeCodeRm,
      requestType: this.selectedRequestTypes,
      scrutinyStatus: this.entity.scrutinyStatus,
      scrutinyRemark: this.entity.scrutinyRemark,
      rejectionRemarks: this.entity.rejectionRemarks?.split(','),
      otherRejectionRemarks: this.entity.otherRejectionRemarks,
      fileUpload1: this.entity.fileUpload1,
      fileUpload2: this.entity.fileUpload2,
      fileUpload3: this.entity.fileUpload3,
      requesttypeOther:this.entity.requesttypeOther,
      status: this.entity.status,
      changesApplicableTo: this.selectedChangesApplicableTo,
      allocatedTo: this.entity.allocatedTo,
    });
    this.isExistingUser = this.entity.isUserExist == 'Y';
    this.docReceived = this.entity.docReceived == 'Y';
    this.rmCodes = this.entity.employeeCodeRm;
    if (this.loginService.GetUser().userId != this.entity.allocatedTo &&
      this.entity.status != Status.ScrutinyProcessed) {
      this.formInput.disable();
      this.allocateButton = true;
    }

    if (this.entity.status === Status.ScrutinyHold) {
      this.isholdButton = true;
    }

    if (this.entity.scrutinyStatus) {
      this.onStatusSelection(this.entity.scrutinyStatus);
    }

      this.userTypeChange(this.isExistingUser);

    if (this.entity.status != Status.ScrutinyInprocess &&
      this.entity.status != Status.ScrutinyAllocated) {
      this.formInput.disable();
      this.disableForm = true;

    }
    if(this.checkFormStage()){
      this.isholdButton = false;
      this.allocateButton = false;
    }

    this.setValidations();
    this.setDematValidators();
    //this.setPanValidation();
  
    //this.onStatusSelection(this.entity.scrutinyStatus);
  }
}
