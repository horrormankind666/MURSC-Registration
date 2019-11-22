/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๑๑/๑๑/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับ app-root>
=============================================
*/

'use strict';

import { NgModule, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AppService } from './app.service';

@NgModule({
  providers: [
    AppService
  ]
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public loading: boolean = true;
  private userBackgrondColor: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private appService: AppService,
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    })
  };

  ngOnInit() {
    this.appService.setDefaultLang(this.appService.lang);
    this.userBackgrondColor = this.appService.getRandomColor();
    /*
    this.appService.doAsyncTask().then(res => {
      console.log(res);
    })
    */
  };
}
