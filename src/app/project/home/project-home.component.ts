/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๒/๒๕๖๓>
Modify date : <๐๔/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, ContentChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../../app.service';
import {ModalService} from '../../modal/modal.service';
import {Schema, DataService} from '../../data.service';
import {ProjectService} from '../project.service';

import {ProjectDetailComponent} from '../detail/project-detail.component'

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
  providers: [
    ProjectService,
    DecimalPipe
  ]
})

export class ProjectHomeComponent implements OnInit {
  @ContentChild('ProjectHomeView', {static: false}) ProjectHomeView;

  constructor(
    private route: ActivatedRoute,
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

  getTransProject(data: Schema.TransProject) {
    if (!this.modal.hasOpenModals()) {
      this.appService.isLoading.show = true;
      this.appService.isLoading.modal = true;

      this.dataService.transProject.get(data.project.category.initial, this.appService.getCUID([data.ID])).then((result: Schema.TransProject) => {
        this.appService.isLoading.show = false;
        this.appService.isLoading.modal = false;

        let modalRef: NgbModalRef = this.modalService.getModalForm(true, ProjectDetailComponent);
        modalRef.componentInstance.data$ = result;

        this.modalService.close(modalRef).then((result: string) => {
        });
      });
    }
  }
}
