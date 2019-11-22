/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๐๘/๑๑/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานทั่วไปของระบบ>
=============================================
*/

'use strict';

import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { Promise } from 'q';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  lang: string = 'th';
    
  constructor(
    private titleService: Title,
    private translateService: TranslateService      
  ) { }

  //ฟังก์ชั่นสำหรับกำหนดภาษาที่่ต้องการ
  //โดยมีพารามิเตอร์ดังนี้
  //1. lang รับค่าภาษาที่ต้องการ
  setDefaultLang(lang?: string) {
    this.lang = (!lang ? this.lang : lang);

    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
      
    this.translateService.get('systemName').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  };

  //ฟังก์ชั่นสำหรับซุ่มเลขสี
  getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    
    return ('#' + ('000000' + color).slice(-6)).toUpperCase();
  };

  doAsyncTask() {
    let promise = Promise((resolve, reject) => {
      console.log('Start');

      setTimeout(() => {        
        resolve('Success');
      }, 1000);
    });      

    return promise
  };
}