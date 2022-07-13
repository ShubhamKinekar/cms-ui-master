import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseListComponent } from 'src/app/shared/base';
import { ScrutinyModel } from 'src/app/shared/models';
import { LoginService, ScrutinyService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-scrutiny-list',
  templateUrl: './scrutiny-list.component.html',
  styleUrls: ['./scrutiny-list.component.css'],
})
export class ScrutinyListComponent
  extends BaseListComponent<ScrutinyModel>
  implements OnInit
{
  constructor(
    private service: ScrutinyService,
    router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new ScrutinyModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData();
  }

  rowAction(data: ScrutinyModel) {
    this.router.navigate(['/scrutiny/details/', data.cmsScrutinyId],{skipLocationChange: true});
  }
}
