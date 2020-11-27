/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๓/๑๑/๒๕๖๓>
Modify date : <๒๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {ModalService} from '../modal/modal.service';
import {Schema} from '../data.service';

import {PrivilegeComponent} from './privilege.component';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  constructor(
    private modalService: ModalService,
  ) {}

  getModalPrivilegeUsed(data$: Schema.Privilege) {
    let modalRef: NgbModalRef;

    modalRef = this.modalService.getModalFormless(false);
    modalRef.componentInstance.component = PrivilegeComponent;
    modalRef.componentInstance.data$ = data$;

    this.modalService.close(modalRef).then((result: string) => {
    });
  }
}
