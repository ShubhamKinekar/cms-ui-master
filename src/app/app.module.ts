import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import {
  WebHttpClient,
  WebHttpClientCreator,
} from './shared/services/WebHttpClient';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { LoaderInterceptor } from './interceptors/loader-overlay/loader-overlay.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule,
    PagesModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: WebHttpClient, useFactory: WebHttpClientCreator, deps: [HttpClient] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
