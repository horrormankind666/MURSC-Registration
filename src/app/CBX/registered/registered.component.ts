/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๓>
Modify date : <๒๕/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../../app.service';
import {Schema, DataService} from '../../data.service';
import {ModalService} from '../../modal/modal.service';

import {ModalErrorComponent} from '../../modal/modal.component';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private dataService: DataService,
    private modalService: ModalService
  ) { }

  private data$: Schema.CBX.Project;

  ngOnInit() {
    this.data$ = this.route.snapshot.data.project$;
  }

  ngAfterViewInit() {
    if (!this.data$)
      setTimeout(() => {
        this.modalService.getModalError(false, ModalErrorComponent, 'project.error.notFound');
      }, 1000);
  }
}
