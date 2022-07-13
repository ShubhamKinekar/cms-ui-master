import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { LOV, PatternValidation, Status } from 'src/app/shared/enums';
import { Location } from '@angular/common';
import { BacodeModel, CaseInitiationModel, LovModel } from 'src/app/shared/models';
import { ClientViewModel } from 'src/app/shared/models/client-view.model';
import { BaseDataService, BranchService, CaseInitiationService, LoginService } from 'src/app/shared/services';
import { AttachmentService } from 'src/app/shared/services';
import { LOVService } from 'src/app/shared/services/common/lov.service';
import { ConfirmationPopupComponent } from 'src/app/shared/components/confirmation-popup/confirmation-popup.component';
import { ClientViewService } from 'src/app/shared/services/transaction/client-view.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { BranchListComponent } from 'src/app/shared/components/branch-list/branch-list.component';
import { BarcodePopupComponent } from 'src/app/shared/components/barcode-popup/barcode-popup.component';
import { BacodeService } from 'src/app/shared/services/transaction/bacode.service';
import { BacodeListComponent } from 'src/app/shared/components/bacode-list/bacode-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-case-initiation',
  templateUrl: './case-initiation.component.html',
  styleUrls: ['./case-initiation.component.css'],
})
export class CaseInitiationComponent
  extends BaseDetailComponent<CaseInitiationModel>
  implements OnInit {
  caseInitiationDetailSub!: Subscription;
  maxDate = new Date();
  inWordModelist: any;
  isReadOnly: boolean = true;
  requestTypeList: LovModel[] = [];
  properties: any = {
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
    awbNo: 'awbNo',
    branchCodeEmail: 'branchCodeEmail',
    branchCode:'branchCode',
    // rmCodeEmail: 'rmCodeEmail',
    rmCodeIds: 'rmCodeIds',
    requestType: 'requestType',
    fileUpload1: 'fileUpload1',
    fileUpload2: 'fileUpload2',
    fileUpload3: 'fileUpload3',
    status: 'status',
    requesttypeOther: 'requesttypeOther',
    bacode : 'bacode'
  };
  record ={ docReceived: true };
  clientData: ClientViewModel[] = [];
  selectedbacode: BacodeModel = new BacodeModel();
  noRecordFound = 'No record found';
  minCharLength = 3;
  panFilterPlaceHolder = `Type ${this.minCharLength} letters of PAN to filter data`;
  panFilterLoadingText = `Type ${this.minCharLength} letters of PAN to filter data`;
  panLoading: boolean = false;
  panNos: any[] = [];
  dematAccountNos: any[] = [];
  tradingAccountNos: any[] = [];
  entity = new CaseInitiationModel();
  isSelected: boolean = false;
  isRejectStatusSelected:boolean = false;
  star:boolean=false;
  isBarcodeExists = false;
  
  isVisibledata: boolean = false;
  isUserRequestType: boolean = false;
  isInwardMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
     router: Router,
    private lovService: LOVService, 
    private bacodeService:BacodeService,
    private service: CaseInitiationService,
    private attachmentService: AttachmentService,
    private clientViewService: ClientViewService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService,branchService: BranchService
  ) {
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.formInput = new FormGroup({
      barcode: new FormControl('', [Validators.required, validateWhiteSpace]),
      awbNo: new FormControl(''),
      dematAccountNo: new FormControl(''),
      tradingAccountNo: new FormControl(''),
      panNo: new FormControl(''),
      receiptDate: new FormControl(''),
      inwardMode: new FormControl('',[Validators.required]),
      clientNameTrading: new FormControl(''),
      clientNameDemat: new FormControl(''),
      customerEmail: new FormControl(''),
      customerMobile: new FormControl(''),
      // customerEmail: new FormControl('',[Validators.pattern(PatternValidation.email)]),
      // customerMobile: new FormControl('', [
      //   Validators.pattern(PatternValidation.mobileNumber),
      // ]),
      branchCodeEmail: new FormControl(''),
      // rmCodeEmail: new FormControl(''),
      rmCodeIds: new FormControl(''),
      requestType: new FormControl(''),
      fileUpload1: new FormControl(''),
      fileUpload2: new FormControl(''),
      fileUpload3: new FormControl(''),
      branchCode:new FormControl(''),
      requesttypeOther: new FormControl(''),
      bacode:new FormControl(''),
      docReceived:new FormControl( this.docReceived,[
        Validators.required, validateWhiteSpace]),
    });
    this.filterPanNos();
    this.setValidations();
  }

  ngOnInit(): void {
    console.log(this.route.url);
    this.userTypeChange(this.isExistingUser);

    this.caseInitiationDetailSub = this.route.params.subscribe((params) => {
      this.recId = params['id'] ? +params['id'] : 0;
      if (this.recId > 0) {
        this.getData(this.recId);
       
      }
      else {
     // this.setPanValidation();
      }
    });
    this.getInwardMode();
    this.getRequestType();
   
  }

  filterPanNos() {
    this.formInput.controls[this.properties.panNo].valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          // this.errorMsg = "";
          this.panNos = [];
          this.clientData = [];
          this.panLoading = true;
          this.panFilterLoadingText = this.panFilterPlaceHolder;
        }),
        switchMap((value) => {
          this.panFilterLoadingText =
            value && value.length <= this.minCharLength
              ? this.panFilterPlaceHolder
              : 'Loading..';
          return this.clientViewService
            .filterData(this.properties.panNo, value, this.minCharLength)
            .pipe(
              finalize(() => {
                this.panLoading = false;
              })
            );
        })
      )
      .subscribe((result) => {
        if (result.totalRecords < 1) {
          this.clientData = [];
          this.panNos = [this.noRecordFound];
        } else {
          this.clientData = result.data;
          this.panNos = [...new Set(result.data.map((d) => d.panNo))];
        }
      });
  }

  setValidations() {
   
    // const abc = sessionStorage.CurrentUser;
    // const isInwardMode = JSON.parse(abc);
    // if(isInwardMode.permissions.includes('INWARD MODE')) {
    //   // this.formInput.reset();
    //   this.isInwardMode = true;
    //   this.formInput.controls[this.properties.bacode].setValidators([Validators.required]);
    //   this.formInput.controls[this.properties.branchCode].setValidators([Validators.required]);
    //  } else {
    //   this.isInwardMode = false;
    //    this.formInput.controls[this.properties.bacode].clearValidators();
    //    this.formInput.controls[this.properties.branchCode].clearValidators();
   }

    // if (Status.CaseSubmitted) {
    //   this.isSelected = false;
    //   this.formInput.controls['receiptDate'].clearValidators();
    // } else {
    //   this.isSelected = false;
    //   this.formInput.controls['receiptDate'].enable();
    // }
  

  userTypeChange(isUserExist:boolean){
    this.isExistingUser = isUserExist; 
    if(this.isExistingUser){
       this.isUserRequestType = true;
      this.formInput.controls[this.properties.requestType].setValidators([Validators.required, validateWhiteSpace]);
    } else {
      this.formInput.controls[this.properties.requestType].setValidators([]);
    }
    this.formInput.controls[this.properties.requestType].updateValueAndValidity();
  }
  
  onRequestTypeSelection(value:string) {
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
     if (value.includes('35')) {
      this.star = true;
      this.formInput.controls[this.properties.awbNo].setValidators([Validators.required]);
    } else {
      this.star = false;
      this.formInput.controls[this.properties.awbNo].clearValidators();
    }
    this.formInput.controls[this.properties.awbNo].updateValueAndValidity();
  }

  onPanSelection(panNo: string) {
    this.tradingAccountNos = [];
    this.dematAccountNos = [];
    this.tradingAccountNos = this.clientData
      .filter((c) => c.panNo == panNo)
      .map((d) => d.clientId);
    this.dematAccountNos = this.clientData
      .filter((c) => c.panNo == panNo)
      .map((d) => d.dpAccNo);
  }

  onTradingDematSelection(value: any, field: string) {
    const panNo = this.formInput.controls[this.properties.panNo]
      .value as string;
    const client = this.clientData.filter(
      (f) => f[field] == value && f.panNo == panNo
    )[0];
    this.formInput.patchValue({
      clientNameTrading: client.clientName,
      customerEmail: client.email,
      customerMobile: client.mobile,
      clientNameDemat: client.clientName,
    });
  }


  saveData(status: Status) {
    const barcode = this.formInput.controls[this.properties.barcode].value as string;
    this.service.isAlreadyExists(this.properties.barcode, barcode + '/' + this.recId).subscribe(res => {
      this.isBarcodeExists = res;
      if (!this.isBarcodeExists) {
        this.save(status);
      } else {
            const confirmDialog = this.dialog.open(BarcodePopupComponent, {
            data: {
              title: 'Alert',
              message: 'Barcode is duplicate, Please enter unique barocde.'
          }
         });
        // this.isVisibledata = true;
      }
    });
  }
  save(status: Status) {
    if (this.recId > 0) {
      this.service
        .updateData(this.recId, this.getFormValues(status))
        .subscribe((res) => {
          this.notifyService.showSuccess("Data Saved", "successfully");
          this.ngOnInit();
          this.router.navigate(['/case-initiation'],{skipLocationChange: true});
        });
    } else {
      this.service.addData(this.getFormValues(status)).subscribe((res) => {
        this.notifyService.showSuccess("Data Saved", "successfully");
        const abc = sessionStorage.CurrentUser;
        const isInwardMode = JSON.parse(abc);
        console.log(isInwardMode);
        if(isInwardMode.permissions.includes('INWARD MODE')) {
          // this.formInput.controls[this.properties.barcode].value.reset();
          this.formInput.controls['barcode'].reset();
          this.formInput.controls['panNo'].reset();

          this.formInput.controls['tradingAccountNo'].reset();
          this.formInput.controls['dematAccountNo'].reset();
          this.formInput.controls['clientNameTrading'].reset();
          this.formInput.controls['clientNameDemat'].reset();
          this.formInput.controls['customerEmail'].reset();
          this.formInput.controls['customerMobile'].reset();
          this.formInput.controls['fileUpload1'].reset();
          this.formInput.controls['fileUpload2'].reset();
          this.formInput.controls['fileUpload3'].reset();

          
        }
          //  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //  this.router.onSameUrlNavigation = 'reload';
          //  this.router
          //  .navigateByUrl(this.router.url, { skipLocationChange: true })
          //  .then(() => {
          //    this.router.navigate([this.router.url], { skipLocationChange: true });
          //  });
           else {
           
          this.router.navigate(['/case-initiation'],{skipLocationChange: true});
        }
      });
    }
  }

  getFormValues(status: Status) {
    //console.log(this.formInput.value);
    const model: CaseInitiationModel = new CaseInitiationModel();
    model.barcode = this.formInput.controls[this.properties.barcode]
      .value as string;
    model.tradingAccountNo = this.formInput.controls[
      this.properties.tradingAccountNo
    ].value as string;
    model.dematAccountNo = this.formInput.controls[
      this.properties.dematAccountNo
    ].value as number;
    model.awbNo = this.formInput.controls[this.properties.awbNo]
      .value as string;
    model.panNo = this.formInput.controls[this.properties.panNo]
      .value as string;
    model.receiptDate = undefined;
    model.inwardMode = this.formInput.controls[this.properties.inwardMode]
      .value as string;
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
    // model.branchCodeEmail = this.formInput.controls[this.properties.branchCodeEmail]
    //   .value as string;
    model.branchCode = this.formInput.controls[this.properties.branchCode]
    .value as string; 
    model.bacode = this.formInput.controls[this.properties.bacode].value as string;
   // model.rmCodeEmail = this.rmCodes;  
    model.requesttypeOther = this.formInput.controls[this.properties.requesttypeOther].value as string;
    // model.rmCodeEmail = this.formInput.controls[this.properties.rmCodeEmail]
    //   .value as string;
  //   var rmCodeValues = this.formInput.controls[this.properties.rmCodeEmail]rmCodeIds
  //   .value as number[];
  //  model.rmCodeEmail = rmCodeValues?.toString();
   var rmCodeValues = this.formInput.controls[this.properties.rmCodeIds]
    .value as number[];
   model.rmCodeIds = rmCodeValues?.toString();
    var requestTypes = this.formInput.controls[this.properties.requestType]
      .value as number[];
    model.requestType = requestTypes?.toString();
    model.fileUpload1 = this.formInput.controls[this.properties.fileUpload1]
      .value as string;
    model.fileUpload2 = this.formInput.controls[this.properties.fileUpload2]
      .value as string;
    model.fileUpload3 = this.formInput.controls[this.properties.fileUpload3]
      .value as string;
    model.isUserExist = this.isExistingUser ? 'Y' : 'N';
    model.docReceived = this.docReceived ? 'Y' : 'N';
    model.status = status;
    return model;
  }

  getInwardMode() {
    this.lovService.getLOVData(LOV.Inward).subscribe((response: any) => {
      this.inWordModelist = response.data;
    });
  }

  getRequestType() {
    this.lovService.getLOVData(LOV.RequestType).subscribe((response: any) => {
      this.requestTypeList = response.data;
    });
  }

  fileChange(event: {
    srcElement: { id: string };
    target: { files: FileList };
  }) {
    const controlName = event.srcElement.id;
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file.name);
      var upld = file.name.split('.').pop();
        if(upld=='pdf'){
          let formData: FormData = new FormData();
          formData.append('file', file, file.name);
          this.attachmentService.uploadFile(formData).subscribe((fileName) => {
            this.formInput.patchValue({
              [controlName]: fileName,
            });
          });
        }else {
          const confirmDialog = this.dialog.open(BarcodePopupComponent, {
          data: {
            title: 'Alert',
            message: 'Only PDF Are Allowed.'
        }
       });
      // this.isVisibledata = true;
    }
    }
  }

  deleteFile(controlName: string) {
    this.formInput.patchValue({
      [controlName]: null,
    });
  }

  getData(cmsCaseInitiationId: any) {
    this.service
      .getDataById(cmsCaseInitiationId)
      .subscribe((res) => {
        this.entity = res;
        this.getPanDetails();
        this.branchService.getRmCodeData(this.entity.branchCode),
        this.formInput.patchValue({
          barcode: this.entity.barcode,
          awbNo: this.entity.awbNo,
          tradingAccountNo: this.entity.tradingAccountNo,
          dematAccountNo: this.entity.dematAccountNo,
          panNo: this.entity.panNo,
          receiptDate: this.entity.receiptDate,
          inwardMode: this.entity.inwardMode,
          clientNameTrading: this.entity.clientNameTrading,
          clientNameDemat: this.entity.clientNameDemat,
          customerEmail: this.entity.customerEmail,
          customerMobile: this.entity.customerMobile,
          branchCodeEmail: this.entity.branchCodeEmail,
          branchCode:this.entity.branchCode,
          bacode: this.entity.bacode,
          requesttypeOther: this.entity.requesttypeOther,
          // rmCodeEmail: this.entity.rmCodeEmail?.split(','),
          
          requestType: this.entity.requestType?.split(','),
          rmCodeIds: this.entity.rmCodeIds?.split(','),
          fileUpload1: this.entity.fileUpload1,
          fileUpload2: this.entity.fileUpload2,
          fileUpload3: this.entity.fileUpload3,

        });
        
        this.isExistingUser = this.entity.isUserExist == 'Y';
        this.docReceived = this.entity.docReceived == 'Y';

        //this.setPanValidation();
        if (this.loginService.GetUser().userId != this.entity.createdBy ) {
          this.formInput.disable();
          console.log(this.entity.createdBy)
          this.disableForm = true;
    
        }

        if (this.entity.status == Status.CaseSubmitted) {
          this.formInput.disable();
          this.disableForm = true;
        }
        this.checkFormStage();
        this.setValidations();
       
        this.userTypeChange(this.isExistingUser);
       if (this.entity?.requestType) {
       this.onRequestTypeSelection(this.entity.requestType);
      }
      
      });
  }

  getPanDetails() {
    if (this.entity.panNo) {
      this.clientViewService
        .filterData(
          this.properties.panNo,
          this.entity.panNo,
          this.minCharLength
        )
        .subscribe((result) => {
          if (result.totalRecords < 1) {
            this.clientData = [];
            this.panNos = [this.noRecordFound];
          } else {
            this.clientData = result.data;
            this.panNos = [...new Set(result.data.map((d) => d.panNo))];
          }
          this.onPanSelection(this.entity.panNo);
          this.formInput.patchValue({
            tradingAccountNo: this.entity.tradingAccountNo,
            dematAccountNo: this.entity.dematAccountNo,
          });
        });
    }
  }

  onBack(){  
  var url = this.router.url 
  var CurrentRoute = url.split('/',)

  if(CurrentRoute[1] === 'case-summary'){
    this.router.navigate(['/case-summary']);  
  } else {
    this.router.navigate(['/case-initiation']);
  }
}
}
