/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๑๗/๐๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { NgModule, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';

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
  @ViewChild('headerView', { static: false }) headerView: ElementRef;
  @ViewChild('footerView', { static: false }) footerView: ElementRef;  

  constructor(
    private router: Router,
    private appService: AppService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          appService.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            appService.isLoading = false;
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    })
  }

  private userBackgrondColor: string;
  private sectionStyle: {} = {};
  private today: Date = new Date();

  ngOnInit() {      
    this.appService.setDefaultLang(this.appService.lang);
    this.userBackgrondColor = this.appService.getRandomColor();
  }
  
  ngAfterViewInit() {
    this.sectionStyle = this.getSectionStyle();
  }

  onResize() {
    this.sectionStyle = this.getSectionStyle();
  } 
  
  getSectionStyle(): {} {
    return {
      'padding-top': (this.headerView.nativeElement.offsetHeight + 'px'),
      'padding-bottom': (this.footerView.nativeElement.offsetHeight + 'px')
    }
  }  
}