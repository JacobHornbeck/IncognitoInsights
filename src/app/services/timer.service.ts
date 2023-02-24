import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimerService {
    private start: Date | null;
    private laps: Date[] = [];
    private end: Date | null;

    constructor() {}

    private formatTime(t: number) {
        let timeString = ''

        
        timeString += Math.floor(t/60000).toString().padStart(2, '0')
        t -= 60000*Math.floor(t/60000)

        if (timeString.length > 0) timeString += ':'
        timeString += Math.floor(t/1000).toString().padStart(2, '0')
        t -= 1000*Math.floor(t/1000)

        return timeString
    }

    private getLapTime(lapNum: number) {
        if (lapNum < 0 || lapNum > this.laps.length || !this.start || !this.end)
            return -1
        if (lapNum == 0)
            return this.formatTime(this.laps[0].getTime() - this.start.getTime())
        if (lapNum == this.laps.length)
            return this.formatTime(this.end.getTime() - this.laps[this.laps.length-1].getTime())
        if (lapNum < this.laps.length)
            return this.formatTime(this.laps[lapNum].getTime() - this.laps[lapNum-1].getTime())

        return -1
    }

    private getTotalTimeFromLap(lapNum: number) {
        if (lapNum < 0 || lapNum > this.laps.length || !this.start || !this.end)
            return -1
        
        return this.formatTime(this.laps[lapNum].getTime() - this.start.getTime())
    }

    begin() {
        if (!this.isActive || this.end) {
            this.start = new Date();
            this.end = null
        }
    }

    lap() {
        if (this.isActive)
            this.laps.push(new Date());
    }

    stop() {
        if (this.isActive)
            this.end = new Date();
    }

    getLapTimes() {
        let str = '';
        if (this.wasActive) {
            if (this.laps.length > 0) {
                str += `#${this.laps.length+1}\t${this.getLapTime(this.laps.length)}\t${this.formatTime(this.getTime)}<br>`
                for (let i = this.laps.length - 1; i >= 0; i--) {
                    str += `#${i+1}\t${this.getLapTime(i)}\t${this.getTotalTimeFromLap(i)}`
                    if (i > 0) str += '<br>'
                }
            }
            else str = this.getUserFriendlyTime

            return str
        }
        return 'no time'
    }
    
    get isActive() {
        return this.start && !this.end
    }

    get wasActive() {
        return this.start && this.end
    }

    get getTime() {
        if (!this.end && this.start)
            return (new Date().getTime() - this.start?.getTime())
        else if (this.end && this.start)
            return this.end?.getTime() - this.start?.getTime()
        else
            return 0
    }

    get getUserFriendlyTime() {
        return this.formatTime(this.getTime)
    }
}
