import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    public darkMode$ = new BehaviorSubject<string>('auto');
    private prefDark = window.matchMedia('(prefers-color-scheme: dark)');

    constructor() {
        this.setMode(this.getMode());

        if (this.getMode() === 'auto') {
            this.darkMode$.next(this.prefDark.matches ? 'dark' : 'light');
            this.listenToColorModeChanges();
        }
    }

    private applyColorModeChanges = (event: any) => {
        this.darkMode$.next(event.matches);
    }

    private listenToColorModeChanges() {
        this.prefDark.addEventListener('change', this.applyColorModeChanges);
    }

    private removeColorModeChangesListener() {
        this.prefDark.removeEventListener('change', this.applyColorModeChanges);
    }

    setMode = (colorMode: string) => {
        colorMode = colorMode.toLowerCase()
        if (colorMode == 'auto' || colorMode == 'dark' || colorMode == 'light') {
            localStorage.setItem('mode', colorMode);
            this.darkMode$.next(colorMode);
            if (colorMode == 'auto')
                this.listenToColorModeChanges();
            else
                this.removeColorModeChangesListener();
        }
    };

    getMode = (): string => {
        return (localStorage.getItem('mode') ?? 'auto');
    };
}
