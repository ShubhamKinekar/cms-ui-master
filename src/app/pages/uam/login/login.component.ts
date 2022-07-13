import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { LoginService } from 'src/app/shared/services/uam/login.service';
import { LocalStorageNames } from 'src/app/shared/enums';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { UserModel } from 'src/app/shared/models';
import { Location } from '@angular/common';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { BranchService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent
  extends BaseDetailComponent<UserModel>
  implements OnInit {
  loginFailed: boolean = false;
  matcher = new ErrorState();
  properties: any = {
    userName: 'userName',
    password: 'password',
  };

  fieldTextType: boolean = false;
  constructor(
   router: Router,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService:BranchService
  ) {
    super(dialog,activatedRoute,location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();


  }

  ngOnInit(): void {
    if (this.loginService.GetUser()) {
      this.router.navigate(['/login'],{skipLocationChange: true});
    }
    else{
      this.loginService.logout();
    }
  }

  showPassword() {
    this.fieldTextType = !this.fieldTextType;
  }

  initForm() {
    this.formInput = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  resetFormValue() {
    this.formInput.reset();
  }

  login() {
    this.loginFailed = false;
    const login = {
      username: this.formInput.controls[this.properties.userName].value as string,
      password: window.btoa(this.formInput.controls[this.properties.password].value as string),
      // password: this.formInput.controls[this.properties.password].value as string,
    };
    this.loginService.authenticate(login).subscribe((resp: any) => {
      this.loginService.setUser(resp.data);
      if (resp && resp.message === 'User status is ACTIVE') {
        this.notifyService.showSuccess("Login Successful", "Welcome to Scanned Workflow for Form Inward and Tracking (SWIFT)");
        this.router.navigate(['/dashboard'],{skipLocationChange: true});
      }
    }, (error) => {
      this.loginFailed = true;
      this.router.navigate(['/login'],{skipLocationChange: true});
    });
  }

  navigateToUrl() {
    this.router.navigate(['/forgot-password/0'],{skipLocationChange: true});
  }
}
