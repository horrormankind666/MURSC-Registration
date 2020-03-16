/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๒/๐๒/๒๕๖๓>
Modify date : <๑๖/๐๓/๒๕๖๓>
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
  transLocationID?: string;
  locationName?: {
    th?: string,
    en?: string
  };
  buildingName?: {
    th?: string,
    en?: string
  };
  seatTotal?: string;
  seatAvailable?: string;
  contactName?: {
    th?: string,
    en?: string
  };
  contactEmail?: string,
  contactPhone?: string,
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
    private http: HttpClient,
    private appService: AppService
  ) {}

  private getDataSource(action: string, query?: string): Promise<ProjectSchema[]> {
    return this.appService.getDataSource('Project', action, query).then((res: []) => {
      let items: ProjectSchema[] = [];

      for (let dr of res) {
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
            registrationStatus: (dr['registrationStatus'] ? dr['registrationStatus'] : '')
          });
        }
      }

      return items;
    });
  }

  getList(): Promise<ProjectSchema[]> {
    return this.getDataSource('getlist').then((res: ProjectSchema[]) => {
      return res;
    })
  }

  get(query: string): Promise<ProjectSchema> {
    return this.getDataSource('get', query).then((res: ProjectSchema[]) => {
      return res[0];
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
      items = this.data.filter(res => {
        return res.id.includes(query);
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

  public project = new Project(this.http, this.appService);
  public registrationStatus = new RegistrationStatus();
}
