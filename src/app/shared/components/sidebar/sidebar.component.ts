import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { onSideNavChange, animateText } from '../../animations/animations';
import { PermissionType } from '../../enums';
import { PermissionService } from '../../services/common/permission.service';
import { SidenavService } from '../../services/common/sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [onSideNavChange, animateText],
})
export class SidebarComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public currentRoute: string = '';
  public pages: Page[] = [
    { name: 'Case Summary', link: '/case-summary', icon: 'chrome_reader_mode' },
    { name: 'Case Initiated', link: '/case-initiation', icon: 'create_new_folder', permissions: [PermissionType.CaseInitiation] },
    { name: 'Scrutiny', link: '/scrutiny', icon: 'spellcheck', permissions: [PermissionType.Scrutiny] },
    { name: 'Data Entry', link: '/data-entry', icon: 'edit', permissions: [PermissionType.DataEntry] },
    { name: 'Checker', link: '/checker', icon: 'collections', permissions: [PermissionType.Checker] },
    { name: 'Import/Export', link: '/import-export', icon: 'import_export', permissions: [PermissionType.ImportExport] },
    { name: 'Physical Verification', link: '/physical-verification', icon: 'verified_user', permissions: [PermissionType.PhysicalVerification] },
    { name: 'Reports', link: '/reports', icon: 'insert_chart', permissions: [PermissionType.Report] },
    { name: 'Admin', link: '/admin', icon: 'account_box', permissions: [PermissionType.Admin] },
  ];

  constructor(private sidenavService: SidenavService,
    private permissionService: PermissionService,
    private router: Router) {
    this.onSinenavToggle();
    setTimeout(() => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const eventUrl = /(?<=\/).+/.exec(event.urlAfterRedirects);
          const currentRoute = (eventUrl || []).join('');
          this.currentRoute = '/' + currentRoute;
        }
      });
    }, 100);
  }

  ngOnInit() {

  }
  checkPermission(page: Page) {
    if (page && page.permissions && page.permissions.length > 0) {
      return this.permissionService.isPermissionExists(page.permissions);
    }
    return true;

  }


  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

  isRouteActive(page: Page) {
    const url = window.location.href.toLowerCase();
    if(page.name == 'Case Summary'){
      return url.indexOf(page.link) > -1  
    }
    else{
      return url.indexOf(page.link) > -1 && url.indexOf('case-summary/details') == -1;
    }
  }
}

interface Page {
  link: string;
  name: string;
  icon: string;
  permissions?: PermissionType[];
}
