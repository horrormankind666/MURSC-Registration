/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๑/๐๘/๒๕๖๓>
Modify date : <๑๒/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { Schema, DataService } from '../../data.service';

interface TableState {
    page: number;
    pageSize: number;
    keyword: string;
    projectCategory: string;
}

interface TableSearchResult {
    data: Schema.TransRegistered[];
    total: number;
    totalSearch: number;
}

class Table {
    constructor(
        private pipe: DecimalPipe,
        private dataService: DataService,
        private paymentStatus: string
    ) {
        this.reload(this.paymentStatus);
    }

    private _searching$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _data$ = new BehaviorSubject<Schema.TransRegistered[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private _totalSearch$ = new BehaviorSubject<number>(0);

    private _state: TableState = {
        page: 1,
        pageSize: 4,
        keyword: null,
        projectCategory: null
    }

    get data$() { return this._data$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get totalSearch$() { return this._totalSearch$.asObservable(); }
    get searching$() { return this._searching$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get keyword() { return this._state.keyword; }
    get projectCategory() { return this._state.projectCategory; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set keyword(keyword: string) { this._set({ keyword }); }
    set projectCategory(projectCategory: string) { this._set({ projectCategory }); }

    private _set(patch: Partial<TableState>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(data: Schema.TransRegistered[]): Observable<TableSearchResult> {
        const { page, pageSize, keyword, projectCategory } = this._state;

        let tmp = data;

        tmp = tmp.filter(registered => this.matches(registered, keyword, projectCategory, this.pipe));
        const total: number = data.length;
        const totalSearch: number = tmp.length;

        data = tmp;

        return of({ data, total, totalSearch });
    }

    matches(data: Schema.TransRegistered, keyword: string, projectCategory: string, pipe: PipeTransform) {
        keyword = (keyword ? keyword : '');
        projectCategory = (projectCategory ? projectCategory : '');

        return (
            (data.transProject.project.name.th.toLowerCase().includes(keyword.toLowerCase()) || data.transProject.project.name.en.toLowerCase().includes(keyword.toLowerCase())) &&
            (data.transProject.project.category.ID.includes(projectCategory) || data.transProject.project.category.initial.includes(projectCategory))
        )
    }

    reload(paymentStatus: string) {
        this.dataService.transRegistered.getList(paymentStatus).then((result: Schema.TransRegistered[]) => {
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
        private paymentStatus: string
    ) { }

    table = {
        service: new Table(this.pipe, this.dataService, this.paymentStatus),
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
export class TransactionRegisteredService {
    constructor(
    ) { }

    public service: any = null;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionRegisteredAllService {
    constructor(
        private pipe: DecimalPipe,
        private dataService: DataService
    ) { }

    public paymentStatus: string = '';
    public operate = new Operate(this.pipe, this.dataService, this.paymentStatus);
}

@Injectable({
    providedIn: 'root'
})
export class TransactionRegisteredPaymentCompletedService {
    constructor(
        private pipe: DecimalPipe,
        private dataService: DataService
    ) { }

    public paymentStatus: string = 'Y'
    public operate = new Operate(this.pipe, this.dataService, this.paymentStatus);
}

@Injectable({
    providedIn: 'root'
})
export class TransactionRegisteredCheckPaymentService {
    constructor(
        private pipe: DecimalPipe,
        private dataService: DataService
    ) { }

    public paymentStatus: string = 'W';
    public operate = new Operate(this.pipe, this.dataService, this.paymentStatus);
}

@Injectable({
    providedIn: 'root'
})
export class TransactionRegisteredPendingPaymentService {
    constructor(
        private pipe: DecimalPipe,
        private dataService: DataService
    ) { }

    public paymentStatus: string = 'N';
    public operate = new Operate(this.pipe, this.dataService, this.paymentStatus);
}
