/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๑/๒๕๖๒>
Modify date : <๑๑/๑๑/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับจัดการ router>
=============================================
*/

'use strict';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },      
      {
        path: '**',
        component: HomeComponent
      }        
    ])
  ], 
  exports: [RouterModule]
})

export class AppRoutingModule { }