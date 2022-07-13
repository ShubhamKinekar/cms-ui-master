import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/base/base-list/base-list.component';
import { Location } from '@angular/common';
import { AllocationModel, CheckerModel, SortFilterModel } from 'src/app/shared/models';
import { LoginService } from 'src/app/shared/services';
import { CheckerService } from 'src/app/shared/services/transaction/checker.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { Status } from 'src/app/shared/enums';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-checker-allocate',
  templateUrl: './checker-allocate.component.html',
  styleUrls: ['./checker-allocate.component.css']
})
export class CheckerAllocateComponent
  extends BaseListComponent<CheckerModel>
  implements OnInit {
  formInput: FormGroup = new FormGroup({});
  matcher = new ErrorState();
  properties: any = {
    allocatedUser: 'allocatedUser',
  };
  allocatedUserList: any;
  selectedItems: number[] = [];
  constructor(private service: CheckerService,
    router: Router, private notifyService: NotificationService,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);
    this.displayColumns = new CheckerModel().displayColumns();
    this.formInput = new FormGroup({ 
      allocatedUser: new FormControl('', [Validators.required]),
    });
  }
  onBack(){
    this.router.navigate(['/checker']);  
  }

  ngOnInit(): void {
    this.getallocatedUserList();
    const sortFilterData = new SortFilterModel();
    sortFilterData['status'] = Status.CheckerPending;
    this.getData(sortFilterData);
  }

  rowAction(event: any) { }


  isDisabled() {
    return !(this.formInput.valid && this.selectedItems && this.selectedItems.length > 0);
  }

  selectAction(selectedItems: CheckerModel[]) {
    this.selectedItems = selectedItems.map((f) => f.cmsCheckerId);
  }

  getallocatedUserList() {
    this.service.getAllocatedUserData().subscribe((response: any) => {
      this.allocatedUserList = response.data;
    });
  }

  allocated() {
    const allocation: AllocationModel = new AllocationModel();
    allocation.cmsCheckerId = this.selectedItems;
    allocation.allocatedUserId = this.formInput.controls[
      this.properties.allocatedUser
    ].value as number;
    allocation.status = Status.CheckerAllocated;
    this.service.saveAllocation(allocation).subscribe((res) => {
      if (res) {
        this.getallocatedUserList();
        this.notifyService.showSuccess('Data Saved', 'successfully');
        this.router.navigate(['/checker'],{skipLocationChange: true});
      }
    });
  }
}
