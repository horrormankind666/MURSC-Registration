/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๗/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

import {NgxLoadingModule, ngxLoadingAnimationTypes} from 'ngx-loading';
import {CookieService} from 'ngx-cookie-service';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';

import {AppService} from './app.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';

import {appRouting} from './app-routing.module';

import {AppComponent} from './app.component';
import {ModalSuccessComponent, ModalErrorComponent, ModalConfirmComponent} from './modal/modal.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MainComponent} from './main.component';
import {SigninComponent} from './signin/signin.component';
import {HomeComponent as CBXHomeComponent} from './CBX/home/home.component';
import {ProjectComponent as CBXProjectComponent} from './CBX/project/project.component';
import {ProjectDetailComponent as CBXProjectDetailComponent} from './CBX/project-detail/project-detail.component';
import {RegisteredComponent as CBXRegisteredComponent} from './CBX/registered/registered.component';
import {HomeComponent as MUEFHomeComponent} from  './MUFE/home/home.component';
import {TrimOnBlurDirective} from './app.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
    PageNotFoundComponent,
    MainComponent,
    SigninComponent,
    CBXHomeComponent,
    CBXProjectComponent,
    CBXProjectDetailComponent,
    CBXRegisteredComponent,
    MUEFHomeComponent,
    TrimOnBlurDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouting, {
      useHash: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0, 0, 0, 0.5)',
      fullScreenBackdrop: true,
      primaryColour: '#000000',
      secondaryColour: '#FFFFFF'
    }),
    NgbModule,
    NgSelectModule,
    DeviceDetectorModule.forRoot(),
    TextareaAutosizeModule
  ],
  providers: [
    CookieService,
    AppService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
    CBXProjectDetailComponent
  ]
})

export class AppModule {}
