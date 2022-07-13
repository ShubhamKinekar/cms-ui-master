import { Component, OnInit } from '@angular/core';
interface status {
  value: string;
  text: string;
}
@Component({
  selector: 'app-bacode-detail',
  templateUrl: './bacode-detail.component.html',
  styleUrls: ['./bacode-detail.component.css']
})
export class BacodeDetailComponent implements OnInit {

  status: status[] = [
    { value: 'ACTIVE', text: 'Active' },
    { value: 'INACTIVE', text: 'Inactive' },
  ]; 
  properties: any = {
    bacode: 'bacode',
    mailId: 'mailId',
    empId: 'empId',
    status: 'status',
  };
  location: any;

  constructor() { }

  onBack() {
    this.location.back();
  }

  ngOnInit(): void {
  }

}
