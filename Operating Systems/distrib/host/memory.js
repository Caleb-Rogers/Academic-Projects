var TSOS;
(function (TSOS) {
    var Memory = /** @class */ (function () {
        function Memory(mem_used, mem_counter) {
            if (mem_used === void 0) { mem_used = 0; }
            if (mem_counter === void 0) { mem_counter = 0; }
            this.mem_used = mem_used;
            this.mem_counter = mem_counter;
            this.tsosMemory = new Array(768);
        }
        Memory.prototype.init = function () {
            this.mem_used = 0;
            this.mem_counter = 0;
            for (var i = 0; i < this.tsosMemory.length; i++) {
                this.tsosMemory[i] = "00";
            }
        };
        Memory.prototype.fetchSectionBase = function (section) {
            switch (String(section)) {
                case "0": return 0;
                case "1": return 256;
                case "2": return 512;
                default:
                    console.log("Section [" + section + "] is not valid");
            }
        };
        Memory.prototype.fetchSectionLimit = function (section) {
            switch (String(section)) {
                case "0": return 255;
                case "1": return 511;
                case "2": return 767;
                default:
                    console.log("Section [" + section + "] is not valid");
            }
        };
        return Memory;
    }());
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
