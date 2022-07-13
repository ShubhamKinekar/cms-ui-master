import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base/base-details/base-details.component';
import { UserModel } from 'src/app/shared/models';
import { Location } from '@angular/common';
import { BaseDataService, BranchService, LoginService, UserService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent
  extends BaseDetailComponent<UserModel>
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
  constructor(
    private userService: UserService,
    router: Router,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService: BranchService
  ) {
    super(dialog,activatedRoute, location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();

  }


  ngOnInit(): void {
    this.isVisiblePassword = false;
    this.resetPasswordToken = null;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.resetPasswordToken = params['data'];
      if (this.resetPasswordToken) {
        this.isVisiblePassword = true;
      }
    });
  }

  initForm() {
    if (this.isVisiblePassword) {
      this.formInput = new FormGroup({
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      });
    }
    else {
      this.formInput = new FormGroup({
        userName: new FormControl('', [Validators.required]),
      });
    }
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

  onSubmit() {
    const data = this.formInput.controls['userName'].value;
    this.userService.getUserName(data).subscribe((res: any) => {
      if (res && res.data) {
        //this.resetPasswordToken = res.data;
       // this.router.navigate(['/passwordAssistance' + "/" + this.resetPasswordToken]);
       this.router.navigate(['/login']);
     //  this.router.navigate(['passwordAssistance/' + this.resetPasswordToken]);
        this.notifyService.showSuccess(
          'Reset Password Mail',
          'Sent to your registered email address'
        );
      } else {
        this.userError = 'User does not exists!';
      }
    });
  }

  }
//   submitPassword() {
//     const data = {
//       token: this.resetPasswordToken,
//       password: this.formInput.controls['confirmPassword'].value,
//     };
//     this.userService.addData(data).subscribe((res: any) => {
//       if (res && res.message === 'Update Successfully') {
//         this.router.navigate(['/login']);
//         this.notifyService.showSuccess('Reset Password Successful', 'Please login with new password');
//       }
//     });
//   }
// }
