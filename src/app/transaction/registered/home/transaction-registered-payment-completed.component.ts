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
  TransactionRegisteredPaymentCompletedService as TransRegisteredPaymentCompletedService
} from '../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-payment-completed',
  template: '',
  styles: [],
  providers: [
    TransRegisteredPaymentCompletedService,
    DecimalPipe
  ]
})
export class TransactionRegisteredPaymentCompletedComponent implements OnInit {
  constructor(
    private transRegisteredService: TransRegisteredService,
    private transRegisteredPaymentCompletedService: TransRegisteredPaymentCompletedService
  ) {}

  ngOnInit() {
    this.transRegisteredService.service = this.transRegisteredPaymentCompletedService;
  }
}