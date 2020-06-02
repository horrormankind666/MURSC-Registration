/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๖/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';

import {AppService} from './app.service';
import {ModalService} from './modal/modal.service';

import {ModalConfirmComponent} from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private appService: AppService,
    private modalService: ModalService
  ) {}

  private userInfo: {} = {
    ppid: '',
    email: '',
    familyName: '',
    givenName: '',
    uniqueName: '',
    winaccountName: ''
  };

  public isAuthenticated: boolean = false;
  public getUserInfo: {} = this.userInfo;

  setUserInfo(data: any) {
      let ppid: string            = (data.ppid ? data.ppid : '');
      let email: string           = (data.email ? data.email : '');
      let familyName: string      = (data.family_name ? data.family_name : '');
      let givenName: string       = (data.given_name ? data.given_name : '');
      let uniqueName: string      = (data.unique_name ? data.unique_name : '');
      let winaccountName: string  = (data.winaccountname ? data.winaccountname : '');

      this.userInfo = {
        ppid: ppid,
        email: email,
        familyName: familyName,
        givenName: givenName,
        uniqueName: uniqueName,
        winaccountName: winaccountName
      };

      this.getUserInfo = this.userInfo;
  }

  getAuthenResource(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.appService.getCookie(this.appService.cookieName);

      if (this.appService.authenResource.type && this.appService.authenResource.token) {
        let headers = new HttpHeaders()
          .set('Authorization', ('Bearer ' + this.appService.authenResource.token));

        this.http.get(this.appService.urlAuthenResource, { headers: headers }).subscribe((result: {}) => {
          let data = result['data'];
          
          this.isAuthenticated = (data !== null ? data[0].isAuthenticated : false);
          this.setUserInfo(this.isAuthenticated ? data[1].payload : {});

          resolve(this.getUserInfo);
        });
      }
      else {
        this.isAuthenticated = false;
        this.setUserInfo({});

        resolve(this.getUserInfo);
      }
    });

    return promise;
  }

  signout() {
    let modalRef = this.modalService.getModalConfirm(false, ModalConfirmComponent, 'signout.confirm');

    this.modalService.close(modalRef).then((result: string) => {
      if (result === 'ok') {
        this.isAuthenticated = false;
        this.cookieService.delete(this.appService.cookieName);

        this.router.navigate(['SignIn']);
      }
    });
  }
}
