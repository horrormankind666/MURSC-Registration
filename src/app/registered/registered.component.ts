/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๓>
Modify date : <๒๙/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../app.service';
import {AuthService} from '../auth.service';
import {Schema, DataService} from '../data.service';
import {ModalService} from '../modal/modal.service';

import {ModalSuccessComponent, ModalErrorComponent, ModalConfirmComponent} from '../modal/modal.component';

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

  projectAbout: any = {
    isCollapsed: false
  };

  transRegistered: any = {
    isLoading: false
  };

  registeredInfos: any = {
    show: false
  };

  location: any = {
    formField: {
      room: {
        selected: null
      }
    },
    setValue(restore?: boolean) {
      if (!restore)
        this.formField.room.selected = null;
    },
    watchChange() {
      this.saveChange.isValid = true;
    },
    saveChange: {
      that: {},
      isValid: true,
      getValue(): string {
        let result: string = (this.that.location.formField.room.selected.ID ? this.that.location.formField.room.selected.ID : null);

        return result;
      },
      validate(): boolean {
        if (!this.that.location.formField.room.selected)
          return false;

        return true;
      },
      action() {
        this.isValid = this.validate();
      }
    }
  };

  feeType: any = {
    that: {},
    toggle: [],
    address: {
      isSelected: false
    },
    totalFeeAmount: 0,
    setValue(restore?: boolean) {
      if (!restore) {
        this.toggle = [];
        this.address.isSelected = false;
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

      if (this.that.data.transProject$) {
        for (let i = 0; i < this.that.data.transProject$.transFeeType.length; i++) {
          if (this.that.data.transProject$.transFeeType[i].isSelected) {
            amount = (amount + this.that.data.transProject$.transFeeType[i].feeType.amount);
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
      getValue(): Schema.TransFeeType[] {
        let result: Schema.TransFeeType[] = [];

        for (let i = 0; i < this.that.data.transProject$.transFeeType.length; i++) {
          if (this.that.data.transProject$.transFeeType[i].isSelected)
            result.push(this.that.data.transProject$.transFeeType[i].feeType);
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
    },
    getListProvince(restore?: boolean) {
      let countryID: string = (this.formField.country.selected ? this.formField.country.selected.ID : null);

      this.formField.province.isLoading = true;
      this.formField.district.isLoading = true;
      this.formField.subdistrict.isLoading = true;
      this.that.dataService.province.getList(countryID).then((result: Schema.Province[]) => {
        this.formField.province.isLoading = false;
        this.that.data.province$ = result;
        this.formField.province.selected = null;

        this.getListDistrict();
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
        this.formField.district.selected = null;

        this.getListSubdistrict();
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

      this.formField.postalCode = postalCode;
      this.that.dataService.subdistrict.getList(countryID, provinceID, districtID).then((result: Schema.Subdistrict[]) => {
        this.formField.subdistrict.isLoading = false;
        this.that.data.subdistrict$ = result;
        this.formField.subdistrict.selected = null;
      });
    },
    watchChange() {
      this.saveChange.isValid = true;
    },
    saveChange: {
      that: {},
      isValid: true,
      getValue(): {} {
        let result: {};

        if (this.that.feeType.address.isSelected)
          result = {
            address: (this.that.deliAddress.formField.address ? this.that.deliAddress.formField.address : null),
            country: (this.that.deliAddress.formField.country.selected ? this.that.deliAddress.formField.country.selected.ID : null),
            province: (this.that.deliAddress.formField.province.selected ? this.that.deliAddress.formField.province.selected.ID : null),
            district: (this.that.deliAddress.formField.district.selected ? this.that.deliAddress.formField.district.selected.ID : null),
            subdistrict: (this.that.deliAddress.formField.subdistrict.selected ? this.that.deliAddress.formField.subdistrict.selected.ID : null),
            postalCode: (this.that.deliAddress.formField.postalCode ? this.that.deliAddress.formField.postalCode : null),
            phoneNumber: (this.that.deliAddress.formField.phoneNumber ? this.that.deliAddress.formField.phoneNumber : null)
          }

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

  ngOnInit() {
    this.data.transProject$ = this.route.snapshot.data.transProject$;

    if (!this.data.transProject$) {
      let modalRef = this.modalService.getModalError(false, ModalErrorComponent, 'project.error.notFound');

      this.modalService.close(modalRef).then((result: string) => {
        if (result === 'close')
          this.router.navigate(['Project/' + this.route.snapshot.params['projectCategory']]);
      });
    }
    else {
      this.transRegistered.isLoading = true;
      this.dataService.transRegistered.get(this.appService.getCUID(['', this.data.transProject$.ID])).then((result: Schema.TransRegistered) => {
        this.transRegistered.isLoading = false;
        this.data.transRegistered$ = result;

        if (this.data.transRegistered$) {
          let modalRef =  this.modalService.getModalError(false, ModalErrorComponent, 'registered.save.error.projectRegistered');

          this.modalService.close(modalRef).then((result: string) => {
            if (result === 'close')
              this.router.navigate(['Transaction/Registered/Detail/' + this.appService.getCUID([this.data.transRegistered$.ID, this.data.transProject$.ID])]);
          });
        }
        else {
          if (this.data.transProject$.registrationStatus === 'Y') {
            this.watchChange();

            this.deliAddress.formField.country.isLoading = true;
            this.dataService.country.getList().then((result: Schema.Country[]) => {
              this.deliAddress.formField.country.isLoading = false;
              this.data.country$ = result;
            });

            this.location.saveChange.that = this;
            this.location.setValue();

            this.feeType.that = this;
            this.feeType.saveChange.that = this;
            this.feeType.setValue();
            this.feeType.totalFeeAmount = this.feeType.getTotalFeeAmount();

            this.deliAddress.that = this;
            this.deliAddress.saveChange.that = this;
            this.deliAddress.setValue();

            this.saveChange.that = this;

            this.registeredInfos.show = true;
          }
        }
      });
    }
  }

  watchChange() {
    this.location.watchChange();
    this.feeType.watchChange();
    this.deliAddress.watchChange();
    this.saveChange.isValid = true;
  }

  saveChange = {
    that: {},
    isValid: true,
    getValue(): {} {
      let result: {} = {
        transProjectID: (this.that.data.transProject$.ID ? this.that.data.transProject$.ID : null),
        transLocationID: this.that.location.saveChange.getValue(),
        fee: this.that.feeType.saveChange.getValue(),
        deliAddress: this.that.deliAddress.saveChange.getValue()
      };

      return result;
    },
    validate(): boolean {
      if (!this.that.location.saveChange.isValid ||
          !this.that.feeType.saveChange.isValid ||
          !this.that.deliAddress.saveChange.isValid)
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
          this.that.location.saveChange.action();
          this.that.feeType.saveChange.action();
          this.that.deliAddress.saveChange.action();

          this.isValid = this.validate();

          this.that.appService.isLoading.show = false;
          this.that.appService.isLoading.checking = false;

          if (this.isValid) {
            let modalRef = this.that.modalService.getModalConfirm(false, ModalConfirmComponent, 'save.confirm');

            this.that.modalService.close(modalRef).then((result: string) => {
              if (result === 'ok') {
                let value: {} = this.getValue();

                this.that.appService.save('TransRegistered', 'POST', JSON.stringify(value)).then((result: any) => {
                  let saveResult: any = result;
                  let message: string;
                  let modalRef: any;

                  if (saveResult.errorCode !== 0 && saveResult.errorCode !== 1) {
                    if (saveResult.errorCode === 2) message = ('project.error.notFound');
                    if (saveResult.errorCode === 3) message = ('registered.save.error.projectRegistered');
                    if (saveResult.errorCode === 4) message = ('registered.save.error.registrationStatus.' + result.registrationStatus);
                    if (saveResult.errorCode === 5) message = ('registered.save.error.locationSelected');
                    if (saveResult.errorCode === 6) message = ('registered.save.error.seatAvailable');
                    if (saveResult.errorCode === 7) message = ('registered.save.error.fee');

                    modalRef = this.that.modalService.getModalError(false, ModalErrorComponent, message);

                    this.that.modalService.close(modalRef).then((result: string) => {
                      if (result === 'close') {
                        if (saveResult.errorCode === 2)
                          this.that.router.navigate(['Project/' + this.that.data.transProject$.project.category.initial]);
                        else {
                          if (saveResult.errorCode === 3)
                            this.that.router.navigate(['Transaction/Registered/Detail/' + this.that.appService.getCUID([saveResult.transRegisteredID, this.that.data.transProject$.ID])]);
                          else {
                            this.that.appService.isLoading.show = true;
                            this.that.appService.isLoading.loading = true;

                            this.that.dataService.transProject.get(this.that.appService.getCUID([this.that.data.transProject$.ID])).then((result: Schema.TransProject) => {
                              let transProject: Schema.TransProject = result;

                              if (saveResult.errorCode === 4) {
                                this.that.location.setValue();
                                this.that.feeType.setValue();
                                this.that.deliAddress.setValue();
                                this.that.data.transProject$ = transProject;
                                this.that.registeredInfos.show = false;
                              }
                              if (saveResult.errorCode === 5 || saveResult.errorCode === 6) {
                                if (saveResult.errorCode === 6)
                                  this.that.data.transProject$.seatAvailable = transProject.seatAvailable;

                                this.that.location.setValue();
                                this.that.data.transProject$.transLocation = transProject.transLocation;
                              }
                              if (saveResult.errorCode === 7) {
                                this.that.feeType.setValue();
                                this.that.deliAddress.setValue();
                                this.that.data.transProject$.transFeeType = transProject.transFeeType;
                                this.that.feeType.totalFeeAmount = this.that.feeType.getTotalFeeAmount();
                              }

                              this.that.appService.isLoading.show = false;
                              this.that.appService.isLoading.loading = false;
                            });
                          }
                        }
                      }
                    });
                  }
                  else {
                    if (saveResult.errorCode === 0) {
                      modalRef = this.that.modalService.getModalSuccess(false, ModalSuccessComponent, 'save.success');

                      this.that.modalService.close(modalRef).then((result: string) => {
                        if (result === 'close')
                          this.that.router.navigate(['Transaction/Registered/Detail/' + this.that.appService.getCUID([saveResult.transRegisteredID, this.that.data.transProject$.ID])]);
                      });
                    }
                  }
                });
              }
            });
          }
          else
            this.that.modalService.getModalError(false, ModalErrorComponent, 'save.error.validate');
        }
      });
    }
  };
}
