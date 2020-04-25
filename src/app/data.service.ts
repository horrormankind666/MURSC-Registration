/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๒๕/๐๔/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';

import {AppService} from './app.service';

export namespace Schema {
  export namespace CBX {
    export interface Project {
      transProjectID?: string;
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
      location?: ProjectLocation[]
    }

    export interface ProjectLocation {
      transLocationID?: string;
      name?: {
        th?: string,
        en?: string
      };
      building?: {
        name?: {
          th?: string,
          en?: string
        }
      };
      seatTotal?: string;
      seatAvailable?: string;
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
    export class Project {
      constructor(
        private appService: AppService
      ) {}

      private getDataSource(action: string, query?: string): Promise<Schema.CBX.Project[]> {
        return this.appService.getDataSource('Project', action, query).then((result: []) => {
          let items: Schema.CBX.Project[] = [];
          let projectLocation: Schema.CBX.ProjectLocation[] = [];

          for (let dr of result) {
            if (action === 'getlist') {
              items.push({
                transProjectID: (dr['transProjectID'] ? dr['transProjectID'] : ''),
                logo: (dr['logo'] ? dr['logo'] : ''),
                name: {
                  th: (dr['projectNameTH'] ? dr['projectNameTH'] : ''),
                  en: (dr['projectNameEN'] ? dr['projectNameEN'] : dr['projectNameTH'])
                },
                detail: (dr['detail'] ? dr['detail'] : ''),
                examDate: (dr['examDates'] ? dr['examDates'] : ''),
                registrationDate: {
                  startDate: (dr['regisStartDates'] ? dr['regisStartDates'] : ''),
                  endDate: (dr['regisEndDates'] ? dr['regisEndDates'] : '')
                },
                maximumSeat: (dr['maximumSeat'] ? dr['maximumSeat'] : ''),
                minimumFee: (dr['minimumFee'] ? dr['minimumFee'] : ''),
                contact: {
                  name: {
                    th: (dr['contactNameTH'] ? dr['contactNameTH'] : ''),
                    en: (dr['contactNameEN'] ? dr['contactNameEN'] : dr['contactNameTH'])
                  },
                  email: (dr['contactEmail'] ? dr['contactEmail'] : ''),
                  phone: (dr['contactPhone'] ? dr['contactPhone'] : '')
                },
                registrationStatus: (dr['registrationStatus'] ? dr['registrationStatus'] : '')
              });
            }

            if (action === 'get') {
              let location: [] = (dr['location'] ? dr['location'] : []);

              for (let dr1 of location) {
                projectLocation.push({
                  transLocationID: (dr1['transLocationID'] ? dr1['transLocationID'] : ''),
                  name: {
                    th: (dr1['locationNameTH'] ? dr1['locationNameTH'] : ''),
                    en: (dr1['locationNameEN'] ? dr1['locationNameEN'] : dr1['locationNameTH'])
                  },
                  building: {
                    name: {
                      th: (dr1['buildingNameTH'] ? dr1['buildingNameTH'] : ''),
                      en: (dr1['buildingNameEN'] ? dr1['buildingNameEN'] : dr1['buildingNameTH'])
                    }
                  },
                  seatTotal: (dr1['seatTotal'] ? dr1['seatTotal'] : ''),
                  seatAvailable: (dr1['seatAvailable'] ? dr1['seatAvailable'] : '')
                });
              }

              items.push({
                transProjectID: (dr['transProjectID'] ? dr['transProjectID'] : ''),
                logo: (dr['logo'] ? dr['logo'] : ''),
                name: {
                  th: (dr['projectNameTH'] ? dr['projectNameTH'] : ''),
                  en: (dr['projectNameEN'] ? dr['projectNameEN'] : dr['projectNameTH'])
                },
                detail: (dr['detail'] ? dr['detail'] : ''),
                examDate: (dr['examDates'] ? dr['examDates'] : ''),
                registrationDate: {
                  startDate: (dr['regisStartDates'] ? dr['regisStartDates'] : ''),
                  endDate: (dr['regisEndDates'] ? dr['regisEndDates'] : '')
                },
                lastPaymentDate: (dr['lastPaymentDates'] ? dr['lastPaymentDates'] : ''),
                maximumSeat: (dr['maximumSeat'] ? dr['maximumSeat'] : ''),
                minimumFee: (dr['minimumFee'] ? dr['minimumFee'] : ''),
                contact: {
                  name: {
                    th: (dr['contactNameTH'] ? dr['contactNameTH'] : ''),
                    en: (dr['contactNameEN'] ? dr['contactNameEN'] : dr['contactNameTH'])
                  },
                  email: (dr['contactEmail'] ? dr['contactEmail'] : ''),
                  phone: (dr['contactPhone'] ? dr['contactPhone'] : '')
                },
                registrationStatus: (dr['registrationStatus'] ? dr['registrationStatus'] : ''),
                location: projectLocation
              });
            }
          }

          return items;
        });
      }

      getList(): Promise<Schema.CBX.Project[]> {
        return this.getDataSource('getlist').then((result: Schema.CBX.Project[]) => {
          return result;
        })
      }

      get(id: string): Promise<Schema.CBX.Project> {
        let query = [
          "",
          ("transProjectID=" + id)
        ].join("&");

        return this.getDataSource('get', query).then((result: Schema.CBX.Project[]) => {
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
    project: new Data.CBX.Project(this.appService),
    registrationStatus: new Data.CBX.RegistrationStatus()
  }
}
