"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
const Hardware_1 = require("./Hardware");
class Clock extends Hardware_1.Hardware {
    constructor() {
        super(0, 'Clock');
        this._CL_Array = [];
    }
    initClock(interval) {
        let that = this;
        setInterval(function () {
            return that.sendPulse();
        }, interval);
    }
    initClockListeners(clock) {
        this._CL_Array.push(clock);
    }
    sendPulse() {
        this.log("System clock pulse");
        for (let clock of this._CL_Array) {
            clock.pulse();
        }
    }
    stopClock() {
        let terminate = setInterval(function () {
            return console.log("User Program Completed! System clock has been stopped.");
        }, 500);
        clearInterval(terminate);
    }
}
exports.Clock = Clock;
//# sourceMappingURL=Clock.js.map