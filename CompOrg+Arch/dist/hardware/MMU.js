"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMU = void 0;
const Hardware_1 = require("./Hardware");
class MMU extends Hardware_1.Hardware {
    constructor(cpu, memory) {
        super(0, "MMU");
        this.memory = null;
        this.cpu = null;
        this.memory = memory;
        this.cpu = cpu;
    }
    /* Getters & Setters for MAR & MDR */
    getMAR() {
        return this.memory.getMAR();
    }
    setMAR(address) {
        this.memory.setMAR(address.toString());
    }
    setMAR_separate(byte1, byte2) {
        var little_endian = this.littleEndian(byte1, byte2);
        this.memory.setMAR(little_endian);
    }
    getMDR() {
        return this.memory.getMDR();
    }
    setMDR(mdr) {
        this.memory.setMDR(mdr.toString());
    }
    /* Getters & Setters for low and high bits */
    getLowOrderByte() {
        return this.lowBit;
    }
    setLowOrderByte(lowBit) {
        this.lowBit = lowBit;
    }
    getHighOrderByte() {
        return this.highBit;
    }
    setHighOrderByte(highBit) {
        this.highBit = highBit;
    }
    /* Triggering actions for Memory */
    readMem() {
        this.memory.read();
    }
    writeMem() {
        this.memory.write();
    }
    writeImmediate(address, data) {
        this.setMAR(address);
        this.setMDR(data);
        this.writeMem();
    }
    memoryDump(from_addr, to_addr) {
        this.memory.log("Memory Dump: Debug");
        this.memory.log("- - - - - - - - - - -");
        let curr_addr = from_addr;
        while (curr_addr <= to_addr) {
            let curr_mem = this.memory.getMemory();
            this.memory.log("Addr " + '00' + this.hexConverter(curr_addr) + ": | " + this.hexConverter(parseInt(curr_mem[curr_addr], 10)));
            curr_addr += 0x0001;
        }
        this.memory.log("- - - - - - - - - - -");
        this.memory.log("Memory Dump: Complete");
    }
    littleEndian(low_bit, high_bit) {
        let addr = high_bit << 8;
        addr += low_bit;
        let littleEndian = "0x" + this.hexConverter(addr);
        return littleEndian;
    }
}
exports.MMU = MMU;
//# sourceMappingURL=MMU.js.map