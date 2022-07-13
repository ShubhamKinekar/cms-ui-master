import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { UserModel } from 'src/app/shared/models';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent
  extends BaseListComponent<UserModel>
  implements OnInit
{
  constructor(
    private service: UserService,
    router: Router,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    
    this.displayColumns = new UserModel().displayColumns();
  }
  onBack(){
    this.router.navigate(['/admin']);  
  }
  ngOnInit(): void {
    this.getData(undefined, true);
  }

  rowAction(user: UserModel) {
    this.router.navigate(['/admin/user/details/', user.userId],{skipLocationChange: true});
  }
}
