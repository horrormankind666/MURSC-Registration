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
  TransactionRegisteredPendingPaymentService as TransRegisteredPendingPaymentService
} from '../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-pending-payment',
  template: '',
  styles: [],
  providers: [
    TransRegisteredPendingPaymentService,
    DecimalPipe
  ]
})
export class TransactionRegisteredPendingPaymentComponent implements OnInit {
  constructor(
    private transRegisteredService: TransRegisteredService,
    private transRegisteredPendingPaymentService: TransRegisteredPendingPaymentService
  ) {}

  ngOnInit() {
    this.transRegisteredService.service = this.transRegisteredPendingPaymentService;
  }
}
