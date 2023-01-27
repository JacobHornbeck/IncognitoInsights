import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddImageService } from './services/add-image.service';
import { App } from "@capacitor/app";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private router: Router, private addImage: AddImageService) {
        this.addListeners();
    }
    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    }
    async addListeners() {
        App.addListener('appRestoredResult', (data: any) => {
            if (data.pluginId == 'Camera' && data.methodName == 'getPhoto' && data.success) {
                setTimeout(() => {
                    this.addImage.afterRestart.next(`data:image/jpeg;base64,${data.data.base64String}`)
                }, 1500);
                this.router.navigate(['/shop/', localStorage.getItem('shopId')])
                localStorage.removeItem('shopId')
            }
        })
    }
}
