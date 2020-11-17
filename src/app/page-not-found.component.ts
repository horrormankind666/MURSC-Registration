/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๑๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, AfterViewInit} from '@angular/core';

import {ModalService} from './modal/modal.service';

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
    this.modalService.getModalError(false, 'pageNotFound');
  }
}
