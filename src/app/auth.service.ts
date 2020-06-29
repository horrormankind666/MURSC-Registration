/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๖/๐๖/๒๕๖๓>
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

interface UserInfo {
  type?: string,
  ppid?: string,
  email?: string,
  familyName?: string,
  givenName?: string,
  uniqueName?: string,
  winaccountName?: string,
  personalID?: string,
  title?: string,
  firstName?: {
    th?: string,
    en?: string
  },
  middleName?: {
    th?: string,
    en?: string
  },
  lastName?: {
    th?: string,
    en?: string
  },
  fullName?: {
    th?: string,
    en?: string
  }
}

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

  public isAuthenticated: boolean = false;
  public getUserInfo: UserInfo = null;

  setUserInfo(data?: any) {
    let userInfo: UserInfo = null;

    if (data) {
      let payload: {}             = (data.payload ? data.payload : {});
      let personal: {}            = (data.personal ? data.personal : {});
      let type: string            = (personal['type'] ? personal['type'] : '');
      let ppid: string            = (payload['ppid'] ? payload['ppid'] : '');
      let email: string           = (payload['email'] ? payload['email'] : '');
      let familyName: string      = (payload['family_name'] ? payload['family_name'] : '');
      let givenName: string       = (payload['given_name'] ? payload['given_name'] : '');
      let uniqueName: string      = (payload['unique_name'] ? payload['unique_name'] : '');
      let winaccountName: string  = (payload['winaccountname'] ? payload['winaccountname'] : '');
      let personalID: string      = (personal['personalID'] ? personal['personalID'] : '');
      let title: string           = (personal['title'] ? personal['title'] : '');
      let firstNameTH: string     = (personal['firstNameTH'] ? personal['firstNameTH'] : '');
      let middleNameTH: string    = (personal['middleNameTH'] ? personal['middleNameTH'] : '');
      let lastNameTH: string      = (personal['lastNameTH'] ? personal['lastNameTH'] : '');
      let firstNameEN: string     = (personal['firstNameEN'] ? personal['firstNameEN'] : '');
      let middleNameEN: string    = (personal['middleNameEN'] ? personal['middleNameEN'] : '');
      let lastNameEN: string      = (personal['lastNameEN'] ? personal['lastNameEN'] : '');

      userInfo = {
        type: type,
        ppid: ppid,
        email: email,
        familyName: familyName,
        givenName: givenName,
        uniqueName: uniqueName,
        winaccountName: winaccountName,
        personalID: personalID,
        title: title,
        firstName: {
          th: (firstNameTH ? firstNameTH : firstNameEN),
          en: (firstNameEN ? firstNameEN : firstNameTH)
        },
        middleName: {
          th: (middleNameTH ? middleNameTH : middleNameEN),
          en: (middleNameEN ? middleNameEN : middleNameTH)
        },
        lastName: {
          th: (lastNameTH ? lastNameTH : lastNameEN),
          en: (lastNameEN ? lastNameEN : lastNameTH)
        },
      };

      userInfo.fullName = {
        th: (userInfo.firstName.th + (userInfo.middleName.th ? (' ' + userInfo.middleName.th) : '') + ' ' + userInfo.lastName.th),
        en: (userInfo.firstName.en + (userInfo.middleName.en ? (' ' + userInfo.middleName.en) : '') + ' ' + userInfo.lastName.en)
      }
    }

    this.getUserInfo = userInfo;
  }

  getIsAuthenticated(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.appService.getCookie(this.appService.cookieName);

      if (this.appService.authenResource.type && this.appService.authenResource.token) {
        let headers = new HttpHeaders()
          .set('Authorization', ('Bearer ' + this.appService.authenResource.token));

        this.http.get(this.appService.urlIsAuthenticated, { headers: headers }).subscribe((result: {}) => {
          let data = result;

          resolve(data);
        });
      }
      else {
        resolve(false);
      }
    });

    return promise;
  }

  getAuthenResource(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this.getUserInfo === null) {
        this.appService.getCookie(this.appService.cookieName);

        if (this.appService.authenResource.type && this.appService.authenResource.token) {
          let headers = new HttpHeaders()
            .set('Authorization', ('Bearer ' + this.appService.authenResource.token));

          this.http.get(this.appService.urlAuthenResource, { headers: headers }).subscribe((result: {}) => {
            let data = result['data'];

            this.isAuthenticated = (data !== null ? data[0].isAuthenticated : false);
            if (this.isAuthenticated)
              this.setUserInfo(data[1]);
            else
              this.setUserInfo

            resolve(this.getUserInfo);
          });
        }
        else {
          this.isAuthenticated = false;
          this.setUserInfo();

          resolve(this.getUserInfo);
        }
      }
      else {
        this.getIsAuthenticated().then((result: boolean) => {
          this.isAuthenticated = result;

          if (!this.isAuthenticated)
            this.setUserInfo();

          resolve(this.getUserInfo);
        })
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
