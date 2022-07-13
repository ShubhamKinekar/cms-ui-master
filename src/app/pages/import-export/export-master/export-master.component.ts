
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface DashboardTitles {
  text: string;
  id: string;
  icon: string;
}


@Component({
  selector: 'app-export-master',
  templateUrl: './export-master.component.html',
  styleUrls: ['./export-master.component.css']
})
export class ExportMasterComponent implements OnInit {

  dashboardTitles: DashboardTitles[] = [
    { text: 'Batch Master', id: 'cmsBatchMastId', icon: 'group' },
    // { text: 'Master Email', id: 'EmailId', icon: 'group' },
   
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cardClick(id: string) {
    if (id == 'cmsBatchMastId') {
      this.router.navigate(['/import-export/batchmaster'], {
        skipLocationChange: true,
      });
    } else if (id == 'EmailId') {
      this.router.navigate(['/admin/email/list/0'], {
        skipLocationChange: true,
      });
    } else if (id == 'LovsubId') {
      this.router.navigate(['/admin/lovsub/list/0'], {
        skipLocationChange: true,
      });
    
  }
}
}
