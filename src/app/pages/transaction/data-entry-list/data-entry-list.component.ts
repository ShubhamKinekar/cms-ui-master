import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BaseListComponent } from 'src/app/shared/base';
import { DataEntryModel } from 'src/app/shared/models';
import { CaseInitiationService, LoginService } from 'src/app/shared/services';
import { DataEntryService } from 'src/app/shared/services/transaction/data-entry/data-entry.service';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';

@Component({
  selector: 'app-data-entry-list',
  templateUrl: './data-entry-list.component.html',
  styleUrls: ['./data-entry-list.component.css'],
})
export class DataEntryListComponent
  extends BaseListComponent<DataEntryModel>
  implements OnInit
{
  constructor(
    private service: DataEntryService,
    router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new DataEntryModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData();
  }

  // rowAction(order: DataEntryModel) {
  //  // this.dataSource = this.dataSource.filter((item) => item.id !== order.id);
  // }

  rowAction(data: DataEntryModel) {
    this.router.navigate(['/data-entry/details/', data.cmsDataEntryId],{skipLocationChange: true});
  }

}
