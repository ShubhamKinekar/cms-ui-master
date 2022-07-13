import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LovModel, RoleModel } from 'src/app/shared/models';
import { RoleService, LoginService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { LovmasterModel } from 'src/app/shared/models/lovmaster.model';
import { LovService } from 'src/app/shared/services/uam/lov.service';

@Component({
  selector: 'app-lov-list',
  templateUrl: './lov-list.component.html',
  styleUrls: ['./lov-list.component.css']
})
export class LovListComponent extends BaseListComponent<LovmasterModel>
implements OnInit {
constructor(
  service: LovService,
  public router: Router,
  location: Location, frontendHelperService: FrontendHelperService,
  loginService: LoginService
) {
  super(service, location, frontendHelperService, loginService,router);


  this.displayColumns = new LovmasterModel().displayColumns();
}
onBack(){
  this.router.navigate(['/admin/lov-master'],{skipLocationChange: true});  
}
ngOnInit(): void {
  this.getData(undefined, true);
}
rowAction(lov: LovmasterModel) {
  this.router.navigate(['/admin/lov/details/', lov.cmsMasterLovId]);
}

}
