import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IonCheckbox } from '@ionic/angular';

import { SettingsService } from '../services/settings.service';
import { ThemeService } from '../services/theme.service';
import { TutorialService } from '../services/tutorial.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements AfterViewInit {
    @ViewChild('starterCheckbox') starterMessage: IonCheckbox;
    dateFormat: string = 'absolute';
    userTheme: string = 'auto';
    nameToShow: string = 'Jacob';
    messageFontSize: number = 11;

    constructor(private settings: SettingsService, private theme: ThemeService, public tutorial: TutorialService) {}
    async ngAfterViewInit(): Promise<void> {
        await this.settings.init()
        let settings = this.settings.appSettings
        this.nameToShow = settings.nameToShow || 'Jacob'
        this.starterMessage.checked = settings.showStarterMessage ? true : settings.showStarterMessage == false ? false : false
        this.messageFontSize = settings.messageFontSize || 11
        this.userTheme = settings.darkMode || 'auto'
    }

    goingBack() {
        this.settings.updateSettingsEvent.next();
    }

    oppositeTheme(theme: string) {
        return theme == 'dark' ? 'light' : 'dark'
    }

    updateName(name: any) {
        if (this.nameToShow == name.value) return
        this.nameToShow = name.value
        this.saveSettings()
    }

    updateStarter(checkbox: IonCheckbox) {
        if (!checkbox) return
        this.saveSettings()
    }

    async saveSettings(changedTheme = false) {
        if (changedTheme) {
            this.theme.setMode(this.userTheme)
        }
        await this.settings.updateSettings({
            nameToShow: this.nameToShow,
            showStarterMessage: this.starterMessage.checked,
            messageFontSize: this.messageFontSize,
            darkMode: this.userTheme
        })
    }

    pinFormatter(value: number) {
        return `${value}pt`
    }
}
