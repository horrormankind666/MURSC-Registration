/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๓/๐๔/๒๕๖๔>
Modify date : <๒๓/๐๔/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '../app.service';
import { ModalService } from '../modal/modal.service';

import { PhoneNumberVerifyComponent } from './phonenumber-verify.component';

@Injectable({
    providedIn: 'root'
})
export class PhoneNumberService {
    constructor(
        private modal: NgbModal,
        private appService: AppService,
        private modalService: ModalService
    ) { }

    getModalPhoneNumberVerify(phoneNumber: string): NgbModalRef  {
        let modalRef: NgbModalRef = null;

        if (!this.modal.hasOpenModals()) {
            this.appService.isLoading.show = true;
            this.appService.isLoading.modal = true;

            modalRef = this.modalService.getModalForm(true, 'phonenumber-verify-dialog');
            modalRef.componentInstance.component = PhoneNumberVerifyComponent;
            modalRef.componentInstance.title = 'phoneNumber.verify.label';
            modalRef.componentInstance.data$ = {
                phoneNumber: phoneNumber
            };
        }

        return modalRef;
    }
}
