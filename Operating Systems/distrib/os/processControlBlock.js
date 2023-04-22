var TSOS;
(function (TSOS) {
    var PCB = /** @class */ (function () {
        function PCB(PID, // ProcessID
        PC, // ProgramCounter
        IR, // Instruction Register    
        Acc, // Accumulator
        Xreg, // X Register
        Yreg, // Y Register 
        Zflag, // Z Flag
        Priority, // Priority
        State, // State
        Location, // Location
        QuantumCounter) {
            if (PID === void 0) { PID = 0; }
            if (PC === void 0) { PC = 0; }
            if (IR === void 0) { IR = "[IR]"; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (Priority === void 0) { Priority = 0; }
            if (State === void 0) { State = "Resident"; }
            if (Location === void 0) { Location = "Memory"; }
            if (QuantumCounter === void 0) { QuantumCounter = 0; }
            this.PID = PID;
            this.PC = PC;
            this.IR = IR;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.Priority = Priority;
            this.State = State;
            this.Location = Location;
            this.QuantumCounter = QuantumCounter;
        }
        PCB.prototype.init = function () {
            this.PID = _PCB_Current_PID;
            this.PC = 0;
            this.IR = "[empty]";
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.Priority = 0;
            this.State = "Resident";
            this.Location = "Memory";
            this.QuantumCounter = 0;
        };
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
