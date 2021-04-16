/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๙/๐๖/๒๕๖๓>
Modify date : <๒๕/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from '../../../app.service';
import { AuthService } from '../../../auth.service';
import { Schema, DataService } from '../../../data.service';
import { ModalService, BtnMsg } from '../../../modal/modal.service';
import { ScheduleService } from '../../../schedule/schedule.service';

import { PrivilegeComponent } from '../../../privilege/privilege.component';

@Component({
    selector: 'app-transaction-registered-detail',
    templateUrl: './transaction-registered-detail.component.html',
    styleUrls: ['./transaction-registered-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TransactionRegisteredDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private authService: AuthService,
        private dataService: DataService,
        private modalService: ModalService,
        private scheduleService: ScheduleService
    ) { }

    data: any = {
        transRegistered$: null,
        country$: null,
        province$: null,
        district$: null,
        subdistrict: null
    };

    projectAbout: any = {
        isCollapsed: false
    };

    examScore: any = {
        isCollapsed: false
    };

    schedule: any = {
        isCollapsed: false
    };

    studyResultsTranscript: any = {
        isCollapsed: false
    };

    registeredInfos: any = {
        show: false
    };

    feeType: any = {
        that: {},
        toggle: [],
        address: {
            isSelected: false
        },
        totalFeeAmount: 0,
        setValue(restore?: boolean) {
            let transFeeType: Schema.TransFeeType = this.that.appService.getObjectByValue(this.that.data.transRegistered$.transFeeType, ['feeType', 'toggle'], 'Address')[0];

            if (!restore) {
                this.toggle = [];
                this.address.isSelected = (transFeeType ? transFeeType.isSelected : false);
            }
        },
        setToggle(transFeeType: Schema.TransFeeType) {
            if (transFeeType.feeType.toggle === 'Address') {
                this.address.isSelected = transFeeType.isSelected;
                this.toggle[transFeeType.feeType.toggle] = this.address.isSelected;
            }
        },
        getTotalFeeAmount(): number {
            let amount: number = 0;

            if (this.that.data.transRegistered$) {
                for (let i = 0; i < this.that.data.transRegistered$.transFeeType.length; i++) {
                    if (this.that.data.transRegistered$.transFeeType[i].isSelected) {
                        amount = (amount + this.that.data.transRegistered$.transFeeType[i].feeType.amount);
                    }
                }
            }

            return amount;
        },
        watchChange() {
            this.saveChange.isValid = true;
        },
        saveChange: {
            that: {},
            isValid: true,
            getValue(): {} {
                let fee: Schema.TransFeeType[] = [];

                for (let i = 0; i < this.that.data.transRegistered$.transFeeType.length; i++) {
                    if (this.that.data.transRegistered$.transFeeType[i].isSelected)
                        fee.push(this.that.data.transRegistered$.transFeeType[i].feeType);
                }

                let result: {} = {
                    transRegisteredID: (this.that.data.transRegistered$.ID ? this.that.data.transRegistered$.ID : null),
                    fee: fee
                }

                return (result ? result : null);
            },
            validate(): boolean {
                return true;
            },
            action() {
                this.isValid = this.validate();
            }
        }
    };

    deliAddress: any = {
        that: {},
        formField: {
            address: '',
            country: {
                isLoading: false,
                selected: null
            },
            province: {
                isLoading: false,
                selected: null
            },
            district: {
                isLoading: false,
                selected: null
            },
            subdistrict: {
                isLoading: false,
                selected: null
            },
            postalCode: '',
            phoneNumber: ''
        },
        setValue(restore?: boolean) {
            if (!restore) {
                this.formField.address = '';
                this.formField.country.selected = null;
                this.formField.province.selected = null;
                this.formField.district.selected = null;
                this.formField.subdistrict.selected = null;
                this.formField.postalCode = '';
                this.formField.phoneNumber = '';
            }
            else {
                let address: string;
                let phoneNumber: string;
                let country: string;

                if (this.that.data.transRegistered$.transDeliAddress.ID) {
                    address = this.that.data.transRegistered$.transDeliAddress.address;
                    phoneNumber = this.that.data.transRegistered$.transDeliAddress.phoneNumber;
                    country = this.that.data.transRegistered$.transDeliAddress.country.ID
                }
                else {
                    address = this.that.authService.getUserInfo.address;
                    phoneNumber = this.that.authService.getUserInfo.phoneNumber;
                    country = this.that.authService.getUserInfo.country;
                }

                this.formField.address = address;
                this.formField.phoneNumber = phoneNumber;

                this.formField.country.isLoading = true;
                this.that.dataService.country.getList().then((result: Schema.Country[]) => {
                    this.formField.country.isLoading = false;
                    this.that.data.country$ = result;
                    this.formField.country.selected = this.that.data.country$[this.that.data.country$.findIndex(k => k.ID === country)];

                    this.getListProvince(true);
                });
            }
        },
        getListProvince(restore?: boolean) {
            let countryID: string = (this.formField.country.selected ? this.formField.country.selected.ID : null);

            this.formField.province.isLoading = true;
            this.formField.district.isLoading = true;
            this.formField.subdistrict.isLoading = true;
            this.that.dataService.province.getList(countryID).then((result: Schema.Province[]) => {
                this.formField.province.isLoading = false;
                this.that.data.province$ = result;
                this.formField.province.selected = (restore ? this.that.data.province$[this.that.data.province$.findIndex(k => k.ID === this.that.data.transRegistered$.transDeliAddress.province.ID)] : null);

                this.getListDistrict(true);
            });
        },
        getListDistrict(restore?: boolean) {
            let countryID: string = (this.formField.country.selected ? this.formField.country.selected.ID : null);
            let provinceID: string = (this.formField.province.selected ? this.formField.province.selected.ID : null);

            this.formField.district.isLoading = true;
            this.formField.subdistrict.isLoading = true;
            this.that.dataService.district.getList(countryID, provinceID).then((result: Schema.District[]) => {
                this.formField.district.isLoading = false;
                this.that.data.district$ = result;
                this.formField.district.selected = (restore ? this.that.data.district$[this.that.data.district$.findIndex(k => k.ID === this.that.data.transRegistered$.transDeliAddress.district.ID)] : null);

                this.getListSubdistrict(true);
            });
        },
        getListSubdistrict(restore?: boolean) {
            let countryID: string = (this.formField.country.selected ? this.formField.country.selected.ID : null);
            let provinceID: string = (this.formField.province.selected ? this.formField.province.selected.ID : null);
            let districtID: string = null;
            let postalCode: string = '';

            if (this.formField.district.selected) {
                districtID = this.formField.district.selected.ID;
                postalCode = this.formField.district.selected.zipCode;
            }

            this.formField.postalCode = (restore ? (this.that.data.transRegistered$.transDeliAddress.ID ? this.that.data.transRegistered$.transDeliAddress.postalCode : '') : postalCode);
            this.that.dataService.subdistrict.getList(countryID, provinceID, districtID).then((result: Schema.Subdistrict[]) => {
                this.formField.subdistrict.isLoading = false;
                this.that.data.subdistrict$ = result;
                this.formField.subdistrict.selected = (restore ? this.that.data.subdistrict$[this.that.data.subdistrict$.findIndex(k => k.ID === this.that.data.transRegistered$.transDeliAddress.subdistrict.ID)] : null);
            });
        },
        watchChange() {
            this.saveChange.isValid = true;
        },
        saveChange: {
            that: {},
            isValid: true,
            getValue(): {} {
                let deliAddress: {};

                if (this.that.feeType.address.isSelected) {
                    deliAddress = {
                        address: (this.that.deliAddress.formField.address ? this.that.deliAddress.formField.address : null),
                        country: (this.that.deliAddress.formField.country.selected ? this.that.deliAddress.formField.country.selected.ID : null),
                        province: (this.that.deliAddress.formField.province.selected ? this.that.deliAddress.formField.province.selected.ID : null),
                        district: (this.that.deliAddress.formField.district.selected ? this.that.deliAddress.formField.district.selected.ID : null),
                        subdistrict: (this.that.deliAddress.formField.subdistrict.selected ? this.that.deliAddress.formField.subdistrict.selected.ID : null),
                        postalCode: (this.that.deliAddress.formField.postalCode ? this.that.deliAddress.formField.postalCode : null),
                        phoneNumber: (this.that.deliAddress.formField.phoneNumber ? this.that.deliAddress.formField.phoneNumber : null)
                    }
                }

                let result: {} = {
                    transDeliAddressID: (this.that.data.transRegistered$.transDeliAddress.ID ? this.that.data.transRegistered$.transDeliAddress.ID : null),
                    transRegisteredID: (this.that.data.transRegistered$.ID ? this.that.data.transRegistered$.ID : null),
                    deliAddress: (deliAddress ? deliAddress : null)
                };

                return (result ? result : null);
            },
            validate(): boolean {
                if (this.that.feeType.address.isSelected) {
                    if (!this.that.deliAddress.formField.address ||
                        !this.that.deliAddress.formField.country.selected ||
                        !this.that.deliAddress.formField.province.selected ||
                        !this.that.deliAddress.formField.district.selected ||
                        !this.that.deliAddress.formField.subdistrict.selected ||
                        !this.that.deliAddress.formField.postalCode ||
                        !this.that.deliAddress.formField.phoneNumber) {
                        this.that.feeType.toggle['Address'] = true;

                        return false;
                    }
                }

                return true;
            },
            action() {
                this.isValid = this.validate();
            }
        }
    };

    payment: any = {
        that: {},
        formField: {
            issueReceipt: '',
            qrcodeImage: ''
        },
        setValue(restore?: boolean) {
            if (!restore) {
                this.formField.issueReceipt = '';
                this.formField.qrcodeImage = '';
            }
            else {
                this.formField.issueReceipt = (this.that.data.transRegistered$.invoice.payment.status !== 'N' ? this.that.data.transRegistered$.invoice.namePrintReceipt : (this.that.authService.getUserInfo.fullName.th ? this.that.authService.getUserInfo.fullName.th : this.that.authService.getUserInfo.fullName[this.that.appService.lang]));
                this.formField.qrcodeImage = (this.that.data.transRegistered$.invoice.payment.status === 'W' ? this.that.data.transRegistered$.invoice.qrImage : '');
            }
        },
        watchChange() {
            this.saveChange.isValid = true;
            this.saveChange.errorCode = 0;
        },
        saveChange: {
            that: {},
            isValid: true,
            getValue(): {} {
                let result: {} = {
                    transRegisteredID: (this.that.data.transRegistered$.ID ? this.that.data.transRegistered$.ID : null),
                    transProjectID: (this.that.data.transRegistered$.transProject.ID ? this.that.data.transRegistered$.transProject.ID : null),
                    issueReceipt: (this.that.payment.formField.issueReceipt ? this.that.payment.formField.issueReceipt : null)
                };

                return (result ? result : null);
            },
            validate(): boolean {
                if (!this.that.payment.formField.issueReceipt)
                    return false;

                return true;
            },
            action() {
                this.isValid = this.validate();
            }
        }
    };

    privilege: any = {
        that: {},
        formField: {
            code: ''
        },
        component: PrivilegeComponent,
        watchChange() {
            this.confirm.isValid = true;
            this.confirm.errorCode = 0;
        },
        confirm: {
            that: {},
            isValid: true,
            isVerifying: false,
            errorCode: 0,
            getValue(): {} {
                /*
                let fee: Schema.TransFeeType[] = [];

                for (let i = 0; i < this.that.data.transRegistered$.transFeeType.length; i++) {
                  if (this.that.data.transRegistered$.transFeeType[i].isSelected)
                  fee.push(this.that.data.transRegistered$.transFeeType[i].feeType);
                }

                let result: {} = {
                  transRegisteredID: (this.that.data.transRegistered$.ID ? this.that.data.transRegistered$.ID : null),
                  fee: fee
                }

                return (result ? result : null);
                */
                return null;
            },
            validate(): boolean {
                if (!this.that.privilege.formField.code)
                    return false;

                return true;
            },
            action() {
                this.isValid = this.validate();

                if (this.isValid) {
                    this.isVerifying = true;

                    setTimeout(() => {
                        this.isVerifying = false;
                        this.errorCode = 1;
                    }, 2000)
                }
            }
        }
    };

    ngOnInit() {
        this.data.transRegistered$ = this.route.snapshot.data.transRegistered$;

        if (!this.data.transRegistered$) {
            let btnMsg: BtnMsg = {
                close: 'registered.info'
            };
            let modalRef = this.modalService.getModalError(false, 'registered.error.notFound', btnMsg);

            this.modalService.close(modalRef).then((result: string) => {
                if (result === 'close')
                    this.router.navigate(['Transaction/Registered']);
            });
        }
        else {
            if (this.data.transRegistered$.invoice.payment.status === 'N') {
                if (this.appService.existUserTypeSpecific(this.data.transRegistered$.transProject.userTypeSpecific, this.authService.getUserInfo.type))
                    this.registeredInfos.show = true;
                else {
                    let modalRef = this.modalService.getModalError(false, 'registered.error.haveNoRight');

                    this.modalService.close(modalRef).then((result: string) => {
                        if (result === 'close')
                            this.router.navigate(['Transaction/Registered']);
                    });
                }
            }
            else
                this.registeredInfos.show = true;

            if (this.registeredInfos.show) {
                this.watchChange();

                this.feeType.that = this;
                this.feeType.saveChange.that = this;
                this.feeType.setValue();
                this.feeType.totalFeeAmount = this.feeType.getTotalFeeAmount();

                this.deliAddress.that = this;
                this.deliAddress.saveChange.that = this;
                this.deliAddress.setValue(true);

                this.payment.that = this;
                this.payment.saveChange.that = this;
                this.payment.setValue(true);

                this.privilege.that = this;
                this.privilege.confirm.that = this;

                this.saveChange.that = this;
            }
        }
    }

    watchChange() {
        this.feeType.watchChange();
        this.deliAddress.watchChange();
        this.payment.watchChange();
        this.privilege.watchChange();
        this.saveChange.isValid = true;
    }

    saveChange = {
        that: {},
        isValid: true,
        validate(): boolean {
            if (!this.that.feeType.saveChange.isValid ||
                !this.that.deliAddress.saveChange.isValid ||
                !this.that.payment.saveChange.isValid)
                return false;

            return true;
        },
        action() {
            this.that.appService.isLoading.show = true;
            this.that.appService.isLoading.checking = true;

            this.that.authService.getIsAuthenticated().then((result: boolean) => {
                if (!result) {
                    this.that.appService.isLoading.show = false;
                    this.that.appService.isLoading.checking = false;

                    this.that.appService.gotoSignIn();
                }
                else {
                    if (this.that.appService.existUserTypeSpecific(this.that.data.transRegistered$.transProject.userTypeSpecific, this.that.authService.getUserInfo.type)) {
                        this.that.feeType.saveChange.action();
                        this.that.deliAddress.saveChange.action();
                        this.that.payment.saveChange.action();

                        this.isValid = this.validate();

                        this.that.appService.isLoading.show = false;
                        this.that.appService.isLoading.checking = false;

                        if (this.isValid) {
                            let modalRef = this.that.modalService.getModalConfirm(false, 'payment.save.confirm.label', 'payment.save.confirm.description');

                            this.that.modalService.close(modalRef).then((result: string) => {
                                if (result === 'ok') {
                                    let value: {} = this.that.feeType.saveChange.getValue();

                                    this.that.appService.save('TransInvoice', 'PUT', JSON.stringify(value)).then((result: any) => {
                                        let saveResult: any = result;
                                        let modalRef: any;

                                        if (saveResult.errorCode === 0) {
                                            value = this.that.deliAddress.saveChange.getValue();

                                            this.that.appService.save('TransDeliveryAddress', 'PUT', JSON.stringify(value)).then((result: any) => {
                                                saveResult = result;

                                                if (saveResult.errorCode === 0) {
                                                    this.that.appService.isLoading.show = true;
                                                    this.that.appService.isLoading.checking = true;

                                                    this.that.dataService.transRegistered.get(this.that.appService.getCUID([this.that.data.transRegistered$.ID, this.that.data.transRegistered$.transProject.ID])).then((result: Schema.TransRegistered) => {
                                                        let transRegistered: Schema.TransRegistered = result;

                                                        this.that.appService.isLoading.show = false;
                                                        this.that.appService.isLoading.checking = false;

                                                        if (this.that.appService.existUserTypeSpecific(transRegistered.transProject.userTypeSpecific, this.that.authService.getUserInfo.type)) {
                                                            if (this.that.data.transRegistered$.invoice.payment.status !== transRegistered.invoice.payment.status)
                                                                this.that.data.transRegistered$ = transRegistered;

                                                            if (this.that.data.transRegistered$.invoice.payment.status === 'N') {
                                                                if (this.that.data.transRegistered$.transProject.paymentExpire === 'N') {
                                                                    value = this.that.payment.saveChange.getValue();

                                                                    this.that.appService.save(('QRCodePayment/' + this.that.data.transRegistered$.transProject.project.category.initial), 'PUT', JSON.stringify(value)).then((result: any) => {
                                                                        saveResult = result;

                                                                        if (saveResult.errorCode === 0) {
                                                                            this.that.appService.isLoading.show = true;
                                                                            this.that.appService.isLoading.reloading = true;

                                                                            this.that.dataService.transRegistered.get(this.that.appService.getCUID([this.that.data.transRegistered$.ID, this.that.data.transRegistered$.transProject.ID])).then((result: Schema.TransRegistered) => {
                                                                                this.that.data.transRegistered$ = result;
                                                                                this.that.payment.setValue(true);

                                                                                this.that.appService.isLoading.show = false;
                                                                                this.that.appService.isLoading.reloading = false;
                                                                            });
                                                                        }
                                                                        else {
                                                                            if (saveResult.errorCode === 2) {
                                                                                modalRef = this.that.modalService.getModalError(false, 'registered.error.notFound', 'registered.info');

                                                                                this.that.modalService.close(modalRef).then((result: string) => {
                                                                                    if (result === 'close')
                                                                                        this.that.router.navigate(['Transaction/Registered']);
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                else
                                                                    this.that.payment.setValue(true);
                                                            }
                                                        }
                                                        else {
                                                            modalRef = this.that.modalService.getModalError(false, 'registered.error.haveNoRight');

                                                            this.that.modalService.close(modalRef).then((result: string) => {
                                                                if (result === 'close')
                                                                    this.that.router.navigate(['Transaction/Registered']);
                                                            });
                                                        }
                                                    });
                                                }
                                                else {
                                                    if (saveResult.errorCode === 2) {
                                                        modalRef = this.that.modalService.getModalError(false, 'registered.error.notFound', 'registered.info');

                                                        this.that.modalService.close(modalRef).then((result: string) => {
                                                            if (result === 'close')
                                                                this.that.router.navigate(['Transaction/Registered']);
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            if (saveResult.errorCode === 2) {
                                                modalRef = this.that.modalService.getModalError(false, 'registered.error.notFound', 'registered.info');

                                                this.that.modalService.close(modalRef).then((result: string) => {
                                                    if (result === 'close')
                                                        this.that.router.navigate(['Transaction/Registered']);
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        else
                            this.that.modalService.getModalError(false, 'save.error.validate');
                    }
                    else {
                        this.that.appService.isLoading.show = false;
                        this.that.appService.isLoading.checking = false;

                        let modalRef = this.that.modalService.getModalError(false, 'registered.error.haveNoRight');

                        this.that.modalService.close(modalRef).then((result: string) => {
                            if (result === 'close')
                                this.that.router.navigate(['Transaction/Registered']);
                        });
                    }
                }
            });
        }
    }

    getRecheckPayment() {
        this.appService.isLoading.show = true;
        this.appService.isLoading.checking = true;

        this.authService.getIsAuthenticated().then((result: boolean) => {
            if (!result) {
                this.appService.isLoading.show = false;
                this.appService.isLoading.checking = false;

                this.appService.gotoSignIn();
            }
            else {
                this.dataService.transRegistered.get(this.appService.getCUID([this.data.transRegistered$.ID, this.data.transRegistered$.transProject.ID])).then((result: Schema.TransRegistered) => {
                    let transRegistered: Schema.TransRegistered = result;

                    if (this.data.transRegistered$.invoice.payment.status !== transRegistered.invoice.payment.status) {
                        this.data.transRegistered$ = transRegistered;

                        if (this.data.transRegistered$.invoice.payment.status === 'N') {
                            this.deliAddress.setValue(true);
                            this.payment.setValue(true);
                        }
                    }

                    this.appService.isLoading.show = false;
                    this.appService.isLoading.checking = false;
                });
            }
        });
    }
}
