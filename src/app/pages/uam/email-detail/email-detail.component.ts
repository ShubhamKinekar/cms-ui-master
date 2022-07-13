import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BaseDetailComponent } from 'src/app/shared/base';
import { EmailModel } from 'src/app/shared/models/email.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { EmailService } from 'src/app/shared/services/uam/email.service';
import { PermissionModel } from 'src/app/shared/models/permission.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent extends BaseDetailComponent<EmailModel> implements OnInit {
 

  properties: any = {
    emailId: 'emailId',
    emailTemplate: 'emailTemplate',
    emailStatus: 'emailStatus',
    emailBody: 'emailBody',
    emailSubject: 'emailSubject',
    sendTo: 'sendTo',
    sendCc: 'sendCc',
    attachmentPath: 'attachmentPath',
    failureCount: 'failureCount',
    transactionalId: 'transactionalId',
    creationDate: 'creationDate',
    lastupdateDate: 'lastupdateDate',
    createdBy: 'createdBy',
    lastupdateLogin: 'lastupdateLogin',
    lastupdateBy: 'lastupdateBy',
    permission :  'permission'

  };
  entity = new EmailModel();
  selectedEmail: EmailModel = new EmailModel();
  selectedPermission: PermissionModel[] = [];
  EmailList: any;
  permissionList: PermissionModel[] = [];
 
;
  

  constructor(
    private activateRoute: ActivatedRoute,
    private emailService: EmailService,

    protected location: Location, frontendHelperService: FrontendHelperService,
    router: Router,
    dialog: MatDialog, activatedRoute: ActivatedRoute,
    loginService: LoginService, allocationService: AllocationService,
    notifyService: NotificationService,branchService:BranchService
  ) {
    super(dialog,activatedRoute,location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();
  }

  onBack() {
    this.router.navigate(['/admin/email/list/:id'],{skipLocationChange: true});  
  }

  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getEmailDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.EmailList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        this.getEmailDetails();
      }
    });

  }

  


  initForm() {
    this.formInput = new FormGroup({
      emailId: new FormControl('', [Validators.required, validateWhiteSpace]),
      emailTemplate: new FormControl('', [Validators.required, validateWhiteSpace]),
      emailStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      emailBody: new FormControl('', [Validators.required, validateWhiteSpace]),
      emailSubject: new FormControl('', [Validators.required, validateWhiteSpace]),
      sendTo: new FormControl('', [Validators.required, validateWhiteSpace]),
      sendCc: new FormControl('', [Validators.required, validateWhiteSpace]),
      attachmentPath: new FormControl('', [Validators.required, validateWhiteSpace]),
      failureCount: new FormControl('', [Validators.required, validateWhiteSpace]),
      transactionalId: new FormControl('', [Validators.required, validateWhiteSpace]),
      creationDate: new FormControl('', [Validators.required, validateWhiteSpace]),
      lastupdateDate: new FormControl('', [Validators.required, validateWhiteSpace]),
      createdBy: new FormControl('', [Validators.required, validateWhiteSpace]),
      lastupdateLogin: new FormControl('', [Validators.required, validateWhiteSpace]),
      lastupdateBy: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }

  getEmailDetails() {
    const emailId = {
        "emailStatus":"",
        "emailSubject":"" ,
        "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.emailService.getDataById(emailId)
    .subscribe((response) => {
      this.entity = response;
      console.log(this.entity)
    console.log(response.emailId);
     this.formInput.patchValue({
      emailTemplate:this.entity.emailTemplate,
      emailStatus:this.entity.emailStatus,
      emailBody:this.entity.emailBody,
      emailSubject:this.entity.emailSubject,
      sendTo:this.entity.sendTo,
      sendCc:this.entity.sendCc,
      attachmentPath: this.entity.attachmentPath,
      failureCount: this.entity.failureCount,
      transactionalId: this.entity.transactionalId,
      creationDate: this.entity.creationDate,
      lastupdateDate: this.entity.lastUpdateDate,
      createdBy: this.entity.createdBy,
      lastupdateLogin: this.entity.lastUpdateLogin,
      lastupdateBy: this.entity.lastUpdatedBy,
        // role:this.selectedPermission
});
    });
  }
}