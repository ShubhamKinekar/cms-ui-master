import { Location } from '@angular/common';
import { BarcodePopupComponent } from 'src/app/shared/components/barcode-popup/barcode-popup.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BaseDetailComponent } from 'src/app/shared/base';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { BranchService, LoginService} from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MasterBranchUploadModel } from 'src/app/shared/models/master-branch-upload.model';
import { MasterBranchUploadService } from 'src/app/shared/services/uam/master-branch-upload.service';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-master-branch-upload',
  templateUrl: './master-branch-upload.component.html',
  styleUrls: ['./master-branch-upload.component.css'],
})
export class MasterBranchUploadComponent
  extends BaseDetailComponent<MasterBranchUploadModel>
  implements OnInit
{
  properties: any = {
    fileUpload: 'fileUpload',
  };

  data: any;
  EmployeesUpload: any;
  filenameData: any;
  private _apiService: any;


  constructor(
    private activateRoute: ActivatedRoute,
    private masterbranchuploadService: MasterBranchUploadService,
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
  }

  onBack(){
    this.router.navigate(['/admin/masterbranch/list/:id'],{skipLocationChange: true});  
  }

  ngOnInit(): void {
    this.initForm();
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
        this.masterbranchuploadService
          .uploadFile(formData)
          .subscribe((fileName: any) => {
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

  rolePostData() {
    let formData: FormData = new FormData();
    formData.append('file', this.filenameData);
    console.log(formData)
    this.masterbranchuploadService.addData(this.filenameData).subscribe((resp: any) => {
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
