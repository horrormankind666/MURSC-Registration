/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๕/๐๕/๒๕๖๓>
Modify date : <๑๔/๐๗/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Directive, HostListener, ElementRef, Renderer, Pipe, PipeTransform} from '@angular/core';

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

@Pipe({name: 'nl2br'})
export class Nl2BrPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    let breakTag = '<br />';
    return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
  }
}
