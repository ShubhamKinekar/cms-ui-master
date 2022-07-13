import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { BaseDetailComponent } from '../../base';
import { ClientViewModel } from '../../models';
import { BaseDataService, BranchService, LoginService } from '../../services';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';
import { NotificationService } from '../../services/common/notification.service';
import { AllocationService } from '../../services/transaction/allocation.service';
import { ClientViewService } from '../../services/transaction/client-view.service';

@Component({
  selector: 'app-pan-card-trading-demat',
  templateUrl: './pan-card-trading-demat.component.html',
  styleUrls: ['./pan-card-trading-demat.component.css']
})
export class PancardTradingDematComponent extends BaseDetailComponent<ClientViewModel>
 implements OnInit,OnChanges {
  @Input() parentForm: FormGroup = new FormGroup({});
  @Input() data:any;
  @Input() isPanDetailsRequired : boolean = true;
  @Input() isDemat : boolean = false;
  @Input() isTrading : boolean = false;
  properties: any = {
    tradingAccountNo: 'tradingAccountNo',
    dematAccountNo: 'dematAccountNo',
    panNo: 'panNo',
    clientNameTrading: 'clientNameTrading',
    clientNameDemat: 'clientNameDemat',
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

  constructor(private clientViewService: ClientViewService,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService, router: Router,
    loginService: LoginService, allocationService: AllocationService,branchService:BranchService,
    notifyService: NotificationService,) {
    super(dialog, activatedRoute, location, frontendHelperService,
      notifyService, loginService,
      allocationService, router,branchService);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.data.currentValue){
      this.getPanDetails();
    }
  }

  ngOnInit(): void {
    this.formInput = this.parentForm;
    this.filterPanNos();
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

  
  getPanDetails() {
    if (this.data.panNo) {
      this.clientViewService
        .filterData(
          this.properties.panNo,
          this.data.panNo,
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
          this.onPanSelection(this.data.panNo);
          this.formInput.patchValue({
            tradingAccountNo: this.data.tradingAccountNo,
            dematAccountNo: this.data.dematAccountNo,
          });
        });
    }
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



}
