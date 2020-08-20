/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๘/๒๕๖๓>
Modify date : <๑๒/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {
  TransactionRegisteredService as TransRegisteredService,
  TransactionRegisteredAllService as TransRegisteredAllService
} from '../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-all',
  template: '',
  styles: [],
  providers: [
    TransRegisteredAllService,
    DecimalPipe
  ]
})
export class TransactionRegisteredAllComponent implements OnInit {
  constructor(
    private transRegisteredService: TransRegisteredService,
    private transRegisteredAllService: TransRegisteredAllService
  ) {}

  ngOnInit() {
    this.transRegisteredService.service = this.transRegisteredAllService;
  }
}
