
/**
 * @module
 * @description
 * Kendo Dropdown Component
 */

import { Component, Host, ElementRef, Input, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
    selector: 'k-dropdown', 
    template: '<div></div>'
})

export class kdropdown implements  OnInit {
  constructor(@Host() private elm: ElementRef) {
    }

    @Input() dropdownOptions: any;

    ngOnInit() {
        // Access on DOM; ONLY works with DOM rendering !!!!
        jQuery(this.elm.nativeElement).children().first().kendoDropDownList(this.dropdownOptions);
    } 
}