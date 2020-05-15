/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๑๒/๐๕/๒๕๖๒>
Description : <>
=============================================
*/

'use strict';

import {Routes} from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {CBX} from './app-routing-resolve.service'

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MainComponent} from './main.component'
import {SigninComponent} from './signin/signin.component';
import {HomeComponent as CBXHomeComponent} from './CBX/home/home.component';
import {RegisteredComponent as CBXRegisteredComponent} from './CBX/registered/registered.component';
import {HomeComponent as MUFEHomeComponent} from './MUFE/home/home.component';

export const appRouting: Routes = [
  {
    path: 'Main',
    component: MainComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: false,
      hasHearderSubtitle: false
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
          transProject$: CBX.TransProject
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
