/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๘/๒๕๖๓>
Modify date : <๑๑/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {AppService} from '../../../../app.service';
import {TransactionRegisteredPaymentCompletedService as TransRegisteredPaymentCompletedService} from '../../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-payment-completed',
  templateUrl: './transaction-registered-payment-completed.component.html',
  styleUrls: ['../transaction-registered-home.component.scss'],
  providers: [
    TransRegisteredPaymentCompletedService,
    DecimalPipe
  ]
})
export class TransactionRegisteredPaymentCompletedComponent implements OnInit {
  constructor(
    private appService: AppService,
    private transRegisteredPaymentCompletedService: TransRegisteredPaymentCompletedService
  ) {}

  ngOnInit() {
  }
}
