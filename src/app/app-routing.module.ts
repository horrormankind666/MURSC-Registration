/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๒๐/๑๐/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { AuthenADFSPageResolve, HeaderSubtitleProjectCategoryResolve, HeaderSubtitleTransactionRegisteredResolve, GetListProjectCategoryResolve, GetTransProjectResolve, GetTransRegisteredResolve, GetListTransProjectResolve } from './app-routing-resolve.service'

import { PageEmptyComponent } from './page-empty.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { RegisteredComponent } from './registered/registered.component';
import { TransactionRegisteredHomeComponent } from './transaction/registered/home/transaction-registered-home.component';
import { TransactionRegisteredDetailComponent } from './transaction/registered/detail/transaction-registered-detail.component';

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
            projectCategory$: GetListProjectCategoryResolve,
            transProject$: GetListTransProjectResolve
        }
    },
    {
        path: 'Project/:projectCategory',
        children: [
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
                    HeaderSubtitleTransactionRegisteredResolve,
                    projectCategory$: GetListProjectCategoryResolve
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
