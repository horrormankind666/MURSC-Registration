/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๐/๐๒/๒๕๖๓>
Modify date : <๑๗/๑๑/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Injectable, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { AppService } from '../app.service';
import { ModalService } from '../modal/modal.service';
import { Schema, DataService } from '../data.service';

import { ProjectDetailComponent } from './detail/project-detail.component'

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
        private route: ActivatedRoute,
        private pipe: DecimalPipe,
        private dataService: DataService
    ) {
        this.reload(this.route.snapshot.params['projectCategory']);
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

    get data$() { return this._data$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get totalSearch$() { return this._totalSearch$.asObservable(); }
    get searching$() { return this._searching$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get keyword() { return this._state.keyword; }
    get registrationStatus() { return this._state.registrationStatus; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set keyword(keyword: string) { this._set({ keyword }); }
    set registrationStatus(registrationStatus: string) { this._set({ registrationStatus }); }

    private _set(patch: Partial<TableState>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(data: Schema.TransProject[]): Observable<TableSearchResult> {
        const { page, pageSize, keyword, registrationStatus } = this._state;

        let tmp = data;

        tmp = tmp.filter(project => this.matches(project, keyword, registrationStatus, this.pipe));
        const total: number = data.length;
        const totalSearch: number = tmp.length;

        data = tmp;

        return of({ data, total, totalSearch });
    }

    matches(data: Schema.TransProject, keyword: string, registrationStatus: string, pipe: PipeTransform) {
        keyword = (keyword ? keyword : '');
        registrationStatus = (registrationStatus ? registrationStatus : '');

        return (
            (data.project.name.th.toLowerCase().includes(keyword.toLowerCase()) || data.project.name.en.toLowerCase().includes(keyword.toLowerCase())) &&
            data.registrationStatus.includes(registrationStatus)
        )
    }

    reload(projectCategory: string) {
        this.dataService.transProject.getList(projectCategory).then((result: Schema.TransProject[]) => {
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
        private route: ActivatedRoute,
        private pipe: DecimalPipe,
        private dataService: DataService,
    ) { }

    table = {
        service: new Table(this.route, this.pipe, this.dataService),
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
        private route: ActivatedRoute,
        private pipe: DecimalPipe,
        private modal: NgbModal,
        private appService: AppService,
        private modalService: ModalService,
        private dataService: DataService,
    ) { }

    public operate = new Operate(this.route, this.pipe, this.dataService);

    getModalTransProject(data: Schema.TransProject) {
        if (!this.modal.hasOpenModals()) {
            this.appService.isLoading.show = true;
            this.appService.isLoading.modal = true;

            this.dataService.transProject.get(data.project.category.initial, this.appService.getCUID([data.ID])).then((result: Schema.TransProject) => {
                this.appService.isLoading.show = false;
                this.appService.isLoading.modal = false;

                let modalRef: NgbModalRef = this.modalService.getModalForm(true);
                modalRef.componentInstance.component = ProjectDetailComponent;
                modalRef.componentInstance.title = 'project.detail';
                modalRef.componentInstance.data$ = result;

                this.modalService.close(modalRef).then((result: string) => {
                });
            });
        }
    }
}
