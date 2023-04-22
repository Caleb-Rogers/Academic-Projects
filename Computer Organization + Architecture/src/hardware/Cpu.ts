import { System } from "../System";
import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { MMU } from "./MMU";
import { Ascii } from "./util/Ascii";
import { InterruptController } from "./InterruptController";

export class Cpu extends Hardware implements ClockListener {

    public cpuClockCount: number;
    private stepCount: number;
    private currStep: string;
    private dataLen: number;
    private addr: string;
    private increment: number;

    private PC: number;
    private IR: number;
    private ACC: number;
    private xReg: number;
    private yReg: number;
    private zFlag: number;
    
    private linkedMMU: MMU;
    private sys_6502: System;

    constructor(system:System) {
        super(0, "CPU");
        this.sys_6502 = system;

        this.PC = 0x0000;
        this.IR = 0x0000;
        this.ACC = 0x0000;
        this.xReg = 0x0000;
        this.yReg = 0x0000;
        this.zFlag = 0;

        this.stepCount = 0;
        this.currStep = '';
        this.dataLen = 0;
        this.addr = '0x0000';
    }

    public linkMMU(mmu: MMU): void {
        this.linkedMMU = mmu;
    }

    // CPU CLock Listener
    public pulse() : void {
        this.cpuClockCount++;
        this.log("Received clock pulse -- Clock Count (" + this.cpuClockCount + ")");
        this.log("CPU State | Mode: 0 PC: 00" + this.hexConverter(this.PC) + " IR: " + this.hexConverter(this.IR) + " Acc: " + this.hexConverter(this.ACC) + " xReg: " + this.hexConverter(this.xReg) + " yReg: " + this.hexConverter(this.yReg) + " zFlag: " + this.zFlag + " Step: " + this.stepCount);
        this.stepCPU();
        this.stepCount++;
    }

    // Step through CPU Instruction Cycle
    public stepCPU(): void {
        // first run, then start with fetch
        if (this.currStep == '') {
            this.currStep = 'fetch';
            this.dataLen = 0;
        }
        // iterate through Instruction Cycle on Clock Pulse
        switch (this.currStep) {
            case 'fetch':     this.fetch();             break;
            case 'decode':    this.decode();            break;
            case 'execute':   this.execute();           break;
            case 'write':     this.writeBack();         break;
            case 'interrupt': this.interruptCheck();    break;
            default:
                console.log("[ERROR] - occurred during CPU step");
                break;
        }
    }


    /* ============ Pipeline Steps ============ */
    public fetch(): void {
        // set next instruction address and read from memory
        this.linkedMMU.setMAR(this.PC);
        this.linkedMMU.readMem();
        // update IR and proceed in Instruction Cycle
        this.IR = parseInt(this.linkedMMU.getMDR());
        this.currStep = 'decode';
    }

    public decode(): void {
        if ((this.dataLen == 0) && (this.currStep == 'decode')) {
            // if instruction data is read in, decode the instruction
            switch (this.hexConverter(this.IR)) {
                // A9 - LDA - Load accumulator with constant
                case "A9":
                    this.dataLen = 1;
                    this.currStep = 'decode';
                    break;
                // AD - LDA  - Load accumulator from memory
                case "AD":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // 8D - STA  - Store accumulator in memory
                case "8D":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // 6D - ADC - Add with Carry
                case "6D":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // A2 - LDX - Load X register with constant
                case "A2":
                    this.dataLen = 1;
                    this.currStep = 'decode';
                    break;
                // AE - LDX - Load X register from memory
                case "AE":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // A0 - LDY - Load Y register with constant
                case "A0":
                    this.dataLen = 1;
                    this.currStep = 'decode';
                    break;
                // AC - LDY - Load Y register from memory
                case "AC":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // EA - NOP - No Operation
                case "EA":
                    this.dataLen = 0;
                    this.currStep = 'interrupt';
                    break;
                // 00 - BRK - Break
                case "00":
                    this.dataLen = 0;
                    this.currStep = 'execute';
                    break;
                // EC - CPX - Compare a byte in memory to X reg, sets z flag if equal
                case "EC":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // D0 - BNE - Branch n bytes if Z flag = 0
                case "D0":
                    this.dataLen = 1;
                    this.currStep = 'decode';
                    break;
                // EE - INC - Increment value of a byte
                case "EE":
                    this.dataLen = 2;
                    this.currStep = 'decode';
                    break;
                // FF - SYS - System Call (#$01 in X = print Y, #$02 in X = print 00-terminated string at addr in Y)
                case "FF":
                    if (this.hexConverter(this.xReg) == "01") {
                        this.dataLen = 0;
                        this.currStep = 'execute';
                    } 
                    else if (this.hexConverter(this.xReg) == "02") {
                        this.dataLen = 2;
                        this.currStep = 'decode';
                    }
                    else {
                        // if the next byte is an address and not an instruction... (why would xReg==3 print a string, thought that's just 2?)
                        this.linkedMMU.setMAR(this.PC+1);
                        this.linkedMMU.readMem();
                        let tempIR = this.hexConverter(parseInt(this.linkedMMU.getMDR()));
                        if ((tempIR != "A9") && (tempIR != "AD") && (tempIR != "8D") && (tempIR != "6D") && (tempIR != "A2") && (tempIR != "AE") && (tempIR != "A0") && (tempIR != "AC") && (tempIR != "EA") && (tempIR != "00") && (tempIR != "EC") && (tempIR != "D0") && (tempIR != "EE") && (tempIR != "FF")) {
                            this.dataLen = 1;

                            this.linkedMMU.setMAR(this.PC+2);
                            this.linkedMMU.readMem();
                            let tempIR = this.hexConverter(parseInt(this.linkedMMU.getMDR()));
                            if ((tempIR != "A9") && (tempIR != "AD") && (tempIR != "8D") && (tempIR != "6D") && (tempIR != "A2") && (tempIR != "AE") && (tempIR != "A0") && (tempIR != "AC") && (tempIR != "EA") && (tempIR != "00") && (tempIR != "EC") && (tempIR != "D0") && (tempIR != "EE") && (tempIR != "FF")) {
                                this.dataLen += 1;
                            }
                            this.currStep = 'decode';
                        }
                        else { 
                            this.currStep = 'interrupt';
                        }
                    }
                    break;
                default:
                    console.log("[ERROR] - invalid op code");
                    break;
            }
        }
        // if accompanying data with instruction...
        else if ((this.dataLen == 1) && (this.currStep == 'decode')) {
            // set next instruction address and read from memory
            this.linkedMMU.setMAR(this.PC+1);
            this.linkedMMU.readMem();
            this.currStep = 'execute';
        }
        else if ((this.dataLen == 2) && (this.currStep == 'decode')) {
            this.linkedMMU.setMAR(this.PC+1);
            this.linkedMMU.readMem();
            this.linkedMMU.setHighOrderByte(parseInt(this.linkedMMU.getMDR()));
            this.linkedMMU.setMAR(this.PC+2);
            this.linkedMMU.readMem();
            this.linkedMMU.setLowOrderByte(parseInt(this.linkedMMU.getMDR()));
            this.currStep = 'execute';
        }
    }

    public execute() {
        // execute interrupt
        this.currStep = 'interrupt';
        // perform instruction
        switch (this.hexConverter(this.IR)) {
            // A9 - LDA - Load accumulator with constant
            case "A9":
                this.ACC = parseInt(this.linkedMMU.getMDR());
                break;
            // AD - LDA  - Load accumulator from memory
            case "AD":
                this.addr = this.linkedMMU.littleEndian(this.linkedMMU.getLowOrderByte(), this.linkedMMU.getHighOrderByte());
                this.ACC = parseInt(this.addr);
                break;
            // 8D - STA  - Store accumulator in memory
            case "8D":
                this.addr = this.linkedMMU.littleEndian(this.linkedMMU.getLowOrderByte(), this.linkedMMU.getHighOrderByte());
                this.linkedMMU.setMAR(parseInt(this.addr));
                this.linkedMMU.setMDR(this.ACC);
                this.currStep = 'write';
                break;
            // 6D - ADC - Add with Carry
            case "6D":
                this.ACC += parseInt(this.linkedMMU.getMDR());
                break;
            // A2 - LDX - Load X register with constant
            case "A2":
                this.xReg = parseInt(this.linkedMMU.getMDR());
                break;
            // AE - LDX - Load X register from memory
            case "AE":
                this.addr = this.linkedMMU.littleEndian(this.linkedMMU.getLowOrderByte(), this.linkedMMU.getHighOrderByte());
                this.linkedMMU.setMAR(parseInt(this.addr));
                this.linkedMMU.readMem();
                this.xReg = parseInt(this.linkedMMU.getMDR());
                break;
            // A0 - LDY - Load Y register with constant 
            case "A0":
                this.yReg = parseInt(this.linkedMMU.getMDR());
                break;
            // AC - LDY - Load Y register from memory
            case "AC":
                this.addr = this.linkedMMU.littleEndian(this.linkedMMU.getLowOrderByte(), this.linkedMMU.getHighOrderByte());
                this.linkedMMU.setMAR(parseInt(this.addr));
                this.linkedMMU.readMem();
                this.yReg = parseInt(this.linkedMMU.getMDR());
                break;
            // EA - NOP - No Operation
            case "EA":
                break;
            // 00 - BRK - Break
            case "00":
                this.sys_6502.stopSystem();
                this.currStep = 'interrupt';
                break;
            // EC - CPX - Compare a byte in memory to X reg, sets z flag if equal
            case "EC":
                if (this.xReg == parseInt(this.linkedMMU.getMDR())) {
                    this.zFlag = 1;
                }
                else { 
                    this.zFlag = 0;
                }
                break;
            // D0 - BNE - Branch n bytes if Z flag = 0
            case "D0":
                if (this.zFlag == 0) {
                    let bytesToBranch = parseInt(this.linkedMMU.getMDR());
                    if (this.hexConverter(bytesToBranch) > "7F") {
                        let flippedNum = '';
                        for (let char of bytesToBranch.toString(2)) {
                            if (char == "0") {
                                flippedNum += "1";
                            }
                            else if (char == "1") {
                                flippedNum += "0";
                            }
                        }
                        bytesToBranch = -1 * (parseInt(flippedNum, 2) + 1);
                    }
                    this.PC += bytesToBranch;
                }
                break;
            // EE - INC - Increment value of a byte
            case "EE":
                if (this.increment == 0) {
                    this.ACC = parseInt(this.linkedMMU.getMDR());
                    this.increment++;
                    this.currStep = 'execute';
                }
                else if (this.increment == 1) {
                    this.ACC++;
                    this.increment = 0;
                    this.currStep = 'write';
                }
                break;
            // FF - SYS - System Call (#$01 in X = print Y, #$02 in X = print 00-terminated string at addr in Y)
            case "FF":
                // if xReg == 1, print integer
                if (this.hexConverter(this.xReg) == "01") {
                    console.log();
                    console.log("[SYSTEM CALL]: " + this.hexConverter(this.yReg));
                    console.log();
                    //process.stdout.write(this.hexConverter(this.yReg));
                }
                // if xReg == 2, print string
                else if (this.hexConverter(this.xReg) == "02") {
                    this.addr = this.linkedMMU.littleEndian(this.linkedMMU.getLowOrderByte(), this.linkedMMU.getHighOrderByte());
                    let strOutput = '';
                    while (this.linkedMMU.getMDR() != "00") {
                        this.linkedMMU.setMAR(parseInt(this.addr));
                        this.linkedMMU.readMem();
                        strOutput += Ascii.byteToChar(parseInt(this.linkedMMU.getMDR()));
                    }
                    console.log();
                    console.log("[SYSTEM CALL]: " + strOutput);
                    console.log();
                    //process.stdout.write(strOutput);
                }
                this.currStep = 'interrupt';
                break;
        }
        this.PC = (this.dataLen + 1) + this.PC;
        this.dataLen = 0;
    }

    private writeBack() {
        this.linkedMMU.writeMem();
        this.currStep = 'interrupt';
    }

    private interruptCheck() {
        this.currStep = 'fetch';
    }

}