/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๒๕/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Routes} from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {AuthenADFSPageResolve, HeaderSubtitleProjectCategoryResolve, HeaderSubtitleTransactionRegisteredResolve, GetListProjectCategoryResolve, GetTransProjectResolve, GetTransRegisteredResolve} from './app-routing-resolve.service'

import {PageEmptyComponent } from './page-empty.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {RegisteredComponent} from './registered/registered.component';
import {TransactionRegisteredHomeComponent} from './transaction/registered/home/transaction-registered-home.component';
import {TransactionRegisteredDetailComponent} from './transaction/registered/detail/transaction-registered-detail.component';

export const appRouting: Routes = [
  {
    path: 'SignIn',
    component: PageEmptyComponent,
    resolve: {
      AuthenADFSPageResolve
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
      projectCategory$: GetListProjectCategoryResolve
    }
  },
  {
    path: 'Project/:projectCategory',
    children:[
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: false,
          hasHearderSubtitle: true
        },
        resolve: {
          HeaderSubtitleProjectCategoryResolve
        }
      },
      {
        path: 'Registered',
        component: RegisteredComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        },
        resolve: {
          HeaderSubtitleProjectCategoryResolve
        }
      },
      {
        path: 'Registered/:cuid',
        component: RegisteredComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        },
        resolve: {
          HeaderSubtitleProjectCategoryResolve,
          transProject$: GetTransProjectResolve
        }
      }
    ]
  },
  {
    path: 'Transaction/Registered',
    children: [
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
        },
        resolve: {
          HeaderSubtitleTransactionRegisteredResolve
        }
      },
      {
        path: 'Detail',
        component: TransactionRegisteredDetailComponent,
        canActivate: [AuthGuardService],
        data: {
          signin: true,
          hasHearderSubtitle: true
        },
        resolve: {
          HeaderSubtitleTransactionRegisteredResolve
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
          HeaderSubtitleTransactionRegisteredResolve,
          transRegistered$: GetTransRegisteredResolve
        }
      }
    ]
  },

  /*
  {
    path: ':projectCategory',
    redirectTo: ':projectCategory/Home',
    pathMatch: 'full'
  },
  {
    path: ':projectCategory/Home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: false,
      hasHearderSubtitle: true
    },
    resolve: {
      HeaderSubtitleProjectCategoryResolve
    }
  },
  {
    path: ':projectCategory/Registered',
    component: RegisteredComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: true,
      hasHearderSubtitle: true
    },
    resolve: {
      HeaderSubtitleProjectCategoryResolve
    }
  },
  {
    path: ':projectCategory/Registered/:cuid',
    component: RegisteredComponent,
    canActivate: [AuthGuardService],
    data: {
      signin: true,
      hasHearderSubtitle: true
    },
    resolve: {
      HeaderSubtitleProjectCategoryResolve,
      transProject$: GetTransProjectResolve
    }
  },
  */
  /*
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
  */
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
