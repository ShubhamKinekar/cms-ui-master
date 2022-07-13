import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface DashboardTitles {
  text: string;
  id: string;
  icon: string;
  
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  dashboardTitles: DashboardTitles[] = [
    
    { text: 'Users', id: 'UsersId',icon: 'group' },
    { text: 'Roles', id: 'RolesId',icon: 'savings'},
    { text: 'Master', id: 'MasterId',icon: 'group'},
    { text: 'System Configuration', id: 'cmsSysVariablesId',icon: 'savings'},

    
 ];
  constructor( private router: Router) { }

  ngOnInit(): void { 
  }

  cardClick(id: string) {

    if (id == "UsersId") {
      this.router.navigate(['/admin/user'],{skipLocationChange: true});
    } else if (id == "RolesId") {
      this.router.navigate(['/admin/role'],{skipLocationChange: true});
    } else if (id == "MasterId") {
      this.router.navigate(['/admin/lov-master'],{skipLocationChange: true});
    }else if (id == "cmsSysVariablesId") {
      this.router.navigate(['/admin/systemconfiguration'],{skipLocationChange: true});
    }
  }
}
