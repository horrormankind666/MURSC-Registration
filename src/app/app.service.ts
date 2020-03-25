/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๐/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';

import {NgbModalConfig, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

import {TranslateService} from '@ngx-translate/core';

import {CookieService} from 'ngx-cookie-service';

import * as $ from 'jquery';

class Modal {
  public hasOpenModal: boolean = false;

  private _appService: AppService;
  private _modalConfig: NgbModalConfig;
  private _modalService: NgbModal;

  constructor(
    private appService: AppService,
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this._appService = appService;
    this._modalConfig = modalConfig;
    this._modalService = modalService;

    this._modalConfig.backdrop = 'static';
    this._modalConfig.keyboard = false;
  }

  open(content: any, windowClass: string): NgbModalRef {
    let modalRef = this._modalService.open(content, {
      windowClass: windowClass
    });

    this._appService.modal.hasOpenModal = true;
    this._appService.setModalHeight();

    return modalRef;
  }

  close(modalRef: NgbModalRef): Promise<string> {
    return modalRef.result.then((result: string) => {
      this._appService.modal.hasOpenModal = false;

      return result;
    }, (reason) => {
      this._appService.modal.hasOpenModal = false;

      return reason;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService  {
  constructor(
    private http: HttpClient,
    private titleService: Title,
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private tooltipConfig: NgbTooltipConfig,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) {
    tooltipConfig.placement = 'top';
    tooltipConfig.container = 'body';
    tooltipConfig.tooltipClass = 'tooltip-custom';
  }

  public modal = new Modal(
    this,
    this.modalConfig,
    this.modalService
  )
  public isLoading: boolean = true;
  public lang: string = 'th';
  public cookieName: string = 'MURSC.Cookies';
  public authenResource: any = {
    type: '',
    token: ''
  }
  public urlAuthenResource: string = 'http://localhost:5001/API/AuthenResource/UserInfo';
  public urlAuthenServer: string = 'http://localhost:4279';
  public urlAPI: string = 'http://localhost:3000/API';
  public dateTimeOnURL: string = formatDate(new Date(), 'dd/MM/yyyyHH:mm:ss', 'en')

  setDefaultLang(lang?: string) {
    this.lang = (!lang ? this.lang : lang);

    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);

    this.translateService.get('systemName').subscribe((result: string) => {
      this.titleService.setTitle(result);
    });
  }

  setModalHeight() {
    setTimeout(() => {
      $('.modal').height($(window).height() - 80);
    }, 0)
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
    routePrefix = (routePrefix === undefined ? "" : routePrefix);
    action = (action === undefined ? "" : action);
    query = (query === undefined || query.length === 0 ? "" : query);

    let url = (this.urlAPI + '/' + routePrefix + "/");
    let route = "";

    switch (action)
    {
        case "getlist": {
            route = "GetList";
            break;
        }
        case "get": {
            route = "Get";
            break;
        }
    }

    url += (route + "?ver=" + this.dateTimeOnURL + query);


    let promise = new Promise((resolve, reject) => {
      this.http.get(url).subscribe((result: {}) => {
        let data = result['data'];

        resolve(data !== undefined && data !== null ? data : []);
      });
    });

    return promise;
  }
}
