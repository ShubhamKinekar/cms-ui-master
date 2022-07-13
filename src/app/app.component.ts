import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './shared/services';
export let browserRefresh = false;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  implements OnInit   {
  msg: any;
  
  constructor( private dashboardService : LoginService){

  } 

  ngOnInit(): void {
    //this.openfullscreen();
    this.dashboardService.debuggeMode().subscribe((response: any) => {
      console.log(response);
      this.msg = response.data[0].value;
      
          if (this.msg === 'YES') { 
            
          } else {
           //this.openfullscreen();
          }
  })
}
  // @HostListener("window:unload",["$event"])
  
  // clearLocalStorage(event: any){
  //     localStorage.clear();
  // }
  openfullscreen(){
    document.addEventListener('contextmenu', event=> event.preventDefault());
      window.addEventListener("keyup", disableF5);
      window.addEventListener("keydown", disableF5);
      function disableF5(e:any) {
        // console.log(e.keyCode);
        if(e.keyCode === 123 || e.keyCode === 44 ) {
          e.returnValue = false;
          e.keyCode = 0;
        }

      };
  }
}