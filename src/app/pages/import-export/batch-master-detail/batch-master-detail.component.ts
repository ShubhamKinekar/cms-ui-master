import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { BranchService, LoginService} from 'src/app/shared/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { BaseDetailComponent, BaseListComponent } from 'src/app/shared/base';
import { Location } from '@angular/common';
import { BatchMasterService } from 'src/app/shared/services/import-export/batch-master.service';
import { BatchMasterModel } from 'src/app/shared/models/batch-master-model';
import { forkJoin, Subject } from 'rxjs';
import * as _ from 'lodash';
import { BatchMasterPendingModel } from 'src/app/shared/models/batch-master-pending.model';
import { BatchMasterPendingService } from 'src/app/shared/services/import-export/batch-master-pending.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-batch-master-detail',
  templateUrl: './batch-master-detail.component.html',
  styleUrls: ['./batch-master-detail.component.css']
})
export class BatchMasterDetailComponent 
extends BaseListComponent<BatchMasterPendingModel> 
implements OnInit {
  
  pageData: any
  filterData: any
  isFilterable: any
  isPageable: any
  sortData: any
  selectedRequestTypes: any[] = [];
  permissionList: BatchMasterModel[] = [];

  properties: any = {
    cmsBatchMastId: 'cmsBatchMastId',
    batchType: 'batchType',
    count: 'count',
    operatorId: 'operatorId',
    batchNumber: 'batchNumber',
    startDate: 'startDate',
    endDate: 'endDate',
    
  };
  // batchmasterList: BatchMasterModel[] = [];

  BatchMasterList: any;
  alllovList: any;
  displayColumns: any;
  recId: any;
  entity: any;
  batchmasterService: any;
  notifyService: any;
  today = new Date();
  minDateToFinish = new Subject<string>();
  minDate: any;
  
  constructor(
    private toastr: ToastrService,
    service: BatchMasterService,
    private batchmasterpendingService : BatchMasterPendingService,
    public router: Router,
    location: Location,
    frontendHelperService: FrontendHelperService,
    loginService: LoginService,
    notifyService: NotificationService,

  ) {
    super(service, location, frontendHelperService, loginService,router);

    this.displayColumns = new BatchMasterPendingModel().displayColumns();
    this.initForm();
  }
 
  ngOnInit(): void {  
    //this.getData();
    this.getLov();
    const requests: any[] = [];
    if (this.recId > 0) {
      requests.push(this.rolePostData());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.BatchMasterList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        this.rolePostData();
        
      }
    });
  }
  
  initForm() {
    const endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0, 0);
    const startDate = new Date(this.today.getFullYear(), this.today.getMonth() - 2, this.today.getDate(), 0, 0, 0, 0);
    this.formInput = new FormGroup({
      batchType: new FormControl('', [Validators.required, validateWhiteSpace]),
      count: new FormControl('', [Validators.required, validateWhiteSpace]),
      operatorId: new FormControl('', [Validators.required, validateWhiteSpace]),
      batchNumber: new FormControl('', [Validators.required, validateWhiteSpace]),
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate)
      
    })   
  }
   formatDate(date: Date) {
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
    return formatted_date;
  }
  getLov() {
    this.batchmasterpendingService.getbatchType().subscribe((response: any) => {
      this.alllovList = response.data;
      console.log(this.alllovList);
    });
  }

  rolePostData() {  
  const empId =  this.entity && this.entity?.cmsBatchMastId > 0 ? this.entity?.cmsBatchMastId : 0;
  const data = {
    batchType : this.formInput.controls[this.properties.batchType].value,
    count : this.formInput.controls[this.properties.count].value,
    operatorId : this.formInput.controls[this.properties.operatorId].value,
    batchNumber : this.formInput.controls[this.properties.batchNumber].value,
    creationDate: this.formInput.controls[this.properties.batchNumber].value,
    startDate: this.formInput.controls[this.properties.startDate].value,
    endDate: this.formInput.controls[this.properties.endDate].value
  };
  //this.postData = data;
  this.batchmasterpendingService.addData(data).subscribe((resp: any) => {
    console.log(resp);
    this.router.navigate(['/import-export/batchmaster'],{skipLocationChange: true});
    this.toastr.success('Create Successfully','Batch');
  });
}


showPostData(){
  const data = {
    batchType : this.formInput.controls[this.properties.batchType].value,
    count : this.formInput.controls[this.properties.count].value,
    operatorId : this.formInput.controls[this.properties.operatorId].value,
    batchNumber : this.formInput.controls[this.properties.batchNumber].value,
    creationDate: this.formInput.controls[this.properties.batchNumber].value,
    startDate: this.formatDate(this.formInput.controls[this.properties.startDate].value as Date),
    endDate: this.formatDate(this.formInput.controls[this.properties.endDate].value as Date),
    "columnSort":"11",
    "length":"10",
    "start":"1"

  };  
  this.batchmasterpendingService.getAllData(data).subscribe((resp:any)=>{
    console.log(resp);
    this.dataSource = resp.data;
    this.toastr.success('Pending Cases ', 'Show');

  })
} 
onBack(){
  this.router.navigate(['/import-export/batchmaster']);  
}
}

