export interface Interrupt {
    IRQ: number;
    priority: number;
    name: string;
    inputBuffer: number[];
    outputBuffer: number[];
}