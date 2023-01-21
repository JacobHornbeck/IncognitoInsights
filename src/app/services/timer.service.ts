import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimerService {
    private start: Date | null;
    private laps: Date[] = [];
    private end: Date | null;

    constructor() {}

    private formatTime(t: number) {
        let timeString = ''

        if (t > 3600000) {
            timeString += Math.floor(t/3600000)+' hour'+'s'.substring(0, Math.floor(t/3600000))
            t -= 3600000*Math.floor(t/3600000)
        }
        if (t > 60000) {
            if (timeString.length > 0) timeString += ' '
            timeString += Math.floor(t/60000)+' minute'+'s'.substring(0, Math.floor(t/60000))
            t -= 60000*Math.floor(t/60000)
        }
        if (t > 1000) {
            if (timeString.length > 0) timeString += ' '
            timeString += Math.floor(t/1000)+' second'+'s'.substring(0, Math.floor(t/1000))
            t -= 1000*Math.floor(t/1000)
        }

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
        let str = `Total time: ${this.getUserFriendlyTime}<br>Number of laps: ${this.laps.length}<br><br>`
        if (this.wasActive) {
            if (this.laps.length > 0) {
                str += `Start - Lap 1: ${this.getLapTime(0)}<br>`
                str += this.laps.map((value: any, index: number) => {
                    if (index == this.laps.length-1)
                        return `Lap ${index+1} - End: ${this.getLapTime(index+1)}`
                    return `Lap ${index+1} - Lap ${index+2}: ${this.getLapTime(index+1)}`
                }).join('<br>')
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
