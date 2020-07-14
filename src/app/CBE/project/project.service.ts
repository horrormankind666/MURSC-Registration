/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๐/๐๒/๒๕๖๓>
Modify date : <๑๐/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Injectable, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

import {Schema, DataService} from '../../data.service';

interface TableState {
  page: number;
  pageSize: number;
  keyword: string;
  registrationStatus: string;
}

interface TableSearchResult {
  data: Schema.TransProject[];
  total: number;
  totalSearch: number;
}

class Table {
  constructor(
    private pipe: DecimalPipe,
    private dataService: DataService
  ) {
    this.reload();
  }

  private _searching$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _data$ = new BehaviorSubject<Schema.TransProject[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _totalSearch$ = new BehaviorSubject<number>(0);

  private _state: TableState = {
    page: 1,
    pageSize: 4,
    keyword: null,
    registrationStatus: null
  }

  get data$() {return this._data$.asObservable();}
  get total$() {return this._total$.asObservable();}
  get totalSearch$() {return this._totalSearch$.asObservable();}
  get searching$() {return this._searching$.asObservable();}
  get page() {return this._state.page;}
  get pageSize() {return this._state.pageSize;}
  get keyword() {return this._state.keyword;}
  get registrationStatus() {return this._state.registrationStatus;}

  set page(page: number) {this._set({page});}
  set pageSize(pageSize: number) {this._set({pageSize});}
  set keyword(keyword: string) {this._set({keyword});}
  set registrationStatus(registrationStatus: string) {this._set({registrationStatus});}

  private _set(patch: Partial<TableState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(data: Schema.TransProject[]): Observable<TableSearchResult> {
    const {page, pageSize, keyword, registrationStatus} = this._state;

    let tmp = data;

    tmp = tmp.filter(project => this.matches(project, keyword, registrationStatus, this.pipe));
    const total: number = data.length;
    const totalSearch: number = tmp.length;

    data = tmp;

    return of({data, total, totalSearch});
  }

  matches(data: Schema.TransProject, keyword: string, registrationStatus: string, pipe: PipeTransform) {
    keyword = (keyword ? keyword : '');
    registrationStatus = (registrationStatus ? registrationStatus : '');

    return (
      (data.project.name.th.toLowerCase().includes(keyword.toLowerCase()) ||
       data.project.name.en.toLowerCase().includes(keyword.toLowerCase())) &&
      data.registrationStatus.includes(registrationStatus)
    )
  }

  reload() {
    this.dataService.transProject.getList('CBE').then((result: Schema.TransProject[]) => {
      this._search$.pipe(
        tap(() => this._searching$.next(true)),
        debounceTime(100),
        switchMap(() => this._search(result)),
        delay(100),
        tap(() => this._searching$.next(false))
      ).subscribe(result => {
        this._data$.next(result.data);
        this._total$.next(result.total);
        this._totalSearch$.next(result.totalSearch);
      });

      this._search$.next();
    });
  }
}

class Operate {
  constructor(
    private pipe: DecimalPipe,
    private dataService: DataService,
  ) {}

  table = {
    service: new Table(this.pipe, this.dataService),
    filter: {
      showForm: false,
      setValue() {
        this.showForm = false;
      }
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private pipe: DecimalPipe,
    private dataService: DataService
  ) {}

  public operate = new Operate(this.pipe, this.dataService);
}
