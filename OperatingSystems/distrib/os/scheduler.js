var TSOS;
(function (TSOS) {
    var Scheduler = /** @class */ (function () {
        function Scheduler(counter) {
            if (counter === void 0) { counter = 0; }
            this.counter = counter;
        }
        Scheduler.prototype.determineSchedule = function () {
            this.counter++;
            var algorithm = "rr";
            switch (algorithm) {
                case "rr":
                    this.roundRobin();
                    break;
                //case "fcfs": 
                //    this.firstComeFirstServe();
                //    break;
                //case "priority":
                //    this.priority();
                //    break;
                default:
                    console.log("[determineSchedule] - Invalid scheduling algorithm entered");
            }
        };
        Scheduler.prototype.roundRobin = function () {
            // nothing to execute if empty Ready Queue
            if (_PCB_ReadyQ.getSize() == 0) {
                _CPU.isExecuting = false;
            }
            // if one process, execute it
            else if (_PCB_ReadyQ.getSize() == 1) {
                var params = _PCB_ReadyQ.dequeue();
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(CONTEXT_SWITCH_IRQ, params));
                _CPU.isExecuting = true;
            }
            // more than one process, swap through them and run
            else if (_PCB_ReadyQ.getSize() >= 2) {
                this.contextSwitch();
                _CPU.isExecuting = true;
            }
        };
        Scheduler.prototype.contextSwitch = function () {
            for (var i = 0; i < _PCB_ReadyQ.getSize(); i++) {
                var PCB = _PCB_ReadyQ.dequeue();
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(CONTEXT_SWITCH_IRQ, PCB));
                _PCB_ReadyQ.enqueue(PCB);
            }
        };
        return Scheduler;
    }());
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
