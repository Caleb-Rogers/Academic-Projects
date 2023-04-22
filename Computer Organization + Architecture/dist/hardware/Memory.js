"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
const Hardware_1 = require("./Hardware");
class Memory extends Hardware_1.Hardware {
    constructor() {
        super(0, "RAM");
        // declare Memory array
        this._MemArray = new Array;
    }
    /* Getters & Setters for MAR, MDR, and Memory */
    getMAR() {
        return this._MAR;
    }
    setMAR(mar) {
        this._MAR = mar;
    }
    getMDR() {
        return this._MDR;
    }
    setMDR(mdr) {
        this._MDR = mdr;
    }
    getMemory() {
        return this._MemArray;
    }
    setMemory(mem_array) {
        this._MemArray = mem_array;
    }
    // Re-initializes Memory
    reset() {
        this._MAR = "0x0000";
        this._MDR = "0x00";
        this.initMemory();
    }
    // Memory CLock Listener
    pulse() {
        this.log("Received clock pulse");
    }
    // Reads from Memory using MAR (address) and sets to MDR (data)
    read() {
        this.setMDR(this.hexConverter(this._MemArray[this.getMAR()]));
    }
    // Writes into Memory using MAR for location and MDR for instruction
    write() {
        this._MemArray[this.getMAR()] = this.getMDR();
    }
    // populate 64K Memory with default hex values
    initMemory() {
        for (let i = parseInt(this.hexConverter(0x00)); i < parseInt(this.hexConverter(0x10000)); i++) {
            this._MemArray[i] = this.hexConverter(0x00);
        }
    }
    // log a specified length of Memory hex values
    displayMemory(looplength) {
        for (let i = parseInt(this.hexConverter(0x00)); i <= parseInt(this.hexConverter(looplength)); i++) {
            // validate 
            if (i < 0x10000) {
                this.log("Memory address: " + this.hexLog(i, 4) + " -- Memory value: " + this.hexLog(this._MemArray[i], 2));
            }
            // validate undefined hex values
            else {
                this.log(`[HW - ${this.name_hdw} - id: ${this.id_hdw} - ${Date.now()}]: Address : ${i} Contains Value: ERR [hexValue conversion]: number undefined`);
                break;
            }
        }
    }
}
exports.Memory = Memory;
//# sourceMappingURL=Memory.js.map