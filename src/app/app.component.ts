/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๘/๑๐/๒๕๖๒>
Modify date : <๒๒/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { NgModule, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from '@ngx-translate/core';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

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
        private location: Location,
        private elementRef: ElementRef,
        private router: Router,
        private route: ActivatedRoute,
        private modal: NgbModal,
        private translateService: TranslateService,
        private appService: AppService,
        private authService: AuthService,
        private modalService: ModalService
    ) {
        //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart:
                    if (this.modal.hasOpenModals())
                        this.modal.dismissAll("");

                    appService.isLoading.show = true;
                    appService.isLoading.page = true;
                    break;
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                    setTimeout(() => {
                        appService.isLoading.show = false;
                        appService.isLoading.page = false;
                    }, 1000);
                    break;
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
        this.appService.setURLServer();
        this.appService.setDefaultLang(this.appService.lang);
        this.appService.setFormLabelActive();
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
        this.appService.headerViewHeight = this.headerView.nativeElement.offsetHeight;

        return {
            'padding-top': (this.appService.headerViewHeight + 'px'),
            'padding-bottom': (this.footerView.nativeElement.offsetHeight + 'px')
        }
    }
}
