/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๒๔/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Routes} from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {ProjectCategory, TransProject, TransRegistered, AuthenADFSPage} from './app-routing-resolve.service'

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MainComponent} from './main.component';
import {HomeComponent as CBEHomeComponent} from './CBE/home/home.component';
import {RegisteredComponent as CBERegisteredComponent} from './CBE/registered/registered.component';
import {HomeComponent as MUFEHomeComponent} from './MUFE/home/home.component';
import {HomeComponent as TransactionRegisteredHomeComponent} from './TransactionRegistered/home/home.component';
import {RegisteredDetailComponent as TransactionRegisteredDetailComponent} from './TransactionRegistered/registered-detail/registered-detail.component';

export const appRouting: Routes = [
  {
    path: 'SignIn',
    component: PageNotFoundComponent,
    resolve: {
      authenADFSPage: AuthenADFSPage
    }
  },
  {
    path: 'Main',
    component: MainComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: false,
      hasHearderSubtitle: false
    },
    resolve: {
      projectCategory$: ProjectCategory
    }
  },
  {
    path: 'CBE',
    children:[
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: CBEHomeComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: false,
          hasHearderSubtitle: true
        }
      },
      {
        path: 'Registered',
        component: CBERegisteredComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        }
      },
      {
        path: 'Registered/:cuid',
        component: CBERegisteredComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        },
        resolve: {
          transProject$: TransProject
        }
      }
    ]
  },
  {
    path: 'MUFE',
    children:[
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: MUFEHomeComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: false,
          hasHearderSubtitle: true
        }
      },
    ]
  },
  {
    path: 'TransactionRegistered',
    children:[
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: TransactionRegisteredHomeComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        }
      },
      {
        path: 'Detail',
        component: TransactionRegisteredDetailComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        }
      },
      {
        path: 'Detail/:cuid',
        component: TransactionRegisteredDetailComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        },
        resolve: {
          transRegistered$: TransRegistered
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: 'Main',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuardService]
  }
];
