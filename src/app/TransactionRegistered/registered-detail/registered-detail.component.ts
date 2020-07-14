/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๙/๐๖/๒๕๖๓>
Modify date : <๑๔/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AppService} from '../../app.service';
import {AuthService} from '../../auth.service';
import {Schema, DataService} from '../../data.service';
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
    private authService: AuthService,
    private dataService: DataService,
    private modalService: ModalService
  ) {}

  test: string = 'a';

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

  feeType: any = {
    toggle: []
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
      if (this.that.data.transRegistered$.transDeliAddress.ID) {
        this.watchChange();

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
          this.formField.address = this.that.data.transRegistered$.transDeliAddress.address;
          this.formField.phoneNumber = this.that.data.transRegistered$.transDeliAddress.phoneNumber;

          this.formField.country.isLoading = true;
          this.that.dataService.country.getList().then((result: Schema.Country[]) => {
            this.formField.country.isLoading = false;
            this.that.data.country$ = result;
            this.formField.country.selected = this.that.data.country$[this.that.data.country$.findIndex(k => k.ID === this.that.data.transRegistered$.transDeliAddress.country.ID)];

            this.getListProvince(true);
          });
        }
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

      this.formField.postalCode = (restore ? this.that.data.transRegistered$.transDeliAddress.postalCode : postalCode);
      this.that.dataService.subdistrict.getList(countryID, provinceID, districtID).then((result: Schema.Subdistrict[]) => {
        this.formField.subdistrict.isLoading = false;
        this.that.data.subdistrict$ = result;
        this.formField.subdistrict.selected = (restore ? this.that.data.subdistrict$[this.that.data.subdistrict$.findIndex(k => k.ID === this.that.data.transRegistered$.transDeliAddress.subdistrict.ID)] : null);
      });
    },
    watchChange() {
      this.saveChange.isValid = true;
      this.saveChange.errorCode = 0;
    },
    saveChange: {
      that: {},
      isSaving: false,
      isValid: true,
      errorCode: 0,
      getValue(): {} {
        let result: {} = {
          transDeliAddressID: (this.that.data.transRegistered$.transDeliAddress.ID ? this.that.data.transRegistered$.transDeliAddress.ID : null),
          transRegisteredID: (this.that.data.transRegistered$.ID ? this.that.data.transRegistered$.ID : null),
          deliAddress: {
            address: (this.that.deliAddress.formField.address ? this.that.deliAddress.formField.address : null),
            country: (this.that.deliAddress.formField.country.selected ? this.that.deliAddress.formField.country.selected.ID : null),
            province: (this.that.deliAddress.formField.province.selected ? this.that.deliAddress.formField.province.selected.ID : null),
            district: (this.that.deliAddress.formField.district.selected ? this.that.deliAddress.formField.district.selected.ID : null),
            subdistrict: (this.that.deliAddress.formField.subdistrict.selected ? this.that.deliAddress.formField.subdistrict.selected.ID : null),
            postalCode: (this.that.deliAddress.formField.postalCode ? this.that.deliAddress.formField.postalCode : null),
            phoneNumber: (this.that.deliAddress.formField.phoneNumber ? this.that.deliAddress.formField.phoneNumber : null)
          },
          createdBy: this.that.authService.getUserInfo.winaccountName
        };

        return (result ? result : null);
      },
      validate(): boolean {
        if (!this.that.deliAddress.formField.address ||
            !this.that.deliAddress.formField.country.selected ||
            !this.that.deliAddress.formField.province.selected ||
            !this.that.deliAddress.formField.district.selected ||
            !this.that.deliAddress.formField.subdistrict.selected ||
            !this.that.deliAddress.formField.postalCode ||
            !this.that.deliAddress.formField.phoneNumber)
          return false;

        return true;
      },
      action() {
        this.isSaving = true;

        this.that.authService.getIsAuthenticated().then((result: boolean) => {
          if (!result) {
            this.isSaving = false;

            this.that.router.navigate(['SignIn']);
          }
          else {
            this.isValid = this.validate();

            if (this.isValid) {
              let value: {} = this.getValue();

              this.that.appService.save('TransDeliveryAddress', 'PUT', JSON.stringify(value), false).then((result: any) => {
                let saveResult: any = result;
                let message: string;
                let modalRef: any;

                this.isSaving = false;
                this.errorCode = saveResult.errorCode;

                if (this.errorCode !== 0 && this.errorCode !== 1) {
                  if (this.errorCode === 2) message = ('registered.error.notFound');

                  modalRef = this.that.modalService.getModalError(false, ModalErrorComponent, message);

                  this.that.modalService.close(modalRef).then((result: string) => {
                    if (result === 'close') {
                        if (this.errorCode === 2)
                          this.that.router.navigate(['TransactionRegistered']);
                    }
                  });
                }
                else {
                  if (this.errorCode === 0) {
                    this.that.data.transRegistered$.transDeliAddress.address      = this.that.deliAddress.formField.address;
                    this.that.data.transRegistered$.transDeliAddress.country      = this.that.deliAddress.formField.country.selected;
                    this.that.data.transRegistered$.transDeliAddress.province     = this.that.deliAddress.formField.province.selected;
                    this.that.data.transRegistered$.transDeliAddress.district     = this.that.deliAddress.formField.district.selected;
                    this.that.data.transRegistered$.transDeliAddress.subdistrict  = this.that.deliAddress.formField.subdistrict.selected;
                    this.that.data.transRegistered$.transDeliAddress.postalCode   = this.that.deliAddress.formField.postalCode;
                    this.that.data.transRegistered$.transDeliAddress.phoneNumber  = this.that.deliAddress.formField.phoneNumber;
                  }
                }
              });
            }
            else
              this.isSaving = false;
          }
        });
      }
    }
  };

  payment: any = {
    that: {},
    formField: {
      issueReceipt: '',
      qrcodeImage: ''
      //qrcodeImage: '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'
    },
    setValue(restore?: boolean) {
      this.watchChange();

      if (!restore)
        this.formField.issueReceipt = '';
      else
        this.formField.issueReceipt = (this.that.authService.getUserInfo.fullName.th ? this.that.authService.getUserInfo.fullName.th : this.that.authService.getUserInfo.fullName[this.that.appService.lang]);
    },
    watchChange() {
      this.saveChange.isValid = true;
      this.saveChange.errorCode = 0;
    },
    saveChange: {
      that: {},
      isSaving: false,
      isValid: true,
      errorCode: 0,
      getValue(): {} {
        let result: {} = {
          transRegisteredID: (this.that.data.transRegistered$.ID ? this.that.data.transRegistered$.ID : null),
          personID: (this.that.authService.getUserInfo.ppid ? this.that.authService.getUserInfo.ppid : this.that.authService.getUserInfo.winaccountName),
          transProjectID: (this.that.data.transRegistered$.transProject.ID ? this.that.data.transRegistered$.transProject.ID : null)
        };

        return (result ? result : null);
      },
      validate(): boolean {
        if (!this.that.payment.formField.issueReceipt)
          return false;

        return true;
      },
      action() {
        this.isSaving = true;

        this.that.authService.getIsAuthenticated().then((result: boolean) => {
          if (!result) {
            this.isSaving = false;

            this.that.router.navigate(['SignIn']);
          }
          else {
            this.isValid = this.validate();

            if (this.isValid) {
              //let modalRef = this.that.modalService.getModalConfirm(false, ModalConfirmComponent, 'save.confirm');

              //this.that.modalService.close(modalRef).then((result: string) => {
                //if (result === 'ok') {
                  let value: {} = this.getValue();

                  this.that.dataService.qrcode.get(('QRCodePayment/' + this.that.data.transRegistered$.transProject.project.category.initial + '/Get'), JSON.stringify(value)).then((result: Schema.QRCode) => {
                    let message: string;
                    let modalRef: any;

                    this.isSaving = false;
                    this.errorCode = result.errorCode;

                    if (this.errorCode !== 0 && this.errorCode !== 1) {
                      if (this.errorCode === 2) message = ('registered.error.notFound');

                      modalRef = this.that.modalService.getModalError(false, ModalErrorComponent, message);

                      this.that.modalService.close(modalRef).then((result: string) => {
                        if (result === 'close') {
                            if (this.errorCode === 2)
                              this.that.router.navigate(['TransactionRegistered']);
                        }
                      });
                    }
                    else {
                      if (this.errorCode === 0) {
                        this.that.data.transRegistered$.invoice.payment.status = 'W';
                        this.that.payment.formField.qrcodeImage = result.qrImage64;
                      }
                    }
                  });
            }
            else
              this.isSaving = false;
          }
        });
      }
    }
  }

  ngOnInit() {
    this.data.transRegistered$ = this.route.snapshot.data.transRegistered$;

    if (!this.data.transRegistered$) {
      let modalRef = this.modalService.getModalError(false, ModalErrorComponent, 'registered.error.notFound');

      this.modalService.close(modalRef).then((result: string) => {
        if (result === 'close')
          this.router.navigate(['TransactionRegistered']);
      });
    }
    else {
      //this.data.transRegistered$.invoice.payment.status = 'W';

      this.deliAddress.that = this;
      this.deliAddress.saveChange.that = this;
      this.deliAddress.setValue(true);

      this.payment.that = this;
      this.payment.saveChange.that = this;
      this.payment.setValue(true);
    }
  }
}
