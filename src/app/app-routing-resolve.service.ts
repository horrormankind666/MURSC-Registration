/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๒>
Modify date : <๑๕/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {Schema, DataService} from './data.service';

export namespace CBX {
  @Injectable({
    providedIn: 'root'
  })
  export class TransProject implements Resolve<Schema.CBX.TransProject> {
    constructor(
      private dataService: DataService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Schema.CBX.TransProject> | Promise<Schema.CBX.TransProject> | Schema.CBX.TransProject {
      return this.dataService.cbx.transProject.get(route.params['transProjectID']).then((result: Schema.CBX.TransProject) => {
        return result;
      });
    }
  }
}
