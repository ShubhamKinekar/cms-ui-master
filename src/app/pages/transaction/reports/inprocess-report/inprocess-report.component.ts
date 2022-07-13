import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorState } from 'src/app/interceptors/ErrorState/errorstate-handler';
import { BaseDetailComponent } from 'src/app/shared/base';
import { UserModel } from 'src/app/shared/models';
import { LOV, PatternValidation, Status } from 'src/app/shared/enums';
import { LOVService, RoleService, UserService, LoginService, BranchService } from 'src/app/shared/services';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { WebHttpClient } from 'src/app/shared/services/WebHttpClient';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

interface caseStatus {
  value: string;
  text: string;
}

interface UserType {
  id: any;
  text: string;
}

interface CaseType {
  value: string;
  text: string;
}

@Component({
  selector: 'app-inprocess-report',
  templateUrl: './inprocess-report.component.html',
  styleUrls: ['./inprocess-report.component.css']
})
export class InprocessReportComponent extends BaseDetailComponent<UserModel> implements OnInit  {
  matcher = new ErrorState();
  today = new Date();
  minDateToFinish = new Subject<string>();
  minDate: any;
  secondSelectValue = null;
  
  caseStatus: caseStatus[] = [
    {value: 'All', text: "All" },
    {value: 'DRAFT', text: 'DRAFT'},
    {value:'CASE SUBMITTED',text:'CASE SUBMITTED'},
    {value:'SCRUTINY PROCESSED',text:'SCRUTINY PROCESSED'},
    {value:'SCRUTINY INPROCESS',text:'SCRUTINY INPROCESS'},
    {value:'SCRUTINY ALLOCATED',text:'SCRUTINY ALLOCATED'},
    {value:'SCRUTINY PENDING',text:'SCRUTINY PENDING'},
    {value:'SCRUTINY HOLD',text:'SCRUTINY HOLD'},
    {value:'DATA ENTRY ALLOCATED',text:'DATA ENTRY ALLOCATED'},
    {value:'DATA ENTRY INPROCESS',text:'DATA ENTRY INPROCESS'},
    {value:'DATA ENTRY PROCESSED',text:'DATA ENTRY PROCESSED'},
    {value:'DATA ENTRY PENDING',text:'DATA ENTRY PENDING'},
    {value: 'DATA ENTRY HOLD',text:'DATA ENTRY HOLD'},
    {value:'CHECKER ALLOCATED',text:'CHECKER ALLOCATED'},
    {value:'CHECKER INPROCESS',text:'CHECKER INPROCESS'},
    {value:'CHECKER PROCESSED',text:'CHECKER PROCESSED'},
    {value:'CHECKER PENDING',text:'CHECKER PENDING'},
    {value:'CHECKER HOLD',text:'CHECKER HOLD'},
    {value:'PHYSICAL VERIFCATION PROCESSED',text:'PHYSICAL VERIFCATION PROCESSED'}
  ];

  UserType: UserType[] = [
    {id: 'All', text: "All" },
    {id: 1, text: 'CASE INITIATED'},
    {id: 2, text: 'SCRUTINY'},
    {id: 3, text: 'DATA ENTRY'},
    {id: 4, text: 'CHECKER'},
    {id: 5,text:'PHYSICAL VERIFCATION'}
  ]

  CaseType: CaseType[] = [
    {value: 'All', text: "All" },
    {value: 'CASE INITIATED', text: 'CASE INITIATED'},
    {value: 'SCRUTINY', text: 'SCRUTINY'},
    {value: 'DATA ENTRY', text: 'DATA ENTRY'},
    {value: 'CHECKER', text: 'CHECKER'},
    {value:'PHYSICAL VERIFCATION',text:'PHYSICAL VERIFCATION'}
  ]


  properties: any = {
    userType: 'userType',
    caseType: 'caseType',
    caseStatus: 'caseStatus',
    startDate: 'startDate',
    endDate: 'endDate'
  
  };
  auditInfo: any;
  userRolelist: any;
  inWordModelist: any;
  selectedValue:any;
  filtered :any;
  userlist: any;
  constructor(
    private lovService: LOVService,
    private roleService: RoleService,
    private userService: UserService,
    private httpClient: WebHttpClient,
    dialog: MatDialog, activatedRoute: ActivatedRoute, location: Location, frontendHelperService: FrontendHelperService,
    loginService: LoginService, allocationService: AllocationService,branchService: BranchService,
    notifyService: NotificationService,router: Router,
  ) {
    super(dialog, activatedRoute, location, frontendHelperService,  notifyService, loginService,
      allocationService, router,branchService);
    this.initForm();
   }
   onBack(){
    this.router.navigate(['/reports']);  
  }
  ngOnInit(): void {
    this.getUserRole();
    this.getStageStatus();
    this.getUserData();
  }

  getUserRole() {
    this.lovService.getLOVData(LOV.UserRole).subscribe((response: any) => {
      this.userRolelist = response.data;
      this.userRolelist.unshift({ cmsMasterLovId: null, value: "ALL" })
      //this.selectedValue = this.userRolelist.map((value:any) => value);
      this.filtered = this.userRolelist.filter((t:any) => t.value == this.selectedValue);
  
      console.log(this.filtered);
    });
  }

  getStageStatus() {
    
    this.lovService.getLOVData(this.selectedValue).subscribe((response: any) => {
      this.inWordModelist = response.data;
      this.inWordModelist.unshift({ cmsMasterLovId: null, value: "ALL" })
      //console.log(response.data);
    });
  }

  getUserData() { 
    this.lovService.getUserType().subscribe((response: any) => {
      this.userlist = response.data;
      // this.userlist = _.uniqBy(this.userlist, (e:any) => {
      //   return e.value;
      // });
      var setOfValue = new Set(this.userlist)
      console.log(setOfValue);
      this.userlist.unshift({ employeeId: 'ALL', name: "ALL" })
     // console.log(response.data);
    });
  }
  

  formatDate(date: Date) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  initForm() {
    const endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0, 0);
    const startDate = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate(), 0, 0, 0, 0);
    this.formInput = new FormGroup({
      userType: new FormControl('', [Validators.required, validateWhiteSpace]),
      caseType: new FormControl('', [Validators.required, validateWhiteSpace]),
      caseStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate),
    });
  }

  

    userPostData() {
      const data = {
        caseStageStatus: this.formInput.controls[this.properties.caseType].value,
        userDetailsId: this.formInput.controls[this.properties.userType].value,
        caseStatusDetails:this.formInput.controls[this.properties.caseStatus].value,
        //caseStatusDetails:null,
        startDate : this.formatDate(this.formInput.controls["startDate"].value as Date),
        endDate  : this.formatDate(this.formInput.controls["endDate"].value as Date)
      };
  
      this.httpClient.post('trans/report/getProcessReport', data).subscribe((resp: any) => {
        let pdfpath = resp.filePath;
        console.log(pdfpath);
        let paragraph = pdfpath;
        let abc = paragraph.split("images/");
        let finalpdfpath = environment.pdfFilePath + abc[1]; 
        this.downloadUrl = finalpdfpath;
        //this.downloadFile();
        const aLink = document.createElement('a');
        document.body.appendChild(aLink);
        aLink.href = environment.pdfFilePath + abc[1] ; 
        aLink.target = '_blank'
        aLink.click();  
      
      });
  }

}
