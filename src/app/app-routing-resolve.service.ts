/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๒>
Modify date : <๒๐/๑๐/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {TranslateService} from '@ngx-translate/core';

import {Observable} from 'rxjs';

import {AppService} from './app.service'
import {Schema, DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenADFSPageResolve implements Resolve<boolean> {
  constructor(
    private appService: AppService
  ) {}

  resolve(){
    this.appService.gotoSignIn();

    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HeaderSubtitleProjectCategoryResolve implements Resolve<any> {
  constructor(
    private appService: AppService,
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): any {
    return this.dataService.projectCategory.get(route.params['projectCategory']).then((result: Schema.ProjectCategory) => {
      this.appService.headerSubtitle = (result ? result.name : null);

      return false;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class HeaderSubtitleTransactionRegisteredResolve implements Resolve<any> {
  constructor(
    private translateService: TranslateService,
    private appService: AppService
  ) {}

  resolve(route: ActivatedRouteSnapshot): any {
    this.appService.headerSubtitle = {
      th: '',
      en: ''
    };

    this.translateService.getTranslation('en').subscribe((result: {}) => {
      this.appService.headerSubtitle['en'] = result['registered']['info'];
    });
    this.translateService.getTranslation('th').subscribe((result: {}) => {
      this.appService.headerSubtitle['th'] = result['registered']['info'];
    });

    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetListProjectCategoryResolve implements Resolve<Schema.ProjectCategory[]> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.ProjectCategory[]> | Promise<Schema.ProjectCategory[]> | Schema.ProjectCategory[] {
    return this.dataService.projectCategory.getList().then((result: Schema.ProjectCategory[]) => {
      return result;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetListTransProjectResolve implements Resolve<Schema.TransProject[]> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.TransProject[]> | Promise<Schema.TransProject[]> | Schema.TransProject[] {
    return this.dataService.transProject.getList('').then((result: Schema.TransProject[]) => {
      return result;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetTransProjectResolve implements Resolve<Schema.TransProject> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.TransProject> | Promise<Schema.TransProject> | Schema.TransProject {
    return this.dataService.transProject.get(route.params['projectCategory'], route.params['cuid']).then((result: Schema.TransProject) => {
      return result;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetTransRegisteredResolve implements Resolve<Schema.TransRegistered> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.TransRegistered> | Promise<Schema.TransRegistered> | Schema.TransRegistered {
    return this.dataService.transRegistered.get(route.params['cuid']).then((result: Schema.TransRegistered) => {
      return result;
    });
  }
}
