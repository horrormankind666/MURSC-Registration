/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๒๑/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';

@Component({
  selector: 'app-modal-info',
  template: `
    <div class="font">
      <div class="modal-body">
        <span class="regular text-white size16">{{message | translate}}</span>
      </div>
      <div class="modal-footer">
        <input class="d-none" type="text" />
        <button type="button" class="btn btn-info mr-0" (click)="activeModal.close('close')"><span class="regular size14">{{'close' | translate | titlecase}}</span></button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ModalInfoComponent implements OnInit {
  @Input() message;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-modal-success',
  template: `
    <div class="font">
      <div class="modal-body">
        <span class="regular text-white size16">{{message | translate}}</span>
      </div>
      <div class="modal-footer">
        <input class="d-none" type="text" />
        <button type="button" class="btn btn-success mr-0" (click)="activeModal.close('close')"><span class="regular size14">{{(btnMsg ? btnMsg.close : 'close') | translate | titlecase}}</span></button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ModalSuccessComponent implements OnInit {
  @Input() message;
  @Input() btnMsg;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-modal-error',
  template: `
    <div class="font">
      <div class="modal-body">
        <span class="regular text-white size16">{{message | translate}}</span>
      </div>
      <div class="modal-footer">
        <input class="d-none" type="text" />
        <button type="button" class="btn btn-danger mr-0" (click)="activeModal.close('close')"><span class="regular size14">{{(btnMsg ? btnMsg.close : 'close') | translate | titlecase}}</span></button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ModalErrorComponent implements OnInit {
  @Input() message;
  @Input() btnMsg;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-modal-confirm',
  template: `
    <div class="font">
      <div class="modal-body">
        <span class="regular text-white size16">{{message | translate}}</span>
        <div class="mt-2" *ngIf="description">
          <span class="regular text-white-50 size14">{{description | translate}}.</span>
        </div>
      </div>
      <div class="modal-footer">
        <input class="d-none" type="text" />
        <button type="button" class="btn btn-primary ml-0" (click)="activeModal.dismiss('cancel')"><span class="regular size14">{{'cancel' | translate | titlecase}}</span></button>
        <button type="button" class="btn btn-primary mr-0" (click)="activeModal.close('ok')"><span class="regular size14">{{'ok' | translate | titlecase}}</span></button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ModalConfirmComponent implements OnInit {
  @Input() message;
  @Input() description;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-modal-image',
  template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class='img' [ngStyle]="{'background-image': ('url(' + message + ')')}"></div>
    </div>
  `,
  styleUrls: []
})
export class ModalImageComponent implements OnInit {
  @Input() message;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}
