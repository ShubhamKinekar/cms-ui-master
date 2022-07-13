import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MasterRmModel } from 'src/app/shared/models/master-rm.model';
import { MasterRmService } from 'src/app/shared/services/uam/master-rm.service';

@Component({
  selector: 'app-master-rm-list',
  templateUrl: './master-rm-list.component.html',
  styleUrls: ['./master-rm-list.component.css']
})
export class MasterRmListComponent 
extends BaseListComponent<MasterRmModel>

implements OnInit {

  constructor(
    private service: MasterRmService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new MasterRmModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin/lov-master'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(masterrm: MasterRmModel) {
    this.router.navigate(['/admin/masterrm/details/', masterrm.cmsMasterRmId]);
  }
}




 
