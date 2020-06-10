/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๗/๐๔/๒๕๖๓>
Modify date : <๐๘/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppService} from './app.service';
import {DataService} from './data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private dataService: DataService
  ) {}

  data: any = {
    projectCategory$: null
  };

  ngOnInit() {
    this.data.projectCategory$ = this.route.snapshot.data.projectCategory$;
  }
}
