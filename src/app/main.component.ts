/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๗/๐๔/๒๕๖๓>
Modify date : <๑๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';

import {AppService} from './app.service';
import {ProjectService} from './project/project.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    ProjectService,
    DecimalPipe
  ]
})
export class MainComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private projectService: ProjectService,
  ) {}

  data: any = {
    projectCategory$: null,
    transProject: {
      registrationNowOpen$: null,
      registrationComingSoon$: null
    }
  };

  ngOnInit() {
    this.data.projectCategory$ = this.route.snapshot.data.projectCategory$;
    this.data.transProject.registrationNowOpen$ = this.route.snapshot.data.transProject$.filter(project => project.registrationStatus.includes('Y'));
    this.data.transProject.registrationComingSoon$ = this.route.snapshot.data.transProject$.filter(project => project.registrationStatus.includes('W'));
  }
}
