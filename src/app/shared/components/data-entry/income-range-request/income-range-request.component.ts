import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from '../../../base';
import { EmitType, LOV, ServiceType } from '../../../enums';
import { IncomeRangeModel, LovModel } from '../../../models';
import { BaseDataService, BranchService, LoginService, LOVService } from '../../../services';
import { Location } from "@angular/common";
import { IncomeRangeService } from 'src/app/shared/services/transaction/income-range.service';
import * as _ from 'lodash';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { IncomeRangesModel } from 'src/app/shared/models/income-ranges.model'
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

@Component({
  selector: 'app-income-range-request',
  templateUrl: './income-range-request.component.html',
  styleUrls: ['./income-range-request.component.css'],
})
export class IncomeRangeRequestComponent
  extends BaseDetailComponent<IncomeRangeModel>
  implements OnInit,OnChanges {
  @Input() service:ServiceType = ServiceType.None;
  @Input() changesApplicableTo: LovModel[] = [];
  @Input() cmsDataEntryId: number = 0;
  @Input() disableForm: boolean = false;


  properties: any = {
    incomeRangeId: 'incomeRangeId',
    incomeType: 'incomeType',
  };
  incomeTypes: string[] = [];
  incomeRanges: IncomeRangesModel[] = [];
  allData: IncomeRangesModel[] = [];
  constructor(private incomeService: IncomeRangeService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService,router: Router,
    loginService: LoginService, allocationService: AllocationService,branchService:BranchService,
    notifyService: NotificationService) {
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
      allocationService, router,branchService);
    this.formInit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.changesApplicableTo && changes.changesApplicableTo.currentValue) {
      this.changesApplicableTo = changes.changesApplicableTo.currentValue;
      this.onChanges();
    }
    if (changes && changes.service && changes.service.currentValue) {
      this.service = changes.service.currentValue;
      this.incomeService.service = this.service;
    }
    if (this.service != ServiceType.None && this.changesApplicableTo.length > 0) {
      this.onChanges();
    }
    if(changes.disableForm.currentValue){
      this.disableForm = changes.disableForm.currentValue;
    }
    if(this.disableForm){
      this.formInput.disable();
    }
  }
  onChanges() {
    this.entity = null;
    this.incomeRange();
    this.initData();
  }
  ngOnDestroy(): void {
    this.frontendHelperSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.formInput.statusChanges.subscribe(() => {
      this.isFormValid();
    });
  }

  initData() {
    const requests: Observable<any>[] = [];
    requests.push(this.incomeRange());
    if (this.recId > 0) {
      requests.push(this.getData());
    }
    forkJoin(requests).subscribe(responses => {
      this.allData = responses[0].data;
      this.incomeTypes = _.uniq(responses[0].data.map((f: { incomeType: any; }) => f.incomeType)) as string[];
      if (this.recId > 0) {
        this.entity = responses[1];
        this.setData();
        this.isFormValid();
      }
    });
  }


  setData() {
    const range = this.allData.find(f => f.cmsMasterNSDLIncomeRangeId == this.entity?.incomeRangeId);
    if (range) {
      this.incomeRanges = this.allData.filter(a => a.incomeType == range.incomeType);
      this.formInput.patchValue({
        incomeType: range.incomeType,
        incomeRangeId: range
      });
    }
  }

  formInit() {
    this.formInput = new FormGroup({
      incomeType: new FormControl(''   ),
      incomeRangeId: new FormControl(''   ),
    });
  }


  incomeRange() {
    if(this.changesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('cdsl') > -1) > -1){
      return this.incomeService.getIncomeRange(LOV.CDSL);
    }
    if(this.changesApplicableTo.findIndex(f => f.value && f.value?.toLowerCase().indexOf('nsdl') > -1) > -1){
      return this.incomeService.getIncomeRange(LOV.NSDL);
    }
    else{
      return this.incomeService.getIncomeRange(LOV.Trading);
    }
    
  }

  onSelection(incomeType: string) {
    console.log(incomeType);
    console.log(this.incomeTypes);
    this.incomeRanges = this.allData.filter(a => a.incomeType == incomeType);
  }


  isFormValid(isDestroyed = false) {
    this.frontendHelperService.emitFormValid(EmitType.IncomeRange,
      this.formInput.valid,
      isDestroyed);
  }

  getData() {
    return this.incomeService.getDataByDependentId(this.recId);
  }

  saveData() {
    return this.incomeService.updateData(this.recId, this.getFormValues());
  }

  getFormValues(): IncomeRangeModel {
    const model: IncomeRangeModel = this.entity ? this.entity : new IncomeRangeModel();
    model.cmsIncomeRangeId = this.entity && this.entity.cmsIncomeRangeId > 0 ? this.entity?.cmsIncomeRangeId : 0;
    model.cmsDataEntryId = this.recId;
    if (this.service == ServiceType.Checker) {
      model.cmsDataEntryId = this.cmsDataEntryId;
      model.cmsCheckerId = this.recId;
    }
    //model.incomeType = this.formInput.controls[this.properties.incomeType].value as string;
    model.incomeRangeId = this.formInput.controls[this.properties.incomeRangeId].value?.cmsMasterNSDLIncomeRangeId as number;

    return model;
  }

}
