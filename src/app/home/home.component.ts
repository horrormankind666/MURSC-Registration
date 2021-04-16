/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๔/๐๑/๒๕๖๓>
Modify date : <๒๔/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }
}
