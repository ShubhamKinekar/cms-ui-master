import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/services/uam/login.service';
import { SidenavService } from 'src/app/shared/services/common/sidenav.service';
import { onMainContentChange } from 'src/app/shared/animations/animations';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [onMainContentChange],
})
export class LayoutComponent implements OnInit,AfterViewInit, OnDestroy {
  isLoggedIn = false;
  user:any;
  public onSideNavChange: boolean | undefined;
  constructor(
    private changeRef:ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private sidenavService: SidenavService
  ) {
    
    this.loginService.currentUser.subscribe((res) => {
      this.isLoggedIn = res != null;
      this.user = res;
    });

    this.sidenavService.sideNavState$.subscribe((res) => {
      this.onSideNavChange = res;
    });
  }
  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }

  ngOnInit() {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login'],{skipLocationChange: true});
  }

  ngOnDestroy(): void {}
}
