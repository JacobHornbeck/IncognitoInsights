import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TutorialOverlayComponent } from './tutorial-overlay/tutorial-overlay.component';
import { SvgArrowComponent } from './tutorial-overlay/svg-arrow/svg-arrow.component';
import { TutorialService } from './services/tutorial.service';

@NgModule({
    declarations: [ AppComponent, TutorialOverlayComponent, SvgArrowComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TutorialService],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
