/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๓/๑๑/๒๕๖๓>
Modify date : <๒๔/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {ModalService} from '../modal/modal.service';

import {PrivilegeComponent} from './privilege.component';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  constructor(
    private modalService: ModalService,
  ) {}

  getModalPrivilegeUsed() {
    let modalRef: NgbModalRef;

    modalRef = this.modalService.getModalFormless(false);
    modalRef.componentInstance.component = PrivilegeComponent;

    this.modalService.close(modalRef).then((result: string) => {
    });
  }
}
