/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๐๑/๐๖/๒๕๖๓>
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

  export namespace CBX {
    export interface Project {
      ID?: string,
      type?: string,
      name?: {
        th?: string,
        en?: string,
      },
      detail?: string,
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
      transRegisExamID?: string,
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
      paidAmount?: number,
      paidBy?: string,
      paidDate?: string,
      paidStatus?: string
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
      maximumSeat?: string,
      seatAvailable?: string,
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
      transRegisExamID?: string,
      address?: string,
      country?: Country,
      province?: Province,
      district?: District,
      subdistrict?: Subdistrict,
      postalCode?: string,
      phoneNumber?: string
    }

    export interface TransRegisExam {
      ID?: string,
      transProject?: TransProject,
      transLocation?: TransLocation,
      transDeliAddress?: TransDeliAddress,
      invoice?: Invoice,
      invoiceFee?: InvoiceFee[]
    }

    export interface RegistrationStatus {
      id?: string;
      name: {
        th?: string,
        en?: string
      }
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

  export namespace CBX {
    export class TransProject {
      constructor(
        private appService: AppService
      ) {}

      private getDataSource(action: string, query?: string): Promise<Schema.CBX.TransProject[]> {
        return this.appService.getDataSource('TransProject', action, query).then((result: []) => {
          let transProject: Schema.CBX.TransProject[] = [];
          let transLocation: Schema.CBX.TransLocation[] = [];
          let transFeeType: Schema.CBX.TransFeeType[] = [];

          for (let dr1 of result) {
            if (action === 'getlist') {
              transProject.push({
                ID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
                project: {
                  ID: (dr1['projectID'] ? dr1['projectID'] : ''),
                  logo: (dr1['logo'] ? dr1['logo'] : ''),
                  name: {
                    th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : dr1['projectNameEN']),
                    en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                  },
                  detail: (dr1['detail'] ? dr1['detail'] : '')
                },
                examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
                registrationDate: {
                  startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                  endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
                },
                maximumSeat: (dr1['maximumSeat'] ? dr1['maximumSeat'] : ''),
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
                  logo: (dr1['logo'] ? dr1['logo'] : ''),
                  name: {
                    th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : dr1['projectNameEN']),
                    en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                  },
                  detail: (dr1['detail'] ? dr1['detail'] : '')
                },
                examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
                registrationDate: {
                  startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                  endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
                },
                lastPaymentDate: (dr1['lastPaymentDates'] ? dr1['lastPaymentDates'] : ''),
                maximumSeat: (dr1['maximumSeat'] ? dr1['maximumSeat'] : ''),
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
                registrationStatus: (dr1['registrationStatus'] ? dr1['registrationStatus'] : ''),
                transLocation: transLocation,
                transFeeType: transFeeType
              });
            }
          }

          return transProject;
        });
      }

      getList(): Promise<Schema.CBX.TransProject[]> {
        return this.getDataSource('getlist').then((result: Schema.CBX.TransProject[]) => {
          return result;
        })
      }

      get(transProjectID: string): Promise<Schema.CBX.TransProject> {
        let query = [
          '',
          ('transProjectID=' + transProjectID)
        ].join('&');

        return this.getDataSource('get', query).then((result: Schema.CBX.TransProject[]) => {
          return result[0];
        });
      }
    }

    export class RegistrationStatus {
      private data = [
        {
          id: 'Y',
          name: {
            th: 'เปิดให้ลงทะเบียน',
            en: 'Registration is open'
          }
        },
        {
          id: 'W',
          name: {
            th: 'ยังไม่เปิดให้ลงทะเบียน',
            en: 'Registration not yet opened'
          }
        },
        {
          id: 'N',
          name: {
            th: 'หมดเวลาลงทะเบียน',
            en: 'Registration expired'
          }
        }
      ]

      private getDataSource(action: string, query?: string): Schema.CBX.RegistrationStatus[] {
        let items: Schema.CBX.RegistrationStatus[];

        if (action === 'getlist')
          items = this.data;

        if (action === 'get')
          items = this.data.filter(result => {
            return result.id.includes(query);
          });

        return items;
      }

      getList(): Schema.CBX.RegistrationStatus[] {
        return this.getDataSource('getlist')
      }

      get(query: string): Schema.CBX.RegistrationStatus {
        return this.getDataSource('get', query)[0];
      }
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
  public cbx = {
    transProject: new Data.CBX.TransProject(this.appService),
    registrationStatus: new Data.CBX.RegistrationStatus()
  }
}
