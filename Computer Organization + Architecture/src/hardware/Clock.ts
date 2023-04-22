import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
export class Clock extends Hardware {

    private _CL_Array: Array<ClockListener> = [];

    constructor() {
        super(0, 'Clock');
    }

    public initClock(interval: number) {
        let that = this;
        setInterval(function() { 
            return that.sendPulse();
        }, interval);
    }

    public initClockListeners(clock: ClockListener) {
        this._CL_Array.push(clock);
    }

    public sendPulse() : void {
        this.log("System clock pulse");
        for (let clock of this._CL_Array) {
            clock.pulse();
        }
    }

    public stopClock(): void {
        let terminate = setInterval(function() { 
            return console.log("User Program Completed! System clock has been stopped.");
        }, 500);
        clearInterval(terminate);
    }
}