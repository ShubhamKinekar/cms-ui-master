
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from 'src/app/shared/base';
import { LoginService, UserService } from 'src/app/shared/services';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BatchMasterService } from 'src/app/shared/services/import-export/batch-master.service';
import { BatchMasterModel } from 'src/app/shared/models/batch-master-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-batch-master-list',
  templateUrl: './batch-master-list.component.html',
  styleUrls: ['./batch-master-list.component.css']
})
export class BatchMasterListComponent
extends BaseListComponent<BatchMasterModel>
implements OnInit {
  downloadUrl: any;
  downloadFileName: any;
  httpClient: any;
  
  properties: any = {
    cmsBatchMastId: 'cmsBatchMastId',
    batchType: 'batchType',
    count: 'count',
    operatorId: 'operatorId',
    batchNumber: 'batchNumber',
    startDate: 'startDate',
    endDate: 'endDate'
    
  };
  batchmasterService: any;
  fileName: any;
  constructor(
    service: BatchMasterService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService
  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new BatchMasterModel().displayColumns();
  }

  ngOnInit(): void {
    this.getData(undefined, true);
  }
  onBack(){
    this.router.navigate(['/import-export/export-master'],{skipLocationChange: true});  
  }


  
  //this code is using for download point of view here we dowl. zip files 
   
  rowAction(batchmaster: BatchMasterModel) {
    let finalFilepath = environment.pdfFilePath + batchmaster.filePath + batchmaster.fileName;
    console.log(finalFilepath);
    this.downloadUrl = finalFilepath;
    // this.downloadFile();
    const aLink = document.createElement('a');
    document.body.appendChild(aLink);
    aLink.href = finalFilepath; 
    aLink.target = '_blank'
    aLink.click();  
  }



}



 
