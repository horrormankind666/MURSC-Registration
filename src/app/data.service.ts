/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๒๐/๐๓/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AppService} from './app.service';

export interface ProjectSchema {
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
  registrationStatus?: string;
  location?: ProjectLocationSchema[]
}

interface ProjectLocationSchema {
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
  contact?: {
    name?: {
      th?: string,
      en?: string
    };
    email?: string,
    phone?: string
  }
}

interface RegistrationStatusSchema {
  id?: string;
  name: {
    th?: string,
    en?: string
  }
}

class Project {
  constructor(
    private appService: AppService
  ) {}

  private getDataSource(action: string, query?: string): Promise<ProjectSchema[]> {
    return this.appService.getDataSource('Project', action, query).then((result: []) => {
      let items: ProjectSchema[] = [];
      let projectLocation: ProjectLocationSchema[] = [];

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
              seatAvailable: (dr1['seatAvailable'] ? dr1['seatAvailable'] : ''),
              contact: {
                name: {
                  th: (dr1['contactNameTH'] ? dr1['contactNameTH'] : ''),
                  en: (dr1['contactNameEN'] ? dr1['contactNameEN'] : dr1['contactNameTH'])
                },
                email: (dr1['contactEmail'] ? dr1['contactEmail'] : ''),
                phone: (dr1['contactPhone'] ? dr1['contactPhone'] : '')
              }
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
            registrationStatus: (dr['registrationStatus'] ? dr['registrationStatus'] : ''),
            location: projectLocation
          });
        }
      }

      return items;
    });
  }

  getList(): Promise<ProjectSchema[]> {
    return this.getDataSource('getlist').then((result: ProjectSchema[]) => {
      return result;
    })
  }

  get(query: string): Promise<ProjectSchema> {
    return this.getDataSource('get', query).then((result: ProjectSchema[]) => {
      return result[0];
    });
  }
}

class RegistrationStatus {
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

  private getDataSource(action: string, query?: string): RegistrationStatusSchema[] {
    let items: RegistrationStatusSchema[];

    if (action === 'getlist')
      items = this.data;

    if (action === 'get')
      items = this.data.filter(result => {
        return result.id.includes(query);
      });

    return items;
  }

  getList(): RegistrationStatusSchema[] {
    return this.getDataSource('getlist')
  }

  get(query: string): RegistrationStatusSchema {
    return this.getDataSource('get', query)[0];
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) {}

  public project = new Project(this.appService);
  public registrationStatus = new RegistrationStatus();
}
