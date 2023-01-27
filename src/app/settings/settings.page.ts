import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, IonToggle } from '@ionic/angular';

import { SettingsService } from '../services/settings.service';
import { getAbsoluteDate, getRelativeDate, getViewport } from "../utils/helper-functions";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterViewInit {
    @ViewChild('dateFormatToggle') dateFormat: IonToggle;
    @ViewChild('starterCheckbox') starterMessage: IonCheckbox;
    nameToShow: string = 'Jacob';
    absoluteDateExample: string;
    relativeDateExample: string;
    messageFontSize: number = 11;

    constructor(private settings: SettingsService) {}
    ngOnInit(): void {
        this.absoluteDateExample = getAbsoluteDate(new Date('12/1/2022'))
        this.relativeDateExample = getRelativeDate(new Date('12/1/2022'))
    }
    async ngAfterViewInit(): Promise<void> {
        await this.settings.init()
        let settings = this.settings.appSettings
        this.nameToShow = settings.nameToShow || 'Jacob'
        this.dateFormat.checked = settings.relativeDate || false
        this.starterMessage.checked = settings.showStarterMessage ? true : settings.showStarterMessage == false ? false : false
        this.messageFontSize = settings.messageFontSize || 11
    }

    toggleDateFormat() {
        this.dateFormat.checked = !this.dateFormat.checked
        this.saveSettings()
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

    async saveSettings() {
        await this.settings.updateSettings({
            nameToShow: this.nameToShow,
            relativeDate: this.dateFormat.checked,
            showStarterMessage: this.starterMessage.checked,
            messageFontSize: this.messageFontSize,
        })
    }

    pinFormatter(value: number) {
        return `${value}pt`
    }

    get showTallToggle(): boolean {
        return getViewport().width <= 360
    }

    get showWideToggle(): boolean {
        return getViewport().width > 360
    }
}
