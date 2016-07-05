
/**
 * @module
 * @description
 * Kendo Chart Component
 */

import { Component, Host, ElementRef, Input, OnInit } from '@angular/core'; 
declare var jQuery:any;

@Component({
    selector: 'k-chart', 
    template: '<div></div>'
})

export class kchart implements  OnInit {
  constructor(@Host() private elm: ElementRef) {
    }

    @Input() chartOptions: any;

    ngOnInit() {
        // Access on DOM; ONLY works with DOM rendering !!!!
        jQuery(this.elm.nativeElement).children().first().kendoChart(this.chartOptions); 
    }
}