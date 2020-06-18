/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๓>
Modify date : <๑๗/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../../app.service';
import {AuthService} from '../../auth.service';
import {Schema, DataService} from '../../data.service';
import {ModalService} from '../../modal/modal.service';

import {ModalSuccessComponent, ModalErrorComponent, ModalConfirmComponent} from '../../modal/modal.component';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private modalService: ModalService
  ) {}

  data: any = {
    transProject$: null,
    transRegistered$: null,
    country$: null,
    province$: null,
    district$: null,
    subdistrict: null
  };
  loading: any = {
    country: true,
    province: false,
    district: false,
    subdistrict: false
  };
  formField: any = {
    location: {
      isValid: true,
      selected: null
    },
    feeType: {
      toggle: [],
      address: {
        isSelected: false
      }
    },
    deliAddress: {
      isValid: true,
      address: '',
      country: {
        selected: null
      },
      province: {
        selected: null
      },
      district: {
        selected: null
      },
      subdistrict: {
        selected: null
      },
      postalCode: '',
      phoneNumber: ''
    }
  }
  totalFeeAmount: number = 0;
  isCollapsed: any = {
    projectAbout: false
  };
  show: any = {
    registeredInfo: false
  };

  ngOnInit() {
    this.setValue();
    this.data.transProject$ = this.route.snapshot.data.transProject$;

    if (!this.data.transProject$) {
      let modalRef = this.modalService.getModalError(false, ModalErrorComponent, 'project.error.notFound');

      this.modalService.close(modalRef).then((result: string) => {
        if (result === 'close')
          this.router.navigate(['CBX']);
      });
    }
    else {
      this.dataService.transRegistered.get(
        '',
        (this.authService.getUserInfo['ppid'] ? this.authService.getUserInfo['ppid'] : this.authService.getUserInfo['winaccountName']),
        this.data.transProject$.ID
      ).then((result: Schema.TransRegistered) => {
        this.data.transRegistered$ = result;

        if (this.data.transRegistered$) {
          let modalRef =  this.modalService.getModalError(false, ModalErrorComponent, 'registered.save.error.projectRegistered');

          this.modalService.close(modalRef).then((result: string) => {
            if (result === 'close')
              this.router.navigate(['TransactionRegistered/Detail/' + this.data.transRegistered$.ID]);
          });
        }
        else {
          this.dataService.country.getList().then((result: Schema.Country[]) => {
            this.loading.country = false;
            this.data.country$ = result;
          });

          this.saveChange.that = this;
          this.totalFeeAmount = this.getTotalFeeAmount();

          if (this.data.transProject$.registrationStatus === 'Y')
            this.show.registeredInfo = true;
        }
      });
    }
  }

  setValue(section?: string) {
    if (!section || section === 'location') {
      this.formField.location.isValid = true;
      this.formField.location.selected = null;
    }

    if (!section || section === 'feeType') {
      this.formField.feeType.toggle = [];
      this.formField.feeType.address.isSelected = false;

      this.formField.deliAddress.isValid = true;
      this.formField.deliAddress.address = '';
      this.formField.deliAddress.country.selected = null;
      this.formField.deliAddress.province.selected = null;
      this.formField.deliAddress.district.selected = null;
      this.formField.deliAddress.subdistrict.selected = null;
      this.formField.deliAddress.postalCode = '';
      this.formField.deliAddress.phoneNumber = '';
    }
  }

  setToggle(transFeeType: Schema.TransFeeType) {
    if (transFeeType.feeType.toggle === 'Address') {
      this.formField.feeType.address.isSelected = transFeeType.isSelected;
      this.formField.feeType.toggle[transFeeType.feeType.toggle] = this.formField.feeType.address.isSelected
    }
  }

  getTotalFeeAmount(): number {
    let amount: number = 0;

    if (this.data.transProject$) {
      for (let i = 0; i < this.data.transProject$.transFeeType.length; i++) {
        if (this.data.transProject$.transFeeType[i].isSelected)
        {
          amount = (amount + this.data.transProject$.transFeeType[i].feeType.amount);
        }
      }
    }

    return amount;
  }

  getListProvince() {
    let countryID: string = (this.formField.deliAddress.country.selected ? this.formField.deliAddress.country.selected.ID : null);

    this.loading.province = true;
    this.loading.district = true;
    this.loading.subdistrict = true;
    this.dataService.province.getList(countryID).then((result: Schema.Province[]) => {
      this.loading.province = false;
      this.data.province$ = result;
      this.formField.deliAddress.province.selected = null;

      this.getListDistrict();
    });
  }

  getListDistrict() {
    let countryID: string = (this.formField.deliAddress.country.selected ? this.formField.deliAddress.country.selected.ID : null);
    let provinceID: string = (this.formField.deliAddress.province.selected ? this.formField.deliAddress.province.selected.ID : null);

    this.loading.district = true;
    this.loading.subdistrict = true;
    this.dataService.district.getList(countryID, provinceID).then((result: Schema.District[]) => {
      this.loading.district = false;
      this.data.district$ = result;
      this.formField.deliAddress.district.selected = null;

      this.getListSubdistrict();
    });
  }

  getListSubdistrict() {
    let countryID: string = (this.formField.deliAddress.country.selected ? this.formField.deliAddress.country.selected.ID : null);
    let provinceID: string = (this.formField.deliAddress.province.selected ? this.formField.deliAddress.province.selected.ID : null);
    let districtID: string = null;
    let postalCode: string = '';

    if (this.formField.deliAddress.district.selected) {
      districtID = this.formField.deliAddress.district.selected.ID;
      postalCode = this.formField.deliAddress.district.selected.zipCode;
    }

    this.formField.deliAddress.postalCode = postalCode;
    this.dataService.subdistrict.getList(countryID, provinceID, districtID).then((result: Schema.Subdistrict[]) => {
      this.loading.subdistrict = false;
      this.data.subdistrict$ = result;
      this.formField.deliAddress.subdistrict.selected = null;
    })
  }

  watchChange() {
    this.saveChange.error = false;
    this.formField.location.isValid = true;
    this.formField.deliAddress.isValid = true;
  }

  saveChange = {
    that: {},
    error: false,
    getValue(): {} {
      let fee: Schema.TransFeeType[] = [];
      let deliAddress: {};
      let result: {};

      for (let i = 0; i < this.that.data.transProject$.transFeeType.length; i++) {
        if (this.that.data.transProject$.transFeeType[i].isSelected)
          fee.push(this.that.data.transProject$.transFeeType[i].feeType);
      }

      if (this.that.formField.feeType.address.isSelected) {
        deliAddress = {
          address: (this.that.formField.deliAddress.address ? this.that.formField.deliAddress.address : null),
          country: (this.that.formField.deliAddress.country.selected ? this.that.formField.deliAddress.country.selected.ID : null),
          province: (this.that.formField.deliAddress.province.selected ? this.that.formField.deliAddress.province.selected.ID : null),
          district: (this.that.formField.deliAddress.district.selected ? this.that.formField.deliAddress.district.selected.ID : null),
          subdistrict: (this.that.formField.deliAddress.subdistrict.selected ? this.that.formField.deliAddress.subdistrict.selected.ID : null),
          postalCode: (this.that.formField.deliAddress.postalCode ? this.that.formField.deliAddress.postalCode : null),
          phoneNumber: (this.that.formField.deliAddress.phoneNumber ? this.that.formField.deliAddress.phoneNumber : null)
        }
      }

      result = {
        personID: (this.that.authService.getUserInfo.ppid ? this.that.authService.getUserInfo.ppid : this.that.authService.getUserInfo.winaccountName),
        transProjectID: (this.that.data.transProject$.ID ? this.that.data.transProject$.ID : null),
        transLocationID: (this.that.formField.location.selected.ID ? this.that.formField.location.selected.ID : null),
        fee: (fee ? fee : null),
        deliAddress: (deliAddress ? deliAddress : null),
        createdBy: this.that.authService.getUserInfo.winaccountName
      };

      return result;
    },
    validate(): boolean {
      let i: number = 0;

      if (!this.that.formField.location.selected) {this.that.formField.location.isValid = false; i++;}
      if (this.that.formField.feeType.address.isSelected) {
        if (!this.that.formField.deliAddress.address ||
            !this.that.formField.deliAddress.country.selected ||
            !this.that.formField.deliAddress.province.selected ||
            !this.that.formField.deliAddress.district.selected ||
            !this.that.formField.deliAddress.subdistrict.selected ||
            !this.that.formField.deliAddress.postalCode ||
            !this.that.formField.deliAddress.phoneNumber) {
          this.that.formField.feeType.toggle.Address = true;
          this.that.formField.deliAddress.isValid = false;
          i++;
        }
      }

      this.error = (i > 0 ? true : false);

      return !this.error;
    },
    action() {
      this.that.appService.isLoading.show = true;
      this.that.appService.isLoading.checking = true;

      this.that.authService.getAuthenResource().then((result: any) => {
        if (!this.that.authService.isAuthenticated)
        {
          this.that.appService.isLoading.show = false;
          this.that.appService.isLoading.checking = false;

          this.that.router.navigate(['SignIn']);
        }
        else {
          if (this.validate()) {
            this.that.appService.isLoading.show = false;
            this.that.appService.isLoading.checking = false;

            let modalRef = this.that.modalService.getModalConfirm(false, ModalConfirmComponent, 'save.confirm');

            this.that.modalService.close(modalRef).then((result: string) => {
              if (result === 'ok') {
                let value: {} = this.getValue();

                this.that.appService.save('TransRegistered', 'POST', JSON.stringify(value)).then((result: any) => {
                  let saveResult: any = result;
                  let message: string;
                  let modalRef: any;

                  if (saveResult.errorCode !== 0 && saveResult.errorCode !== 1) {
                    this.error = true;

                    if (saveResult.errorCode === 2) message = ('project.error.notFound');
                    if (saveResult.errorCode === 3) message = ('registered.save.error.projectRegistered');
                    if (saveResult.errorCode === 4) message = ('registered.save.error.registrationStatus.' + result.registrationStatus);
                    if (saveResult.errorCode === 5) message = ('registered.save.error.locationSelected');
                    if (saveResult.errorCode === 6) message = ('registered.save.error.seatAvailable');
                    if (saveResult.errorCode === 7) message = ('registered.save.error.fee');

                    if (this.error) {
                      modalRef = this.that.modalService.getModalError(false, ModalErrorComponent, message);

                      this.that.modalService.close(modalRef).then((result: string) => {
                        if (result === 'close') {
                          if (saveResult.errorCode === 3)
                            this.that.router.navigate(['TransactionRegistered/Detail/' + saveResult.transRegisteredID]);
                          else {
                            this.that.appService.isLoading.show = true;
                            this.that.appService.isLoading.loading = true;

                            this.that.dataService.transProject.get(this.that.data.transProject$.ID).then((result: Schema.TransProject) => {
                              let transProject: Schema.TransProject = result;

                              if (saveResult.errorCode === 2 || saveResult.errorCode === 4) {
                                this.that.setValue();
                                this.that.data.transProject$ = transProject;
                              }
                              if (saveResult.errorCode === 5 || saveResult.errorCode === 6) {
                                if (saveResult.errorCode === 6)
                                  this.that.data.transProject$.seatAvailable = transProject.seatAvailable;

                                this.that.setValue('location');
                                this.that.data.transProject$.transLocation = transProject.transLocation;
                              }
                              if (saveResult.errorCode === 7) {
                                this.that.setValue('feeType');
                                this.that.data.transProject$.transFeeType = transProject.transFeeType;
                                this.that.totalFeeAmount = this.that.getTotalFeeAmount();
                              }

                              this.that.appService.isLoading.show = false;
                              this.that.appService.isLoading.loading = false;
                            });
                          }
                        }
                      });
                    }
                  }
                  else {
                    if (saveResult.errorCode === 0) {
                      modalRef = this.that.modalService.getModalSuccess(false, ModalSuccessComponent, 'save.success');

                      this.that.modalService.close(modalRef).then((result: string) => {
                        if (result === 'close')
                          this.that.router.navigate(['TransactionRegistered/Detail/' + saveResult.transRegisteredID]);
                      });
                    }
                  }
                });
              }
            });
          }
          else {
            this.that.appService.isLoading.show = false;
            this.that.appService.isLoading.checking = false;

            this.that.modalService.getModalError(false, ModalErrorComponent, 'save.error.validate');
          }
        }
      });
    }
  }
}
