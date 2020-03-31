/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๓/๑๒/๒๕๖๒>
Modify date : <๓๐/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';

import {AppService} from '../app.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(
    private appService: AppService,
  ) {}

  ngOnInit() {
  }
}
