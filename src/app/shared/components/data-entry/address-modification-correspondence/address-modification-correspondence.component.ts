import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from '../../../base';
import { EmitType, LOV, PatternValidation, ServiceType } from '../../../enums';
import {
  AddressModificationModel, BaseListModel,
  CityModel, CountryModel, LovModel, SortFilterModel, StateModel, ZipCodeModel
} from '../../../models';
import { BaseDataService, BranchService, LoginService, LOVService } from '../../../services';
import { Location } from "@angular/common";
import { CountryService } from '../../../services/transaction/country.service';
import { StateService } from '../../../services/transaction/state.service';
import { CityService } from '../../../services/transaction/city.service';
import { ZipCodeService } from '../../../services/transaction/zipcode.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressModificationCorrespondanceService } from 'src/app/shared/services/transaction/data-entry/address-modification-correspondance.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';


@Component({
  selector: 'app-address-modification-correspondence',
  templateUrl: './address-modification-correspondence.component.html',
  styleUrls: ['./address-modification-correspondence.component.css'],
})
export class AddressModificationCorrespondenceComponent
  extends BaseDetailComponent<AddressModificationModel>
  implements OnInit, OnChanges {
  @Input() service: ServiceType = ServiceType.None;
  @Input() cmsDataEntryId: number = 0;
  @Input() disableForm: boolean = false;
  properties: any = {
    cmsAddressCorresId: 'cmsAddressCorresId',
    cmsDataEntryId: 'cmsDataEntryId',
    // accountType: 'accountType',
    add1: 'add1',
    add2: 'add2',
    add3: 'add3',
    countryId: 'countryId',
    stateId: 'stateId',
    cityId: 'cityId',
    zipId: 'zipId',
    userRemarks: 'userRemarks',
    status: 'status',
    boStatus: 'boStatus',
    fileName: 'fileName'
  };
  //accountTypes: LovModel[] = [];
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  zipCodes: ZipCodeModel[] = [];
  userRemarks: LovModel[] = [];

  constructor(private lovService: LOVService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private zipCodeService: ZipCodeService,router: Router,
    private addressService: AddressModificationCorrespondanceService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService,branchService:BranchService) {
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.service && changes.service.currentValue) {
      this.service = changes.service.currentValue;
      this.addressService.service = this.service;
      this.initData();
    }
    if(changes.disableForm.currentValue){
      this.disableForm = changes.disableForm.currentValue;
    }
    if(this.disableForm){
      this.formInput.disable();
    }
  }

  ngOnInit(): void {
    this.formInput.statusChanges.subscribe(() => {
      this.isFormValid();
    });

  }

  initForm() {
    this.formInput = new FormGroup({
      //accountType: new FormControl(''   ),
      add1: new FormControl(''),
      add2: new FormControl(''   ),
      add3: new FormControl(''   ),
      countryId: new FormControl(''   ),
      stateId: new FormControl(''   ),
      cityId: new FormControl(''   ),
      zipId: new FormControl(''   ),
      userRemarks: new FormControl(''   ),
      fileName: new FormControl(''   ),
      boStatus: new FormControl(''   ),
    });
  }


  initData() {
    const requests: Observable<any>[] = this.setLov();
    requests.push(this.setCountry());
    if (this.recId > 0) {
      requests.push(this.getData());
    }
    forkJoin(requests).subscribe(responses => {
      //this.accountTypes = responses[0].data;
      this.userRemarks = responses[0].data;
      this.countries = responses[1].data;
      if (this.recId > 0) {
        this.entity = responses[2];
        this.setData();
        this.isFormValid();
      }
    });
  }

  getData() {
    return this.addressService.getDataByDependentId(this.recId);
  }

  saveData() {
    return this.addressService.updateData(this.recId, this.getFormValues());
  }

  isFormValid(isDestroyed = false) {
    this.frontendHelperService.emitFormValid
      (EmitType.AddressModificationCorrespondence,
        this.formInput.valid,
        isDestroyed);
  }

  getFormValues(): AddressModificationModel {
    const model: AddressModificationModel = this.entity ? this.entity : new AddressModificationModel();
    model.cmsAddressCorresId = this.entity && this.entity.cmsAddressCorresId > 0 ? this.entity?.cmsAddressCorresId : 0;
    model.cmsDataEntryId = this.recId;
    if (this.service == ServiceType.Checker) {
      model.cmsDataEntryId = this.cmsDataEntryId;
      model.cmsCheckerId = this.recId;
    }
    //model.accountType = this.formInput.controls[this.properties.accountType].value as number;
    model.add1 = this.formInput.controls[this.properties.add1].value as string;
    model.add2 = this.formInput.controls[this.properties.add2].value as string;
    model.add3 = this.formInput.controls[this.properties.add3].value as string;
    model.countryId = this.formInput.controls[this.properties.countryId].value?.cmsCountryId as number;
    model.stateId = this.formInput.controls[this.properties.stateId].value?.cmsStateId as number;
    model.cityId = this.formInput.controls[this.properties.cityId].value?.cmsCityId as number;
    model.zipId = this.formInput.controls[this.properties.zipId].value?.cmsZipId as number;
    model.userRemarks = this.formInput.controls[this.properties.userRemarks].value as string;
    model.fileName = this.formInput.controls[this.properties.fileName].value as string;
    model.boStatus = this.formInput.controls[this.properties.boStatus].value as string;

    return model;
  }

  setLov(): Observable<BaseListModel<LovModel>>[] {
    const lovRequests: Observable<BaseListModel<LovModel>>[] = [];
    //lovRequests.push(this.lovService.getLOVData(LOV.AccountType));
    lovRequests.push(this.lovService.getLOVData(LOV.UserRemarks));
    return lovRequests;
  }

  setCountry(): Observable<BaseListModel<CountryModel>> {
    this.countries = [];
    this.states = [];
    this.cities = [];
    this.zipCodes = [];
    const sortFilterModel: SortFilterModel = new SortFilterModel();
    sortFilterModel.length = 500;
    sortFilterModel.start = 0;
    return this.countryService.getAllData(sortFilterModel);
  }

  setData() {
    this.formInput.patchValue({
      // accountType: this.entity?.accountType as number,
      add1: this.entity?.add1 as string,
      add2: this.entity?.add2 as string,
      add3: this.entity?.add3 as string,
      userRemarks: this.entity?.userRemarks as string,
      fileName: this.entity?.fileName as string,
      boStatus: this.entity?.boStatus as string,
    });
    if (this.entity?.countryId && this.entity.countryId > 0) {
      const country = this.countries.find(f => f.cmsCountryId == this.entity?.countryId);
      this.formInput.patchValue({
        countryId: country
      });
      this.onCountryChange(country, true);
    }
  }

  onCountryChange(country?: CountryModel, isInit = false) {
    this.states = [];
    this.cities = [];
    this.zipCodes = [];
    const sortFilterModel: SortFilterModel = new SortFilterModel();
    sortFilterModel['cmsCountryId'] = country?.cmsCountryId;
    sortFilterModel.length = 500;
    sortFilterModel.start = 0;
    this.stateService.getAllData(sortFilterModel).subscribe((resp) => {
      this.states = resp.data as StateModel[];
      if (isInit) {
        const state = this.states.find(f => f.cmsStateId == this.entity?.stateId);
        if (state) {
          this.formInput.patchValue({
            stateId: state,
          });
          this.onStateChange(state, isInit);
        }
      }
    });
  }

  onStateChange(state: StateModel, isInit = false) {
    this.cities = [];
    this.zipCodes = [];
    const sortFilterModel: SortFilterModel = new SortFilterModel();
    sortFilterModel['cmsStateId'] = state.cmsStateId;
    sortFilterModel.length = 500;
    sortFilterModel.start = 0;
    this.cityService.getAllData(sortFilterModel).subscribe((resp) => {
      this.cities = resp.data as CityModel[];
      if (isInit) {
        const city = this.cities.find(f => f.cmsCityId == this.entity?.cityId);
        if (city) {
          this.formInput.patchValue({
            cityId: city,
          });
        }
      }
    });
    this.zipCodeService.getAllData(sortFilterModel).subscribe((resp) => {
      this.zipCodes = resp.data as ZipCodeModel[];
      if (isInit) {
        const zipcode = this.zipCodes.find(f => f.cmsZipId == this.entity?.zipId);
        if (zipcode) {
          this.formInput.patchValue({
            zipId: zipcode
          });
        }
      }
    });
  }
}
