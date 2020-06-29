/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๗/๐๓/๒๕๖๓>
Modify date : <๒๙/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../../app.service';
import {Schema, DataService} from '../../data.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  @Input() data$: Schema.TransProject;

  constructor(
    private activeModal: NgbActiveModal,
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private dataService: DataService
  ) {}

  data: any = {
    transProject$: null
  };

  projectAbout = {
    isCollapsed: false
  };
  
  ngOnInit() {
    this.data.transProject$ = this.data$;
  }
}
