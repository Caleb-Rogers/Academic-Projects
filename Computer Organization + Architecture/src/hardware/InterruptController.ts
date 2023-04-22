import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { Interrupt } from "./imp/InterruptListener";
import { Cpu } from "./Cpu";

export class InterruptController extends Hardware implements ClockListener {
    
    private interruptHardware: Interrupt[];
    private interruptsList: Object[][];

    private cpu_6502: Cpu;

    constructor(CPU: Cpu) {
        super(0, "INT");
        this.interruptHardware = [];
        this.interruptsList = [];
        this.cpu_6502 = CPU;
    }

    pulse(): void {
        // provide highest priority interrupt in CPU interrupt queue...
    }

    public addInterruptHardware(hardwareItem: Interrupt): void {
        this.interruptHardware[this.interruptHardware.length] = hardwareItem; 
    }

    public addInterrupts(IRQ:number, priority:number, name:string, output:number): void {
        this.interruptsList[this.interruptsList.length] = [IRQ, priority, name, output];
    }

}