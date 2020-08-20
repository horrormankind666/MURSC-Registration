/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๐๓/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Title} from '@angular/platform-browser';

import {NgbModal, NgbModalRef, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

import {TranslateService} from '@ngx-translate/core';

import {CookieService} from 'ngx-cookie-service';
import {DeviceDetectorService} from 'ngx-device-detector';

import {ModalService} from './modal/modal.service'

import {ModalErrorComponent, ModalImageComponent} from './modal/modal.component'

import * as $ from 'jquery';
import {stringify} from 'querystring';

declare function $clamp(element, options): any;

@Injectable({
  providedIn: 'root'
})
export class AppService  {
  constructor(
    private router: Router,
    private http: HttpClient,
    private titleService: Title,
    private modal: NgbModal,
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
  public headerViewHeight: any;
  public cookieName: string = 'MURSC.Cookies';
  public authenResource: any = {
    type: '',
    token: ''
  }
  public rootPath: string;
  public headerSubtitle: {} = null;
  public urlIsAuthenticated: string = ('https://mursc.mahidol.ac.th/ResourceADFS/API/AuthenResource/IsAuthenticated?ver=' + this.getDateTimeOnUrl());
  public urlAuthenResource: string = /*'http://localhost:5001/API/AuthenResource/UserInfo'*/('https://mursc.mahidol.ac.th/ResourceADFS/API/AuthenResource/UserInfo?ver=' + this.getDateTimeOnUrl);
  public urlAuthenServer: string = /*'http://localhost:50833'*/('https://mursc.mahidol.ac.th/AuthADFS?ver=' + this.getDateTimeOnUrl());
  public urlAPI: string = /*'http://localhost:3000/API'*/'https://mursc.mahidol.ac.th/API';
  public urlSignOut: string = ('https://mursc.mahidol.ac.th/AuthADFS/Authen/SignOut?ver=' + this.getDateTimeOnUrl());

  textOverflowClamp(e: string, line: number) {
    $clamp(document.querySelector(e), {clamp: (this.deviceService.browser === 'IE' ? (line + 1) : line)});
  }

  generateRandAlphaNumStr(len: number = 10) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let result: string = '';

    for (let i = 0; i < len; i++) {
      const rnum = Math.floor(Math.random() * chars.length);

      result += chars.substring(rnum, rnum + 1);
    }

    return result;
  }

  setDefaultLang(lang?: string) {
    this.lang = (!lang ? this.lang : lang);

    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);

    this.translateService.get('systemName').subscribe((result: string) => {
      this.titleService.setTitle(result);
    });
  }

  getDateTimeOnUrl(): string {
    return formatDate(new Date(), 'dd/MM/yyyyHH:mm:ss', 'en');
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

  getCUID(data: any = []): string {
    let randAlphaNumStr: string = this.generateRandAlphaNumStr(20);

    return (
      btoa(
        (btoa(randAlphaNumStr).split('').reverse().join('')) + '.' +
        (randAlphaNumStr.split('').reverse().join('')) + '.' +
        (btoa(data.join('.')).split('').reverse().join(''))
      )
    );
  }

  getDataSource(routePrefix: string, action: string, query?: string): Promise<any> {
    routePrefix = (routePrefix === undefined ? '' : routePrefix);
    action = (action === undefined ? '' : action);
    query = (query === undefined || query.length === 0 ? '' : query);

    let url = (this.urlAPI + '/' + routePrefix + '/');
    let route = '';
    let option = {
      headers: new HttpHeaders().set('Authorization', ('Bearer ' + this.authenResource.token))
    };

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

    url += (route + '?ver=' + this.getDateTimeOnUrl() + query);

    let promise = new Promise((resolve, reject) => {
      this.http.get(url, option).subscribe((result: {}) => {
        let data = result['data'];

        resolve(data !== undefined && data !== null ? data : []);
      });
    });

    return promise;
  }

  getDataSourceMethodPost(routePrefix: string, data: string): Promise<any> {
    routePrefix = (routePrefix === undefined ? '' : routePrefix);

    let url = (this.urlAPI + '/' + routePrefix + '?ver=' + this.getDateTimeOnUrl());
    let option = {
      headers: new HttpHeaders().set('Authorization', ('Bearer ' + this.authenResource.token))
    };

    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data, option).subscribe((result: {}) => {
        let data = result['data'];

        resolve(data !== undefined && data !== null ? data : []);
      });
    });

    return promise;
  }

  httpMethod(method: string, url: string, data: string, option: {}): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (method === 'Post') {
        this.http.post(url, data, option).subscribe((result: {}) => {
          resolve(result);
        });
      }

      if (method === 'Put') {
        this.http.put(url, data, option).subscribe((result: {}) => {
          resolve(result);
        });
      }
    });

    return promise;
  }

  save(routePrefix: string, method: string, data: string, backdrop: boolean = true): Promise<any> {
    routePrefix = (routePrefix === undefined ? '' : routePrefix);
    method = (method === undefined ? '' : method);
    data = (data === undefined ? '' : data);

    let url = (this.urlAPI + '/' + routePrefix + "/");
    var route = "";
    let option = {
      headers: new HttpHeaders().set('Authorization', ('Bearer ' + this.authenResource.token))
    };

    switch (method)
    {
      case 'POST': {
        route = "Post";
        break;
      }
      case 'PUT': {
        route = "Put";
        break;
      }
    }

    url += (route + "?ver=" + this.getDateTimeOnUrl());

    this.isLoading.show = backdrop;
    this.isLoading.saving = backdrop;

    let promise = new Promise((resolve, reject) => {
      this.httpMethod(route, url, data, option).then((result: {}) => {
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

  scrollIntoView(elementID) {
    let element: any = document.getElementById(elementID);

    if(element) {
      element.scrollIntoView(true);
      window.scrollBy(0, -(this.headerViewHeight));
    }
  }

  downloadBase64Image(base64image: string, fileName: string, fileType: string) {
    let blobData = this.convertImageBase64ToBlob(base64image, fileType);

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, (fileName + '.' + fileType));
    }
    else {
      let blob = new Blob([blobData], {type: ("image/" + fileType)});
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');

      link.href = url;
      link.download = (fileName + '.' + fileType);
      link.click();
    }
  }

  convertImageBase64ToBlob(base64image: string, imageType: string) {
    let decodedData = window.atob(base64image);
    let uInt8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: ('image/' + imageType)});
  }

  gotoSignIn() {
    window.open(this.urlAuthenServer, '_self');
    /*
    this.router.navigateByUrl('SignIn', {
      skipLocationChange: true
    });
    */
  }

  enlargeImage(image: string) {
    let modalRef: NgbModalRef = this.modalService.getModalImage(false, ModalImageComponent, image);
  }
}
