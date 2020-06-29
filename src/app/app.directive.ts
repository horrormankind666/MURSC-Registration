/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๕/๐๕/๒๕๖๓>
Modify date : <๒๙/๐๖/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Directive, HostListener, Host, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: 'input[trimOnBlur], textarea[trimOnBlur]'
})
export class TrimOnBlurDirective {
  private dispatchEvent (el: any, eventType: any) {
    const event = document.createEvent('Event');

    event.initEvent(eventType, false, false);
    el.dispatchEvent(event);
  }

  @HostListener('blur', ['$event.target', '$event.target.value'])
  onBlur(el: any, value: string) {
    if ('function' === typeof value.trim && value.trim() !== value) {
      el.value = value.trim();

      this.dispatchEvent(el, 'input');
      this.dispatchEvent(el, 'textarea')
      this.dispatchEvent(el, 'blur');
    }
  }
}

@Directive({
  selector: '[focusRemover]'
})
export class FocusRemoverDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  @HostListener('focus')
  onFocus() {
    this.renderer.invokeElementMethod(this.el.nativeElement, 'blur', []);
  }
}
