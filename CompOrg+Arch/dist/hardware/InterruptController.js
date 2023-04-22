"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptController = void 0;
const Hardware_1 = require("./Hardware");
class InterruptController extends Hardware_1.Hardware {
    constructor(CPU) {
        super(0, "INT");
        this.interruptHardware = [];
        this.interruptsList = [];
        this.cpu_6502 = CPU;
    }
    pulse() {
        // provide highest priority interrupt in CPU interrupt queue...
    }
    addInterruptHardware(hardwareItem) {
        this.interruptHardware[this.interruptHardware.length] = hardwareItem;
    }
    addInterrupts(IRQ, priority, name, output) {
        this.interruptsList[this.interruptsList.length] = [IRQ, priority, name, output];
    }
}
exports.InterruptController = InterruptController;
//# sourceMappingURL=InterruptController.js.map