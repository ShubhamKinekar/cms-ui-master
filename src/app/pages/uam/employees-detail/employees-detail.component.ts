import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { BaseDetailComponent } from 'src/app/shared/base';
import { ActivatedRoute, Router } from '@angular/router';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { BranchService, LoginService } from 'src/app/shared/services';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { forkJoin } from 'rxjs';
import { EmployeesService } from 'src/app/shared/services/uam/employees.service';
import { EmployeesModel } from 'src/app/shared/models/employees.model';
import { Status } from 'src/app/shared/enums';
import { Subject } from 'rxjs';

interface status {
  value: string;
  text: string;
}

@Component({
  selector: 'app-employees-detail',
  templateUrl: './employees-detail.component.html',
  styleUrls: ['./employees-detail.component.css']
})
export class EmployeesDetailComponent 
extends BaseDetailComponent<EmployeesModel>
implements OnInit {
  Status: status[] = [
    { value: 'ACTIVE', text: 'ACTIVE' },
    { value: 'INACTIVE', text: 'INACTIVE' },
  ]; 
  isEdit = false;
  properties: any = {
    branch: 'branch',
    code: 'code',
    location: 'location',
    employeeCode: 'employeeCode',
    name: 'name',
    superviserName: 'superviserName',
    grade: 'grade',
    designation: 'designation',
    department: 'department',
    emailCompany: 'emailCompany',
    mobileNumber: 'mobileNumber',
    dateOfJoining: 'dateOfJoining',
    employmentStatus: 'employmentStatus',
    dateOfResignation: 'dateOfResignation',
    lastWorkingDate: 'lastWorkingDate',
    status: 'status',
  };
  EmployeesList: any;
  today = new Date();
  minDateToFinish = new Subject<string>();
  minDate: any;
  
  constructor( 
    private activateRoute: ActivatedRoute,
    private employeesService: EmployeesService,

    protected location: Location,
    frontendHelperService: FrontendHelperService,
    router: Router,
    dialog: MatDialog,
    activatedRoute: ActivatedRoute,
    loginService: LoginService,
    allocationService: AllocationService,
    notifyService: NotificationService,
    branchService:BranchService
  ) {
    super(dialog,activatedRoute,location,frontendHelperService,
      notifyService, loginService,
       allocationService, router,branchService);
    this.initForm();
  }

  onBack(){
    this.router.navigate(['/admin/employees/list/:id'],{skipLocationChange: true});  
  }
  

  ngOnInit(): void {
        // this.getLatestUser();
    const requests: any[] = [];
    // requests.push(this.getPermissions());
    if (this.recId > 0) {
      requests.push(this.getEmployeesDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.EmployeesList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
        
      }
    });

  }
  initForm() {
    this.formInput = new FormGroup({
      branch: new FormControl('', [Validators.required, validateWhiteSpace]),
      code: new FormControl('', [Validators.required, validateWhiteSpace]),
      location: new FormControl('', [Validators.required, validateWhiteSpace]),
      employeeCode: new FormControl('', [Validators.required, validateWhiteSpace]),
      name: new FormControl('', [Validators.required, validateWhiteSpace]),
      superviserName: new FormControl('', [Validators.required, validateWhiteSpace]),
      grade: new FormControl('', [Validators.required, validateWhiteSpace]),
      designation: new FormControl('', [Validators.required, validateWhiteSpace]),
      department: new FormControl('', [Validators.required, validateWhiteSpace]),
      emailCompany: new FormControl('', [Validators.required, validateWhiteSpace]),
      mobileNumber: new FormControl('', [Validators.required, validateWhiteSpace]),
      dateOfJoining: new FormControl('', [Validators.required, validateWhiteSpace]),
      employmentStatus: new FormControl('', [Validators.required, validateWhiteSpace]),
      dateOfResignation: new FormControl('', [Validators.required, validateWhiteSpace]),
      lastWorkingDate: new FormControl('', [Validators.required, validateWhiteSpace]),
      status: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }
  getEmployeesDetails() {
    const employeeId = {
       
        "pid":this.recId,
        "columnSort":"",
        "length":"10",
        "start":1
    }
    return this.employeesService.getDataById(employeeId)
    .subscribe((response) => {
      this.entity = response;
      this.isEdit = true;
      console.log(this.entity)
      console.log(response.employeeId);
     this.formInput.patchValue({
      branch: this.entity.branch,
      code:this.entity.code,
      location:this.entity.location,
      employeeCode:this.entity.employeeCode,
      name:this.entity.name,
      superviserName:this.entity.superviserName,
      grade: this.entity.grade,
      designation: this.entity.designation,
      department: this.entity.department,
      emailCompany: this.entity.emailCompany,
      mobileNumber: this.entity.mobileNumber,
      dateOfJoining: this.entity.dateOfJoining,
      employmentStatus: this.entity.employmentStatus,
      dateOfResignation: this.entity.dateOfResignation,
      lastWorkingDate: this.entity.lastWorkingDate,
      status: this.entity.status
       
});
    });
  
}

 
rolePostData() {  
  // const empId =  this.entity && this.entity?.employeeId > 0 ? this.entity?.employeeId : 0;
  const data = {
 branch : this.formInput.controls[this.properties.branch].value,
  code : this.formInput.controls[this.properties.code].value,
  location : this.formInput.controls[this.properties.location].value,
  employeeCode : this.formInput.controls[this.properties.employeeCode].value,
  name : this.formInput.controls[this.properties.name].value,
  superviserName : this.formInput.controls[this.properties.superviserName].value,
  grade : this.formInput.controls[this.properties.grade].value,
  designation : this.formInput.controls[this.properties.designation].value,
  department : this.formInput.controls[this.properties.department].value,
  emailCompany : this.formInput.controls[this.properties.emailCompany].value,
  mobileNumber : this.formInput.controls[this.properties.mobileNumber].value, 
  dateOfJoining : this.formInput.controls[this.properties.dateOfJoining].value,
  employmentStatus : this.formInput.controls[this.properties.employmentStatus].value,
  dateOfResignation : this.formInput.controls[this.properties.dateOfResignation].value,
  lastWorkingDate : this.formInput.controls[this.properties.lastWorkingDate].value,
  status : Status.Active

  };
  //this.postData = data;
  this.employeesService.addData(data).subscribe((resp: any) => {
    console.log(resp);
    this.router.navigate(['/admin/employees/list/:id'],{skipLocationChange: true});
    this.notifyService.showSuccess('New Employee','Create Successfully');
  });
}
updatePostData(){
  this.isEdit = !this.isEdit;
  const empId =  this.entity && this.entity?.employeeId > 0 ? this.entity?.employeeId : 0;
  console.log(empId)
  const data = {
  employeeId : empId,
  branch : this.formInput.controls[this.properties.branch].value,
  code : this.formInput.controls[this.properties.code].value,
  location : this.formInput.controls[this.properties.location].value,
  employeeCode : this.formInput.controls[this.properties.employeeCode].value,
  name : this.formInput.controls[this.properties.name].value,
  superviserName : this.formInput.controls[this.properties.superviserName].value,
  grade : this.formInput.controls[this.properties.grade].value,
  designation : this.formInput.controls[this.properties.designation].value,
  department : this.formInput.controls[this.properties.department].value,
  emailCompany : this.formInput.controls[this.properties.emailCompany].value,
  mobileNumber : this.formInput.controls[this.properties.mobileNumber].value,
  dateOfJoining : this.formInput.controls[this.properties.dateOfJoining].value,
  employmentStatus : this.formInput.controls[this.properties.employmentStatus].value,
  dateOfResignation : this.formInput.controls[this.properties.dateOfResignation].value,
  lastWorkingDate : this.formInput.controls[this.properties.lastWorkingDate].value,
  status : this.formInput.controls[this.properties.status].value
};
if(this.recId > 0){ 
  this.employeesService.updateData(empId, data).subscribe((resp : any)=>{
    console.log(resp)
    this.router.navigate(['/admin/employees/list/:id'],{skipLocationChange: true});
    this.notifyService.showSuccess('Employee Data','Update Successfully');
  })
}
}

}
