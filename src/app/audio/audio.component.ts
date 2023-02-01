import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { share } from '../utils/helper-functions';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements AfterViewInit {
    @ViewChild('audioEl') audio: ElementRef;
    @Input() audioSource: string;
    @Input() recordDate: string;
    wasPlaying: boolean = false;
    currentTime: number = 0;
    
    constructor(public sanitizer: DomSanitizer) {}
    ngAfterViewInit(): void {
        this.audio.nativeElement.src = this.audioSource
    }

    calculateTime(secs: number) {
        if (secs == Infinity || Number.isNaN(secs)) return '-:--'

        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    async init() {
        if (this.audio.nativeElement.duration == Infinity) {
            this.audio.nativeElement.currentTime = 100000000
            setTimeout(() => {
                this.audio.nativeElement.currentTime = 0
            }, 1000);
        }
    }

    playRecording() {
        this.audio.nativeElement.play()
    }

    pauseRecording(setToStartAgain: boolean = false) {
        this.audio.nativeElement.pause()
        if (setToStartAgain) this.wasPlaying = true
    }

    muteRecording() {
        this.audio.nativeElement.muted = true
    }

    unmuteRecording() {
        this.audio.nativeElement.muted = false
    }

    updateCurrentTime() {
        this.currentTime = this.audio.nativeElement.currentTime
    }

    shareAudioRecording() {
        share('audioRecording.mp3', this.audioSource)
    }

    timeSeek() {
        this.audio.nativeElement.currentTime = this.currentTime
        if (this.wasPlaying) {
            this.playRecording()
            this.wasPlaying = false;
        }
    }
}
