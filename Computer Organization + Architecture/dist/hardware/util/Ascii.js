"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ascii = void 0;
class Ascii {
    static byteToChar(byte) {
        return String.fromCharCode(byte);
    }
    static charToByte(char) {
        return char.charCodeAt(0);
    }
}
exports.Ascii = Ascii;
//# sourceMappingURL=Ascii.js.map