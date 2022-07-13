import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base';
import { BranchModel, UserModel } from 'src/app/shared/models';
import { UserService, LoginService, BranchService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

@Component({
  selector: 'app-password-assistance',
  templateUrl: './password-assistance.component.html',
  styleUrls: ['./password-assistance.component.css']
})
export class PasswordAssistanceComponent extends BaseDetailComponent<UserModel>
implements OnInit {
matcher = new ErrorState();
properties: any = {
  userName: 'userName',
  confirmPassword: 'confirmPassword',
  newPassword: 'newPassword',
};

resetPasswordToken: string | null = null;
userError: any;
isVisiblePassword: boolean = false;
abc: any;
  tokenValue: any;
constructor(
  private userService: UserService,
  router: Router,
  dialog: MatDialog, activatedRoute: ActivatedRoute,
  location: Location, frontendHelperService: FrontendHelperService,
  loginService: LoginService, allocationService: AllocationService,
  notifyService: NotificationService,branchService:BranchService
) {
  super(dialog,activatedRoute, location,frontendHelperService,
    notifyService, loginService,
     allocationService, router,branchService);
  this.initForm();

}


ngOnInit(){
  this.isVisiblePassword = true;
  this.resetPasswordToken = null;
  this.activatedRoute.queryParams.subscribe((params) => {
    this.resetPasswordToken = params.token;
    console.log(params);
    if (this.resetPasswordToken) {
      this.isVisiblePassword = true;
    }
  });
}

initForm() {
    this.formInput = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
}

ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmedValidator
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

passwordValidation() {
  let newPassword =
    this.formInput.controls[this.properties.newPassword].value;
  let confirmPassword =
    this.formInput.controls[this.properties.confirmPassword].value;
  return newPassword !== confirmPassword;
}

// onSubmit() {
//   const data = this.formInput.controls['userName'].value;
//   this.userService.getUserName(data).subscribe((res: any) => {
//     if (res && res.data) {
//       this.resetPasswordToken = res.data;
//       this.router.navigate(['/forgot-password/' + this.resetPasswordToken]);
//       this.isVisiblePassword = true;
//       this.notifyService.showSuccess(
//         'Reset Password Mail',
//         'Sent to your registered email address'
//       );
//     } else {
//       this.userError = 'User does not exists!';
//     }
//   });
// }

submitPassword() {
  const data = {
    "token":this.resetPasswordToken,
    "password":this.formInput.controls['confirmPassword'].value,
  };
  this.userService.addData(data).subscribe((res: any) => {
    if (res && res.message === 'Update Successfully') {
      this.notifyService.showSuccess('Reset Password Successful', 'Please login with new password');
      this.router.navigate(['/login'],{skipLocationChange: true});
    }
  });
}
}
