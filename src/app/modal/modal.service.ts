/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๑๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {NgbModalConfig, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {ModalInfoComponent, ModalSuccessComponent, ModalErrorComponent, ModalConfirmComponent, ModalFormComponent, ModalFormlessComponent, ModalImageComponent} from '../modal/modal.component';

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
    windowClass = ($('.navbar-header-title').is(':visible') ? (windowClass + ' has-navbar-header-title') : windowClass)

    let modalRef = this.modal.open(content, {
      windowClass: windowClass
    });

    setTimeout(() => {
      this.setModalSize();
    }, 0);

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

  setModalSize() {
    $('.modal').height($(window).height() - $('header').height());
    $('.image-dialog .modal-dialog .modal-content .modal-body .img').height(($('.image-dialog').height() - $('header').height()) - 36);
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

  getModalInfo(checkHasOpenModal: boolean, message: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalInfoComponent, 'info-dialog', message);

    return modalRef;
  }

  getModalSuccess(checkHasOpenModal: boolean, message: string, btnMsg?: BtnMsg): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalSuccessComponent, 'success-dialog', message, '', btnMsg);

    return modalRef;
  }

  getModalError(checkHasOpenModal: boolean, message: string, btnMsg?: BtnMsg): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalErrorComponent, 'error-dialog', message, '', btnMsg);

    return modalRef;
  }

  getModalConfirm(checkHasOpenModal: boolean, message: string, description?: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalConfirmComponent, 'confirm-dialog', message, description);

    return modalRef;
  }

  getModalForm(checkHasOpenModal: boolean, message?: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalFormComponent, 'form-dialog', message);

    return modalRef;
  }

  getModalFormless(checkHasOpenModal: boolean, message?: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalFormlessComponent, 'formless-dialog', message);

    return modalRef;
  }

  getModalImage(checkHasOpenModal: boolean, image: string): NgbModalRef {
    let modalRef: NgbModalRef = this.getModal(checkHasOpenModal, ModalImageComponent, 'image-dialog', image);

    return modalRef;
  }
}
