import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { CaseInitiationModel } from 'src/app/shared/models';
import { CaseInitiationService, LoginService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-case-initiation-list',
  templateUrl: './case-initiation-list.component.html',
  styleUrls: ['./case-initiation-list.component.css'],
})
export class CaseInitiationListComponent
  extends BaseListComponent<CaseInitiationModel>
  implements OnInit {
  constructor(
    private service: CaseInitiationService,
    router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);
    this.displayColumns = new CaseInitiationModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(order: CaseInitiationModel) {
    this.router.navigate([
      '/case-initiation/details/',
      order.cmsCaseInitiationId,
    ],{skipLocationChange: true});
  }

}
