/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๗/๐๓/๒๕๖๓>
Modify date : <๒๐/๐๔/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, Input, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { Schema, DataService } from '../../data.service';
import { ScheduleService } from '../../schedule/schedule.service';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
    @Input() data$: Schema.TransProject;

    constructor(
        private appService: AppService,
        private dataService: DataService,
        private scheduleService: ScheduleService
    ) { }

    data: any = {
        transProject$: null
    };

    projectAbout = {
        isCollapsed: false
    };

    schedule: any = {
        isCollapsed: false
    };

    ngOnInit() {
        this.data.transProject$ = this.data$;

        setTimeout(() => {
            this.appService.isLoading.show = false;
            this.appService.isLoading.modal = false;
        }, 0);
    }
}
