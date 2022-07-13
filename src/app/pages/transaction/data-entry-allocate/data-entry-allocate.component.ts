import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseListComponent } from 'src/app/shared/base';
import { AllocationModel, DataEntryModel, SortFilterModel } from 'src/app/shared/models';
import { Location } from '@angular/common';
import { DataEntryService } from 'src/app/shared/services/transaction/data-entry/data-entry.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { Status } from 'src/app/shared/enums';
import { LoginService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-data-entry-allocate',
  templateUrl: './data-entry-allocate.component.html',
  styleUrls: ['./data-entry-allocate.component.css'],
})
export class DataEntryAllocateComponent
  extends BaseListComponent<DataEntryModel>
  implements OnInit
{
  formInput: FormGroup = new FormGroup({});
  matcher = new ErrorState();
  properties: any = {
    allocatedUser: 'allocatedUser',
  };
  allocatedUserList: any;
  selectedItems: number[] = [];
  constructor(
    private service: DataEntryService, router: Router,
    private dialog: MatDialog,
    private notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    
    this.displayColumns = new DataEntryModel().displayColumns();
    this.formInput = new FormGroup({
      allocatedUser: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getallocatedUserList();
    const sortFilterData = new SortFilterModel();
    sortFilterData['status'] = Status.DataEntryPending;
    this.getData(sortFilterData);
  }

  rowAction(event: any) {}


  isDisabled() {
    return !(this.formInput.valid && this.selectedItems && this.selectedItems.length > 0);
  }

  selectAction(selectedItems: DataEntryModel[]) {
    this.selectedItems = selectedItems.map((f) => f.cmsDataEntryId);
  }

  getallocatedUserList() {
    this.service.getAllocatedUserData().subscribe((response: any) => {
      this.allocatedUserList = response.data;
    });
  }

  allocated() {
    const allocation: AllocationModel = new AllocationModel();
    allocation.cmsDataEntryId = this.selectedItems;
    allocation.allocatedUserId = this.formInput.controls[
      this.properties.allocatedUser
    ].value as number;
    allocation.status = Status.DataEntryAllocated;
    this.service.saveAllocation(allocation).subscribe((res) => {
      if (res) {
        this.getallocatedUserList();
        this.notifyService.showSuccess('Data Saved', 'successfully');
        this.router.navigate(['/data-entry'],{skipLocationChange: true});
      }
    });
  }
  onBack(){
    this.router.navigate(['/data-entry']);  
  }

}
