import { Component, EventEmitter, Input, Output } from '@angular/core';
import { share } from 'src/app/utils/helper-functions';

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent {
    @Output() exitingImageView = new EventEmitter<void>();
    @Input() imageSrc: string;
    @Input() className: string;

    constructor() {}

    closeImage() {
        this.exitingImageView.emit();
    }

    shareImage() {
        if (this.imageSrc)
            share('picture.jpg', this.imageSrc);
    }
}
