import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";

import { AddImageService } from './services/add-image.service';
import { ThemeService } from './services/theme.service';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(private router: Router, private addImage: AddImageService, theme: ThemeService, platform: Platform) {
        this.addListeners();
        theme.darkMode$.subscribe((colorMode) => {
            document.body.classList.remove('auto')
            document.body.classList.remove('dark')
            document.body.classList.remove('light')
            document.body.classList.add(colorMode)
        })
        platform.ready().then(() => {
            SplashScreen.hide()
        })
    }
    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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
