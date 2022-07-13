import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseListComponent } from 'src/app/shared/base';
import { Status } from 'src/app/shared/enums';
import { AllocationModel, ScrutinyModel, SortFilterModel } from 'src/app/shared/models';
import { LoginService, ScrutinyService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { Router } from '@angular/router';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';

import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-scrutiny-allocate',
  templateUrl: './scrutiny-allocate.component.html',
  styleUrls: ['./scrutiny-allocate.component.css'],
})
export class ScrutinyAllocateComponent
  extends BaseListComponent<ScrutinyModel>
  implements OnInit {
  formInput: FormGroup = new FormGroup({});
  matcher = new ErrorState();
  properties: any = {
    allocatedUser: 'allocatedUser',
  };
  allocatedUserList: any;

  selectedItems: number[] = [];
  constructor(
    private service: ScrutinyService,
    private dialog: MatDialog, router: Router,
    private notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService, router);

    this.displayColumns = new ScrutinyModel().displayColumns();
    this.formInput = new FormGroup({
      allocatedUser: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }

  ngOnInit(): void {
    this.getAllocatedUserList();
    const sortFilterData = new SortFilterModel();
    sortFilterData['status'] = Status.ScrutinyPending;
    this.getData(sortFilterData);
  }

  isDisabled() {
    return !(this.formInput.valid && this.selectedItems && this.selectedItems.length > 0);
  }

  getAllocatedUserList() {
    this.service.getAllocatedUserData().subscribe((response: any) => {
      this.allocatedUserList = response.data;
    });
  }

  rowAction(event: any) { }

  selectAction(selectedItems: ScrutinyModel[]) {
    this.selectedItems = selectedItems.map((f) => f.cmsScrutinyId);
  }

  allocated() {
    const allocation: AllocationModel = new AllocationModel();
    allocation.cmsScrutinyId = this.selectedItems;
    allocation.allocatedUserId = this.formInput.controls[
      this.properties.allocatedUser
    ].value as number;
    allocation.status = Status.ScrutinyAllocated;
    this.service.saveAllocation(allocation).subscribe((res) => {
      if (res) {
        this.getAllocatedUserList();
        this.notifyService.showSuccess('Data Saved', 'successfully');
        this.router.navigate(['/scrutiny'], { skipLocationChange: true });
      }
    });
  }
}
