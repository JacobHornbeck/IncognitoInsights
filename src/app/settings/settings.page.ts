import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox } from '@ionic/angular';

import { SettingsService } from '../services/settings.service';
import { ThemeService } from '../services/theme.service';
import { getAbsoluteDate, getRelativeDate } from "../utils/helper-functions";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterViewInit {
    @ViewChild('starterCheckbox') starterMessage: IonCheckbox;
    dateFormat: string = 'absolute';
    userTheme: string = 'auto';
    nameToShow: string = 'Jacob';
    absoluteDateExample: string;
    relativeDateExample: string;
    messageFontSize: number = 11;

    constructor(private settings: SettingsService, private theme: ThemeService) {}
    ngOnInit(): void {
        this.absoluteDateExample = getAbsoluteDate(new Date('12/1/2022'))
        this.relativeDateExample = getRelativeDate(new Date('12/1/2022'))
    }
    async ngAfterViewInit(): Promise<void> {
        await this.settings.init()
        let settings = this.settings.appSettings
        this.nameToShow = settings.nameToShow || 'Jacob'
        this.dateFormat = settings.dateFormat || 'absolute'
        this.starterMessage.checked = settings.showStarterMessage ? true : settings.showStarterMessage == false ? false : false
        this.messageFontSize = settings.messageFontSize || 11
        this.userTheme = settings.darkMode || 'auto'
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
            dateFormat: this.dateFormat,
            showStarterMessage: this.starterMessage.checked,
            messageFontSize: this.messageFontSize,
            darkMode: this.userTheme
        })
    }

    pinFormatter(value: number) {
        return `${value}pt`
    }

    startTutorial() {
        
    }
}
