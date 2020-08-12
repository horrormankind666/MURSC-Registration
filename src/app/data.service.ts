/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๑๐/๐๘/๒๕๖๓>
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
    about?: {
      th?: string,
      en?: string
    },
    ownerCode?: string,
    minimumPassScore?: number,
    logo?: string
  }

  export interface ContactPerson {
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
    merchantName?: string,
    qrRef1?: string,
    qrRef2?: string,
    qrRef3?: string,
    qrImage?: string,
		qrNewRef1?: string,
    bankRequest?: string,
    bankTransID?: string,
    payment?: {
      amount?: number,
      confirmDate?: string,
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
    CUID?: string,
    project?: Project,
    description?: {
      th?: string,
      en?: string
    },
    examDate?: {
      startDate?: string,
      endDate?: string
    },
    registrationDate?: {
      startDate?: string,
      endDate?: string
    },
    lastPaymentDate?: string,
    maximumSeat?: number,
    seatAvailable?: number,
    minimumFee?: string,
    contactPerson?: ContactPerson[],
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

  export interface QRCode {
    errorCode?: number,
    qrCode?: string,
    qrMessage?: string,
    qrFormat?: string,
    qrImage64?: string,
    qrResponse?: string,
    qrNewRef1?: string
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

    get(projectCategory: string): Promise<Schema.ProjectCategory> {
      let query = [
        '',
        ('projectCategory=' + projectCategory)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.ProjectCategory[]) => {
        return result[0];
      });
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
          let contactPerson: Schema.ContactPerson[] = [];
          let contactPersons: [] = (dr1['contactPerson'] ? dr1['contactPerson'] : []);

          for (let dr2 of contactPersons) {
            contactPerson.push({
              fullName: {
                th: (dr2['FullName']['TH'] ? dr2['FullName']['TH'] : dr2['FullName']['EN']),
                en: (dr2['FullName']['EN'] ? dr2['FullName']['EN'] : dr2['FullName']['TH']),
              },
              email: (dr2['EmailAccount'] ? dr2['EmailAccount'] : ''),
              phoneNumber: (dr2['TelephoneNO'] ? dr2['TelephoneNO'] : ''),
            });
          }

          if (action === 'getlist') {
            transProject.push({
              ID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
              CUID: (dr1['transProjectID'] ? this.appService.getCUID([dr1['transProjectID']]) : ''),
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
                about: {
                  th: (dr1['aboutTH'] ? dr1['aboutTH'] : dr1['aboutEN']),
                  en: (dr1['aboutEN'] ? dr1['aboutEN'] : dr1['aboutTH'])
                }
              },
              description: {
                th: (dr1['descriptionTH'] ? dr1['descriptionTH'] : dr1['descriptionEN']),
                en: (dr1['descriptionEN'] ? dr1['descriptionEN'] : dr1['descriptionTH'])
              },
              examDate: {
                startDate: (dr1['examStartDates'] ? dr1['examStartDates'] : ''),
                endDate: (dr1['examEndDates'] ? dr1['examEndDates'] : '')
              },
              registrationDate: {
                startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
              },
              maximumSeat: (dr1['maximumSeat'] ? parseInt(dr1['maximumSeat']) : 0),
              seatAvailable: dr1['seatAvailable'],
              minimumFee: (dr1['minimumFee'] ? dr1['minimumFee'] : ''),
              contactPerson: contactPerson,
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
              CUID: (dr1['transProjectID'] ? this.appService.getCUID([dr1['transProjectID']]) : ''),
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
                about: {
                  th: (dr1['aboutTH'] ? dr1['aboutTH'] : dr1['aboutEN']),
                  en: (dr1['aboutEN'] ? dr1['aboutEN'] : dr1['aboutTH'])
                }
              },
              description: {
                th: (dr1['descriptionTH'] ? dr1['descriptionTH'] : dr1['descriptionEN']),
                en: (dr1['descriptionEN'] ? dr1['descriptionEN'] : dr1['descriptionTH'])
              },
              examDate: {
                startDate: (dr1['examStartDates'] ? dr1['examStartDates'] : ''),
                endDate: (dr1['examEndDates'] ? dr1['examEndDates'] : '')
              },
              registrationDate: {
                startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
              },
              lastPaymentDate: (dr1['lastPaymentDates'] ? dr1['lastPaymentDates'] : ''),
              maximumSeat: (dr1['maximumSeat'] ? parseInt(dr1['maximumSeat']) : 0),
              seatAvailable: (dr1['seatAvailable'] ? (parseInt(dr1['seatAvailable']) > 0 ? (parseInt(dr1['maximumSeat']) - parseInt(dr1['seatAvailable'])) : 0) : 0),
              minimumFee: (dr1['minimumFee'] ? dr1['minimumFee'] : ''),
              contactPerson: contactPerson,
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

    get(projectCategory: string, cuid: string): Promise<Schema.TransProject> {
      let query = [
        '',
        ('projectCategory=' + projectCategory),
        ('cuid=' + cuid)
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
        let deliAddress = {
          country: {},
          province: {},
          district: {},
          subdistrict: {}
        };
        let invoiceFee: Schema.InvoiceFee[] = [];

        for (let dr1 of result) {
          let contactPerson: Schema.ContactPerson[] = [];
          let contactPersons: [] = (dr1['contactPerson'] ? dr1['contactPerson'] : []);

          for (let dr2 of contactPersons) {
            contactPerson.push({
              fullName: {
                th: (dr2['FullName']['TH'] ? dr2['FullName']['TH'] : dr2['FullName']['EN']),
                en: (dr2['FullName']['EN'] ? dr2['FullName']['EN'] : dr2['FullName']['TH']),
              },
              email: (dr2['EmailAccount'] ? dr2['EmailAccount'] : ''),
              phoneNumber: (dr2['TelephoneNO'] ? dr2['TelephoneNO'] : ''),
            });
          }

          let country: [] = (dr1['country'] ? dr1['country'] : []);
          let province: [] = (dr1['province'] ? dr1['province'] : []);
          let district: [] = (dr1['district'] ? dr1['district'] : []);
          let subdistrict: [] = (dr1['subdistrict'] ? dr1['subdistrict'] : []);
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
              about: {
                th: (dr1['aboutTH'] ? dr1['aboutTH'] : dr1['aboutEN']),
                en: (dr1['aboutEN'] ? dr1['aboutEN'] : dr1['aboutTH'])
              }
            },
            description: {
              th: (dr1['descriptionTH'] ? dr1['descriptionTH'] : dr1['descriptionEN']),
              en: (dr1['descriptionEN'] ? dr1['descriptionEN'] : dr1['descriptionTH'])
            },
            examDate: {
              startDate: (dr1['examStartDates'] ? dr1['examStartDates'] : ''),
              endDate: (dr1['examEndDates'] ? dr1['examEndDates'] : '')
            },
            lastPaymentDate: (dr1['lastPaymentDates'] ? dr1['lastPaymentDates'] : ''),
            contactPerson: contactPerson
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

          for (let dr3 of country) {
            deliAddress.country = {
              ID: (dr3['id'] ? dr3['id'] : ''),
              name: {
                th: (dr3['countryNameTH'] ? dr3['countryNameTH'] : dr3['countryNameEN']),
                en: (dr3['countryNameEN'] ? dr3['countryNameEN'] : dr3['countryNameTH'])
              },
              isoCountryCodes2Letter: (dr3['isoCountryCodes2Letter'] ? dr3['isoCountryCodes2Letter'] : ''),
              isoCountryCodes3Letter: (dr3['isoCountryCodes3Letter'] ? dr3['isoCountryCodes3Letter'] : '')
            };
          }

          for (let dr4 of province) {
            deliAddress.province = {
              ID: (dr4['id'] ? dr4['id'] : ''),
              countryID: (dr4['plcCountryId'] ? dr4['plcCountryId'] : ''),
              isoCountryCodes3Letter: (dr4['isoCountryCodes3Letter'] ? dr4['isoCountryCodes3Letter'] : ''),
              name: {
                th: (dr4['provinceNameTH'] ? dr4['provinceNameTH'] : dr4['provinceNameEN']),
                en: (dr4['provinceNameEN'] ? dr4['provinceNameEN'] : dr4['provinceNameTH'])
              },
              regional: (dr4['regionalName'] ? dr4['regionalName'] : '')
            };
          }

          for (let dr5 of district) {
            deliAddress.district = {
              ID: (dr5['id'] ? dr5['id'] : ''),
              countryID: (dr5['plcCountryId'] ? dr5['plcCountryId'] : ''),
              isoCountryCodes3Letter: (dr5['isoCountryCodes3Letter'] ? dr5['isoCountryCodes3Letter'] : ''),
              provinceID: (dr5['plcProvinceId'] ? dr5['plcProvinceId'] : ''),
              provinceName: {
                th: (dr5['provinceNameTH'] ? dr5['provinceNameTH'] : dr5['provinceNameEN']),
                en: (dr5['provinceNameEN'] ? dr5['provinceNameEN'] : dr5['provinceNameTH'])
              },
              name: {
                th: (dr5['districtNameTH'] ? dr5['districtNameTH'] : dr5['districtNameEN']),
                en: (dr5['districtNameEN'] ? dr5['districtNameEN'] : dr5['districtNameTH'])
              },
              zipCode: (dr5['zipCode'] ? dr5['zipCode'] : '')
            };
          }

          for (let dr6 of subdistrict) {
            deliAddress.subdistrict = {
              ID: (dr6['id'] ? dr6['id'] : ''),
              countryID: (dr6['plcCountryId'] ? dr6['plcCountryId'] : ''),
              isoCountryCodes3Letter: (dr6['isoCountryCodes3Letter'] ? dr6['isoCountryCodes3Letter'] : ''),
              provinceID: (dr6['plcProvinceId'] ? dr6['plcProvinceId'] : ''),
              provinceName: {
                th: (dr6['provinceNameTH'] ? dr6['provinceNameTH'] : dr6['provinceNameEN']),
                en: (dr6['provinceNameEN'] ? dr6['provinceNameEN'] : dr6['provinceNameTH'])
              },
              districtID: (dr6['plcDistrictId'] ? dr6['plcDistrictId'] : ''),
              districtName: {
                th: (dr6['districtNameTH'] ? dr6['districtNameTH'] : dr6['districtNameEN']),
                en: (dr6['districtNameEN'] ? dr6['districtNameEN'] : dr6['districtNameTH'])
              },
              zipCode: (dr6['zipCode'] ? dr6['zipCode'] : ''),
              name: {
                th: (dr6['subdistrictNameTH'] ? dr6['subdistrictNameTH'] : dr6['subdistrictNameEN']),
                en: (dr6['subdistrictNameEN'] ? dr6['subdistrictNameEN'] : dr6['subdistrictNameTH'])
              }
            };
          }

          transDeliAddress = {
            ID: (dr1['transDeliAddressID'] ? dr1['transDeliAddressID'] : ''),
            address: (dr1['address'] ? dr1['address'] : ''),
            country: deliAddress.country,
            province: deliAddress.province,
            district: deliAddress.district,
            subdistrict: deliAddress.subdistrict,
            postalCode: (dr1['postalCode'] ? dr1['postalCode'] : ''),
            phoneNumber: (dr1['phoneNumber'] ? dr1['phoneNumber'] : ''),
          };

          if (action === 'get') {
            for (let dr7 of fee) {
              invoiceFee.push({
                invoiceID: (dr7['invoiceID'] ? dr7['invoiceID'] : ''),
                feeType: {
                  ID: (dr7['feeTypeID'] ? dr7['feeTypeID'] : ''),
                  name: {
                    th: (dr7['feeTypeNameTH'] ? dr7['feeTypeNameTH'] : dr7['feeTypeNameEN']),
                    en: (dr7['feeTypeNameEN'] ? dr7['feeTypeNameEN'] : dr7['feeTypeNameTH'])
                  },
                  amount: (dr7['amount'] ? parseFloat(dr7['amount']) : 0),
                  toggle: (dr7['toggle'] ? dr7['toggle'] : ''),
                }
              });
            }
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
              merchantName: (dr1['merchantName'] ? dr1['merchantName'] : ''),
              qrRef1: (dr1['qrRef1'] ? dr1['qrRef1'] : ''),
              qrRef2: (dr1['qrRef2'] ? dr1['qrRef2'] : ''),
              qrRef3: (dr1['qrRef3'] ? dr1['qrRef3'] : ''),
              qrImage: (dr1['qrImage'] ? dr1['qrImage'] : ''),
              qrNewRef1: (dr1['qrNewRef1'] ? dr1['qrNewRef1'] : ''),
              bankRequest: (dr1['bankRequest'] ? dr1['bankRequest'] : ''),
              bankTransID: (dr1['bankTransID'] ? dr1['bankTransID'] : ''),
              payment: {
                amount: (dr1['paidAmount'] ? parseFloat(dr1['paidAmount']) : 0),
                confirmDate: (dr1['paymentConfirmDate'] ? dr1['paymentConfirmDate'] : ''),
                by: (dr1['paidBy'] ? dr1['paidBy'] : ''),
                date: (dr1['paidDates'] ? dr1['paidDates'] : ''),
                status: (dr1['paidStatus'] ? dr1['paidStatus'] : 'N')
              }
            },
            invoiceFee: invoiceFee,
            totalFeeAmount: (dr1['totalFeeAmount'] ? parseFloat(dr1['totalFeeAmount']) : 0),
          });
        }

        return transRegistered;
      });
    }

    getList(paymentStatus: string): Promise<Schema.TransRegistered[]> {
      let query = [
        '',
        ('paymentStatus=' + paymentStatus)
      ].join('&');

      return this.getDataSource('getlist', query).then((result: Schema.TransRegistered[]) => {
        return result;
      })
    }

    get(cuid: string): Promise<Schema.TransRegistered> {
      let query = [
        '',
        ('cuid=' + cuid)
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
          en: 'Payment completed'
        }
      },
      {
        ID: 'W',
        name: {
          th: 'ตรวจสอบการชำระเงิน',
          en: 'Check payment'
        }
      },
      {
        ID: 'N',
        name: {
          th: 'รอการชำระเงิน',
          en: 'Pending payment'
        }
      }
    ]
  }

  export class QRCode {
    constructor(
      private appService: AppService
    ) {}

    private getDataSource(action: string, query?: string): Promise<Schema.QRCode[]> {
      return this.appService.getDataSource('QRCodePayment', action, query).then((result: []) => {
        let qrcode: Schema.QRCode[] = [];

        for (let dr of result) {
          qrcode.push({
            errorCode: dr['errorCode'],
            qrCode: (dr['qrCode'] ? dr['qrCode'] : ''),
            qrMessage: (dr['qrMessage'] ? dr['qrMessage'] : ''),
            qrFormat: (dr['qrFormat'] ? dr['qrFormat'] : ''),
            qrImage64: (dr['qrImage64'] ? dr['qrImage64'] : ''),
            qrResponse: (dr['qrResponse'] ? dr['qrResponse'] : ''),
            qrNewRef1: (dr['qrNewRef1'] ? dr['qrNewRef1'] : '')
          });
        }

        return qrcode;
      });
    }

    get(cuid: string): Promise<Schema.QRCode> {
      let query = [
        '',
        ('cuid=' + cuid)
      ].join('&');

      return this.getDataSource('get', query).then((result: Schema.QRCode[]) => {
        return result[0];
      });
    }
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
  public qrcode = new Data.QRCode(this.appService);
}
