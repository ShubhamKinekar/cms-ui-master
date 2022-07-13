import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-cdsl-bank-detail',
  templateUrl: './master-cdsl-bank-detail.component.html',
  styleUrls: ['./master-cdsl-bank-detail.component.css']
})
export class MasterCdslBankDetailComponent implements OnInit {
location: any
  constructor() { }
  onBack(){
    this.location.back();
  }

  ngOnInit(): void {
  }

}
