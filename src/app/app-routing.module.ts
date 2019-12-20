/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๒๖/๑๑/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับจัดการ router>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';

export const appRouting: Routes = [
  {
    path: 'SignIn',
    component: SigninComponent,
    canActivate: [AuthGuardService]
  },  
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },      
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }        
];