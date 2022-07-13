import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-cdsl-account-detail',
  templateUrl: './master-cdsl-account-detail.component.html',
  styleUrls: ['./master-cdsl-account-detail.component.css']
})
export class MasterCdslAccountDetailComponent implements OnInit {
  location: any;
  properties: any = {
    parentCode: 'parentCode',
    code: 'code',
    discription: 'discription',
    status:'status',
  };
  constructor() { }

    onBack(){
      this.location.back();
    }
    
  ngOnInit(): void {
  }

}
