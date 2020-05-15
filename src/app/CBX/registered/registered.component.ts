/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๑/๐๔/๒๕๖๓>
Modify date : <๑๔/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DeviceDetectorService} from 'ngx-device-detector';

import {AppService} from '../../app.service';
import {AuthService} from '../../auth.service';
import {Schema, DataService} from '../../data.service';
import {ModalService} from '../../modal/modal.service';

import {ModalErrorComponent, ModalConfirmComponent} from '../../modal/modal.component';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private modalService: ModalService
  ) { }

  data$: Schema.CBX.TransProject;
  totalFeeAmount: number = 0;
  formField: any = {
    location: {
      selected: null,
      isValid: true,
    },
    feeType: {
      toggle: []
    }
  }

  ngOnInit() {
    this.saveChange.that = this;
    this.data$ = this.route.snapshot.data.transProject$;
    this.totalFeeAmount = this.getTotalFeeAmount();
  }

  ngAfterViewInit() {
    if (!this.data$)
      this.modalService.getModalError(false, ModalErrorComponent, 'project.error.notFound');
  }

  setToggle(feeType: Schema.CBX.TransFeeType) {
    if (feeType.toggle === 'Address')
      this.formField.feeType.toggle[feeType.transFeeTypeID] = feeType.isSelected
  }

  getTotalFeeAmount(): number {
    let amount: number = 0;

    if (this.data$) {
      for (var i = 0; i < this.data$.feeType.length; i++) {
        if (this.data$.feeType[i].isSelected)
        {
          amount = (amount + this.data$.feeType[i].amount);
        }
      }
    }

    return amount;
  }

  watchChange() {
    this.saveChange.error = false;
    this.formField.location.isValid = true;
  }

  saveChange = {
    that: {},
    error: false,
    validate(): boolean {
      let i: number = 0;

      if (!this.that.formField.location.selected) {this.that.formField.location.isValid = false; i++;}

      this.error = (i > 0 ? true : false);

      return !this.error;
    },
    action() {
      this.that.watchChange();
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
            this.that.dataService.cbx.transProject.get(this.that.data$.transProjectID).then((result: Schema.CBX.TransProject) => {
              let transProject: Schema.CBX.TransProject = result;
              let transLocation: Schema.CBX.TransLocation;
              let message: string;
              let modalRef: any;

              if (transProject.registrationStatus !== 'Y') {
                this.error = true;
                message = ('registered.save.error.registrationStatus.' + transProject.registrationStatus);
              }
              else {
                transLocation = transProject.location.filter(l => l.transLocationID === this.that.formField.location.selected.transLocationID)[0];

                if (transLocation.seatAvailable === 0) {
                  this.error = true;
                  message = 'registered.save.error.seatAvailable';
                }
              }

              this.that.appService.isLoading.show = false;
              this.that.appService.isLoading.checking = false;

              if (this.error) {
                modalRef = this.that.modalService.getModalError(false, ModalErrorComponent, message);

                this.that.modalService.close(modalRef).then((result: string) => {
                  if (result === 'close') {
                    if (transProject.registrationStatus !== 'Y')
                      this.that.data$ = transProject;
                    else
                      this.that.data$.location = transProject.location;
                  }
                });
              }
              else {
                modalRef = this.that.modalService.getModalConfirm(false, ModalConfirmComponent, 'save.confirm');

                this.that.modalService.close(modalRef).then((result: string) => {
                  if (result === 'ok') {
                    console.log(result);
                  }
                });
              }
            });
          }
          else {
            this.that.appService.isLoading.show = false;
            this.that.appService.isLoading.checking = false;

            this.that.modalService.getModalError(false, ModalErrorComponent, 'save.error');
          }
        }
      });
    }
  }
  /*
            saveChange: {
                validate: function () {
                    var i = 0;

                    if (self.addedit.isAdd || self.addedit.isEdit)
                    {
                        if (!self.addedit.formField.code) { self.addedit.formValidate.isValid.code = false; i++; }
                        if (!self.addedit.formField.name.TH) { self.addedit.formValidate.isValid.name.TH = false; i++; }
                        if (!self.addedit.formField.name.EN) { self.addedit.formValidate.isValid.name.EN = false; i++; }
                        if (!self.addedit.formField.concise.TH) { self.addedit.formValidate.isValid.concise.TH = false; i++; }
                        if (!self.addedit.formField.concise.EN) { self.addedit.formValidate.isValid.concise.EN = false; i++; }
                    }

                    self.addedit.formValidate.showSaveError = (i > 0 ? true : false);

                    return (i > 0 ? false : true);
                },
                action: function () {
                    if (this.validate())
                    {
                        var action;

                        if (self.addedit.isAdd)     action = "add";
                        if (self.addedit.isEdit)    action = "edit";
                        if (self.addedit.isDelete)  action = "remove";

                        utilServ.dialogConfirmWithDict([action, "confirm"], function (result) {
                            if (result)
                            {
                                var data = self.addedit.getValue();

                                if (self.addedit.isDelete)
                                    utilServ.getDialogPreloadingWithDict(["msgPreloading", "removing"]);

                                appServ.save.action({
                                    routePrefix: "Faculty",
                                    action: action,
                                    data: [data]
                                }).then(function (result) {
                                    if (result.status)
                                    {
                                        if (self.addedit.isAdd || self.addedit.isEdit)
                                        {
                                            var action = self.addedit.template.action;

                                            self.addedit[action].setValue().then(function () {
                                                self.addedit.isFormChanged = false;
                                                self.addedit.resetValue();
                                            });
                                        }
                                        if (self.addedit.isDelete)
                                        {
                                            var obj = self.table.reload;

                                            obj.isPreloading = false;
                                            obj.isResetDataSource = true;
                                            obj.order = [{
                                                table: "facultyVerified",
                                                isFirstPage: false
                                            }];
                                            obj.action();
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        utilServ.gotoTopPage();
                        utilServ.dialogErrorWithDict(["save", "error"], function () { });
                    }
                }
  */
}
