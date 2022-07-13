import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BaseDataService, LoginService } from 'src/app/shared/services';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Status, ValidationErrorCodes } from '../../enums';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';
import { BaseValidationsComponent } from '../base-validations/base-validations.component';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export class BaseListComponent<T> extends BaseValidationsComponent implements OnInit {
  status = Status;
  displayColumns: any[] = [];
  totalRecords: number = 0;
  dataSource: T[] = [];
  paginationSizes: number[] = [10, 25, 50, 100];
  defaultPageSize: number = 100;
  isPageable: boolean = true;
  isFilterable: boolean = true;

  public validationErrorCodes = ValidationErrorCodes;
  public formInput: FormGroup = new FormGroup({});
  constructor(
    protected baseService: BaseDataService,
    protected location: Location, frontendHelperService: FrontendHelperService,
    protected loginService: LoginService,
    public router: Router,
  ) {
    super();
    this.setForm(this.formInput);
  }

  onBack() {
    this.location.back();
  }

  tabClick(event: MatTabChangeEvent, createdByCurrentUser: boolean = false
    , allocatedToCurrentUser: boolean = false) {
    this.getData(undefined, createdByCurrentUser, allocatedToCurrentUser);
  }
  getData(sortFilterData?: SortFilterModel
    , createdByCurrentUser: boolean = false
    , allocatedToCurrentUser: boolean = false) {
    if (!sortFilterData) {
      sortFilterData = new SortFilterModel();
      sortFilterData.length = this.defaultPageSize;
    }
    if (allocatedToCurrentUser) {
      sortFilterData.allocatedTo = this.loginService.GetUser().userId;
    }
    if (createdByCurrentUser) {
      sortFilterData.createdById = this.loginService.GetUser().userId;
    }
    this.dataSource = [];
    this.baseService
      .getAllData<T>(sortFilterData)
      .subscribe((res: BaseListModel<T>) => {
        this.dataSource = res.data;
        this.totalRecords = res.totalRecords;
      });
  }

  ngOnInit(): void { }

  sortData(sortFilterData: any) {
    this.baseService
      .getAllData<T>(sortFilterData)
      .subscribe((res: BaseListModel<T>) => {
        this.dataSource = res.data;
        this.totalRecords = res.totalRecords;
      });
  }

  filterData(sortFilterData: any) {
    this.baseService
      .getAllData<T>(sortFilterData)
      .subscribe((res: BaseListModel<T>) => {
        this.dataSource = res.data;
        this.totalRecords = res.totalRecords;
      });
  }

  pageData(sortFilterData: any) {
    this.baseService
      .getAllData<T>(sortFilterData)
      .subscribe((res: BaseListModel<T>) => {
        this.dataSource = res.data;
        this.totalRecords = res.totalRecords;
      });
  }

  navigateToUrl(url: string) {
    this.router.navigate([url], { skipLocationChange: true });
  }
}
