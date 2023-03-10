import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TutorialService {
    private presenting: boolean = false;
    private stageAt: number = 11;
    private numberOfStages = 100;

    createDemoShop = new Subject<void>();
    startDemoShop = new Subject<void>();

    startDemoTimer = new Subject<void>();
    addDemoTimerLap = new Subject<void>();
    stopDemoTimer = new Subject<void>();

    startDemoAudio = new Subject<void>();
    pauseDemoAudio = new Subject<void>();
    resumeDemoAudio = new Subject<void>();
    stopDemoAudio = new Subject<void>();

    deleteDemoShop = new Subject<number>();

    constructor(private router: Router) {}

    start() {
        this.presenting = true;
        this.stageAt = 0;
        this.router.navigate(['/home']);
    }
    stop() {
        this.presenting = false;
        this.stageAt = 0;
    }
    goToStage(num: number) {
        if (num == -1) this.stop();
        if (num < 0 || num > this.numberOfStages) return
        switch (num) {
            case 3:
                this.createDemoShop.next();
            break;
            case 5:
                this.startDemoShop.next();
            break;
            case 8:
                this.startDemoTimer.next();
            break;
            case 9:
                this.addDemoTimerLap.next();
            break;
            case 10:
                this.stopDemoTimer.next();
            break;
            case 11:
                this.startDemoAudio.next();
            break;
            case 12:
                this.pauseDemoAudio.next();
            break;
            case 13:
                this.resumeDemoAudio.next();
            break;
            case 14:
                this.stopDemoAudio.next();
            break;
        }
        this.stageAt = num;
    }

    get isPresenting() {
        return this.presenting;
    }
    get stage() {
        return this.stageAt;
    }
}
