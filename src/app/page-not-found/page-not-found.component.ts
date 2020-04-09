/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๐๑/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, AfterViewInit} from '@angular/core';

import {ModalService} from '../modal/modal.service';

import {ModalErrorComponent} from '../modal/modal.component';

@Component({
  selector: '',
  template: '',
  styleUrls: []
})
export class PageNotFoundComponent implements OnInit, AfterViewInit {
  constructor(
    private modalService: ModalService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalService.getModalError(false, ModalErrorComponent, 'pageNotFound');
    }, 1000);
  }
}
