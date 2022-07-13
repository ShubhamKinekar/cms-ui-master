import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FrontendHelperService } from 'src/app/shared/services/common/frontend-helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { BaseDetailComponent, BaseListComponent } from 'src/app/shared/base';
import { BranchService, LoginService } from 'src/app/shared/services';
import { validateWhiteSpace } from 'src/app/shared/validations/validation';
import { NotificationService } from 'src/app/shared/services/common/notification.service';
import { AllocationService } from 'src/app/shared/services/transaction/allocation.service';
import { LovsubService } from 'src/app/shared/services/uam/lovsub.service';
import { LovsubModel } from 'src/app/shared/models/lovsub.model';
interface status {
  value: string;
  text: string;
}

@Component({
  selector: 'app-lovsub-detail',
  templateUrl: './lovsub-detail.component.html',
  styleUrls: ['./lovsub-detail.component.css'],
})
export class LovsubDetailComponent
  extends BaseDetailComponent<LovsubModel>
  implements OnInit {
    public showRate: any;
  public selectionModel: any;

  Status: status[] = [
    { value: 'ACTIVE', text: 'ACTIVE' },
    { value: 'INACTIVE', text: 'INACTIVE' },
  ];
  LovsubList: any;
  recId: any;
  entity: any;
  alllovList: any;
  alllovsubList: any;

  properties: any = {
    cmsMasterLovSub: 'cmsMasterLovSub',
    subLovName: 'subLovName',
    value: 'value',
    status: 'status',
  };
  permissionList: LovsubModel[] = [];
  cmsMasterLovSub: any;
  selectedOption: any;
  name: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private lovsubService: LovsubService,
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

  onBack() {
    this.router.navigate(['/admin/lov-master'], { skipLocationChange: true });
  }
  ngOnInit(): void {
    const requests: any[] = [];
    // requests.push(this.getPermissions());

    if (this.recId > 0) {
      // requests.push(this.getLovDetails());
    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.LovsubList = responses[0].data;
      if (this.recId > 0) {
        this.entity = responses[1];
        // this.setData();
      }
    });
    this.getLov();
    //this.getLovSub();
  }
  initForm() {
    this.formInput = new FormGroup({
      cmsMasterLovSub: new FormControl('', [Validators.required, validateWhiteSpace]),
      subLovName: new FormControl('', [Validators.required, validateWhiteSpace]),
      value: new FormControl(''),
      status: new FormControl('', [Validators.required, validateWhiteSpace]),
    });
  }



  getLov() {
    this.lovsubService.getlovSub().subscribe((response: any) => {
      this.alllovList = response.data;
      console.log(this.alllovList);
      // for (let i = 0; i < response.data; i++) {
      //   this.cmsMasterLovSub = response.data[i].cmsMasterLovId;
      //   console.log(this.cmsMasterLovSub);
      // }
      // console.log(response.data); 
    });
  }
  getLovSub(id: any) {
    this.lovsubService.getsub(id).subscribe((response: any) => {
      this.alllovsubList = response.data;
      var setOfValue = new Set(this.alllovsubList)
      console.log(setOfValue);
      this.alllovsubList.unshift({ cmsMasterLovSub: '0', value: "New" })
      console.log(this.alllovsubList);
    });
  }

  onChange(id: any) {
    this.name = this.alllovsubList.filter((f: { cmsMasterLovSub: any; }) => f.cmsMasterLovSub === id).map((x: { value: any; }) => x.value);
    console.log(this.name);
  }

  rolePostData() {
    const data = {
      cmsLovId: this.formInput.controls[this.properties.cmsMasterLovSub].value,
      cmsMasterLovSub: Number(this.formInput.controls[this.properties.subLovName].value),
      value: this.formInput.controls[this.properties.value].value,
      subLovName: "REJECTIONREMARKS",
      status: this.formInput.controls[this.properties.status].value,
    };
    this.lovsubService.addData(data).subscribe((resp: any) => {
      console.log(resp);
      this.formInput.reset();
      this.notifyService.showSuccess('Data', 'Create Successfully');
    });
  }
}
