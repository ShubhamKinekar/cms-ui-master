import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageNames } from '../../enums';
import { UserModel } from '../../models';
import { LoginService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Input() user: any = null;
  constructor(private loginService: LoginService,private router: Router) {}

  ngOnInit(): void {
    console.log(this.isLoggedIn);
    
  }

  logout() {
    this.loginService.logout();
  }

  getUserProfile() {
    //var userId = localStorage.getItem(LocalStorageNames.userId);
    this.router.navigate(['/user-profile/', this.loginService.GetUser().userId],{skipLocationChange: true});
  }
 
}
