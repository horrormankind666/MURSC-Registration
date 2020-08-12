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

import {AppService} from '../../../../app.service';
import {TransactionRegisteredPendingPaymentService as TransRegisteredPendingPaymentService} from '../../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-pending-payment',
  templateUrl: './transaction-registered-pending-payment.component.html',
  styleUrls: ['../transaction-registered-home.component.scss'],
  providers: [
    TransRegisteredPendingPaymentService,
    DecimalPipe
  ]
})
export class TransactionRegisteredPendingPaymentComponent implements OnInit {
  constructor(
    private appService: AppService,
    private transRegisteredPendingPaymentService: TransRegisteredPendingPaymentService
  ) {}

  ngOnInit() {
  }
}
