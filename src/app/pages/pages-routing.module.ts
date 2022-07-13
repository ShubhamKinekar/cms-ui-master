import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseInitiationComponent } from './transaction/case-initiation/case-initiation.component';
import { ForgotPasswordComponent } from './uam/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './uam/login/login.component';
import { RoleDetailComponent } from './uam/role-detail/role-detail.component';
import { ScrutinyComponent } from './transaction/scrutiny/scrutiny.component';
import { AdminComponent } from './uam/admin/admin.component';
import { DataEntryComponent } from './transaction/data-entry/data-entry.component';
import { CheckerComponent } from './transaction/checker/checker.component';
import { CaseInitiationListComponent } from './transaction/case-initiation-list/case-initiation-list.component';
import { ScrutinyListComponent } from './transaction/scrutiny-list/scrutiny-list.component';
import { DataEntryListComponent } from './transaction/data-entry-list/data-entry-list.component';
import { CheckerListComponent } from './transaction/checker-list/checker-list.component';
import { RoleListComponent } from './uam/role-list/role-list.component';
import { UserListComponent } from './uam/user-list/user-list.component';
import { UserDetailComponent } from './uam/user-detail/user-detail.component';
import { ScrutinyAllocateComponent } from './transaction/scrutiny-allocate/scrutiny-allocate.component';
import { DataEntryAllocateComponent } from './transaction/data-entry-allocate/data-entry-allocate.component';
import { CheckerAllocateComponent } from './transaction/checker-allocate/checker-allocate.component';
import { AuthGuard } from '../interceptors/guards/auth.guard';
import { PermissionType } from '../shared/enums';
import { CaseSummaryListComponent } from './transaction/case-summary-list/case-summary-list.component';
import { CaseSummaryComponent } from './transaction/case-summary/case-summary.component';
import { PhysicalVerificationComponent } from './transaction/physical-verification/physical-verification.component';
import { UserProfileComponent } from './uam/user-profile/user-profile.component';
import { ReportsComponent } from './transaction/reports/reports.component';
import { InprocessReportComponent } from './transaction/reports/inprocess-report/inprocess-report.component';
import { PasswordAssistanceComponent } from './uam/password-assistance/password-assistance.component';
import { LovMasterComponent } from './uam/lov-master/lov-master.component';
import { LovListComponent } from './uam/lov-list/lov-list.component';
import { LovDetailComponent } from './uam/lov-detail/lov-detail.component';
import { EmailListComponent } from './uam/email-list/email-list.component';
import { EmailDetailComponent } from './uam/email-detail/email-detail.component';
import { LovsubDetailComponent } from './uam/lovsub-detail/lovsub-detail.component';
import { LovsubListComponent } from './uam/lovsub-list/lovsub-list.component';
import { EmployeesDetailComponent } from './uam/employees-detail/employees-detail.component';
import { EmployeesListComponent } from './uam/employees-list/employees-list.component';
import { BacodeListComponent } from './uam/bacode-list/bacode-list.component';
import { BacodeDetailComponent } from './uam/bacode-detail/bacode-detail.component';
import { MasterBranchListComponent } from './uam/master-branch-list/master-branch-list.component';
import { MasterBranchDetailComponent } from './uam/master-branch-detail/master-branch-detail.component';
import { MasterCdslAccountListComponent } from './uam/master-cdsl-account-list/master-cdsl-account-list.component';
import { MasterCdslAccountDetailComponent } from './uam/master-cdsl-account-detail/master-cdsl-account-detail.component';
import { MasterCdslBankDetailComponent } from './uam/master-cdsl-bank-detail/master-cdsl-bank-detail.component';
import { MasterCdslBankListComponent } from './uam/master-cdsl-bank-list/master-cdsl-bank-list.component';
import { MasterNsdlBankDetailComponent } from './uam/master-nsdl-bank-detail/master-nsdl-bank-detail.component';
import { MasterNsdlBankListComponent } from './uam/master-nsdl-bank-list/master-nsdl-bank-list.component';
import { MasterNsdlAccountListComponent } from './uam/master-nsdl-account-list/master-nsdl-account-list.component';
import { MasterNsdlAccountDetailComponent } from './uam/master-nsdl-account-detail/master-nsdl-account-detail.component';
import { MasterRmDetailComponent } from './uam/master-rm-detail/master-rm-detail.component';
import { MasterRmListComponent } from './uam/master-rm-list/master-rm-list.component';
import { SystemConfigurationListComponent } from './uam/system-configuration-list/system-configuration-list.component';
import { SystemConfigurationDetailComponent } from './uam/system-configuration-detail/system-configuration-detail.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { ExportMasterComponent } from './import-export/export-master/export-master.component';
import { BatchMasterListComponent } from './import-export/batch-master-list/batch-master-list.component';
import { BatchMasterDetailComponent } from './import-export/batch-master-detail/batch-master-detail.component';
import { EmployeesUploadComponent } from './uam/employees-upload/employees-upload.component';
import { MasterRmUploadComponent } from './uam/master-rm-upload/master-rm-upload.component';
import { MasterBranchUploadComponent } from './uam/master-branch-upload/master-branch-upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'dashboard',  pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password/:data', component: ForgotPasswordComponent},
  { path: 'passwordAssistance', component: PasswordAssistanceComponent},
  { path: 'case-summary', component: CaseSummaryListComponent },
  { path: 'case-summary/details/:case-stage/:id', component: CaseSummaryComponent },
  {
    path: 'case-initiation', component: CaseInitiationListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.CaseInitiation],
    }
  },
  {
    path: 'case-initiation/details/:id', component: CaseInitiationComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.CaseInitiation]
    }
  },
  {
    path: 'scrutiny', component: ScrutinyListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Scrutiny]
    }
  },
  {
    path: 'scrutiny/details/:id', component: ScrutinyComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Scrutiny]
    }
  },
  {
    path: 'scrutiny/allocate', component: ScrutinyAllocateComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Scrutiny]
    }
  },
  {
    path: 'data-entry', component: DataEntryListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.DataEntry]
    }
  },
  {
    path: 'data-entry/details/:id', component: DataEntryComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.DataEntry]
    }
  },
  {
    path: 'data-entry/allocate', component: DataEntryAllocateComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.DataEntry]
    }
  },
  {
    path: 'checker', component: CheckerListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Checker]
    }
  },
  {
    path: 'checker/details/:id', component: CheckerComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Checker]
    }
  },
  {
    path: 'checker/allocate', component: CheckerAllocateComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Checker]
    }
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
  },
  {
    path: 'admin/user', component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
  },
  {
    path: 'admin/user/details/:id', component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
  },
  {
    path: 'admin/role', component: RoleListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
  },
  {
    path: 'admin/role/details/:id', component: RoleDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
  },
  {
    path: 'admin/lov/details/:id', component: LovDetailComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
    
  },
   {
    path: 'admin/lov-master', component:LovMasterComponent,
    canActivate: [AuthGuard],
    data: {
    permissions: [PermissionType.Admin]
     }
  },
  {
    path: 'admin/lov/list/:id', component: LovListComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Admin]
    }
    
  },
  {
    path: 'import-export', component: ImportExportComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.ImportExport]
    }
  },
    {
    path: 'import-export/export-master', component:ExportMasterComponent,
    canActivate: [AuthGuard],
    data: {
    permissions: [PermissionType.ImportExport]
     }
  },
  {
    path: 'import-export/batchmaster', component:BatchMasterListComponent,
    canActivate: [AuthGuard],
    data: {
    permissions: [PermissionType.ImportExport]
     }
  },
  {
    path: 'import-export/batchmaster/details/:id', component:BatchMasterDetailComponent,
    canActivate: [AuthGuard],
    data: {
    permissions: [PermissionType.ImportExport]
     }
  },

  {
    path: 'physical-verification', component: PhysicalVerificationComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.PhysicalVerification]
    }
  },
  {
    path: 'reports', component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Report]
    }
  },
  {
    path: 'reports/inprocess', component: InprocessReportComponent,
    canActivate: [AuthGuard],
    data: {
      permissions: [PermissionType.Report]
    }
  },
  { path: 'user-profile/:id', component: UserProfileComponent },
 // { path: 'inprocessReport', component:InprocessReportComponent}
 {
  path: 'admin/email/details/:id', component: EmailDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/email/list/:id', component: EmailListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/lovsub/list/:id', component: LovsubListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/lovsub/details/:id', component: LovsubDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/employees/list/:id', component: EmployeesListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/employees/details/:id', component: EmployeesDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/employees/upload/:id', component: EmployeesUploadComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masterrm/upload/:id', component: MasterRmUploadComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masterbranch/upload/:id', component: MasterBranchUploadComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/bacode/list/:id', component: BacodeListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/bacode/details/:id', component: BacodeDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masterbranch/list/:id', component: MasterBranchListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masterbranch/details/:id', component: MasterBranchDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/mastercdslaccount/list/:id', component: MasterCdslAccountListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/mastercdslaccount/details/:id', component: MasterCdslAccountDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/mastercdslbank/list/:id', component: MasterCdslBankListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/mastercdslbank/details/:id', component: MasterCdslBankDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masternsdlbank/list/:id', component: MasterNsdlBankListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masternsdlbank/details/:id', component: MasterNsdlBankDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masternsdlaccount/list/:id', component: MasterNsdlAccountListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masternsdlaccount/details/:id', component: MasterNsdlAccountDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masterrm/list/:id', component: MasterRmListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/masterrm/details/:id', component: MasterRmDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/systemconfiguration', component: SystemConfigurationListComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
{
  path: 'admin/systemconfiguration/details/:id', component: SystemConfigurationDetailComponent,
  canActivate: [AuthGuard],
  data: {
    permissions: [PermissionType.Admin]
  }
  
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
