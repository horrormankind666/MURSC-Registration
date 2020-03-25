/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๐/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';

import {AppService} from './app.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private appService: AppService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    return this.authService.getAuthenResource().then((result: any) => {
      if (this.authService.isAuthenticated) {
        //if (url === '/SignIn')
        //  this.router.navigate(['Home']);
      }
      else {
        if (this.cookieService.check(this.appService.cookieName))
          this.cookieService.delete(this.appService.cookieName);

        //this.router.navigate(['Home']);
        //if (url !== '/SignIn')
          //this.router.navigate(['SignIn']);
      }

      return true;
    });
  }
}
