/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๐/๑๒/๒๕๖๒>
Description : <รวมรวบฟังก์ชั่นใช้งานสำหรับ app-root>
=============================================
*/

'use strict';

import { NgModule, Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AppService } from './app.service';
import { ɵBrowserDomAdapter } from '@angular/platform-browser';

@NgModule({
  providers: [
    AppService
  ]
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window: resize)': 'onResize($event)'
  }
})

export class AppComponent implements OnInit {
  @ViewChild('footer', { static: false }) footerView: ElementRef;
  @ViewChild('header', { static: false }) headerView: ElementRef;

  public isLoading: boolean = true;
  public userBackgrondColor: string;

  constructor(
    private router: Router,
    private appService: AppService,    
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.isLoading = false;
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
  };
  
  ngAfterViewInit() {
    console.log(this.footerView.nativeElement.style.offsetHeight);
    /*
    $("main section").css({
      "padding-top": ($("main .sticky").outerHeight() + "px"),

    //console.log(document.getElementById('footer-view').style);
    */
  };

  onResize(event) {
    //console.log(this.footerView.nativeElement.offsetHeight);
    this.headerView.nativeElement.style.height;
  }
}
