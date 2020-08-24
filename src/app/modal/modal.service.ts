/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๒๑/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {NgbModalConfig, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';

export interface BtnMsg {
  ok?: string,
  cancel?: string,
  close?: string
};

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private modalConfig: NgbModalConfig,
    private modal: NgbModal
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
  }

  private open(content: any, windowClass: string): NgbModalRef {
    let modalRef = this.modal.open(content, {
      windowClass: windowClass
    });

    this.setModalPosition();
    this.setModalSize();

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

  setModalPosition() {
    setTimeout(() => {
      $('.modal').attr('style', ('top:' + $('header').height() + 'px !important'));
    }, 0);
  }

  setModalSize() {
    setTimeout(() => {
      $('.modal').height($(window).height() - $('header').height());
      $('.image-dialog .modal-dialog .modal-content .modal-body .img').height(($('.image-dialog').height() - $('header').height()) + 24);
    }, 0);
  }

  private getModal(checkHasOpenModal: boolean, content: any, windowClass: string, message?: string, description?: string, btnMsg?: BtnMsg): NgbModalRef {
    let modalRef: NgbModalRef;

    if (!checkHasOpenModal || !this.modal.hasOpenModals()) {
      modalRef = this.open(content, windowClass);
      if (message) modalRef.componentInstance.message = message;
      if (description) modalRef.componentInstance.description = description;
      if (btnMsg) modalRef.componentInstance.btnMsg = btnMsg;
    }

    return modalRef;
  }

  getModalInfo(checkHasOpenModal: boolean, content: any, message: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'info-dialog', message);

    return modalRef;
  }

  getModalSuccess(checkHasOpenModal: boolean, content: any, message: string, btnMsg?: BtnMsg): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'success-dialog', message, '', btnMsg);

    return modalRef;
  }

  getModalError(checkHasOpenModal: boolean, content: any, message: string, btnMsg?: BtnMsg): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'error-dialog', message, '', btnMsg);

    return modalRef;
  }

  getModalConfirm(checkHasOpenModal: boolean, content: any, message: string, description?: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'confirm-dialog', message, description);

    return modalRef;
  }

  getModalForm(checkHasOpenModal: boolean, content: any, message?: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'form-dialog', message);

    return modalRef;
  }

  getModalImage(checkHasOpenModal: boolean, content: any, image: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, content, 'image-dialog', image);

    return modalRef;
  }
}
