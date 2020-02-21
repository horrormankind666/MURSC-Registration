/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๓/๑๒/๒๕๖๒>
Modify date : <๒๐/๐๒/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(
    private authenService: AuthService
  ) {}

  ngOnInit() {
  }
}
