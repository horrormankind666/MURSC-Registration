/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๐/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';

import {AppService} from './app.service';

class Signout {
  private _router: Router;
  private _cookieService: CookieService;
  private _appService: AppService;
  private _authService: AuthService;

  constructor(
    router: Router,
    cookieService: CookieService,
    appService: AppService,
    authService: AuthService
  ) {
    this._router = router;
    this._cookieService = cookieService;
    this._appService = appService;
    this._authService = authService;
  }

  modalOpen(content: any) {
    if (!this._appService.modal.hasOpenModal) {
      this._appService.modal.hasOpenModal = true;

      let modalRef = this._appService.modal.open(content, 'confirm-dialog');

      this._appService.modal.close(modalRef).then((result: string) => {
        if (result === 'close') {
          this._authService.isAuthenticated = false;
          this._cookieService.delete(this._appService.cookieName);

          this._router.navigate(['SignIn']);
        }
      })
    }
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
  ) {}

  private userInfo: {} = {
    email: '',
    familyName: '',
    givenName: '',
    uniqueName: '',
    winaccountName: ''
  };

  public signout = new Signout(
    this.router,
    this.cookieService,
    this.appService,
    this
  );

  public isAuthenticated: boolean = false;
  public getUserInfo: {} = this.userInfo;

  setUserInfo(data: any) {
      let email: string           = (data.email ? data.email : '');
      let familyName: string      = (data.family_name ? data.family_name : '');
      let givenName: string       = (data.given_name ? data.given_name : '');
      let uniqueName: string      = (data.unique_name ? data.unique_name : '');
      let winaccountName: string  = (data.winaccountname ? data.winaccountname : '');

      this.userInfo = {
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
        if (!this.isAuthenticated) {
          let headers = new HttpHeaders()
            .set('Authorization', ('Bearer ' + this.appService.authenResource.token));

          this.http.get(this.appService.urlAuthenResource, { headers: headers }).subscribe((result: {}) => {
            let data = result['data'];

            this.isAuthenticated = (data !== null ? data[0].isAuthenticated : false);
            this.setUserInfo(this.isAuthenticated ? data[1].payload : {});

            resolve(this.getUserInfo);
          });
        }
        else
          resolve(this.getUserInfo)
      }
      else {
        this.isAuthenticated = false;
        this.setUserInfo({});

        resolve(this.getUserInfo);
      }
    });

    return promise;
  }
}
