/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๒/๒๕๖๓>
Modify date : <๐๔/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit, ContentChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AppService } from '../../app.service';
import { DataService } from '../../data.service';
import { ProjectService } from '../project.service';

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
    @ContentChild('ProjectHomeView', { static: false }) ProjectHomeView;

    constructor(
        private route: ActivatedRoute,
        private modal: NgbModal,
        private deviceService: DeviceDetectorService,
        private appService: AppService,
        private dataService: DataService,
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.projectService.operate.table.filter.setValue();
    }
}
