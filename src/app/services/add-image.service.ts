import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddImageService {
    afterRestart: Subject<string> = new Subject();
    constructor() {}
}
