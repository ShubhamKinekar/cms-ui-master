import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from '../../../base';
import { EmitType, LOV, ServiceType } from '../../../enums';
import { BaseListModel, ContactModel, IsdCodeModel, LovModel, SortFilterModel } from '../../../models';
import { BaseDataService, BranchService, LoginService, LOVService } from '../../../services';
import { Location } from "@angular/common";
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailsService } from 'src/app/shared/services/transaction/contact-details.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { IsdCodeService } from 'src/app/shared/services/transaction/isdcode.service';


@Component({
  selector: 'app-contact-details-modification',
  templateUrl: './contact-details-modification.component.html',
  styleUrls: ['./contact-details-modification.component.css'],
})
export class ContactDetailsModificationComponent
  extends BaseDetailComponent<ContactModel>
  implements OnInit, OnChanges {
  @Input() service: ServiceType = ServiceType.None;
  @Input() cmsDataEntryId: number = 0;
  @Input() disableForm: boolean = false;
  //isdCodeList: any[]=[];
  isdCodeList: IsdCodeModel[] = [];
  properties: any = {
    cmsContactDetailId: 'cmsContactDetailId',
    cmsDataEntryId: 'cmsDataEntryId',
    //accountType: 'accountType',
    fhEmailId: 'fhEmailId',
    fffhForEmailId: 'fffhForEmailId',
    fhIsdCodeForMobileNo: 'fhIsdCodeForMobileNo',
    fhOfMobileNo: 'fhOfMobileNo',
    fhffForMobileNo: 'fhffForMobileNo',
    shEmailId: 'shEmailId',
    shffForEmailId: 'shffForEmailId',
    shIsdCodeForMobileNo: 'shIsdCodeForMobileNo',
    shOfMobileNo: 'shOfMobileNo',
    shffForMobileNo: 'shffForMobileNo',
    thEmailId: 'thEmailId',
    thFfForEmailId: 'thFfForEmailId',
    thIsdCodeForMobileNo: 'thIsdCodeForMobileNo',
    thOfMobileNo: 'thOfMobileNo',
    thffForMobileNo: 'thffForMobileNo',
  };

  //accountTypes: LovModel[] = [];
  constructor(private contactDetailsService: ContactDetailsService,private isdservice:IsdCodeService,
    private lovService: LOVService, dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService,
    router: Router,loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService:BranchService
    ) {
    super(dialog, activatedRoute,location, frontendHelperService,
      notifyService, loginService,
      allocationService, router,branchService);
    this.formInit();
    this.setLov();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.service && changes.service.currentValue) {
      this.service = changes.service.currentValue;
      this.contactDetailsService.service = this.service;
      this.initData();
      if(changes.disableForm.currentValue){
        this.disableForm = changes.disableForm.currentValue;
      }
      if(this.disableForm){
        this.formInput.disable();
      }
    }
  }

  ngOnInit(): void {
    this.formInput.statusChanges.subscribe(() => {
      this.isFormValid();
    });
  }

  initData() {
    this.getIsdCode();
    if (this.recId > 0) {
      this.getData();
    }
  }

  formInit() {
    this.formInput = new FormGroup({
      //accountType: new FormControl('',   ),
      fffhForEmailId: new FormControl('',  ),
      fhEmailId: new FormControl('',   ),
      fhffForMobileNo: new FormControl('',  ),
      fhIsdCodeForMobileNo: new FormControl('',    ),
      fhOfMobileNo: new FormControl('',    ),
      shffForEmailId: new FormControl('',  ),
      shEmailId: new FormControl('',   ),
      shffForMobileNo: new FormControl('',  ),
      shIsdCodeForMobileNo: new FormControl('',    ),
      shOfMobileNo: new FormControl('',    ),
      thFfForEmailId: new FormControl('',    ),
      thEmailId: new FormControl('',),
      thffForMobileNo: new FormControl('',    ),
      thIsdCodeForMobileNo: new FormControl('', ),
      thOfMobileNo: new FormControl('', ),
    });
  }

  setLov() {
    // this.lovService.getLOVData(LOV.Inward).subscribe((response: any) => {
    //   this.accountTypes = response.data;
    // });
  }

  setData() {
    this.formInput.patchValue({
      fffhForEmailId: this.entity?.ffFhForEmailId as string,
      fhEmailId: this.entity?.fhEmailId as string,
      fhIsdCodeForMobileNo: this.entity?.fhIsdCodeForMobileNo as string,
      fhffForMobileNo: this.entity?.fhFfForMobileNo as string,
      fhOfMobileNo: this.entity?.fhOfMobileNo as string,
      shffForEmailId: this.entity?.shFfForEmailId as string,
      shEmailId: this.entity?.shEmailId as string,
      shIsdCodeForMobileNo: this.entity?.shIsdCodeForMobileNo as string,
      shffForMobileNo: this.entity?.shFfForMobileNo as string,
      shOfMobileNo: this.entity?.shOfMobileNo as string,
      thEmailId: this.entity?.thEmailId as string,
      thFfForEmailId: this.entity?.thFfForEmailId as string,
      thIsdCodeForMobileNo: this.entity?.thIsdCodeForMobileNo as string,
      thOfMobileNo: this.entity?.thOfMobileNo as string,
      thffForMobileNo: this.entity?.thFfForMobileNo as string,
    });
  }


  isFormValid(isDestroyed = false) {
    this.frontendHelperService.emitFormValid(EmitType.ContactDetails,
      this.formInput.valid,
      isDestroyed);
  }

  getData() {
    return this.contactDetailsService.getDataByDependentId(this.recId).subscribe(resp => {
      this.entity = resp;
      this.setData();
      this.isFormValid();
    });
  }

  saveData() {
    return this.contactDetailsService.updateData(this.recId, this.getFormValues());
  }

  getIsdCode() {
    const req: SortFilterModel = new SortFilterModel();
    req.length = 1000;
    this.isdservice.getAllData(req).subscribe((response: any) => {
      this.isdCodeList = response.data;
      console.log(this.isdCodeList);
    });
  }

  getFormValues(): ContactModel {
    const model: ContactModel = this.entity ? this.entity : new ContactModel();
    model.cmsContactDetailsId = this.entity && this.entity.cmsContactDetailsId > 0 ? this.entity?.cmsContactDetailsId : 0;
    model.cmsDataEntryId = this.recId;
    if (this.service == ServiceType.Checker) {
      model.cmsDataEntryId = this.cmsDataEntryId;
      model.cmsCheckerId = this.recId;
    }

    model.ffFhForEmailId = this.formInput.controls[this.properties.fffhForEmailId].value as boolean == true ? "Y" : "N";
    model.fhEmailId = this.formInput.controls[this.properties.fhEmailId].value as string;
    model.fhIsdCodeForMobileNo = this.formInput.controls[this.properties.fhIsdCodeForMobileNo].value as string;
    model.fhFfForMobileNo = this.formInput.controls[this.properties.fhffForMobileNo].value as string;
    model.fhOfMobileNo = this.formInput.controls[this.properties.fhOfMobileNo].value as string;

    model.shFfForEmailId = this.formInput.controls[this.properties.shffForEmailId].value as boolean == true ? "Y" : "N";
    model.shEmailId = this.formInput.controls[this.properties.shEmailId].value as string;
    model.shIsdCodeForMobileNo = this.formInput.controls[this.properties.shIsdCodeForMobileNo].value as string;
    model.shFfForMobileNo = this.formInput.controls[this.properties.shffForMobileNo].value as string;
    model.shOfMobileNo = this.formInput.controls[this.properties.shOfMobileNo].value as string;

    model.thFfForEmailId = this.formInput.controls[this.properties.thFfForEmailId].value as boolean == true ? "Y" : "N";
    model.thEmailId = this.formInput.controls[this.properties.thEmailId].value as string;
    model.thIsdCodeForMobileNo = this.formInput.controls[this.properties.thIsdCodeForMobileNo].value as string;
    model.thOfMobileNo = this.formInput.controls[this.properties.thOfMobileNo].value as string;
    model.thFfForMobileNo = this.formInput.controls[this.properties.thffForMobileNo].value as string;


    return model;
  }



}
