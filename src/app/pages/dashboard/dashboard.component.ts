import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services';
import { DashboardService } from 'src/app/shared/services/common/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  buildReleasedMsg: any;
  msg: any;
  abc: any;

  constructor(private dashboardService: DashboardService,
    protected loginService: LoginService) { }
  dashhboardCardData: any[] = [];
  ngOnInit(): void {
    this.getData();
    this.getDashBoardmsg();
  }
  getData() {
    const dashboardColors = ["grey", "golden", "purple", "light-purple", "pink"];
    this.dashboardService.getDashboardData(this.loginService.GetUser().userId).subscribe((response) => {
      Object.keys(response).forEach((mainKey, mainIndx) => {
        const card: any = {};
        card.title = mainKey;
        card.keys = Object.keys(response[mainKey]);
        card.values = Object.values(response[mainKey]);
        card.color = dashboardColors[mainIndx];
        this.dashhboardCardData.push(card);
      });
    });
  }

  getDashBoardmsg(){
    this.dashboardService.getDashboardmsg().subscribe((response: any) => {
      
    //  if(response.data.value){
         this.msg = response.data[0].value;
         if (this.msg ) {
          this.buildReleasedMsg = this.msg;
      }else {
        this.buildReleasedMsg = '';
      }
    })
  }
}
