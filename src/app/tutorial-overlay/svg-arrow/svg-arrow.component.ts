import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'svg-arrow',
    templateUrl: './svg-arrow.component.html',
    styleUrls: ['./svg-arrow.component.scss'],
})
export class SvgArrowComponent implements OnInit {
    @Input() arrowToShow: 'long' | 'short' | 'straight' = 'short';
    @Input() angle: number = 0;
    @Input() scale: number = 1;

    constructor() {}
    ngOnInit() {}
}
