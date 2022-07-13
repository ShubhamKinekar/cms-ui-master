import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseStage, ServiceType, Status, ValidationErrorCodes } from '../../enums';
import { AllocationModel, BacodeModel, BaseModel, BranchModel, ClientViewModel } from '../../models';
import { FrontendHelperService } from '../../services/common/frontend-helper.service';
import { BranchListComponent } from '../../components/branch-list/branch-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AllocationService } from '../../services/transaction/allocation.service';
import { NotificationService } from '../../services/common/notification.service';
import { BranchService, LoginService } from '../../services';
import { PanListComponent } from '../../components/pan-list/pan-list.component';
import { BacodeListComponent } from '../../components/bacode-list/bacode-list.component';
import { BaseValidationsComponent } from '../base-validations/base-validations.component';
@Component({
  template: '',
})
export class BaseDetailComponent<T> extends BaseValidationsComponent implements OnDestroy {
  downloadUrl: any;
  downloadFileName: any;
  public status = Status;
  public serviceType = ServiceType;
  public recId = 0;
  isExistingUser: boolean = true;
  docReceived: boolean = true;
  public entity: T | null = null;
  public disableForm: boolean = false;
  public validationErrorCodes = ValidationErrorCodes;
  public formInput: FormGroup = new FormGroup({});
  public caseStage?: CaseStage;
  public frontendHelperSub?: Subscription;
  totalRecords: number = 0;
  dataSource: T[] = [];
  paginationSizes: number[] = [10, 25, 50, 100];
  defaultPageSize: number = 100;
  rmCodes: any;

  constructor(
    protected dialog: MatDialog, protected activatedRoute: ActivatedRoute,
    protected location: Location, protected frontendHelperService: FrontendHelperService, protected notifyService: NotificationService,
    protected loginService: LoginService, protected allocationService: AllocationService, protected router: Router, protected branchService: BranchService,
  ) {
    super();
    this.recId = +this.activatedRoute.snapshot.params['id'];
    this.recId = Number.isNaN(this.recId) ? 0 : this.recId;

    this.caseStage = this.activatedRoute.snapshot.params['case-stage'];

    this.setForm(this.formInput);

  }
  
  checkFormStage(): boolean {
    if (this.caseStage) {
      this.formInput.disable();
      this.disableForm = true;
    }
    return this.caseStage ? true : false;
  }


  downloadFile() {
    const link = document.createElement("a");
    link.download = this.downloadFileName;
    link.href = this.downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.downloadUrl = null;
  }


  userTypeChange(state: boolean) {
    this.isExistingUser = !state;
    // this.setPanValidation();
  }

  // setPanValidation() {
  //   if(this.isExistingUser) {
  //     this.formInput.controls['customerEmail'].setValidators([Validators.required]);
  //     this.formInput.controls['changesApplicableTo'].setValidators([Validators.required]);
  //   }else {
  //     this.formInput.controls['customerEmail'].clearValidators();
  //     this.formInput.controls['changesApplicableTo'].setValidators([Validators.required]);

  //   }    
  //   this.formInput.controls['customerEmail'].updateValueAndValidity();
  //   this.formInput.controls['changesApplicableTo'].setValidators([Validators.required]);

  // }


  ngOnDestroy(): void {
    if (this.frontendHelperSub) {
      this.frontendHelperSub?.unsubscribe();
    }
  }

  onBack() {
    this.location.back();
  }


  searchBranch() {
    const dialogRef = this.dialog.open(BranchListComponent);
    dialogRef.afterClosed().subscribe((res: BranchModel) => {
      if (res.solId && res.solId > 0) {
        this.formInput.patchValue({
          branchCode: res.solId,
        });
        this.branchService.getRmCodeData(res.solId).subscribe((response: any) => {
          // this.rmCodes = response && response.length > 0 ? response.map((o: any) => {
          //   return o.employeeName + '(' + o.employeeId + ')';
          // }).join(', ') : [];
           this.rmCodes = response;
           console.log(this.rmCodes);
        })
      }

    });
  }


  onBranchCodeSelection() {

    const dialogRef = this.dialog.open(BacodeListComponent);
    dialogRef.afterClosed().subscribe((res: BacodeModel) => {
      if (res.cmsMasterBacodeId && res.cmsMasterBacodeId > 0) {
        this.formInput.patchValue({
          bacode: res.bacode,
        });
      }
    });

  }


  searchPanNumber() {
    const dialogRef = this.dialog.open(PanListComponent);
    dialogRef.afterClosed().subscribe((res: ClientViewModel) => {
      this.formInput.patchValue({
        panNo: res.panNo,
        tradingAccountNo: res.clientId,
        dematAccountNo: res.dpAccNo,
        clientNameTrading: res.clientName,
        customerEmail: res.email,
        customerMobile: res.mobile,
        clientNameDemat: res.clientName,
      });
    });
  }

  allocateToCurrentUser(serviceType: ServiceType, fieldName: string,
    status: Status, title: string) {
    const model: AllocationModel = new AllocationModel();
    model[fieldName] = [this.recId];
    model.allocatedUserId = this.loginService.GetUser().userId;
    model.status = status;
    this.allocationService.saveAllocation(serviceType, model).subscribe((res) => {
      if (res) {
        this.notifyService.showSuccess(title, title + ' successful');
        //window.location.reload();
        // console.log(this.router.url);
        // window.location.replace(this.router.url);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        // this.router.navigate([this.router.url],{skipLocationChange: true});
        this.router
          .navigateByUrl(this.router.url, { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.router.url], { skipLocationChange: true });
          });


      }
    });
  }


}
