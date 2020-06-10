/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๑๐/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';

import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

import {TranslateService} from '@ngx-translate/core';

import {CookieService} from 'ngx-cookie-service';
import {DeviceDetectorService} from 'ngx-device-detector';

import {ModalService} from './modal/modal.service'

import {ModalErrorComponent} from './modal/modal.component'

import * as $ from 'jquery';

declare function $clamp(element, options): any;

@Injectable({
  providedIn: 'root'
})
export class AppService  {
  constructor(
    private http: HttpClient,
    private titleService: Title,
    private tooltipConfig: NgbTooltipConfig,
    private translateService: TranslateService,
    private cookieService: CookieService,
    private deviceService: DeviceDetectorService,
    private modalService: ModalService
  ) {
    this.tooltipConfig.placement = 'top';
    this.tooltipConfig.container = 'body';
    this.tooltipConfig.tooltipClass = 'tooltip-custom';
  }

  public isLoading: any = {
    show: false,
    page: false,
    modal: false,
    processing: false,
    saving: false,
    checking: false
  };
  public lang: string = 'th';
  public cookieName: string = 'MURSC.Cookies';
  public authenResource: any = {
    type: '',
    token: ''
  }
  public urlAuthenResource: string = /*'http://localhost:5001/API/AuthenResource/UserInfo'*/'https://mursc.mahidol.ac.th/ResourceADFS/API/AuthenResource/UserInfo';
  public urlAuthenServer: string = /*'http://localhost:50833'*/'https://mursc.mahidol.ac.th/AuthADFS';
  public urlAPI: string = /*'http://localhost:3000/API'*/'https://mursc.mahidol.ac.th/API';
  public dateTimeOnURL: string = formatDate(new Date(), 'dd/MM/yyyyHH:mm:ss', 'en');
  public rootPath: string;
  public hasHearderSubtitle: boolean = false;

  textOverflowClamp(e: string, line: number) {
    $clamp(document.querySelector(e), {clamp: (this.deviceService.browser === 'IE' ? (line + 1) : line)});
  }

  setDefaultLang(lang?: string) {
    this.lang = (!lang ? this.lang : lang);

    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);

    this.translateService.get('systemName').subscribe((result: string) => {
      this.titleService.setTitle(result);
    });
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang
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

  getTextRecordCount(totalSearch: number, total: number): string {
    let entries: string;

    this.translateService.get('entries').subscribe((result: string) => {entries = result;});

    return (totalSearch !== undefined ? ((totalSearch !== total ? (total.toLocaleString() + ' / ' + totalSearch.toLocaleString()) : totalSearch.toLocaleString()) + ' ' + entries): '');
  }

  getDataSource(routePrefix: string, action: string, query?: string): Promise<any> {
    routePrefix = (routePrefix === undefined ? '' : routePrefix);
    action = (action === undefined ? '' : action);
    query = (query === undefined || query.length === 0 ? '' : query);

    let url = (this.urlAPI + '/' + routePrefix + '/');
    let route = '';

    switch (action)
    {
      case 'getlist': {
        route = 'GetList';
        break;
      }
      case 'get': {
        route = 'Get';
        break;
      }
    }

    url += (route + '?ver=' + this.dateTimeOnURL + query);

    let promise = new Promise((resolve, reject) => {
      this.http.get(url).subscribe((result: {}) => {
        let data = result['data'];

        resolve(data !== undefined && data !== null ? data : []);
      });
    });

    return promise;
  }

  save(routePrefix: string, method: string, data: string): Promise<any> {
    routePrefix = (routePrefix === undefined ? '' : routePrefix);
    method = (method === undefined ? '' : method);
    data = (data === undefined ? '' : data);

    let url = (this.urlAPI + '/' + routePrefix + "/");
    var route = "";

    switch (method)
    {
      case 'POST': {
        route = "Post";
        break;
      }
    }

    url += (route + "?ver=" + this.dateTimeOnURL);

    this.isLoading.show = true;
    this.isLoading.saving = true;

    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe((result: {}) => {
        this.isLoading.show = false;
        this.isLoading.saving = false;

        let data = (result['data'] !== undefined && result['data'] !== null ? result['data'][0] : {});

        if (data.errorCode === 1) {
          let modalRef = this.modalService.getModalError(false, ModalErrorComponent, 'save.error.notSuccess');

          this.modalService.close(modalRef).then((result: string) => {
            if (result === 'close') {
              resolve(data);
            }
          });
        }
        else
          resolve(data);
      });
    });

    return promise;
  }
}
