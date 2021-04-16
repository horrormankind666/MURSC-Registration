/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๘/๒๕๖๓>
Modify date : <๑๒/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import {
    TransactionRegisteredService as TransRegisteredService,
    TransactionRegisteredCheckPaymentService as TransRegisteredCheckPaymentService
} from '../transaction-registered.service';

@Component({
    selector: 'app-transaction-registered-check-payment',
    template: '',
    styles: [],
    providers: [
        TransRegisteredCheckPaymentService,
        DecimalPipe
    ]
})
export class TransactionRegisteredCheckPaymentComponent implements OnInit {
    constructor(
        private transRegisteredService: TransRegisteredService,
        private transRegisteredCheckPaymentService: TransRegisteredCheckPaymentService
    ) { }

    ngOnInit() {
        this.transRegisteredService.service = this.transRegisteredCheckPaymentService;
    }
}
