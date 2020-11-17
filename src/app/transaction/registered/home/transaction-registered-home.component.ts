/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๘/๐๖/๒๕๖๓>
Modify date : <๑๖/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';

import {AppService} from '../../../app.service';
import {AuthService} from '../../../auth.service';
import {DataService} from '../../../data.service';
import {ScheduleService} from '../../../schedule/schedule.service';
import {TransactionRegisteredService as TransRegisteredService} from '../transaction-registered.service';

import {TransactionRegisteredAllComponent} from './transaction-registered-all.component';
import {TransactionRegisteredPaymentCompletedComponent} from './transaction-registered-payment-completed.component';
import {TransactionRegisteredCheckPaymentComponent} from './transaction-registered-check-payment.component';
import {TransactionRegisteredPendingPaymentComponent} from './transaction-registered-pending-payment.component';

@Component({
  selector: 'app-transaction-registered-home',
  templateUrl: './transaction-registered-home.component.html',
  styleUrls: ['./transaction-registered-home.component.scss']
})
export class TransactionRegisteredHomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private scheduleService: ScheduleService,
    private transRegisteredService: TransRegisteredService
  ) {}

  data: any = {
    projectCategory$: null
  };

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

  projectAbout: any = {
    isCollapsed: []
  };

  registeredLocationIDNoSeatNo: any = {
    isCollapsed: []
  };

  examScore: any = {
    isCollapsed: []
  };

  sectionSchedule: any = {
    isCollapsed: []
  };

  studyResultsTranscript: any = {
    isCollapsed: []
  };

  tabOnChange(e: NgbNavChangeEvent) {
    this.authService.getIsAuthenticated().then((result: boolean) => {
      if (!result)
        this.appService.gotoSignIn();
      else {
        this.projectAbout.isCollapsed = [];
        this.registeredLocationIDNoSeatNo.isCollapsed = [];
        this.examScore.isCollapsed = [];
      }
    });
  }

  ngOnInit() {
    this.data.projectCategory$ = this.route.snapshot.data.projectCategory$;
    this.tab.title = this.tab.list[0].label;
  }
}
