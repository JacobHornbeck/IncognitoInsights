import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ActionSheetService {
    constructor(private actionSheetController: ActionSheetController) {}

    async createActionSheet(asOptions: any): Promise<any> {
        const actionSheet = await this.actionSheetController.create(asOptions)

        await actionSheet.present()
        const result = await actionSheet.onDidDismiss()
        return result
    }
}
