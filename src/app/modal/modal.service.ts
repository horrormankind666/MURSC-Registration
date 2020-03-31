/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๓๑/๐๓/๒๕๖๓>
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
    private modalService: NgbModal,
    private appService: AppService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }

  public hasOpenModal: boolean = false;

  private open(content: any, windowClass: string): NgbModalRef {
    let modalRef = this.modalService.open(content, {
      windowClass: windowClass
    });

    this.hasOpenModal = true;
    this.appService.setModalHeight();

    return modalRef;
  }

  close(modalRef: NgbModalRef): Promise<string> {
    if (modalRef) {
      return modalRef.result.then((result: string) => {
        this.hasOpenModal = false;

        return result;
      }, (reason) => {
        this.hasOpenModal = false;

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

    if (!checkHasOpenModal || !this.hasOpenModal) {
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
