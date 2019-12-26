/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๕/๑๒/๒๕๖๒>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userInfo: {} = {
    email: '',
    familyName: '',
    givenName: '',
    uniqueName: '',
    winaccountName: ''
  };

  public urlAuthenResource: string = 'http://localhost:5001/API/AuthenResource/UserInfo';
  public urlAuthenServer: string = 'http://localhost:4279';
  public isAuthenticated: boolean = false;  
  public getUserInfo: {} = this.userInfo;

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  signout() {
    this.isAuthenticated = false
  }
  
  setUserInfo = function (data) {
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
  };
  
  getAuthenResource(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.appService.getCookie(this.appService.cookieName);

      if (this.appService.authenResource.type && this.appService.authenResource.token) {
        if (!this.isAuthenticated) {
          let headers = new HttpHeaders()
            .set('Authorization', ('Bearer ' + this.appService.authenResource.token));

          this.http.get(this.urlAuthenResource, { headers: headers }).subscribe((res: {}) => {
            let data = res['data'];

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