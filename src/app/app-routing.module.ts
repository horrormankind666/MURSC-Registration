/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๓๑/๐๓/๒๕๖๒>
Description : <>
=============================================
*/

'use strict';

import {Routes} from '@angular/router';

import {AuthGuardService} from './auth-guard.service';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SigninComponent} from './signin/signin.component';
import {HomeComponent} from './home/home.component';
import {RegisteredComponent} from './registered/registered.component';

export const appRouting: Routes = [
  {
    path: 'SignIn',
    component: SigninComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: false
    }
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: false
    }
  },
  {
    path: 'Registered',
    component: RegisteredComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: true
    }
  },
  {
    path: 'Registered/:transProjectID',
    component: RegisteredComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: true
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'Home'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
