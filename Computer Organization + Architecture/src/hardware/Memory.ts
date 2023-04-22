import {Hardware} from "./Hardware";

export class Memory extends Hardware {

    // declare Memory array
    private _MemArray = new Array;
    // declare Memory Address Register & Memory Data Register
    private _MAR: string;
    private _MDR: string;

    constructor() {
        super(0, "RAM");
    }


    /* Getters & Setters for MAR, MDR, and Memory */
    public getMAR() {
        return this._MAR;
    }
    public setMAR(mar: string): void {
        this._MAR = mar;
    }
    public getMDR() {
        return this._MDR;
    }
    public setMDR(mdr: string): void {
        this._MDR = mdr;
    }
    public getMemory() {
        return this._MemArray;
    }
    public setMemory(mem_array): void {
        this._MemArray = mem_array;
    }


    // Re-initializes Memory
    public reset(): void {
        this._MAR = "0x0000";
        this._MDR = "0x00";
        this.initMemory();
    }

    // Memory CLock Listener
    public pulse(): void {
        this.log("Received clock pulse");
    }
    
    // Reads from Memory using MAR (address) and sets to MDR (data)
    public read(): void {
        this.setMDR(this.hexConverter(this._MemArray[this.getMAR()]));
    }

    // Writes into Memory using MAR for location and MDR for instruction
    public write(): void {
        this._MemArray[this.getMAR()] = this.getMDR();
    }

    // populate 64K Memory with default hex values
    public initMemory() : void {
        for (let i=parseInt(this.hexConverter(0x00)); i<parseInt(this.hexConverter(0x10000)); i++) {
            this._MemArray[i] = this.hexConverter(0x00);
        }
    }

    // log a specified length of Memory hex values
    public displayMemory(looplength): void {
        for (let i=parseInt(this.hexConverter(0x00)); i<=parseInt(this.hexConverter(looplength)); i++) {
            // validate 
            if (i<0x10000) {
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
