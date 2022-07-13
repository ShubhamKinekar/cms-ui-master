import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface DashboardTitles {
  text: string;
  id: string;
  icon: string;
}
@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css'],
})
export class ImportExportComponent implements OnInit {
  dashboardTitles: DashboardTitles[] = [
    // { text: 'Import', id: 'inprocessReportId',icon: 'assessment' },
    { text: 'Export', id: 'ExportId', icon: 'assessment' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
  cardClick(id: string) {
    if (id == 'ExportId') {
      this.router.navigate(['/import-export/export-master'], {
        skipLocationChange: true,
      });
    } else if (id == 'RolesId') {
      this.router.navigate(['/admin/role'], { skipLocationChange: true });
    }
  }
}
