/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๘/๐๖/๒๕๖๓>
Modify date : <๑๑/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';

import {AppService} from '../../../app.service';
import {DataService} from '../../../data.service';

import {TransactionRegisteredAllComponent} from './all/transaction-registered-all.component';
import {TransactionRegisteredPaymentCompletedComponent} from './payment-completed/transaction-registered-payment-completed.component';
import {TransactionRegisteredCheckPaymentComponent} from './check-payment/transaction-registered-check-payment.component';
import {TransactionRegisteredPendingPaymentComponent} from './pending-payment/transaction-registered-pending-payment.component';

@Component({
  selector: 'app-transaction-registered-home',
  templateUrl: './transaction-registered-home.component.html',
  styleUrls: ['./transaction-registered-home.component.scss']
})
export class TransactionRegisteredHomeComponent implements OnInit {
  constructor(
    private appService: AppService,
    private dataService: DataService
  ) {}

  tab: any = {
    isCollapsed: true,
    active: 1,
    title: {},
    list: [
      {
        ID: 1,
        label: {
          th: 'ที่ลงทะเบียนทั้งหมด',
          en: 'All registered'
        },
        component: TransactionRegisteredAllComponent
      },
      {
        ID: 2,
        label: {
          th: (this.dataService.statuses.get(this.dataService.paymentStatus.data$, 'Y')).name.th,
          en: (this.dataService.statuses.get(this.dataService.paymentStatus.data$, 'Y')).name.en,
        },
        component: TransactionRegisteredPaymentCompletedComponent
      },
      {
        ID: 3,
        label: {
          th: (this.dataService.statuses.get(this.dataService.paymentStatus.data$, 'W')).name.th,
          en: (this.dataService.statuses.get(this.dataService.paymentStatus.data$, 'W')).name.en,
        },
        component: TransactionRegisteredCheckPaymentComponent
      },
      {
        ID: 4,
        label: {
          th: (this.dataService.statuses.get(this.dataService.paymentStatus.data$, 'N')).name.th,
          en: (this.dataService.statuses.get(this.dataService.paymentStatus.data$, 'N')).name.en,
        },
        component: TransactionRegisteredPendingPaymentComponent
      }
    ]
  };

  ngOnInit() {
    this.tab.title = this.tab.list[0].label;
  }
}
