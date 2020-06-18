/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๑๗/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {AppService} from './app.service';

export namespace Schema {
  export interface Country {
    ID?: string,
    name?: {
      th?: string,
      en?: string
    },
    isoCountryCodes2Letter?: string,
    isoCountryCodes3Letter?: string
  };

  export interface Province {
    ID?: string,
    countryID?: string,
    isoCountryCodes3Letter?: string,
    name?: {
      th?: string,
      en?: string
    },
    regional?: string
  }

  export interface District {
    ID?: string,
    countryID?: string,
    isoCountryCodes3Letter?: string,
    provinceID?: string,
    provinceName?: {
      th?: string,
      en?: string
    },
    name?: {
      th?: string,
      en?: string
    },
    zipCode?: string
  }

  export interface Subdistrict {
    ID?: string,
    countryID?: string,
    isoCountryCodes3Letter?: string,
    provinceID?: string,
    provinceName?: {
      th?: string,
      en?: string
    },
    districtID?: string,
    districtName?: {
      th?: string,
      en?: string
    },
    zipCode?: string,
    name?: {
      th?: string,
      en?: string
    }
  }

  export interface ProjectCategory {
    ID?: string,
    name?: {
      th?: string,
      en?: string
    },
    logo?: string,
    initial?: string
  }

  export interface Project {
    ID?: string,
    category?: ProjectCategory,
    type?: string,
    name?: {
      th?: string,
      en?: string,
    },
    about?: string,
    ownerCode?: string,
    minimumPassScore?: number,
    logo?: string
  }

  export interface ContactPerson {
    ID?: string,
    transProjectID?: string,
    fullName?: {
      th?: string,
      en?: string
    },
    email?: string,
    phoneNumber?: string
  }

  export interface Faculty {
    code?: string;
    name?: {
      th?: string,
      en?: string
    }
  }

  export interface Building {
    ID?: string,
    name?: {
      th?: string,
      en?: string
    },
    faculty?: Faculty
  }

  export interface Location {
    ID?: string,
    building?: Building,
    name?: {
      th?: string,
      en?: string,
    },
    seatMaximum?: number
  }

  export interface FeeType {
    ID?: string,
    name?: {
      th?: string,
      en?: string
    };
    amount?: number,
    toggle?: string
  }

  export interface Invoice {
    ID?: string,
    transRegisteredID?: string,
    name?: {
      th?: string,
      en?: string
    };
    namePrintReceipt?: string,
    billerID?: string,
    qrRef_1?: string,
    qrRef_2?: string,
    qrRef_3?: string,
    bankRequest?: string,
    bankTransID?: string,
    payment?: {
      amount?: number,
      by?: string,
      date?: string,
      status?: string
    }
  }

  export interface InvoiceFee {
    invoiceID?: string,
    feeType?: FeeType
  }

  export interface TransProject {
    ID?: string,
    project?: Project,
    examDate?: string,
    registrationDate?: {
      startDate?: string,
      endDate?: string
    },
    lastPaymentDate?: string,
    maximumSeat?: number,
    seatAvailable?: number,
    minimumFee?: string,
    contactPerson?: ContactPerson,
    registrationStatus?: string,
    transLocation?: TransLocation[],
    transFeeType?: TransFeeType[]
  }

  export interface TransLocation {
    ID?: string,
    transProjectID?: string,
    location?: Location,
    seatTotal?: number,
    seatAvailable?: number
  }

  export interface TransFeeType {
    ID?: string;
    transProjectID?: string,
    feeType?: FeeType;
    requiredStatus?: string,
    isSelected?: boolean
  }

  export interface TransDeliAddress {
    ID?: string,
    transRegisteredID?: string,
    address?: string,
    country?: Country,
    province?: Province,
    district?: District,
    subdistrict?: Subdistrict,
    postalCode?: string,
    phoneNumber?: string
  }

  export interface TransRegistered {
    ID?: string,
    registeredDate?: string,
    transProject?: TransProject,
    transLocation?: TransLocation,
    transDeliAddress?: TransDeliAddress,
    invoice?: Invoice,
    invoiceFee?: InvoiceFee[],
    totalFeeAmount?: number
  }

  export interface Statuses {
    ID?: string;
    name: {
      th?: string,
      en?: string
    }
  }
}

namespace Data {
  export class Country {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.Country[]> {
      return this.appService.getDataSource('Country', action, query).then((result: []) => {
        let country: Schema.Country[] = [];

        for (let dr of result) {
          country.push({
            ID: (dr['id'] ? dr['id'] : ''),
            name: {
              th: (dr['countryNameTH'] ? dr['countryNameTH'] : dr['countryNameEN']),
              en: (dr['countryNameEN'] ? dr['countryNameEN'] : dr['countryNameTH'])
            },
            isoCountryCodes2Letter: (dr['isoCountryCodes2Letter'] ? dr['isoCountryCodes2Letter'] : ''),
            isoCountryCodes3Letter: (dr['isoCountryCodes3Letter'] ? dr['isoCountryCodes3Letter'] : '')
          });
        }

        return country.sort((a, b) => (a.name.th < b.name.th ? -1 : Number(a.name.th > b.name.th)));
      });
    }

    getList(): Promise<Schema.Country[]> {
      return this.getDataSource('getlist').then((result: Schema.Country[]) => {
        return result;
      })
    }

    get(countryID: string): Promise<Schema.Country> {
      let query = [
        '',
        ('country=' + countryID)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.Country[]) => {
        return result[0];
      });
    }
  }

  export class Province {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.Province[]> {
      return this.appService.getDataSource('Province', action, query).then((result: []) => {
        let province: Schema.Province[] = [];

        for (let dr of result) {
          province.push({
            ID: (dr['id'] ? dr['id'] : ''),
            countryID: (dr['plcCountryId'] ? dr['plcCountryId'] : ''),
            isoCountryCodes3Letter: (dr['isoCountryCodes3Letter'] ? dr['isoCountryCodes3Letter'] : ''),
            name: {
              th: (dr['provinceNameTH'] ? dr['provinceNameTH'] : dr['provinceNameEN']),
              en: (dr['provinceNameEN'] ? dr['provinceNameEN'] : dr['provinceNameTH'])
            },
            regional: (dr['regionalName'] ? dr['regionalName'] : '')
          });
        }

        return province.sort((a, b) => (a.name.th < b.name.th ? -1 : Number(a.name.th > b.name.th)));
      });
    }

    getList(countryID: string): Promise<Schema.Province[]> {
      let query = [
        '',
        ('country=' + countryID)
      ].join('&');

      return this.getDataSource('getlist', query).then((result: Schema.Country[]) => {
        return result;
      })
    }

    get(countryID: string, provinceID: string): Promise<Schema.Country> {
      let query = [
        '',
        ('country=' + countryID),
        ('province=' + provinceID)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.Country[]) => {
        return result[0];
      });
    }
  }

  export class District {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.District[]> {
      return this.appService.getDataSource('District', action, query).then((result: []) => {
        let district: Schema.District[] = [];

        for (let dr of result) {
          district.push({
            ID: (dr['id'] ? dr['id'] : ''),
            countryID: (dr['plcCountryId'] ? dr['plcCountryId'] : ''),
            isoCountryCodes3Letter: (dr['isoCountryCodes3Letter'] ? dr['isoCountryCodes3Letter'] : ''),
            provinceID: (dr['plcProvinceId'] ? dr['plcProvinceId'] : ''),
            provinceName: {
              th: (dr['provinceNameTH'] ? dr['provinceNameTH'] : dr['provinceNameEN']),
              en: (dr['provinceNameEN'] ? dr['provinceNameEN'] : dr['provinceNameTH'])
            },
            name: {
              th: (dr['districtNameTH'] ? dr['districtNameTH'] : dr['districtNameEN']),
              en: (dr['districtNameEN'] ? dr['districtNameEN'] : dr['districtNameTH'])
            },
            zipCode: (dr['zipCode'] ? dr['zipCode'] : '')
          });
        }

        return district.sort((a, b) => (a.name.th < b.name.th ? -1 : Number(a.name.th > b.name.th)));
      });
    }

    getList(countryID: string, provinceID: string): Promise<Schema.District[]> {
      let query = [
        '',
        ('country=' + countryID),
        ('province=' + provinceID)
      ].join('&');

      return this.getDataSource('getlist', query).then((result: Schema.District[]) => {
        return result;
      })
    }

    get(countryID: string, provinceID: string, districtID: string): Promise<Schema.District> {
      let query = [
        '',
        ('country=' + countryID),
        ('province=' + provinceID),
        ('district=' + districtID)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.Country[]) => {
        return result[0];
      });
    }
  }

  export class Subdistrict {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.Subdistrict[]> {
      return this.appService.getDataSource('Subdistrict', action, query).then((result: []) => {
        let subdistrict: Schema.Subdistrict[] = [];

        for (let dr of result) {
          subdistrict.push({
            ID: (dr['id'] ? dr['id'] : ''),
            countryID: (dr['plcCountryId'] ? dr['plcCountryId'] : ''),
            isoCountryCodes3Letter: (dr['isoCountryCodes3Letter'] ? dr['isoCountryCodes3Letter'] : ''),
            provinceID: (dr['plcProvinceId'] ? dr['plcProvinceId'] : ''),
            provinceName: {
              th: (dr['provinceNameTH'] ? dr['provinceNameTH'] : dr['provinceNameEN']),
              en: (dr['provinceNameEN'] ? dr['provinceNameEN'] : dr['provinceNameTH'])
            },
            districtID: (dr['plcDistrictId'] ? dr['plcDistrictId'] : ''),
            districtName: {
              th: (dr['districtNameTH'] ? dr['districtNameTH'] : dr['districtNameEN']),
              en: (dr['districtNameEN'] ? dr['districtNameEN'] : dr['districtNameTH'])
            },
            zipCode: (dr['zipCode'] ? dr['zipCode'] : ''),
            name: {
              th: (dr['subdistrictNameTH'] ? dr['subdistrictNameTH'] : dr['subdistrictNameEN']),
              en: (dr['subdistrictNameEN'] ? dr['subdistrictNameEN'] : dr['subdistrictNameTH'])
            }
          });
        }

        return subdistrict.sort((a, b) => (a.name.th < b.name.th ? -1 : Number(a.name.th > b.name.th)));
      });
    }

    getList(countryID: string, provinceID: string, districtID: string): Promise<Schema.Subdistrict[]> {
      let query = [
        '',
        ('country=' + countryID),
        ('province=' + provinceID),
        ('district=' + districtID)
      ].join('&');

      return this.getDataSource('getlist', query).then((result: Schema.Subdistrict[]) => {
        return result;
      })
    }

    get(countryID: string, provinceID: string, districtID: string, subdistrictID: string): Promise<Schema.Subdistrict> {
      let query = [
        '',
        ('country=' + countryID),
        ('province=' + provinceID),
        ('district=' + districtID),
        ('subdistrict=' + subdistrictID)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.Subdistrict[]) => {
        return result[0];
      });
    }
  }

  export class ProjectCategory {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.ProjectCategory[]> {
      return this.appService.getDataSource('ProjectCategory', action, query).then((result: []) => {
        let projectCategory: Schema.ProjectCategory[] = [];

        for (let dr of result) {
          projectCategory.push({
            ID: (dr['ID'] ? dr['ID'] : ''),
            name: {
              th: (dr['projectCategoryNameTH'] ? dr['projectCategoryNameTH'] : dr['projectCategoryNameEN']),
              en: (dr['projectCategoryNameEN'] ? dr['projectCategoryNameEN'] : dr['projectCategoryNameTH'])
            },
            logo: (dr['logo'] ? dr['logo'] : ''),
            initial: (dr['initial'] ? dr['initial'] : '')
          });
        }

        return projectCategory;
      });
    }

    getList(): Promise<Schema.ProjectCategory[]> {
      return this.getDataSource('getlist').then((result: Schema.ProjectCategory[]) => {
        return result;
      })
    }
  }

  export class TransProject {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.TransProject[]> {
      return this.appService.getDataSource('TransProject', action, query).then((result: []) => {
        let transProject: Schema.TransProject[] = [];
        let transLocation: Schema.TransLocation[] = [];
        let transFeeType: Schema.TransFeeType[] = [];

        for (let dr1 of result) {
          if (action === 'getlist') {
            transProject.push({
              ID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
              project: {
                ID: (dr1['projectID'] ? dr1['projectID'] : ''),
                category: {
                  ID: (dr1['projectCategoryID'] ? dr1['projectCategoryID'] : ''),
                  name: {
                    th: (dr1['projectCategoryNameTH'] ? dr1['projectCategoryNameTH'] : dr1['projectCategoryNameEN']),
                    en: (dr1['projectCategoryNameEN'] ? dr1['projectCategoryNameEN'] : dr1['projectCategoryNameTH'])
                  },
                  initial: (dr1['projectCategoryInitial'] ? dr1['projectCategoryInitial'] : '')
                },
                logo: (dr1['logo'] ? dr1['logo'] : ''),
                name: {
                  th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : dr1['projectNameEN']),
                  en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                },
                about: (dr1['about'] ? dr1['about'] : '')
              },
              examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
              registrationDate: {
                startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
              },
              maximumSeat: (dr1['maximumSeat'] ? parseInt(dr1['maximumSeat']) : 0),
              seatAvailable: dr1['seatAvailable'],
              minimumFee: (dr1['minimumFee'] ? dr1['minimumFee'] : ''),
              contactPerson: {
                fullName: {
                  th: (dr1['contactNameTH'] ? dr1['contactNameTH'] : dr1['contactNameEN']),
                  en: (dr1['contactNameEN'] ? dr1['contactNameEN'] : dr1['contactNameTH'])
                },
                email: (dr1['contactEmail'] ? dr1['contactEmail'] : ''),
                phoneNumber: (dr1['contactPhone'] ? dr1['contactPhone'] : '')
              },
              registrationStatus: (dr1['registrationStatus'] ? dr1['registrationStatus'] : '')
            });
          }

          if (action === 'get') {
            let location: [] = (dr1['location'] ? dr1['location'] : []);
            let feeType: [] = (dr1['feeType'] ? dr1['feeType'] : []);

            for (let dr2 of location) {
              transLocation.push({
                ID: (dr2['transLocationID'] ? dr2['transLocationID'] : ''),
                transProjectID: (dr2['transProjectID'] ? dr2['transProjectID'] : ''),
                location: {
                  ID: (dr2['locationID'] ? dr2['locationID'] : ''),
                  name: {
                    th: (dr2['locationNameTH'] ? dr2['locationNameTH'] : dr2['locationNameEN']),
                    en: (dr2['locationNameEN'] ? dr2['locationNameEN'] : dr2['locationNameTH'])
                  },
                  building: {
                    ID: (dr2['buildingID'] ? dr2['buildingID'] : ''),
                    name: {
                      th: (dr2['buildingNameTH'] ? dr2['buildingNameTH'] : dr2['buildingNameEN']),
                      en: (dr2['buildingNameEN'] ? dr2['buildingNameEN'] : dr2['buildingNameTH'])
                    }
                  },
                },
                seatTotal: (dr2['seatTotal'] ? parseInt(dr2['seatTotal']) : 0),
                seatAvailable: (dr2['seatAvailable'] ? parseInt(dr2['seatAvailable']) : 0)
              });
            }

            for (let dr3 of feeType) {
              transFeeType.push({
                ID: (dr3['transFeeTypeID'] ? dr3['transFeeTypeID'] : ''),
                transProjectID: (dr3['transProjectID'] ? dr3['transProjectID'] : ''),
                feeType: {
                  ID: (dr3['feeTypeID'] ? dr3['feeTypeID'] : ''),
                  name: {
                    th: (dr3['feeTypeNameTH'] ? dr3['feeTypeNameTH'] : dr3['feeTypeNameEN']),
                    en: (dr3['feeTypeNameEN'] ? dr3['feeTypeNameEN'] : dr3['feeTypeNameTH'])
                  },
                  amount: (dr3['amount'] ? parseFloat(dr3['amount']) : 0),
                  toggle: (dr3['toggle'] ? dr3['toggle'] : ''),
                },
                requiredStatus: (dr3['requiredStatus'] ? dr3['requiredStatus'] : ''),
                isSelected: (dr3['requiredStatus'] ? (dr3['requiredStatus'] === 'Y' ? true : false) : false),
              });
            }

            transProject.push({
              ID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
              project: {
                ID: (dr1['projectID'] ? dr1['projectID'] : ''),
                category: {
                  ID: (dr1['projectCategoryID'] ? dr1['projectCategoryID'] : ''),
                  name: {
                    th: (dr1['projectCategoryNameTH'] ? dr1['projectCategoryNameTH'] : dr1['projectCategoryNameEN']),
                    en: (dr1['projectCategoryNameEN'] ? dr1['projectCategoryNameEN'] : dr1['projectCategoryNameTH'])
                  },
                  initial: (dr1['projectCategoryInitial'] ? dr1['projectCategoryInitial'] : '')
                },
                logo: (dr1['logo'] ? dr1['logo'] : ''),
                name: {
                  th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : dr1['projectNameEN']),
                  en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                },
                about: (dr1['about'] ? dr1['about'] : '')
              },
              examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
              registrationDate: {
                startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
              },
              lastPaymentDate: (dr1['lastPaymentDates'] ? dr1['lastPaymentDates'] : ''),
              maximumSeat: (dr1['maximumSeat'] ? parseInt(dr1['maximumSeat']) : 0),
              seatAvailable: (dr1['seatAvailable'] ? (parseInt(dr1['seatAvailable']) > 0 ? (parseInt(dr1['maximumSeat']) - parseInt(dr1['seatAvailable'])) : 0) : 0),
              minimumFee: (dr1['minimumFee'] ? dr1['minimumFee'] : ''),
              contactPerson: {
                fullName: {
                  th: (dr1['contactNameTH'] ? dr1['contactNameTH'] : dr1['contactNameEN']),
                  en: (dr1['contactNameEN'] ? dr1['contactNameEN'] : dr1['contactNameTH'])
                },
                email: (dr1['contactEmail'] ? dr1['contactEmail'] : ''),
                phoneNumber: (dr1['contactPhone'] ? dr1['contactPhone'] : '')
              },
              registrationStatus: (dr1['registrationStatus'] ? dr1['registrationStatus'] : ''),
              transLocation: transLocation,
              transFeeType: transFeeType
            });
          }
        }

        return transProject;
      });
    }

    getList(projectCategory: string): Promise<Schema.TransProject[]> {
      let query = [
        '',
        ('projectCategory=' + projectCategory)
      ].join('&');

      return this.getDataSource('getlist', query).then((result: Schema.TransProject[]) => {
        return result;
      })
    }

    get(transProjectID: string): Promise<Schema.TransProject> {
      let query = [
        '',
        ('transProjectID=' + transProjectID)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.TransProject[]) => {
        return result[0];
      });
    }
  }

  export class TransRegistered {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.TransRegistered[]> {
      return this.appService.getDataSource('TransRegistered', action, query).then((result: []) => {
        let transRegistered: Schema.TransRegistered[] = [];
        let transProject: Schema.TransProject = {};
        let transLocation: Schema.TransLocation = {};
        let transDeliAddress: Schema.TransDeliAddress = {};
        let invoiceFee: Schema.InvoiceFee[] = [];

        for (let dr1 of result) {
          if (action === 'get') {
            let fee: [] = (dr1['fee'] ? dr1['fee'] : []);

            transProject = {
              ID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
              project: {
                ID: (dr1['projectID'] ? dr1['projectID'] : ''),
                category: {
                  ID: (dr1['projectCategoryID'] ? dr1['projectCategoryID'] : ''),
                  name: {
                    th: (dr1['projectCategoryNameTH'] ? dr1['projectCategoryNameTH'] : dr1['projectCategoryNameEN']),
                    en: (dr1['projectCategoryNameEN'] ? dr1['projectCategoryNameEN'] : dr1['projectCategoryNameTH'])
                  },
                  initial: (dr1['projectCategoryInitial'] ? dr1['projectCategoryInitial'] : '')
                },
                logo: (dr1['logo'] ? dr1['logo'] : ''),
                name: {
                  th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : dr1['projectNameEN']),
                  en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                },
                about: (dr1['about'] ? dr1['about'] : '')
              },
              examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
              lastPaymentDate: (dr1['lastPaymentDates'] ? dr1['lastPaymentDates'] : ''),
              contactPerson: {
                fullName: {
                  th: (dr1['contactNameTH'] ? dr1['contactNameTH'] : dr1['contactNameEN']),
                  en: (dr1['contactNameEN'] ? dr1['contactNameEN'] : dr1['contactNameTH'])
                },
                email: (dr1['contactEmail'] ? dr1['contactEmail'] : ''),
                phoneNumber: (dr1['contactPhone'] ? dr1['contactPhone'] : '')
              }
            };

            transLocation = {
              ID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
              location: {
                ID: (dr1['locationID'] ? dr1['locationID'] : ''),
                name: {
                  th: (dr1['locationNameTH'] ? dr1['locationNameTH'] : dr1['locationNameEN']),
                  en: (dr1['locationNameEN'] ? dr1['locationNameEN'] : dr1['locationNameTH'])
                },
                building: {
                  ID: (dr1['buildingID'] ? dr1['buildingID'] : ''),
                  name: {
                    th: (dr1['buildingNameTH'] ? dr1['buildingNameTH'] : dr1['buildingNameEN']),
                    en: (dr1['buildingNameEN'] ? dr1['buildingNameEN'] : dr1['buildingNameTH'])
                  }
                },
              }
            };

            transDeliAddress = {
              ID: (dr1['transDeliAddressID'] ? dr1['transDeliAddressID'] : ''),
              address: (dr1['address'] ? dr1['address'] : ''),
              country: (dr1['country'] ? dr1['country'][0] : null),
              province: (dr1['province'] ? dr1['province'][0] : null),
              district: (dr1['district'] ? dr1['district'][0] : null),
              subdistrict: (dr1['subdistrict'] ? dr1['subdistrict'][0] : null),
              postalCode: (dr1['postalCode'] ? dr1['postalCode'] : ''),
              phoneNumber: (dr1['phoneNumber'] ? dr1['phoneNumber'] : ''),
            };

            for (let dr2 of fee) {
              invoiceFee.push({
                invoiceID: (dr2['invoiceID'] ? dr2['invoiceID'] : ''),
                feeType: {
                  ID: (dr2['feeTypeID'] ? dr2['feeTypeID'] : ''),
                  name: {
                    th: (dr2['feeTypeNameTH'] ? dr2['feeTypeNameTH'] : dr2['feeTypeNameEN']),
                    en: (dr2['feeTypeNameEN'] ? dr2['feeTypeNameEN'] : dr2['feeTypeNameTH'])
                  },
                  amount: (dr2['amount'] ? parseFloat(dr2['amount']) : 0)
                }
              });
            }

            transRegistered.push({
              ID: (dr1['transRegisteredID'] ? dr1['transRegisteredID'] : ''),
              registeredDate: (dr1['registeredDates'] ? dr1['registeredDates'] : ''),
              transProject: transProject,
              transLocation: transLocation,
              transDeliAddress: transDeliAddress,
              invoice: {
                ID: (dr1['invoiceID'] ? dr1['invoiceID'] : ''),
                name: {
                  th: (dr1['invoiceNameTH'] ? dr1['invoiceNameTH'] : dr1['invoiceNameEN']),
                  en: (dr1['invoiceNameEN'] ? dr1['invoiceNameEN'] : dr1['invoiceNameTH'])
                },
                namePrintReceipt: (dr1['invoiceNamePrintReceipt'] ? dr1['invoiceNamePrintReceipt'] : ''),
                billerID: (dr1['billerID'] ? dr1['billerID'] : ''),
                qrRef_1: (dr1['qrRef_1'] ? dr1['qrRef_1'] : ''),
                qrRef_2: (dr1['qrRef_2'] ? dr1['qrRef_2'] : ''),
                qrRef_3: (dr1['qrRef_3'] ? dr1['qrRef_3'] : ''),
                bankRequest: (dr1['bankRequest'] ? dr1['bankRequest'] : ''),
                bankTransID: (dr1['bankTransID'] ? dr1['bankTransID'] : ''),
                payment: {
                  amount: (dr1['paidAmount'] ? parseFloat(dr1['paidAmount']) : 0),
                  by: (dr1['paidBy'] ? dr1['paidBy'] : ''),
                  date: (dr1['paidDates'] ? dr1['paidDates'] : ''),
                  status: (dr1['paidStatus'] ? dr1['paidStatus'] : 'N')
                }
              },
              invoiceFee: invoiceFee,
              totalFeeAmount: (dr1['totalFeeAmount'] ? parseFloat(dr1['totalFeeAmount']) : 0),
            })
          }
        }

        return transRegistered;
      });
    }

    get(transRegisteredID: string, personID?: string, transProjectID?: string): Promise<Schema.TransRegistered> {
      let query = [
        '',
        ('transRegisteredID=' + transRegisteredID),
        ('personID=' + personID),
        ('transProjectID=' + transProjectID)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.TransRegistered[]) => {
        return result[0];
      });
    }
  }

  export class Statuses {
    private data$: Schema.Statuses[] = [];

    private getDataSource(action: string, query?: string): Schema.Statuses[] {
      let items: Schema.Statuses[];

      if (action === 'getlist')
        items = this.data$;

      if (action === 'get')
        items = this.data$.filter(result => {
          return result.ID.includes(query);
        });

      return items;
    }

    getList(data$: Schema.Statuses[]): Schema.Statuses[] {
      this.data$ = data$;

      return this.getDataSource('getlist')
    }

    get(data$: Schema.Statuses[], query: string): Schema.Statuses {
      this.data$ = data$;

      return this.getDataSource('get', query)[0];
    }
  }

  export class RegistrationStatus {
    public data$ = [
      {
        ID: 'Y',
        name: {
          th: 'เปิดให้ลงทะเบียน',
          en: 'Registration is open'
        }
      },
      {
        ID: 'W',
        name: {
          th: 'ยังไม่เปิดให้ลงทะเบียน',
          en: 'Registration not yet opened'
        }
      },
      {
        ID: 'N',
        name: {
          th: 'หมดเวลาลงทะเบียน',
          en: 'Registration expired'
        }
      }
    ]
  }

  export class PaymentStatus {
    public data$ = [
      {
        ID: 'Y',
        name: {
          th: 'ชำระเงินเรียบร้อย',
          en: 'Payment Completed'
        }
      },
      {
        ID: 'W',
        name: {
          th: 'กำลังตรวจสอบการชำระเงิน',
          en: 'Checking Payment'
        }
      },
      {
        ID: 'N',
        name: {
          th: 'รอการชำระเงิน',
          en: 'Pending Payment'
        }
      }
    ]
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private appService: AppService
  ) {}

  public country = new Data.Country(this.appService);
  public province = new Data.Province(this.appService);
  public district = new Data.District(this.appService);
  public subdistrict = new Data.Subdistrict(this.appService);
  public projectCategory = new Data.ProjectCategory(this.appService);
  public transProject = new Data.TransProject(this.appService);
  public transRegistered = new Data.TransRegistered(this.appService);
  public statuses = new Data.Statuses();
  public registrationStatus = new Data.RegistrationStatus();
  public paymentStatus = new Data.PaymentStatus();
}
