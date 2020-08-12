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
import {TransactionRegisteredCheckPaymentService as TransRegisteredCheckPaymentService} from '../../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-check-payment',
  templateUrl: './transaction-registered-check-payment.component.html',
  styleUrls: ['../transaction-registered-home.component.scss'],
  providers: [
    TransRegisteredCheckPaymentService,
    DecimalPipe
  ]
})
export class TransactionRegisteredCheckPaymentComponent implements OnInit {
  constructor(
    private appService: AppService,
    private transRegisteredCheckPaymentService: TransRegisteredCheckPaymentService
  ) {}

  ngOnInit() {
  }
}
