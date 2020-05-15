/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๑๔/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {AppService} from './app.service';

export namespace Schema {
  export namespace CBX {
    export interface TransProject {
      transProjectID?: string;
      projectID?: string
      logo?: string;
      name?: {
        th?: string,
        en?: string
      };
      detail?: string,
      examDate?: string;
      registrationDate?: {
        startDate?: string,
        endDate?: string
      };
      lastPaymentDate?: string;
      maximumSeat?: string;
      minimumFee?: string;
      contact?: {
        name?: {
          th?: string,
          en?: string
        };
        email?: string,
        phone?: string
      };
      registrationStatus?: string;
      location?: TransLocation[];
      feeType?: TransFeeType[]
    }

    export interface TransLocation {
      transLocationID?: string;
      locationID?: string;
      transProjectID?: string;
      name?: {
        th?: string,
        en?: string
      };
      building?: {
        ID?: string,
        name?: {
          th?: string,
          en?: string
        }
      };
      seatTotal?: number;
      seatAvailable?: number;
    }

    export interface TransFeeType  {
      transFeeTypeID?: string;
      feeTypeID?: string;
      transProjectID?: string;
      name?: {
        th?: string,
        en?: string
      };
      amount?: number,
      requiredStatus?: string,
      toggle?: string,
      isSelected?: boolean
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
                transProjectID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
                projectID: (dr1['projectID'] ? dr1['projectID'] : ''),
                logo: (dr1['logo'] ? dr1['logo'] : ''),
                name: {
                  th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : ''),
                  en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                },
                detail: (dr1['detail'] ? dr1['detail'] : ''),
                examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
                registrationDate: {
                  startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                  endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
                },
                maximumSeat: (dr1['maximumSeat'] ? dr1['maximumSeat'] : ''),
                minimumFee: (dr1['minimumFee'] ? dr1['minimumFee'] : ''),
                contact: {
                  name: {
                    th: (dr1['contactNameTH'] ? dr1['contactNameTH'] : ''),
                    en: (dr1['contactNameEN'] ? dr1['contactNameEN'] : dr1['contactNameTH'])
                  },
                  email: (dr1['contactEmail'] ? dr1['contactEmail'] : ''),
                  phone: (dr1['contactPhone'] ? dr1['contactPhone'] : '')
                },
                registrationStatus: (dr1['registrationStatus'] ? dr1['registrationStatus'] : '')
              });
            }

            if (action === 'get') {
              let location: [] = (dr1['location'] ? dr1['location'] : []);
              let feeType: [] = (dr1['feeType'] ? dr1['feeType'] : []);

              for (let dr2 of location) {
                transLocation.push({
                  transLocationID: (dr2['transLocationID'] ? dr2['transLocationID'] : ''),
                  locationID: (dr2['locationID'] ? dr2['locationID'] : ''),
                  transProjectID: (dr2['transProjectID'] ? dr2['transProjectID'] : ''),
                  name: {
                    th: (dr2['locationNameTH'] ? dr2['locationNameTH'] : ''),
                    en: (dr2['locationNameEN'] ? dr2['locationNameEN'] : dr2['locationNameTH'])
                  },
                  building: {
                    ID: (dr2['buildingID'] ? dr2['buildingID'] : ''),
                    name: {
                      th: (dr2['buildingNameTH'] ? dr2['buildingNameTH'] : ''),
                      en: (dr2['buildingNameEN'] ? dr2['buildingNameEN'] : dr2['buildingNameTH'])
                    }
                  },
                  seatTotal: (dr2['seatTotal'] ? parseInt(dr2['seatTotal']) : 0),
                  seatAvailable: (dr2['seatAvailable'] ? parseInt(dr2['seatAvailable']) : 0)
                });
              }

              for (let dr3 of feeType) {
                transFeeType.push({
                  transFeeTypeID: (dr3['transFeeTypeID'] ? dr3['transFeeTypeID'] : ''),
                  feeTypeID: (dr3['feeTypeID'] ? dr3['feeTypeID'] : ''),
                  transProjectID: (dr3['transProjectID'] ? dr3['transProjectID'] : ''),
                  name: {
                    th: (dr3['feeTypeNameTH'] ? dr3['feeTypeNameTH'] : ''),
                    en: (dr3['feeTypeNameEN'] ? dr3['feeTypeNameEN'] : dr3['feeTypeNameTH'])
                  },
                  amount: (dr3['amount'] ? parseFloat(dr3['amount']) : 0),
                  requiredStatus: (dr3['requiredStatus'] ? dr3['requiredStatus'] : ''),
                  toggle: (dr3['toggle'] ? dr3['toggle'] : ''),
                  isSelected: (dr3['requiredStatus'] ? (dr3['requiredStatus'] === 'Y' ? true : false) : false),
                });
              }

              transProject.push({
                transProjectID: (dr1['transProjectID'] ? dr1['transProjectID'] : ''),
                projectID: (dr1['projectID'] ? dr1['projectID'] : ''),
                logo: (dr1['logo'] ? dr1['logo'] : ''),
                name: {
                  th: (dr1['projectNameTH'] ? dr1['projectNameTH'] : ''),
                  en: (dr1['projectNameEN'] ? dr1['projectNameEN'] : dr1['projectNameTH'])
                },
                detail: (dr1['detail'] ? dr1['detail'] : ''),
                examDate: (dr1['examDates'] ? dr1['examDates'] : ''),
                registrationDate: {
                  startDate: (dr1['regisStartDates'] ? dr1['regisStartDates'] : ''),
                  endDate: (dr1['regisEndDates'] ? dr1['regisEndDates'] : '')
                },
                lastPaymentDate: (dr1['lastPaymentDates'] ? dr1['lastPaymentDates'] : ''),
                maximumSeat: (dr1['maximumSeat'] ? dr1['maximumSeat'] : ''),
                minimumFee: (dr1['minimumFee'] ? dr1['minimumFee'] : ''),
                contact: {
                  name: {
                    th: (dr1['contactNameTH'] ? dr1['contactNameTH'] : ''),
                    en: (dr1['contactNameEN'] ? dr1['contactNameEN'] : dr1['contactNameTH'])
                  },
                  email: (dr1['contactEmail'] ? dr1['contactEmail'] : ''),
                  phone: (dr1['contactPhone'] ? dr1['contactPhone'] : '')
                },
                registrationStatus: (dr1['registrationStatus'] ? dr1['registrationStatus'] : ''),
                location: transLocation,
                feeType: transFeeType
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
          "",
          ("transProjectID=" + transProjectID)
        ].join("&");

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

  public cbx = {
    transProject: new Data.CBX.TransProject(this.appService),
    registrationStatus: new Data.CBX.RegistrationStatus()
  }
}
