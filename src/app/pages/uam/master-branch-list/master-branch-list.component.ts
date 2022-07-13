import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MasterBranchModel } from 'src/app/shared/models/master-branch.model';
import { MasterBranchService } from 'src/app/shared/services/uam/master-branch.service';

@Component({
  selector: 'app-master-branch-list',
  templateUrl: './master-branch-list.component.html',
  styleUrls: ['./master-branch-list.component.css']
})
export class MasterBranchListComponent 
 extends BaseListComponent<MasterBranchModel>
implements OnInit {

  constructor(
    service: MasterBranchService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService, router);

    this.displayColumns = new MasterBranchModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin/lov-master'],{skipLocationChange: true});  
  }
  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(masterbranch: MasterBranchModel) {
    this.router.navigate(['/admin/masterbranch/details/', masterbranch.cmsMasterBranchId]);
  }
}




 
