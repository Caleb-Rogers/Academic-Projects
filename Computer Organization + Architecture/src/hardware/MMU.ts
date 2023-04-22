import { Hardware } from "./Hardware";
import { Memory } from "./Memory";
import { Cpu } from "./Cpu";

export class MMU extends Hardware {
    
    private memory: Memory = null;
    private cpu: Cpu = null;

    private lowBit: number;
    private highBit: number;

    constructor (cpu: Cpu, memory: Memory) {
        super(0, "MMU");
        this.memory = memory;
        this.cpu = cpu;
    }


    /* Getters & Setters for MAR & MDR */
    public getMAR() {
        return this.memory.getMAR();
    }
    public setMAR(address: number): void {
        this.memory.setMAR(address.toString());
    }
    public setMAR_separate(byte1: number, byte2: number): void {
        var little_endian = this.littleEndian(byte1, byte2);
        this.memory.setMAR(little_endian);
    }
    public getMDR() {
        return this.memory.getMDR();
    }
    public setMDR(mdr: number): void {
        this.memory.setMDR(mdr.toString());
    }


    /* Getters & Setters for low and high bits */
    public getLowOrderByte(): number {
        return this.lowBit;
    }
    public setLowOrderByte(lowBit: number): void {
        this.lowBit = lowBit;
    }
    public getHighOrderByte(): number {
        return this.highBit;
    }
    public setHighOrderByte(highBit: number): void {
        this.highBit = highBit;
    }


    /* Triggering actions for Memory */
    public readMem(): void {
        this.memory.read();
    }
    public writeMem(): void {
        this.memory.write();
    }


    public writeImmediate(address: number, data: number): void {
        this.setMAR(address);
        this.setMDR(data);
        this.writeMem();
    }

    public memoryDump(from_addr: number, to_addr: number): void {
        this.memory.log("Memory Dump: Debug");
        this.memory.log("- - - - - - - - - - -");
        let curr_addr = from_addr;
        while (curr_addr <= to_addr) {
            let curr_mem = this.memory.getMemory();
            this.memory.log("Addr " + '00' + this.hexConverter(curr_addr) + ": | " +  this.hexConverter(parseInt(curr_mem[curr_addr], 10)));
            curr_addr += 0x0001;
        }
        this.memory.log("- - - - - - - - - - -");
        this.memory.log("Memory Dump: Complete");
    }

    public littleEndian(low_bit: number, high_bit: number) {
        let addr = high_bit << 8;
        addr += low_bit;
        let littleEndian = "0x" + this.hexConverter(addr);
        return littleEndian;
    }
}