
/**
 * @module
 * @description
 * Grid Component
 */

import { Component, Host, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'k-grid', 
    template: '<div></div>'
})

export class kgrid implements  OnInit {
  constructor(@Host() private elm: ElementRef) {
    }

    @Input() options: any;

    ngOnInit() {
        // Access on DOM; ONLY works with DOM rendering !!!!
        //$(this.elm.nativeElement).children().first().kendoGrid(this.options);
    }
}