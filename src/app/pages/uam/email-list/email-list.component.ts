import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { UserModel } from 'src/app/shared/models';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { EmailModel } from 'src/app/shared/models/email.model';
import { EmailService } from 'src/app/shared/services/uam/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css'],
})
export class EmailListComponent
  extends BaseListComponent<EmailModel>
  implements OnInit
{
  constructor(
    service: EmailService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new EmailModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData();
  }

  rowAction(email: EmailModel) {
    this.router.navigate(['/admin/email/details/', email.emailId]);
  }
  onBack(): void {
    

  this.router.navigate(['/admin/lov-master'],{skipLocationChange: true});  
  }
}
