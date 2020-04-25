/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๒>
Modify date : <๒๕/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {Schema, DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailResolver implements Resolve<Schema.CBX.Project> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Schema.CBX.Project> | Promise<Schema.CBX.Project> | Schema.CBX.Project {
    return this.dataService.cbx.project.get(route.params['transProjectID']).then((result: Schema.CBX.Project) => {
      return result;
    });
  }
}
