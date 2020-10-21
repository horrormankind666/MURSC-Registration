/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๗/๐๔/๒๕๖๓>
Modify date : <๒๐/๑๐/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from './app.service';
import {ModalService} from './modal/modal.service';
import {Schema, DataService} from './data.service';

import {ProjectDetailComponent} from './project/detail/project-detail.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private appService: AppService,
    private modalService: ModalService,
    private dataService: DataService
  ) {}

  data: any = {
    projectCategory$: null,
    transProject: {
      registrationNowOpen$: null,
      registrationComingSoon$: null
    }
  };

  ngOnInit() {
    this.data.projectCategory$ = this.route.snapshot.data.projectCategory$;
    this.data.transProject.registrationNowOpen$ = this.route.snapshot.data.transProject$.filter(project => project.registrationStatus.includes('Y'));
    this.data.transProject.registrationComingSoon$ = this.route.snapshot.data.transProject$.filter(project => project.registrationStatus.includes('W'));
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
