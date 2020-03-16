/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๒/๒๕๖๓>
Modify date : <๑๖/๐๓/๒๕๖๓>
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

class ProjectDetail {
  public data: ProjectSchema;

  private _appService: AppService;
  private _dataService: DataService;

  constructor(
    appService: AppService,
    dataService: DataService
  ) {
    this._appService = appService;
    this._dataService = dataService;
  }

  modalOpen(content: any, data: ProjectSchema) {
    if (!this._appService.modal.hasOpenModal) {
      this._appService.modal.hasOpenModal = true;
      this._appService.isLoading = true;

      let query = [
        "",
        ("transProjectID=" + data.transProjectID)
      ].join("&");

      this._dataService.project.get(query).then((res: ProjectSchema) => {
        this._appService.isLoading = false;
        this.data = res;

        let modalRef = this._appService.modal.openref(content, 'form-dialog');

        modalRef.result.then((result: string) => {
          this._appService.modal.hasOpenModal = false;
        });

        this.init();
      });
    }
  }

  private init() {
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
