/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๒/๒๕๖๓>
Modify date : <๐๓/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, ContentChild} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../app.service';
import {DataService, ProjectSchema} from '../data.service';
import {ProjectService} from './project.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [
    ProjectService,
    DecimalPipe
  ]
})
export class ProjectComponent implements OnInit  {
  @ContentChild('ProjectView', {static: false}) ProjectView;

  constructor(
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private dataService: DataService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService.operate.table.filter.setValue();
  }
}
