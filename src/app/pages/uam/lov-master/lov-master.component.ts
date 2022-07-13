import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface DashboardTitles {
  text: string;
  id: string;
  icon: string;
}

@Component({
  selector: 'app-lov-master',
  templateUrl: './lov-master.component.html',
  styleUrls: ['./lov-master.component.css'],
})
export class LovMasterComponent implements OnInit {
  dashboardTitles: DashboardTitles[] = [
    { text: 'Dynamic Data Fields', id: 'LovId', icon: 'group' },
    // { text: 'Master Email', id: 'EmailId', icon: 'group' },
    { text: 'Rejection Reason', id: 'cmsLovId', icon: 'group' },
    { text: 'Master Employees', id: 'EmployeesId', icon: 'group' },
    // { text: 'Master Bacode', id: 'cmsMasterBacodeId', icon: 'group' },
    { text: 'Master RM', id: 'masterrmId', icon: 'group' },
    { text: 'Master Branch', id: 'masterbranchId', icon: 'group' },
  //   { text: 'Master CDSL Account Type', id: 'mastercdslaccountId', icon: 'group'},
  //   { text: 'Master CDSL Bank', id: 'bankCode', icon: 'group' },
  //   { text: 'Master Income Range', id: '', icon: 'group' },
  //   { text: 'Master ISD', id: '', icon: 'group' },
  //   { text: 'Master NSDL Account Type', id: 'masternsdlaccountId', icon: 'group' },
    // { text: 'Master NSDL Bank', id: 'masternsdlbankId', icon: 'group' },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onBack(){
    this.router.navigate(['/admin'], {skipLocationChange: true});  
  }
  cardClick(id: string) {
    if (id == 'LovId') {
      this.router.navigate(['/admin/lov/list/0'], {
        skipLocationChange: true,
      });
    } else if (id == 'EmailId') {
      this.router.navigate(['/admin/email/list/0'], {
        skipLocationChange: true,
      });
    } else if (id == 'cmsLovId') {
      this.router.navigate(['/admin/lovsub/details/0'], {
        skipLocationChange: true,
      });
    } else if (id == 'EmployeesId') {
      this.router.navigate(['/admin/employees/list/0'], {
        skipLocationChange: true,
      });
    } else if (id == 'cmsMasterBacodeId') {
      this.router.navigate(['/admin/bacode/list/0'], {
        skipLocationChange: true,
      });
    }else if (id == 'masterrmId') {
      this.router.navigate(['/admin/masterrm/list/0'], {
        skipLocationChange: true,
      });
    } else if (id == 'masterbranchId') {
      this.router.navigate(['/admin/masterbranch/list/0'], {
        skipLocationChange: true,
      });
    // } else if (id == 'bankCode') {
    //   this.router.navigate(['/admin/mastercdslbank/list/0'], {
    //     skipLocationChange: true,
    //   });
    } else if (id == 'masternsdlbankId') {
      this.router.navigate(['/admin/masternsdlbank/list/0'], {
        skipLocationChange: true,
      });
    // } else if (id == 'mastercdslaccountId') {
    //   this.router.navigate(['/admin/mastercdslaccount/list/0'], {
    //     skipLocationChange: true,
    //   });
    // }else if (id == 'masternsdlaccountId') {
    //   this.router.navigate(['/admin/masternsdlaccount/list/0'], {
    //     skipLocationChange: true,
    //   });
  }
  }
}

