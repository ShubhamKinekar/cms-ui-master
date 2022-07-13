import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { BankModel, IncomeRangeModel } from 'src/app/shared/models';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { MatDialog } from '@angular/material/dialog';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BaseDataService, BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { ServiceType } from 'src/app/shared/enums';
import { IncomeRangeService } from 'src/app/shared/services/transaction/income-range.service';

@Component({
  selector: 'app-nomination-add-mod-can',
  templateUrl: './nomination-add-mod-can.component.html',
  styleUrls: ['./nomination-add-mod-can.component.css']
})
export class NominationAddModCanComponent 
  extends BaseDetailComponent<IncomeRangeModel>
  implements OnInit,OnChanges {
  
  properties: any = {
    bankCode: 'bankCode',
    bankName: 'bankName',
  };
 
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
  ngOnChanges(): void {
  
  }
 
  ngOnInit(): void {
   
  }

  formInit() {
    this.formInput = new FormGroup({
      bankName: new FormControl(''   ),
      bankCode: new FormControl(''   ),
    });
  }
}
