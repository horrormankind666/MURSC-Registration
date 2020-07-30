/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๙/๐๗/๒๕๖๓>
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
    let urlArray: string[] = url.split('/');

    this.cookieService.set('MURSC.Url', url);
    this.appService.rootPath = (urlArray[1] + '/' + urlArray[2]);
    if (!route.data.hasHearderSubtitle) this.appService.headerSubtitle = null;

    return this.authService.getAuthenResource().then((result: any) => {
      if (!this.authService.isAuthenticated) {
        if (this.cookieService.check(this.appService.cookieName))
          this.cookieService.delete(this.appService.cookieName);

        if (route.data.signin) {
          this.appService.gotoSignIn();

          return false;
        }
      }

      return true;
    });
  }
}
