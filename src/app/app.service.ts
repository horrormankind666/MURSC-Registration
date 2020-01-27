/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๔/๐๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from '@ngx-translate/core';

import { CookieService } from 'ngx-cookie-service';

class Modal {
  public hasOpenModal: boolean = false;

  private _modalConfig: NgbModalConfig;
  private _modalService: NgbModal;

  constructor(
    modalConfig: NgbModalConfig,
    modalService: NgbModal
  ) {
    this._modalConfig = modalConfig;
    this._modalService = modalService;

    this._modalConfig.backdrop = 'static';
    this._modalConfig.keyboard = false;
  }

  open(content: any, windowClass: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this._modalService.open(content, {
        windowClass: windowClass
      }).result.then(
        (result: string) => {
          resolve(result);
        },
        (reason: string) => {
          resolve(reason);
        }
      )
    });

    return promise;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService  {
  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private cookieService: CookieService,
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  public modal = new Modal(
    this.modalConfig,
    this.modalService
  );

  public isLoading: boolean = true;
  public lang: string = 'th';
  public cookieName: string = 'MURSC.Cookies';
  public authenResource: any = {
    type: '',
    token: ''
  };

  setDefaultLang(lang?: string) {
    this.lang = (!lang ? this.lang : lang);

    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);

    this.translateService.get('systemName').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  getRandomColor(): string {
    let color: string = Math.floor(0x1000000 * Math.random()).toString(16);

    return ('#' + ('000000' + color).slice(-6)).toUpperCase();
  }

  getCookie(name: string) {
    if (this.cookieService.check(name)) {
      let cookieValue: string[] = this.cookieService.get(name).split(',');

      if (cookieValue.length === 2) {
        this.authenResource.type = cookieValue[0];
        this.authenResource.token = cookieValue[1];
      }
    }
    else {
      this.authenResource.type = '';
      this.authenResource.token = '';
    }
  }
}
