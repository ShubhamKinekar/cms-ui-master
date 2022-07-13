import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/card/card.component';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressModificationPermanentComponent } from './components/data-entry/address-modification-permanent/address-modification-permanent.component';
import { ContactDetailsModificationComponent } from './components/data-entry/contact-details-modification/contact-details-modification.component';
import { BankDetailsModificationComponent } from './components/data-entry/bank-details-modification/bank-details-modification.component';
import { AccountClosureComponent } from './components/data-entry/account-closure/account-closure.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableComponent } from './components/table/data-table.component';
import { DataPropertyGetterPipe } from './components/table/data-property-getter-pipe/data-property-getter.pipe';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { IncomeRangeRequestComponent } from './components/data-entry/income-range-request/income-range-request.component';
import { AddressModificationCorrespondenceComponent } from './components/data-entry/address-modification-correspondence/address-modification-correspondence.component';
import { LoaderOverlayComponent } from './components/loader-overlay/loader-overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NominationAddModCanComponent } from './components/data-entry/nomination-add-mod-can/nomination-add-mod-can.component';
import { PancardTradingDematComponent } from './components/pan-card-trading-demat/pan-card-trading-demat.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { CDSLBankListComponent } from './components/bank-list/cdsl/cdsl-bank-list.component';
import { NSDLBankListComponent } from './components/bank-list/nsdl/nsdl-bank-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { PanListComponent } from './components/pan-list/pan-list.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { BarcodePopupComponent } from './components/barcode-popup/barcode-popup.component';
import { BacodeListComponent } from './components/bacode-list/bacode-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CardComponent,
    DataTableComponent,
    DataPropertyGetterPipe,
    PancardTradingDematComponent,
    AddressModificationCorrespondenceComponent,
    AddressModificationPermanentComponent,
    IncomeRangeRequestComponent,
    ContactDetailsModificationComponent,
    BankDetailsModificationComponent,
    AccountClosureComponent,
    ConfirmationPopupComponent,BarcodePopupComponent,
    FileUploadComponent,
    PdfViewComponent,
    LoaderOverlayComponent,
    BranchListComponent,BacodeListComponent,
    NominationAddModCanComponent,
    CDSLBankListComponent,
    NSDLBankListComponent,
    EmployeeListComponent,
    PanListComponent,
    ReadMoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatToolbarModule,MaterialModule,
    MatIconModule,
    MatCardModule,MatMenuModule,
    MatDividerModule,ReactiveFormsModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,BrowserAnimationsModule,
    MatCardModule, FormsModule, HttpClientModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CardComponent,
    DataTableComponent,
    DataPropertyGetterPipe,
    PancardTradingDematComponent,
    AddressModificationCorrespondenceComponent,
    AddressModificationPermanentComponent,
    IncomeRangeRequestComponent,
    ContactDetailsModificationComponent,
    BankDetailsModificationComponent,
    AccountClosureComponent,PdfViewComponent,
    ConfirmationPopupComponent,
    ReadMoreComponent
  ]
})
export class SharedModule { }
