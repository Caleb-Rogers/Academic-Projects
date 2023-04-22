var TSOS;
(function (TSOS) {
    var MemoryAccessor = /** @class */ (function () {
        function MemoryAccessor() {
        }
        MemoryAccessor.prototype.fetchMemory = function (index) {
            return _Memory.tsosMemory[index];
        };
        MemoryAccessor.prototype.fetchAllMemory = function () {
            return _Memory.tsosMemory;
        };
        MemoryAccessor.prototype.littleEndianAddress = function () {
            var lowOrderByte = parseInt(this.fetchMemory(_CPU.PC + 1), 16);
            var highOrderByte = parseInt(this.fetchMemory(_CPU.PC + 2), 16);
            var machine_instruction_loc = lowOrderByte + highOrderByte;
            return machine_instruction_loc;
        };
        return MemoryAccessor;
    }());
    TSOS.MemoryAccessor = MemoryAccessor;
})(TSOS || (TSOS = {}));
