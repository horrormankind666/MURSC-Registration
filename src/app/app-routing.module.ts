/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๐๙/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Routes} from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {ProjectCategory, TransProject, TransRegistered} from './app-routing-resolve.service'

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MainComponent} from './main.component'
import {SigninComponent} from './signin/signin.component';
import {HomeComponent as CBXHomeComponent} from './CBX/home/home.component';
import {RegisteredComponent as CBXRegisteredComponent} from './CBX/registered/registered.component';
import {HomeComponent as MUFEHomeComponent} from './MUFE/home/home.component';
import {HomeComponent as TransactionRegisteredHomeComponent} from './TransactionRegistered/home/home.component';
import {RegisteredDetailComponent as TransactionRegisteredDetailComponent} from './TransactionRegistered/registered-detail/registered-detail.component';

export const appRouting: Routes = [
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
    path: 'SignIn',
    component: SigninComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: false,
      hasHearderSubtitle: false
    }
  },
  {
    path: 'CBX',
    children:[
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: CBXHomeComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: false,
          hasHearderSubtitle: true
        }
      },
      {
        path: 'Registered',
        component: CBXRegisteredComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        }
      },
      {
        path: 'Registered/:transProjectID',
        component: CBXRegisteredComponent,
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
        path: 'Detail/:transRegisteredID',
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
