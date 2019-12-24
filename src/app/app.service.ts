/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๔/๑๒/๒๕๖๒>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  public lang: string = 'th';
  public cookieName: string = 'MURSC.Cookies';
  public authenResource: any = {
    type: '',
    token: ''
  };

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) { }

  setDefaultLang(lang?: string) {
    this.lang = (!lang ? this.lang : lang);

    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
      
    this.translateService.get('systemName').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  };

  getRandomColor(): string {
    let color: string = Math.floor(0x1000000 * Math.random()).toString(16);
    
    return ('#' + ('000000' + color).slice(-6)).toUpperCase();
  };

  getCookie(name: string) {
    if (this.cookieService.check(name)) {
      let cookieValue: string[] = this.cookieService.get(name).split(',');

      if (cookieValue.length === 2) {
        this.authenResource.type = cookieValue[0];
        this.authenResource.token = cookieValue[1];
      }
    }
  };
}