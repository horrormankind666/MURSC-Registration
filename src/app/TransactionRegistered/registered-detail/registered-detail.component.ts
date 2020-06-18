/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๙/๐๖/๒๕๖๓>
Modify date : <๑๗/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AppService} from '../../app.service';
import {DataService} from '../../data.service';
import {ModalService} from '../../modal/modal.service';

import {ModalErrorComponent} from '../../modal/modal.component';

@Component({
  selector: 'app-registered-detail',
  templateUrl: './registered-detail.component.html',
  styleUrls: ['./registered-detail.component.scss']
})
export class RegisteredDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private dataService: DataService,
    private modalService: ModalService
  ) {}

  data: any = {
    transRegistered$: null
  };
  isCollapsed: any = {
    projectAbout: false
  };

  ngOnInit() {
    this.data.transRegistered$ = this.route.snapshot.data.transRegistered$;

    if (!this.data.transRegistered$) {
      let modalRef = this.modalService.getModalError(false, ModalErrorComponent, 'registered.error.notFound');

      this.modalService.close(modalRef).then((result: string) => {
        if (result === 'close')
          this.router.navigate(['TransactionRegistered']);
      });
    }
  }
}
