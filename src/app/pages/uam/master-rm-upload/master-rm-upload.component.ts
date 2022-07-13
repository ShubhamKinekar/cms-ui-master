import { Location } from '@angular/common';
import { BarcodePopupComponent } from 'src/app/shared/components/barcode-popup/barcode-popup.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BaseDetailComponent } from 'src/app/shared/base';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import {
  AttachmentService,
  BranchService,
  LoginService,
} from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MasterRmUploadModel } from 'src/app/shared/models/master-rm-upload.model';
import { MasterRmUploadService } from 'src/app/shared/services/uam/master-rm-upload.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-master-rm-upload',
  templateUrl: './master-rm-upload.component.html',
  styleUrls: ['./master-rm-upload.component.css']
})
export class MasterRmUploadComponent 
extends BaseDetailComponent<MasterRmUploadModel>
implements OnInit {

  properties: any = {
    fileUpload: 'fileUpload',
  };

  data: any;
  EmployeesUpload: any;
  filenameData: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private masterrmuploadService: MasterRmUploadService,
    private attachmentService: AttachmentService,

    protected location: Location,
    frontendHelperService: FrontendHelperService,
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    loginService: LoginService,
    allocationService: AllocationService,
    notifyService: NotificationService,
    branchService: BranchService
  ) {
    super(
      dialog,
      activatedRoute,
      location,
      frontendHelperService,
      notifyService,
      loginService,
      allocationService,
      router,
      branchService
    );
    this.initForm();
  }

  onBack(){
    this.router.navigate(['/admin/masterrm/list/:id'],{skipLocationChange: true});  
  }

  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      // requests.push(this.rolePostData());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.EmployeesUpload = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        // this.rolePostData();
      }
    });
  }
  initForm() {
    this.formInput = new FormGroup({
      fileUpload: new FormControl('',[Validators.required, validateWhiteSpace])
    });
  }
  deleteFile(controlName: string) {
    this.formInput.patchValue({
      [controlName]: null,
    });
  }

  fileChange(event: {
    srcElement: { id: string };
    target: { files: FileList };
  }) {
    const controlName = event.srcElement.id;
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      var upld = file.name.split('.').pop();
      if (upld == 'csv') {
        // alert("File uploaded is pdf")
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        this.masterrmuploadService.uploadFile(formData).subscribe((fileName: any) => {
            const filename = fileName.split('.').slice(0, -1).join('.');
            this.filenameData = filename;
            console.log(this.filenameData);
            this.formInput.patchValue({
              [controlName]: fileName,
            });
          });
      } else {
        const confirmDialog = this.dialog.open(BarcodePopupComponent, {
          data: {
            title: 'Alert',
            message: 'Only CSV Are Allowed.',
          },
        });
        // this.isVisibledata = true;
      }
    }
  }

  // rolePostData() {
  //   let formData: FormData = new FormData();
  //       formData.append('file', this.filenameData);
  //       console.log(formData)
  //   this.masterrmuploadService.addData(this.filenameData).subscribe((response) => {
  //       console.log(response);
  //       this.formInput.reset();
  //       this.notifyService.showSuccess('File Upload','Successfully');

  //     });
  // }
  rolePostData() {
    let formData: FormData = new FormData();
    formData.append('file', this.filenameData);
    console.log(formData)
    this.masterrmuploadService.addData(this.filenameData).subscribe((resp: any) => {
    let pdfpath = resp.filepath;
    console.log(pdfpath);
    let paragraph = pdfpath;
    let abc = paragraph.split("images/");
    let finalpdfpath = environment.pdfFilePath + abc[1] ; 
    this.downloadUrl = finalpdfpath;
    // this.downloadFile();
    const aLink = document.createElement('a');
    document.body.appendChild(aLink);
    aLink.href = environment.pdfFilePath + abc[1] ; 
    aLink.target = '_blank'
    aLink.click();
    this.formInput.reset();   
    this.notifyService.showSuccess('File Download','Successfully');

  });
}
}