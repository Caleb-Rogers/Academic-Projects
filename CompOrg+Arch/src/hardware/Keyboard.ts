import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/InterruptListener";

export class Keyboard extends Hardware implements Interrupt {
    IRQ: number;
    priority: number;
    name: string;
    inputBuffer: number[];
    outputBuffer: number[];

    constructor() {
        super(0, "KBD");
    }
}