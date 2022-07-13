import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent, BaseListComponent } from 'src/app/shared/base';
import { CaseSummaryModel } from 'src/app/shared/models';
import { BaseDataService, BranchService, CaseInitiationService, LoginService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { CaseSummaryService } from 'src/app/shared/services/transaction/case-summary.service';
import { CaseStage } from 'src/app/shared/enums';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

@Component({
  selector: 'app-case-summary',
  templateUrl: './case-summary.component.html',
  styleUrls: ['./case-summary.component.css'],
})
export class CaseSummaryComponent extends BaseDetailComponent<CaseSummaryModel>
  implements OnInit {
  caseStageStatus?: any;
  stage = CaseStage;
  constructor(
    private caseSummaryService: CaseSummaryService,
    dialog: MatDialog, activatedRoute: ActivatedRoute, router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService: BranchService
  ) {
    super(dialog,activatedRoute, location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);  }

  ngOnInit(): void {
    this.caseStageStatus = this.activatedRoute.snapshot.params['case-stage'];
    if(this.caseStageStatus){
      this.caseStageStatus = this.caseStageStatus.replace('-',' ').toUpperCase();
    }
  }

}
