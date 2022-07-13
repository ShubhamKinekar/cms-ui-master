import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface DashboardTitles {
  text: string;
  id: string;
  icon: string;
  
}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  dashboardTitles: DashboardTitles[] = [
    
    { text: 'Process Report', id: 'inprocessReportId',icon: 'assessment' },
   
 ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cardClick(id: string) {

    if (id == "inprocessReportId") {
      this.router.navigate(['/reports/inprocess'],{skipLocationChange: true});
    } else if (id == "RolesId") {
      this.router.navigate(['/admin/role'],{skipLocationChange: true});
    }
  }

}
