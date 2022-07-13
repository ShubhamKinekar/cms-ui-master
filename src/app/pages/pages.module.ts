import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { LoginComponent } from './uam/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './uam/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { CaseInitiationComponent } from './transaction/case-initiation/case-initiation.component';
import { ScrutinyComponent } from './transaction/scrutiny/scrutiny.component';
import { AdminComponent } from './uam/admin/admin.component';
import { DataEntryComponent } from './transaction/data-entry/data-entry.component';
import { CheckerComponent } from './transaction/checker/checker.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { CaseInitiationListComponent } from './transaction/case-initiation-list/case-initiation-list.component';
import { ScrutinyListComponent } from './transaction/scrutiny-list/scrutiny-list.component';
import { DataEntryListComponent } from './transaction/data-entry-list/data-entry-list.component';
import { CheckerListComponent } from './transaction/checker-list/checker-list.component';
import { RoleListComponent } from './uam/role-list/role-list.component';
import { UserListComponent } from './uam/user-list/user-list.component';
import { RoleDetailComponent } from './uam/role-detail/role-detail.component';
import { UserDetailComponent } from './uam/user-detail/user-detail.component';
import { ScrutinyAllocateComponent } from './transaction/scrutiny-allocate/scrutiny-allocate.component';
import { DataEntryAllocateComponent } from './transaction/data-entry-allocate/data-entry-allocate.component';
import { CheckerAllocateComponent } from './transaction/checker-allocate/checker-allocate.component';
import { PhysicalVerificationComponent } from './transaction/physical-verification/physical-verification.component';
import { UserProfileComponent } from './uam/user-profile/user-profile.component';
import { CaseSummaryListComponent } from './transaction/case-summary-list/case-summary-list.component';
import { CaseSummaryComponent } from './transaction/case-summary/case-summary.component';
import { ReportsComponent } from './transaction/reports/reports.component';
import { InprocessReportComponent } from './transaction/reports/inprocess-report/inprocess-report.component';
import { PasswordAssistanceComponent } from './uam/password-assistance/password-assistance.component';
import { LovListComponent } from './uam/lov-list/lov-list.component';
import { LovMasterComponent } from './uam/lov-master/lov-master.component';
import { LovDetailComponent } from './uam/lov-detail/lov-detail.component';
import { EmailListComponent } from './uam/email-list/email-list.component';
import { EmailDetailComponent } from './uam/email-detail/email-detail.component';
import { LovsubDetailComponent } from './uam/lovsub-detail/lovsub-detail.component';
import { LovsubListComponent } from './uam/lovsub-list/lovsub-list.component';
import { EmployeesListComponent } from './uam/employees-list/employees-list.component';
import { EmployeesDetailComponent } from './uam/employees-detail/employees-detail.component';
import { BacodeDetailComponent } from './uam/bacode-detail/bacode-detail.component';
import { BacodeListComponent } from './uam/bacode-list/bacode-list.component';
import { MasterBranchListComponent } from './uam/master-branch-list/master-branch-list.component';
import { MasterBranchDetailComponent } from './uam/master-branch-detail/master-branch-detail.component';
import { MasterCdslAccountListComponent } from './uam/master-cdsl-account-list/master-cdsl-account-list.component';
import { MasterCdslAccountDetailComponent } from './uam/master-cdsl-account-detail/master-cdsl-account-detail.component';
import { MasterCdslBankDetailComponent } from './uam/master-cdsl-bank-detail/master-cdsl-bank-detail.component';
import { MasterCdslBankListComponent } from './uam/master-cdsl-bank-list/master-cdsl-bank-list.component';
import { MasterNsdlBankDetailComponent } from './uam/master-nsdl-bank-detail/master-nsdl-bank-detail.component';
import { MasterNsdlBankListComponent } from './uam/master-nsdl-bank-list/master-nsdl-bank-list.component';
import { MasterNsdlAccountDetailComponent } from './uam/master-nsdl-account-detail/master-nsdl-account-detail.component';
import { MasterNsdlAccountListComponent } from './uam/master-nsdl-account-list/master-nsdl-account-list.component';
import { MasterRmDetailComponent } from './uam/master-rm-detail/master-rm-detail.component';
import { MasterRmListComponent } from './uam/master-rm-list/master-rm-list.component';
import { SystemConfigurationDetailComponent } from './uam/system-configuration-detail/system-configuration-detail.component';
import { SystemConfigurationListComponent } from './uam/system-configuration-list/system-configuration-list.component';
import { ImportExportComponent } from './import-export/import-export.component';
import { ExportMasterComponent } from './import-export/export-master/export-master.component';
import { BatchMasterListComponent } from './import-export/batch-master-list/batch-master-list.component';
import { BatchMasterDetailComponent } from './import-export/batch-master-detail/batch-master-detail.component';
import { EmployeesUploadComponent } from './uam/employees-upload/employees-upload.component';
import { MasterBranchUploadComponent } from './uam/master-branch-upload/master-branch-upload.component';
import { MasterRmUploadComponent } from './uam/master-rm-upload/master-rm-upload.component';

@NgModule({
  declarations: [
    PagesComponent,
    LayoutComponent,
    DashboardComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CaseSummaryListComponent,
    CaseSummaryComponent,
    CaseInitiationListComponent,
    CaseInitiationComponent,
    ScrutinyListComponent,
    ScrutinyComponent,
    ScrutinyAllocateComponent,
    DataEntryListComponent,
    DataEntryAllocateComponent,
    DataEntryComponent,
    CheckerListComponent,
    CheckerAllocateComponent,
    CheckerComponent,
    PhysicalVerificationComponent,
    RoleListComponent,
    RoleDetailComponent,
    AdminComponent,
    UserListComponent,
    UserDetailComponent,
    UserProfileComponent,
    ReportsComponent,
    InprocessReportComponent,
    PasswordAssistanceComponent,
    LovListComponent,
    LovMasterComponent,
    LovDetailComponent,
    EmailListComponent,
    EmailDetailComponent,
    LovsubDetailComponent,
    LovsubListComponent,
    EmployeesListComponent,
    EmployeesDetailComponent,
    BacodeDetailComponent,
    BacodeListComponent,
    MasterBranchListComponent,
    MasterBranchDetailComponent,
    MasterCdslAccountListComponent,
    MasterCdslAccountDetailComponent,
    MasterCdslBankDetailComponent,
    MasterCdslBankListComponent,
    MasterNsdlBankDetailComponent,
    MasterNsdlBankListComponent,
    MasterNsdlAccountDetailComponent,
    MasterNsdlAccountListComponent,
    MasterRmDetailComponent,
    MasterRmListComponent,
    SystemConfigurationListComponent,
    SystemConfigurationDetailComponent,
    ImportExportComponent,
    ExportMasterComponent,
    BatchMasterListComponent,
    BatchMasterDetailComponent,
    EmployeesUploadComponent,
    MasterRmUploadComponent,
    MasterBranchUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    PagesRoutingModule,
    BrowserModule,
    MaterialModule,
    MatSidenavModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    SharedModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
  ],
  exports: [PagesComponent, 
    LayoutComponent,
    CaseInitiationComponent,
    ScrutinyComponent,
    DataEntryComponent,
    CheckerComponent,
  ],
})
export class PagesModule {}
