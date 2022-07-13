import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data1 = [
    {draft: 156, processed: 256, inprocess: 456, total: 868, color:"grey", title: "Create Initiated" },
    {draft: 0, processed: 256, inprocess: 456, total: 868, color:"golden", title: "Scrutiny" },
    {draft: 0, processed: 256, inprocess: 456, total: 868, color:"purple", title: "Data Entry" },
    {draft: 0, processed: 256, inprocess: 456, total: 868, color:"light-purple", title: "Checker" },
    {draft: 0, processed: 256, inprocess: 456, total: 868, color:"blue", title: "Import/Export" },
    {draft: 0, processed: 256, inprocess: 456, total: 868, color:"pink", title: "Physical Verification" }
  ]

}
