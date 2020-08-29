import { Component, Input, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-exapandable',
  templateUrl: './exapandable.component.html',
  styleUrls: ['./exapandable.component.scss'],
})
export class ExapandableComponent implements AfterViewInit  {
  @ViewChild('expandWrapper', { read: ElementRef, static: true }) expandWrapper: ElementRef;
  // tslint:disable-next-line: no-input-rename
  @Input('expanded') expanded = false;
  // @Input('expandHeight') expandHeight = '150px';

  constructor(public renderer: Renderer2) {}

  ngAfterViewInit() {
    // this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
    // this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height');
  }


}
