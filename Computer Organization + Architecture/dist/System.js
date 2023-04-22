"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const Hardware_1 = require("./hardware/Hardware");
const Cpu_1 = require("./hardware/Cpu");
const Memory_1 = require("./hardware/Memory");
const MMU_1 = require("./hardware/MMU");
const Clock_1 = require("./hardware/Clock");
/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL = 500; // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
// A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
// .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
// small, I recommend a setting of 100, if you want to slow things down
// make it larger.
class System extends Hardware_1.Hardware {
    constructor() {
        super(0, "System");
        this._CPU = null;
        this._RAM = null;
        this._MMU = null;
        this._Clock = null;
        this.running = false;
        this._CPU = new Cpu_1.Cpu(this);
        this._RAM = new Memory_1.Memory();
        this._MMU = new MMU_1.MMU(this._CPU, this._RAM);
        this._Clock = new Clock_1.Clock();
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */
        this.startSystem();
    }
    startSystem() {
        // initialize cpuClockCount to 0
        this._CPU.cpuClockCount = 0;
        // start interface clock
        this._Clock.initClock(CLOCK_INTERVAL);
        // initialize CPU and Memory Clock Listeners
        this._Clock.initClockListeners(this._RAM);
        this._Clock.initClockListeners(this._CPU);
        // initialize Memory
        this._RAM.initMemory();
        // set to false to disable debugging, which prevents printing Hardware log
        this._CPU.debugSwitch(true);
        // link MMU to CPU to utilize memory when CPU processing on clock pulse
        this._CPU.linkMMU(this._MMU);
        // set log message used by initialized hardware
        var message = "Created";
        // log initialized hardware
        console.log("================= HARDWARE INITIALIZED ==================");
        super.log(message);
        this._Clock.log(message);
        this._CPU.log(message);
        this._RAM.log(message);
        this._MMU.log(message);
        // initialize memory values and display memory
        console.log();
        console.log("====================== MEMORY DUMP ======================");
        /* Display first 0x14 bytes of memory [Lab1] */
        //let iteration = 0x14;
        //this._RAM.displayMemory(iteration);
        /* Test MAR separate method */
        //this.programTest_separate();
        /* Test memoryDump method */
        this.programTest();
        console.log();
        console.log("====================== CLOCK PULSE ======================");
        return true;
    }
    programTest() {
        // load constant 0
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x00);
        // write acc (0) to 0040
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x40);
        this._MMU.writeImmediate(0x0004, 0x00);
        // load constant 1
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x40);
        this._MMU.writeImmediate(0x0009, 0x00);
        // write acc ? to 0040
        this._MMU.writeImmediate(0x000A, 0x8D);
        this._MMU.writeImmediate(0x000B, 0x40);
        this._MMU.writeImmediate(0x000C, 0x00);
        // Load y from memory 0040
        this._MMU.writeImmediate(0x000D, 0xAC);
        this._MMU.writeImmediate(0x000E, 0x40);
        this._MMU.writeImmediate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this._MMU.writeImmediate(0x0010, 0xA2);
        this._MMU.writeImmediate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x0012, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this._MMU.writeImmediate(0x0013, 0xA2);
        this._MMU.writeImmediate(0x0014, 0x03);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x0015, 0xFF);
        this._MMU.writeImmediate(0x0016, 0x50);
        this._MMU.writeImmediate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
        this._MMU.writeImmediate(0x0018, 0xD0);
        this._MMU.writeImmediate(0x0019, 0xED);
        // globals
        this._MMU.writeImmediate(0x0050, 0x2C);
        this._MMU.writeImmediate(0x0051, 0x20); // this was missing from spec sheet??
        this._MMU.writeImmediate(0x0052, 0x00);
        this._RAM.log("Initialized Memory");
        this._MMU.memoryDump(0x0000, 0x001A);
        console.log("---------------------------------------------------------");
        this._MMU.memoryDump(0x0050, 0x0053);
    }
    programTest_separate() {
        this._MMU.setMAR_separate(0x01, 0x00);
        this._MMU.setMDR(parseInt(this.hexConverter(0xA9)));
        this._MMU.writeMem();
        this._MMU.memoryDump(0x0000, 0x0002);
    }
    stopSystem() {
        this._Clock.stopClock();
        return false;
    }
}
exports.System = System;
let system = new System();
//# sourceMappingURL=System.js.map