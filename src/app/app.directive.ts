/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๕/๐๕/๒๕๖๓>
Modify date : <๑๑/๐๘/๒๕๖๓>
Description : <>
=============================================
*/

'use strict';

import {Directive, HostListener, ElementRef, Renderer, Pipe, PipeTransform, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, Type} from '@angular/core';

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

@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective implements OnInit {
  @Input('dynamicComponent') component: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component)

    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(componentFactory);
    this.changeDetectorRef.detectChanges();
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
