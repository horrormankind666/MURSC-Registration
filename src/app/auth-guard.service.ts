/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๕/๑๑/๒๕๖๒>
Modify date : <๒๔/๑๒/๒๕๖๒>
Description : <>
=============================================
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {  
  constructor(
    private cookieService: CookieService,
    private appService: AppService,
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    return this.authService.getAuthenResource().then((res: any) => {
      if (this.authService.isAuthenticated) {      
        if (url === '/SignIn')
          this.router.navigate(['Home']);
      }      
      else {
        this.cookieService.delete(this.appService.cookieName);

        if (url !== '/SignIn')
          this.router.navigate(['SignIn']);
      }

      return true;
    });
  }
}