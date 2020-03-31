/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๓๑/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-error',
  template: `
    <div class="font">
      <div class="modal-body">
        <span class="regular text-white size16">{{message | translate}}</span>
      </div>
      <div class="modal-footer">
        <input class="d-none" type="text" />
        <button type="button" class="btn btn-danger mr-0" (click)="$event.currentTarget.blur(); activeModal.close('close')"><span class="regular size16">{{'close' | translate}}</span></button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ModalErrorComponent implements OnInit {
  @Input() message;

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
      </div>
      <div class="modal-footer">
        <input class="d-none" type="text" />
        <button type="button" class="btn btn-primary ml-0" (click)="$event.currentTarget.blur(); activeModal.dismiss('cancel')"><span class="regular size16">{{'cancel' | translate}}</span></button>
        <button type="button" class="btn btn-primary mr-0" (click)="$event.currentTarget.blur(); activeModal.close('ok')"><span class="regular size16">{{'ok' | translate}}</span></button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ModalConfirmComponent implements OnInit {
  @Input() message;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}
