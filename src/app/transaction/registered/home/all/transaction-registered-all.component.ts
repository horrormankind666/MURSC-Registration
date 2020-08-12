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
import {TransactionRegisteredService as TransRegisteredService} from '../../transaction-registered.service';

@Component({
  selector: 'app-transaction-registered-all',
  templateUrl: './transaction-registered-all.component.html',
  styleUrls: ['../transaction-registered-home.component.scss'],
  providers: [
    TransRegisteredService,
    DecimalPipe
  ]
})
export class TransactionRegisteredAllComponent implements OnInit {
  constructor(
    private appService: AppService,
    private transRegisteredService: TransRegisteredService
  ) {}

  ngOnInit() {
  }
}
