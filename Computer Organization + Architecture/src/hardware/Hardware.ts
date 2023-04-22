export class Hardware { 
    id_hdw: number;
    name_hdw: string;
    debug: boolean = true;

    constructor(id: number, name: string) {   
        this.id_hdw = id;
        this.name_hdw = name;
    }

    // Translate decimal (base 10) to hexadecimal (base 16)
    public hexConverter(number: number) {
        return number.toString(16).padStart(2, "0").toUpperCase();
    }
    
    // log method for Hardware
    public log(msg): void {
        // format log string
        var log_message = `[HW - ${this.name_hdw} - ID: ${this.id_hdw} - ${Date.now()}]: ${msg}`
        // add addressable space when Memory is created
        if (this.name_hdw == "RAM" && msg == "Created") {
            log_message += " -- Addressable space : 65536"
        }
        // outputs to console when debug is true
        if (this.debug == true) {
            console.log(log_message);
        }
    }

    // Pad leading zeros onto hexadecimal values
    public hexLog(number, length) {
        let padding = "00000000";
        if (number.toString().length == 1) {
            padding = padding.slice(0,length-1);
        }
        else if (number.toString().length == 2) {
            padding = padding.slice(0,length-2);
        }
        else if (number.toString().length == 3) {
            padding = padding.slice(0,length-3);
        }
        else if (number.toString().length == 4) {
            padding = padding.slice(0,length-4);
        }
        let hex_value = "0x" + padding + number;
        return hex_value;
    }

    // if debug=false, logging will not take place for Hardware
    public debugSwitch(debug): void {
        this.debug = debug;
    }
}   
