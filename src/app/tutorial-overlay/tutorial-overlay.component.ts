import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../services/tutorial.service';

@Component({
    selector: 'tutorial-overlay',
    templateUrl: './tutorial-overlay.component.html',
    styleUrls: ['./tutorial-overlay.component.scss'],
})
export class TutorialOverlayComponent implements OnInit {
    constructor(public tutorial: TutorialService) {}
    ngOnInit() {}
}
