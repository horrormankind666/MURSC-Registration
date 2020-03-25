/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๒/๒๕๖๓>
Modify date : <๒๐/๐๓/๒๕๖๓>
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

import {ProjectDetailComponent} from '../project-detail/project-detail.component'

class ProjectDetail {
  private _appService: AppService;
  private _dataService: DataService;

  constructor(
    appService: AppService,
    dataService: DataService
  ) {
    this._appService = appService;
    this._dataService = dataService;
  }

  modalOpen(data: ProjectSchema) {
    if (!this._appService.modal.hasOpenModal) {
      this._appService.isLoading = true;

      let query = [
        "",
        ("transProjectID=" + data.transProjectID)
      ].join("&");

      this._dataService.project.get(query).then((result: ProjectSchema) => {
        this._appService.isLoading = false;

        let modalRef = this._appService.modal.open(ProjectDetailComponent, 'form-dialog');

        modalRef.componentInstance.data = result;

        this._appService.modal.close(modalRef);
      });
    }
  }
}

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
  ) {
  }

  private projectDetail = new ProjectDetail(
    this.appService,
    this.dataService
  );

  ngOnInit() {
    this.projectService.operate.table.filter.setValue();
  }
}
