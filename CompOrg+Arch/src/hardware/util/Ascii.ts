export class Ascii {
    
    public static byteToChar(byte: number): string {
        return String.fromCharCode(byte);
    }

    public static charToByte(char: string): number {
        return char.charCodeAt(0);
    }
    
}