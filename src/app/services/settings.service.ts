import { Injectable } from '@angular/core';
import { FilesystemService } from './filesystem.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    private settings = {
        nameToShow: 'Jacob',
        relativeDate: false,
        showStarterMessage: true,
        messageFontSize: 11
    }
    constructor(private filesystem: FilesystemService) {
        this.init()
    }

    async init() {
        await this.filesystem.read('settings.json')
            .then((result: any) => {
                this.settings = JSON.parse(result.data)
            })
            .catch(async (error) => {
                if (error.message == 'File does not exist') {
                    await this.filesystem.write('settings.json', JSON.stringify(this.settings))
                }
            })
    }

    async updateSettings(settings: any) {
        this.settings = settings
        await this.filesystem.write('settings.json', JSON.stringify(this.settings))
    }

    get appSettings() {
        return this.settings
    }
}
