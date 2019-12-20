/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๐/๑๒/๒๕๖๒>
Description : <service สำหรับใช้ในการล็อกอิน และล็อกเอาท์>
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
  protected urlAuthenResource: string = 'http://localhost:5001/API/AuthenResource/UserInfo';
  public isAuthenticated: boolean = true;
  public userInfo: any = {};

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  signout() {
    this.isAuthenticated = false
  }
  /*
  self.setUserInfo = function (userData) {
      var personId = "";
      var username = "";
      var fullnameTH = "";
      var fullnameEN = "";
      var facultyId = "";
      var programId = "";
      var depId = "";
      var permission = "";
      var systemGroup = "";

      if (userData)
      {
          personId    = (userData.PersonId ? userData.PersonId : "");
          username    = (userData.Username ? userData.Username : "");
          fullnameTH  = (userData.FullnameTH ? userData.FullnameTH : "");
          fullnameEN  = (userData.FullnameEN ? userData.FullnameEN : "");
          facultyId   = (userData.FacultyId ? userData.FacultyId : "");
          programId   = (userData.ProgramId ? userData.ProgramId : "");
          depId       = (userData.DepId ? userData.DepId : "");
          permission  = (userData.Userlevel ? userData.Userlevel : "");
          systemGroup = (userData.SystemGroup ? userData.SystemGroup : "");
      }

      self.userInfo = {
          personId: personId,
          username: username,
          fullname: {
              TH: fullnameTH,
              EN: fullnameEN
          },
          facultyId: facultyId,
          programId: programId,
          depId: depId,
          permission: permission,
          systemGroup: systemGroup
      };

      self.getUserInfo = self.userInfo;
  };
  */
  getAuthenResource(): Promise<any> {    
    let promise = new Promise((resolve, reject) => {
      this.appService.getCookie(this.appService.cookieName);

      if (this.appService.authenResource.type && this.appService.authenResource.token) {
        let headers = new HttpHeaders()
          .set('Authorization', ('Bearer ' + this.appService.authenResource.token));

        this.http.get(this.urlAuthenResource, { headers: headers }).subscribe((res: {}) => {          
          resolve(res['data'][0]);
        });
      }
      else
        resolve(null);
    });

    return promise;
  }
}