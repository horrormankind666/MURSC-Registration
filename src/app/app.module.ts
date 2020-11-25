/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๓/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {CommonModule, TitleCasePipe} from '@angular/common';
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

import {TrimOnBlurDirective, FocusRemoverDirective, DynamicComponentDirective, Nl2BrPipe} from './app.directive';

import {appRouting} from './app-routing.module';

import {AppComponent} from './app.component';
import {ModalInfoComponent, ModalSuccessComponent, ModalErrorComponent, ModalConfirmComponent, ModalImageComponent, ModalFormComponent, ModalFormlessComponent} from './modal/modal.component';
import {PageEmptyComponent} from './page-empty.component'
import {PageNotFoundComponent} from './page-not-found.component';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {ProjectHomeComponent} from './project/home/project-home.component';
import {ProjectDetailComponent} from './project/detail/project-detail.component';
import {RegisteredComponent} from './registered/registered.component';
import {TransactionRegisteredHomeComponent} from './transaction/registered/home/transaction-registered-home.component';
import {TransactionRegisteredAllComponent} from './transaction/registered/home/transaction-registered-all.component';
import {TransactionRegisteredPaymentCompletedComponent} from './transaction/registered/home/transaction-registered-payment-completed.component';
import {TransactionRegisteredCheckPaymentComponent} from './transaction/registered/home/transaction-registered-check-payment.component';
import {TransactionRegisteredPendingPaymentComponent} from './transaction/registered/home/transaction-registered-pending-payment.component';
import {TransactionRegisteredDetailComponent} from './transaction/registered/detail/transaction-registered-detail.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {PrivilegeComponent} from './privilege/privilege.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ModalInfoComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
    ModalImageComponent,
    ModalFormComponent,
    ModalFormlessComponent,
    PageEmptyComponent,
    PageNotFoundComponent,
    MainComponent,
    HomeComponent,
    ProjectHomeComponent,
    ProjectDetailComponent,
    RegisteredComponent,
    TransactionRegisteredHomeComponent,
    TransactionRegisteredAllComponent,
    TransactionRegisteredPaymentCompletedComponent,
    TransactionRegisteredCheckPaymentComponent,
    TransactionRegisteredPendingPaymentComponent,
    TransactionRegisteredDetailComponent,
    ScheduleComponent,
    PrivilegeComponent,
    TrimOnBlurDirective,
    FocusRemoverDirective,
    DynamicComponentDirective,
    Nl2BrPipe
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
      backdropBackgroundColour: 'rgba(0, 0, 0, 0.8)',
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
    TitleCasePipe,
    CookieService,
    AppService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalInfoComponent,
    ModalSuccessComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
    ModalImageComponent,
    ModalFormComponent,
    ModalFormlessComponent,
    ProjectDetailComponent,
    TransactionRegisteredAllComponent,
    TransactionRegisteredPaymentCompletedComponent,
    TransactionRegisteredCheckPaymentComponent,
    TransactionRegisteredPendingPaymentComponent,
    ScheduleComponent,
    PrivilegeComponent
  ]
})

export class AppModule {}
