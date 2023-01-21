import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root'})
export class LoadingService {
    constructor(private loadingCtrl: LoadingController) {}

    async createLoader(message: string = 'Loading...', duration: number = 2, cb: Function) {
        const loader = await this.loadingCtrl.create({
            message: message,
            duration: duration*1000
        })
        await loader.present()

        loader
            .onWillDismiss()
            .then((result: any) => {
                cb(result)
            })
    }

    async createInfiniteLoader(message: string = 'Loading...') {
        const loader = await this.loadingCtrl.create({
            message: message,
            duration: 0
        })
        await loader.present()

        return loader
    }
}
