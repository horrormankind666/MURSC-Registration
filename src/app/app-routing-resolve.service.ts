/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๒>
Modify date : <๐๑/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {Observable} from 'rxjs';

import {DataService, ProjectSchema} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailResolver implements Resolve<ProjectSchema> {
  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectSchema> | Promise<ProjectSchema> | ProjectSchema {
    return this.dataService.project.get(route.params['transProjectID']).then((result: ProjectSchema) => {
      return result;
    });
  }
}
