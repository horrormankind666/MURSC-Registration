/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๐๑/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {NgbModalConfig, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private modalConfig: NgbModalConfig,
    private modal: NgbModal,
    private appService: AppService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }

  private open(content: any, windowClass: string): NgbModalRef {
    let modalRef = this.modal.open(content, {
      windowClass: windowClass
    });

    this.appService.setModalHeight();

    return modalRef;
  }

  close(modalRef: NgbModalRef): Promise<string> {
    if (modalRef) {
      return modalRef.result.then((result: string) => {
        return result;
      }, (reason) => {
        return reason;
      });
    }
    else
    {
      return new Promise((resolve) => {
        resolve('');
      });
    }
  }

  private getModal(checkHasOpenModal: boolean, content: any, windowClass: string, message?: string): NgbModalRef {
    let modalRef: NgbModalRef;

    if (!checkHasOpenModal || !this.modal.hasOpenModals()) {
      modalRef = this.open(content, windowClass);
      if (message) modalRef.componentInstance.message = message;
    }

    return modalRef;
  }

  getModalError(checkHasOpenModal: boolean, content: any, message: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'error-dialog', message);

    return modalRef;
  }

  getModalConfirm(checkHasOpenModal: boolean, content: any, message: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'confirm-dialog', message);

    return modalRef;
  }

  getModalForm(checkHasOpenModal: boolean, content: any, message?: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'form-dialog', message);

    return modalRef;
  }
}
