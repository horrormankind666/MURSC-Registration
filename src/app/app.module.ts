/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๑๗/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading';
import {CookieService} from 'ngx-cookie-service';
import {DeviceDetectorModule} from 'ngx-device-detector';

import {AppService} from './app.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';

import {appRouting} from './app-routing.module';
import {AppComponent} from './app.component';
import {SigninComponent} from './signin/signin.component';
import {HomeComponent} from './home/home.component';
import {ProjectComponent} from './project/project.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    ProjectComponent,
    ProjectDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouting),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0, 0, 0, 0.8)',
      fullScreenBackdrop: true,
      primaryColour: '#000000',
      secondaryColour: '#FFFFFF'
    }),
    NgbModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    CookieService,
    AppService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProjectDetailComponent]
})

export class AppModule {}
