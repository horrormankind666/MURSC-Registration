/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๓/๑๑/๒๕๖๓>
Modify date : <๒๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, Input, OnInit} from '@angular/core';

import {Schema} from '../data.service';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit {
  @Input() data$: Schema.Privilege;

  constructor(
  ) {}

  data: any = {
    privilege$: null
  };

  ngOnInit() {
    this.data.privilege$ = this.data$;
  }
}
