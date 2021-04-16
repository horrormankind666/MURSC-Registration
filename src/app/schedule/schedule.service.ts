/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๑๑/๒๕๖๓>
Modify date : <๑๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '../app.service';
import { ModalService } from '../modal/modal.service';
import { Schema, DataService } from '../data.service';

import { ScheduleComponent } from './schedule.component'

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    constructor(
        private appService: AppService,
        private modalService: ModalService,
        private dataService: DataService
    ) { }

    getModalTransSchedule(data: Schema.TransProject) {
        this.appService.isLoading.show = true;
        this.appService.isLoading.modal = true;

        let modalRef: NgbModalRef;

        this.dataService.transSchedule.get(data.project.category.initial, this.appService.getCUID([data.ID])).then((result: Schema.TransSchedule[]) => {
            this.appService.isLoading.show = false;
            this.appService.isLoading.modal = false;

            if (result && result.length > 0) {
                modalRef = this.modalService.getModalFormless(false);
                modalRef.componentInstance.component = ScheduleComponent;
                modalRef.componentInstance.title = 'schedule.label';
                modalRef.componentInstance.data$ = result;

                this.modalService.close(modalRef).then((result: string) => {
                });
            }
            else
                modalRef = this.modalService.getModalError(false, 'schedule.error.notFound');
        });
    }
}
