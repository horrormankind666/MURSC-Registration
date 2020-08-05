/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๘/๐๖/๒๕๖๓>
Modify date : <๐๕/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';

import {AppService} from '../../../app.service';
import {DataService} from '../../../data.service';

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

  ngOnInit() {
  }
}
