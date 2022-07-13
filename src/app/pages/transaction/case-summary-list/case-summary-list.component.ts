import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { CaseSummaryModel, SortFilterModel } from 'src/app/shared/models';
import { CaseInitiationService, LoginService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { CaseSummaryService } from 'src/app/shared/services/transaction/case-summary.service';
import { CaseStage } from 'src/app/shared/enums';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-case-summary-list',
  templateUrl: './case-summary-list.component.html',
  styleUrls: ['./case-summary-list.component.css'],
})
export class CaseSummaryListComponent
  extends BaseListComponent<CaseSummaryModel>
  implements OnInit {
  constructor(
    private caseSummaryService: CaseSummaryService,
    router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(caseSummaryService, location, frontendHelperService, loginService, router);
    this.displayColumns = new CaseSummaryModel().displayColumns();

  }

  ngOnInit(): void {

  }

  rowAction(cmsCase: CaseSummaryModel) {
    let navigationUrl = '/case-summary/details/' + cmsCase.caseStageStatus?.toLowerCase().replace(' ', '-') + '/';

    switch (cmsCase.caseStageStatus) {
      case CaseStage.CaseInitiation:
        navigationUrl += (cmsCase.cmsCaseInitiationId ? cmsCase.cmsCaseInitiationId : 0);
        break;
      case CaseStage.Scrutiny:
        navigationUrl += (cmsCase.cmsScrutinyId ? cmsCase.cmsScrutinyId : 0);
        break;
      case CaseStage.DataEntry:
        navigationUrl += (cmsCase.cmsDataEntryId ? cmsCase.cmsDataEntryId : 0);
        break;
      case CaseStage.Checker:
        navigationUrl += (cmsCase.cmsCheckerId ? cmsCase.cmsCheckerId : 0);
        break;
      case CaseStage.PhysicalVerification:
        navigationUrl += (cmsCase.cmsCheckerId ? cmsCase.cmsCheckerId : 0);
        break;
      // case CaseStage.ImportExport:
      //   navigationUrl = '/import-export/details/' + (cmsCase.cmsCaseInitiationId? cmsCase.cmsCaseInitiationId : 0);
      //   break;
      // case CaseStage.PhysicalVerification:
      //   navigationUrl = '/physical-verification';
      //   break;
    }
    this.router.navigate([navigationUrl], { skipLocationChange: true });
  }

}
