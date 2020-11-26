/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๓๑/๐๓/๒๕๖๓>
Modify date : <๒๕/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, ComponentRef, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input, Type, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-modal-form',
  template: `
    <div class="modal-header">
      <div class="modal-title">{{title | translate | titlecase}}</div>
      <div class="modal-close">
        <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="modal-body pt-0 pr-0 pb-0 pl-0">
      <ng-template #contentView></ng-template>
    </div>
  `,
  styleUrls: []
})
export class ModalFormComponent implements OnInit {
  @Input() component: Type<any>;
  @Input() title: string;
  @Input() data$;

  @ViewChild('contentView', {read: ViewContainerRef, static: true}) contentView: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component)

    this.contentView.clear();
    this.componentRef = this.contentView.createComponent(componentFactory, 0);

    if (this.data$) this.componentRef.instance.data$ = this.data$;
  }
}

@Component({
  selector: 'app-modal-formless',
  template: `
    <div class="modal-header">
      <div class="modal-title text-white-50 text-center" *ngIf="title">{{title | translate | titlecase}}</div>
      <div class="modal-close">
        <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="modal-body">
      <ng-template #contentView></ng-template>
    </div>
  `,
  styleUrls: []
})
export class ModalFormlessComponent implements OnInit {
  @Input() component: Type<any>;
  @Input() title: string;
  @Input() data$;

  @ViewChild('contentView', {read: ViewContainerRef, static: true}) contentView: ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component)

    this.contentView.clear();
    this.componentRef = this.contentView.createComponent(componentFactory, 0);

    if (this.data$) this.componentRef.instance.data$ = this.data$;
  }
}

@Component({
  selector: 'app-modal-image',
  template: `
    <div class="modal-header">
      <div class="modal-close">
        <button type="button" class="close" aria-label="Close" (click)="activeModal.close('close')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
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
