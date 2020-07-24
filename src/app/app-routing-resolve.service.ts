/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๒>
Modify date : <๒๔/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {AppService} from './app.service'
import {Schema, DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategory implements Resolve<Schema.ProjectCategory[]> {
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
export class TransProject implements Resolve<Schema.TransProject> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.TransProject> | Promise<Schema.TransProject> | Schema.TransProject {
    return this.dataService.transProject.get(route.params['cuid']).then((result: Schema.TransProject) => {
      return result;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class TransRegistered implements Resolve<Schema.TransRegistered> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.TransRegistered> | Promise<Schema.TransRegistered> | Schema.TransRegistered {
    return this.dataService.transRegistered.get(route.params['cuid']).then((result: Schema.TransRegistered) => {
      return result;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenADFSPage implements Resolve<boolean> {
  constructor(
    private appService: AppService
  ) {}

  resolve(){
    window.open(this.appService.urlAuthenServer, '_self');

    return false;
  }
}
