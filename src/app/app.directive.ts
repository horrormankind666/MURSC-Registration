/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๕/๐๕/๒๕๖๓>
Modify date : <๑๕/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Directive, HostListener, Host} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[trimOnBlur]'
})
export class TrimOnBlurDirective {
  constructor(
    private ngControl: NgControl
  ) {}

  get ctrl() {
    return this.ngControl.control;
  }

  @HostListener('blur')
  onBlur(value) {
    this.ctrl.setValue(this.ctrl.value.trim());
  }
}
