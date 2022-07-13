import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { UserModel } from 'src/app/shared/models';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { LovsubService} from 'src/app/shared/services/uam/lovsub.service';
import { LovsubModel } from 'src/app/shared/models/lovsub.model';

@Component({
  selector: 'app-lovsub-list',
  templateUrl: './lovsub-list.component.html',
  styleUrls: ['./lovsub-list.component.css']
})
export class LovsubListComponent
  extends BaseListComponent<LovsubModel>
  implements OnInit
{
  constructor(
    service: LovsubService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new LovsubModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin/lov-master']);  
  }
  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(lovsub: LovsubModel) {
    this.router.navigate(['/admin/email/details/', lovsub.cmsMasterLovSub]);
  }
}




 
