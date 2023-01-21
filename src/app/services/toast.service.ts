import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
    constructor(private toastController: ToastController) {}
    async createToast(message: string,
                      position: "top" | "bottom" | "middle" | undefined = 'bottom',
                      duration: number = 2000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: position
        })
        await toast.present()
    }
}
