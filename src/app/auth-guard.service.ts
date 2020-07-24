/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๔/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';

import {AppService} from './app.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private appService: AppService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    this.cookieService.set('MURSC.Url', url);

    this.appService.rootPath = url.split('/')[1];
    this.appService.hasHearderSubtitle = route.data.hasHearderSubtitle;

    return this.authService.getAuthenResource().then((result: any) => {
      if (!this.authService.isAuthenticated) {
        if (this.cookieService.check(this.appService.cookieName))
          this.cookieService.delete(this.appService.cookieName);

        if (route.data.signin)
          this.appService.gotoSignIn();
      }

      return true;
    });
  }
}
