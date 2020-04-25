/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๒/๒๕๖๓>
Modify date : <๒๕/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, ContentChild} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../../app.service';
import {ModalService} from '../../modal/modal.service';
import {Schema, DataService} from '../../data.service';
import {ProjectService} from './project.service';

import {ProjectDetailComponent} from '../project-detail/project-detail.component'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [
    ProjectService,
    DecimalPipe
  ]
})

export class ProjectComponent implements OnInit {
  @ContentChild('ProjectView', {static: false}) ProjectView;

  constructor(
    private modal: NgbModal,
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private modalService: ModalService,
    private dataService: DataService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService.operate.table.filter.setValue();
  }

  getProject(data: Schema.CBX.Project) {
    if (!this.modal.hasOpenModals()) {
      this.appService.isLoading = true;

      this.dataService.cbx.project.get(data.transProjectID).then((result: Schema.CBX.Project) => {
        this.appService.isLoading = false;

        let modalRef: NgbModalRef = this.modalService.getModalForm(true, ProjectDetailComponent);
        modalRef.componentInstance.data$ = result;

        this.modalService.close(modalRef).then((result: string) => {
        });
      });
    }
  }
}