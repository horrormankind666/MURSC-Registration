/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๑๗/๑๑/๒๕๖๓>
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

interface UserInfo {
  type?: string,
  ppid?: string,
  email?: string,
  givenName?: string,
  familyName?: string,
  uniqueName?: string,
  winaccountName?: string,
  personalID?: string,
  titlePrefix?: {
    th?: string,
    en?: string
  },
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
  },
  facultyName?: {
    th?: string,
    en?: string
  },
  programName?: {
    th?: string,
    en?: string
  },
  address?: string,
  subdistrict?: string,
  district?: string,
  province?: string,
  country?: string,
  zipCode?: string,
  phoneNumber?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private appService: AppService,
    private modalService: ModalService
  ) {}

  public isAuthenticated: boolean = false;
  public getUserInfo: UserInfo = null;

  private decodeURI(encode: string): string {
    return decodeURIComponent(escape(atob(encode.split('').reverse().join('')))).split('').reverse().join('');
  }

  setUserInfo(data?: any) {
    let userInfo: UserInfo = null;

    if (data) {
      let payload: {}             = (data.payload ? data.payload : {});
      let personal: {}            = (data.personal ? data.personal : {});
      let type: string            = (personal['type'] ? personal['type'] : '');
      let ppid: string            = (payload['ppid'] ? this.decodeURI(payload['ppid']) : '');
      let email: string           = (payload['email'] ? this.decodeURI(payload['email']) : '');
      let givenName: string       = (payload['given_name'] ? this.decodeURI(payload['given_name']) : '');
      let familyName: string      = (payload['family_name'] ? this.decodeURI(payload['family_name']) : '');
      let uniqueName: string      = (payload['unique_name'] ? this.decodeURI(payload['unique_name']) : '');
      let winaccountName: string  = (payload['winaccountname'] ? this.decodeURI(payload['winaccountname']) : '');
      let personalID: string      = (personal['personalID'] ? this.decodeURI(personal['personalID']) : '');
      let titlePrefixTH: string   = (personal['titleTH'] ? this.decodeURI(personal['titleTH']) : '');
      let titlePrefixEN: string   = (personal['titleEN'] ? this.decodeURI(personal['titleEN']) : '');
      let firstNameTH: string     = (personal['firstNameTH'] ? this.decodeURI(personal['firstNameTH']) : '');
      let middleNameTH: string    = (personal['middleNameTH'] ? this.decodeURI(personal['middleNameTH']) : '');
      let lastNameTH: string      = (personal['lastNameTH'] ? this.decodeURI(personal['lastNameTH']) : '');
      let firstNameEN: string     = (personal['firstNameEN'] ? this.decodeURI(personal['firstNameEN']) : '');
      let middleNameEN: string    = (personal['middleNameEN'] ? this.decodeURI(personal['middleNameEN']) : '');
      let lastNameEN: string      = (personal['lastNameEN'] ? this.decodeURI(personal['lastNameEN']) : '');
      let fullNameTH: string      = (personal['fullNameTH'] ? this.decodeURI(personal['fullNameTH']) : '');
      let fullNameEN: string      = (personal['fullNameEN'] ? this.decodeURI(personal['fullNameEN']) : '');
      let facultyNameTH: string   = (personal['facultyNameTH'] ? this.decodeURI(personal['facultyNameTH']) : '');
      let facultyNameEN: string   = (personal['facultyNameEN'] ? this.decodeURI(personal['facultyNameEN']) : '');
      let programNameTH: string   = (personal['programNameTH'] ? this.decodeURI(personal['programNameTH']) : '');
      let programNameEN: string   = (personal['programNameEN'] ? this.decodeURI(personal['programNameEN']) : '');
      let address: string         = (personal['address'] ? this.decodeURI(personal['address']) : '');
      let subdistrict: string     = (personal['subdistrict'] ? this.decodeURI(personal['subdistrict']) : '');
      let district: string        = (personal['district'] ? this.decodeURI(personal['district']) : '');
      let province: string        = (personal['province'] ? this.decodeURI(personal['province']) : '');
      let country: string         = (personal['country'] ? this.decodeURI(personal['country']) : '');
      let zipCode: string         = (personal['zipCode'] ? this.decodeURI(personal['zipCode']) : '');
      let phoneNumber: string     = (personal['phoneNumber'] ? this.decodeURI(personal['phoneNumber']) : '');

      userInfo = {
        type: type,
        ppid: ppid,
        email: email,
        givenName: givenName,
        familyName: familyName,
        uniqueName: uniqueName,
        winaccountName: winaccountName,
        personalID: personalID,
        titlePrefix: {
          th: titlePrefixTH,
          en: titlePrefixEN
        },
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
        facultyName: {
          th: facultyNameTH,
          en: facultyNameEN
        },
        programName: {
          th: programNameTH,
          en: programNameEN
        },
        address: address,
        subdistrict: subdistrict,
        district: district,
        province: province,
        country: country,
        zipCode: zipCode,
        phoneNumber: phoneNumber
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
    let modalRef = this.modalService.getModalConfirm(false, 'signout.confirm');

    this.modalService.close(modalRef).then((result: string) => {
      if (result === 'ok') {
        this.isAuthenticated = false;
        this.cookieService.delete(this.appService.cookieName, '/');

        if (this.cookieService.check(this.appService.cookieName))
          document.cookie = (this.appService.cookieName + '=; Max-Age=-99999999;');

        location.href = this.appService.urlSignOut;
      }
    });
  }
}
