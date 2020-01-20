/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๑๗/๐๑/๒๕๖๒>
Description : <>
=============================================
*/

'use strict';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { CookieService } from 'ngx-cookie-service';

import { AppService } from './app.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

import { appRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent    
  ],
  imports: [
    BrowserModule,
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
    NgbModule
  ],
  providers: [
    CookieService,
    AppService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }