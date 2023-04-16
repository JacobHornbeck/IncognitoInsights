/* Library Imports */
import { Component,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { VoiceRecorder } from "capacitor-voice-recorder";
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from "@ionic/core";
import { Subscription } from 'rxjs';

/* Model Imports */
import { Content } from '../models/content.model';

/* Utility Imports */
import { getPreciseTime } from "../utils/helper-functions";

/* Service Imports */
import { SettingsService } from '../services/settings.service';
import { ShopService } from '../services/shop.service';
import { TimerService } from '../services/timer.service';
import { ToastService } from '../services/toast.service';
import { AddImageService } from '../services/add-image.service';
import { TutorialService } from '../services/tutorial.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit, OnDestroy {
    @ViewChild('messagesContainer') content: IonContent;
    @ViewChild(IonModal) modal: IonModal;

    /* Local Setting Variables */
    nameToShow: string = 'Jacob';
    showStarterMessage: boolean = true;
    messageFontSize: number = 11;
    shopId: number = -1;
    
    /* Other Local Variables */
    messages: Content[] = [];
    audioStatus: string = 'NONE';
    showImageView: boolean = false;
    messageToDelete: number = -1;
    deletingType: string = 'shop content';
    imageViewSrc: string = '';
    savingMessages: boolean = false;

    /* Subscription Holders */
    currentRouteSubscription: Subscription;
    addImageSubscription: Subscription;

    susSubscription: Subscription;

    constructor(private settings: SettingsService, private shops: ShopService, public  timer: TimerService,
                private activeRoute: ActivatedRoute, private toast: ToastService,
                private addImage: AddImageService, private tutorial: TutorialService) {
        /* Subscribe to activeRoute to get the shopID */
        this.currentRouteSubscription = this.activeRoute.params.subscribe(async (route: any) => {
            this.shopId = route.id;
            this.messages = (await this.shops.getShop(this.shopId)).data
        })

        /* Subscribe to afterRestart, for when the app returns to focus after taking a picture */
        this.addImageSubscription = this.addImage.afterRestart.subscribe((imageData: string) => {
            this.post(imageData || '', false, 'image')
            this.scroll(1000, true)
        })

        this.susSubscription = this.settings.updateSettingsEvent.subscribe(() => {
            this.ngOnInit()
        })

        /* Check for recording permissions, and ask if needed */
        VoiceRecorder.hasAudioRecordingPermission()
            .then((result: any) => {
                if (result.value == false) VoiceRecorder.requestAudioRecordingPermission()
            })
            .catch((error: any) => {
                console.log(error);
            })

        /* Check for camera permissions, and ask if needed */
        Camera.checkPermissions()
            .then((result: any) => {
                if (result.camera != 'granted') {
                    Camera.requestPermissions()
                }
            })
            .catch((error: any) => {
                console.log(error);
            })
        
        /* Check tutorial subscriptions */
        this.tutorial.startDemoTimer.subscribe(() => { this.startTimer(); });
        this.tutorial.addDemoTimerLap.subscribe(() => { this.addLap(); });
        this.tutorial.stopDemoTimer.subscribe(() => { this.stopTimer(); });
        
        this.tutorial.startDemoAudio.subscribe(() => { this.startAudioRecording(); });
        this.tutorial.pauseDemoAudio.subscribe(() => { this.pauseAudioRecording(); });
        this.tutorial.resumeDemoAudio.subscribe(() => { this.resumeAudioRecording(); });
        this.tutorial.stopDemoAudio.subscribe(() => { this.stopAudioRecording(); });
    }
    async ngOnInit(): Promise<void> {
        await this.settings.init()
        let settings = this.settings.appSettings
        this.nameToShow = settings.nameToShow || 'Jacob'
        this.showStarterMessage = settings.showStarterMessage ? true : settings.showStarterMessage == false ? false : false
        this.messageFontSize = settings.messageFontSize || 11
        this.scroll(1000, true)
    }
    ngOnDestroy(): void {
        this.addImageSubscription.unsubscribe()
        this.currentRouteSubscription.unsubscribe()
    }

    private scroll(delay: number = 500, again: boolean = false) {
        setTimeout(() => {
            this.content.scrollToBottom(200);

            if (again) this.scroll(delay)
        }, delay);
    }
    
    private checkAudioErrors(e: any) {
        console.log(`Message: '${e.message}'`);
        switch (e.message) {
            case 'ALREADY_RECORDING':
                this.toast.createToast('A recording is already in progress')
            break;
            case 'DEVICE_CANNOT_VOICE_RECORD':
                this.toast.createToast('Sorry, your device doesn\'t support audio recording')
            break;
            case 'EMPTY_RECORDING':
                this.toast.createToast('The recording was empty')
            break;
            case 'FAILED_TO_FETCH_RECORDING':
                this.toast.createToast('Something went wrong, retrieving the recording. We apologize for the inconvenience')
            break;
            case 'FAILED_TO_RECORD':
                this.toast.createToast('Failed to start recording, try again later')
            break;
            case 'MICROPHONE_BEING_USED':
                this.toast.createToast('Another app is using your microphone')
            break;
            case 'MISSING_PERMISSION':
                this.toast.createToast('Please allow microphone permission to use this feature')
                VoiceRecorder.requestAudioRecordingPermission()
            break;
            case 'NOT_SUPPORTED_OS_VERSION':
                this.toast.createToast('Your phone doesn\'t support pausing the recording')
            break;
            case 'RECORDING_HAS_NOT_STARTED':
                this.toast.createToast('No recording in progress, cannot perform action')
            break;
            default:
                this.toast.createToast('Something went wrong, please try again')
            break;
        }
    }

    post(content: string, sent: boolean = true, type: 'note' | 'image' | 'audio' = 'note') {
        this.messages.push({
            date: getPreciseTime(new Date()),
            content: content,
            type: type,
            sent: sent
        })
        if (this.shopId >= 0) {
            this.savingMessages = true;
            this.shops.updateShopData(this.shopId, this.messages).then(() => {
                this.savingMessages = false;
            })
        }
        else {
            this.toast.createToast('Couldn\'t save, please try again later')
        }
    }

    async startAudioRecording() {
        try {
            await VoiceRecorder.startRecording()
            this.updateAudioStatus('RECORDING')

            this.post('audio recording started', false)

            this.scroll()
        }
        catch (e: any) {
            this.checkAudioErrors(e);
        }
    }

    async pauseAudioRecording() {
        try {
            await VoiceRecorder.pauseRecording()
            this.updateAudioStatus('PAUSED')

            this.post('audio recording paused', false)

            this.scroll()
        }
        catch (e: any) {
            this.checkAudioErrors(e);
        }
    }

    async resumeAudioRecording() {
        try {
            await VoiceRecorder.resumeRecording()
            this.updateAudioStatus('RECORDING')

            this.post('audio recording resumed', false)

            this.scroll()
        }
        catch (e: any) {
            this.checkAudioErrors(e);
        }
    }

    async stopAudioRecording() {
        try {
            let result = await VoiceRecorder.stopRecording()
            this.updateAudioStatus('NONE')

            this.post(`data:${result.value.mimeType};base64,${result.value.recordDataBase64}`, false, 'audio')

            this.scroll()
        }
        catch (e: any) {
            this.checkAudioErrors(e);
        }
    }

    private updateAudioStatus(status: string) {
        this.audioStatus = status
    }

    async takePhoto() {
        localStorage.setItem('shopId', ''+this.shopId)
        Camera
            .getPhoto({
                quality: 50,
                resultType: CameraResultType.Base64,
                allowEditing: false,
                saveToGallery: true,
                source: CameraSource.Camera
            })
            .then((result:any) => {
                this.post(`data:image/jpeg;base64,${result.base64String}`, false, 'image')
                this.scroll(1000, true)
            })
            .catch((error) => {
                this.toast.createToast('Something went wrong, please try again')
                console.log(error);
            })
    }

    startTimer() {
        if (this.timer.isActive) {
            this.toast.createToast('Timer is already running')
            return
        }
        this.timer.begin()
        this.post('timer has been started', false)
        this.scroll()
    }

    addLap() {
        if (!this.timer.isActive) {
            this.toast.createToast('No timer running')
            return
        }
        this.timer.lap()
        this.post('a lap has been added to the timer', false)
        this.scroll()
    }

    stopTimer() {
        if (!this.timer.isActive) {
            this.toast.createToast('No timer running')
            return
        }
        this.timer.stop()
        this.post(this.timer.getLapTimes(), false)
        this.scroll()
    }

    send(input: any) {
        let message = input.value.toString()
        if (message.length == 0) return

        this.post(message)

        input.value = ''
        this.scroll()
    }

    deleteMessage(id: number) {
        this.messageToDelete = id;
        if (['image', 'audio', 'note', 'command'].includes(this.messages[id].type))
            this.deletingType = this.messages[id].type
        if (this.messages[id].type == 'note' && !this.messages[id].sent)
            this.deletingType = 'result'
        this.modal.present();
    }

    openImageView(src: string) {
        this.imageViewSrc = src;
        this.showImageView = true;
    }

    closeImageView() {
        this.imageViewSrc = '';
        this.showImageView = false;
    }

    onWillDismiss(event: Event) {
        const ev = event as CustomEvent<OverlayEventDetail<string>>;
        if (ev.detail.role == 'delete' && this.messageToDelete >= 0) {
            this.messages = this.messages.filter((value: any, index: number) => {
                if (index == this.messageToDelete) return false
                return true
            })
            if (this.shopId >= 0) {
                this.savingMessages = true;
                this.shops.updateShopData(this.shopId, this.messages).then(() => {
                    this.savingMessages = false;
                })
            }
            else {
                this.toast.createToast('Couldn\'t save, please try again later')
            }
        }
        this.messageToDelete = -1
    }

    deleteContent() {
        this.modal.dismiss(null, 'delete')
    }

    cancel() {
        this.modal.dismiss(null, 'cancel')
    }
}
