/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๗/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {NgModule, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {TranslateService} from '@ngx-translate/core';

import {AppService} from './app.service';
import {AuthService} from './auth.service';
import {ModalService} from './modal/modal.service';

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
    private elementRef: ElementRef,
    private router: Router,
    private modal: NgbModal,
    private translateService: TranslateService,
    private appService: AppService,
    private authService: AuthService,
    private modalService: ModalService
  ) {
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          if (this.modal.hasOpenModals())
            this.modal.dismissAll("");

          appService.isLoading.show = true;
          appService.isLoading.page = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            appService.isLoading.show = false;
            appService.isLoading.page = false;
          }, 1000);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  userBackgrondColor: string;
  sectionStyle: {} = {};
  today: Date = new Date();

  ngOnInit() {
    this.appService.setDefaultLang(this.appService.lang);
    this.userBackgrondColor = this.appService.getRandomColor();
  }

  ngAfterViewChecked() {
    this.sectionStyle = this.getSectionStyle();
  }

  onResize() {
    this.sectionStyle = this.getSectionStyle();
    this.modalService.setModalSize();
  }

  getSectionStyle(): {} {
    return {
      'padding-top': (this.headerView.nativeElement.offsetHeight + 'px'),
      'padding-bottom': (this.footerView.nativeElement.offsetHeight + 'px')
    }
  }
}
