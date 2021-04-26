/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๐/๐๔/๒๕๖๔>
Modify date : <๒๖/๐๔/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, Input, OnInit  } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '../app.service';
import { DataService } from '../data.service';

import * as $ from 'jquery';
import Inputmask from "inputmask";

@Component({
    selector: 'app-phonenumber-verify',
    templateUrl: './phonenumber-verify.component.html',
    styleUrls: ['./phonenumber-verify.component.scss']
})
export class PhoneNumberVerifyComponent implements OnInit {
    @Input() data$;

    constructor(
        private activeModal: NgbActiveModal,
        private appService: AppService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.watchChange();

        this.saveChange.that = this;
        this.setValue();

        setTimeout(() => {
            this.appService.isLoading.show = false;
            this.appService.isLoading.modal = false;
        }, 0);
    }

    formField: any = {
        mask: {
            isValid: true,
            value: null
        },
        phoneNumber: {
            isValid: true,
            selector: 'field-phonenumber',
            value: ''
        }
    };

    getPhoneType(): string {
        return ((this.data$.phoneNumber && this.data$.phoneNumber.length < 10) ? 'home' : 'mobile');
    }

    setInputmaskPhoneNumber() {
        const selector: any = document.getElementById(this.formField.phoneNumber.selector);

        Inputmask().mask(selector).remove();

        if (this.formField.mask.value) {
            Inputmask(this.formField.mask.value.mask).mask(selector);
            this.formField.phoneNumber.value = selector.value;
        }
        else {
            selector.value = '';
            this.formField.phoneNumber.value = selector.value;
        }
    }

    setValue() {
        const selector: any = document.getElementById(this.formField.phoneNumber.selector);

        this.formField.mask.value = this.dataService.maskPhoneNumber.data$[this.dataService.maskPhoneNumber.data$.findIndex(m => m.ID === this.getPhoneType())];
        Inputmask().mask(selector).remove();
        selector.value = this.data$.phoneNumber;
        this.setInputmaskPhoneNumber();
    }

    watchChange() {
        this.saveChange.isValid = true;
        this.formField.mask.isValid = true;
        this.formField.phoneNumber.isValid = true;
    }

    saveChange: any = {
        that: {},
        isValid: true,
        validate(): boolean {
            let isValid: boolean = true;

            if (!this.that.formField.mask.value) {
                isValid = false;
                this.that.formField.mask.isValid = false;
            }
            if (!this.that.formField.phoneNumber.value ||
                !Inputmask().mask(document.getElementById(this.that.formField.phoneNumber.selector)).isComplete()) {
                isValid = false;
                this.that.formField.phoneNumber.isValid = false;
            }

            return isValid;
        },
        action() {
            this.isValid = this.validate();

            if (this.isValid) {
                this.that.formField.phoneNumber.value = Inputmask().mask(document.getElementById(this.that.formField.phoneNumber.selector)).unmaskedvalue();

                this.that.activeModal.close({
                    action: 'ok',
                    formField: this.that.formField
                });
            }
        }
    };
}
