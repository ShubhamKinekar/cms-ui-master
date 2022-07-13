
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService} from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BacodeModel } from 'src/app/shared/models';
import { BacodeService } from 'src/app/shared/services/transaction/bacode.service';


@Component({
  selector: 'app-bacode-list',
  templateUrl: './bacode-list.component.html',
  styleUrls: ['./bacode-list.component.css']
})
export class BacodeListComponent 
extends BaseListComponent<BacodeModel>
implements OnInit {

  constructor(
    service: BacodeService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new BacodeModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(bacode: BacodeModel) {
    this.router.navigate(['/admin/employees/details/', bacode.cmsMasterBacodeId]);
  }
}



  

