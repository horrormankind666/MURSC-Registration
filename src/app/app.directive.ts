/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๕/๐๕/๒๕๖๓>
Modify date : <๑๕/๐๕/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Directive, HostListener, Host, ElementRef} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[trimOnBlur]'
})
export class TrimOnBlurDirective {
  constructor(
    private el: ElementRef
  ) {}

  @HostListener('blur')
  onBlur() {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
  }
}
