import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { CheckerModel } from 'src/app/shared/models';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { CheckerService } from 'src/app/shared/services/transaction/checker.service';
import { LoginService } from 'src/app/shared/services';
@Component({
  selector: 'app-checker-list',
  templateUrl: './checker-list.component.html',
  styleUrls: ['./checker-list.component.css'],
})
export class CheckerListComponent
  extends BaseListComponent<CheckerModel>
  implements OnInit
{
  constructor(
    private service: CheckerService,
    public router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    
    this.displayColumns = new CheckerModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData();
  }

  rowAction(data: CheckerModel) {
    //this.dataSource = this.dataSource.filter((item) => item.id !== order.id);
    this.router.navigate(['/checker/details/', data.cmsCheckerId], {skipLocationChange: true});
  }

}
