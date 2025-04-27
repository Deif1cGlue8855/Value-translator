let keyboard = require("keyboard");
let math = require("math");
let submenu = require("submenu");
let dialog = require("dialog");

let inpt = "";
let FINISH = "";
//CHANGE
let allow = false;
//dakdgagsdkjald
//TEST FOR CUSTOM SCRIPT

function decToHex(decimal){
    let hex = "";
    let temp = decimal;
    let hexDigits = "0123456789ABCDEF";

    if (temp === 0) {
        return "0";
    }

    while (temp > 0) {
        hex = hexDigits[temp % 16] + hex;
        temp = math.trunc(temp / 16);
    }
    return hex;
}

function decToBin(decimal){
    let bin = "";
    let temp = decimal;

    let num = 128;

    while(num >= 1){
        if(temp >= num){
            temp = temp - num;
            num = num / 2;
            bin = bin + "1";
        }
        else{
            num = num / 2;
            bin = bin + "0";
        }
    }

    return bin;
}

function denToBin4Bit(den){
    let bin = "";
    let temp = den;

    let num = 16;

    while(num >= 1){
        if(temp >= num){
            temp = temp - num;
            num = num / 2;
            bin = bin + "1";
        }
        else{
            num = num / 2;
            bin = bin + "0";
        }
    }

    return bin;

}

function binToDen(bin){
    let num = 128;
    let temp = bin;
    let total = 0;
    for(let i = 0; i < 8; i++){
        if(temp[i] === "1"){
            total = total + num;
        }
        num = num / 2;  
    }
    return total;
}

function hexToBin(hex1, hex2){
    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    let total = 0;
    let temp1 = 0;
    let temp2 = 0;
    for(let i = 0; i < 16; i++){
        if(hex1 === hexDigits[i]){
            temp1 = i;
        }
    }
    for(let i = 0; i < 16; i++){
        if(hex2 === hexDigits[i]){
            temp2 = i;
        }
    }

    let temp = denToBin4Bit(temp1).slice(1, 5) + denToBin4Bit(temp2).slice(1,5);
    return temp;
}

function hexToDec(hex1, hex2){
    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    let total = 0;
    let temp1 = 0;
    let temp2 = 0;
    for(let i = 0; i < 16; i++){
        if(hex1 === hexDigits[i]){
            temp1 = i;
        }
    }
    for(let i = 0; i < 16; i++){
        if(hex2 === hexDigits[i]){
            temp2 = i;
        }
    }
    let temp = denToBin4Bit(temp1).slice(1, 5) + denToBin4Bit(temp2).slice(1,5);    
    return(binToDen(temp));
}

function hexToTxt(hex1, hex2){
    let hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    let total = 0;
    let temp1 = 0;
    let temp2 = 0;
    for(let i = 0; i < 16; i++){
        if(hex1 === hexDigits[i]){
            temp1 = i;
        }
    }
    for(let i = 0; i < 16; i++){
        if(hex2 === hexDigits[i]){
            temp2 = i;
        }
    }
    let temp = denToBin4Bit(temp1).slice(1, 5) + denToBin4Bit(temp2).slice(1,5);  
    print(temp); 
    total = binToDen(temp);
    return chr(total);
}

function bintoHex(bin){
    let num = bin;
    let result = "";
    let temp = "";
    for(let i = 0; i < num.length; i = i + 8){
        temp = num.slice(i ,i+8);
        result = result + chr(binToDen(temp));
    }
    return result;
}

function bintoDec(bin){
    let num = bin;
    let total = 0;
    let pow = math.pow(2, (num.length - 1));

    for(let i = 0; i < num.length; i++){
        if(num[i] === "1"){
            total = total + pow;
        }

        pow = pow / 2;
    }

    return total;
}

function DecToBin(dec){
    let bin = "";
    let temp = parse_int(dec);

    let num = 1;

    while(num < temp){
        num = num * 2;
    }
    

    while(num >= 1){
        if(temp >= num){
            temp = temp - num;
            num = num / 2;
            bin = bin + "1";
        }
        else{
            num = num / 2;
            bin = bin + "0";
        }
    }

    return bin;
}

submenu.addItem("TXT -> HEX", 0);
submenu.addItem("TXT -> BIN", 1);
submenu.addItem("TXT -> DEC", 2);
submenu.addItem("HEX -> TXT", 3);
submenu.addItem("HEX -> BIN", 4);
submenu.addItem("HEX -> DEC", 5);
submenu.addItem("BIN -> HEX", 6);
submenu.addItem("BIN -> TXT", 7);
submenu.addItem("BIN -> DEC", 8);
submenu.addItem("DEN -> HEX", 9);
submenu.addItem("DEN -> BIN", 10);


submenu.setHeader("Select an option:");

let choice = submenu.show();

let title =["TXT -> HEX",
            "TXT -> BIN",
            "TXT -> DEC",
            "HEX -> TXT",
            "HEX -> BIN",
            "HEX -> DEC",
            "BIN -> HEX",
            "BIN -> TXT",
            "BIN -> DEC",
            "DEN -> HEX",
            "DEN -> BIN"];

//KEYBOARD TYPE 

if(choice === 0 || choice === 1 || choice === 2){
    keyboard.setHeader(title[choice]);

    inpt = keyboard.text(100, "", true);

    let options = ({
        header: "What case:",
        text: "Would you like to use upper case or lower case ?",
        button_left: "Upper",
        button_right: "Lower",
        button_center: "Ignore"
    });

    let result = dialog.custom(options);
    if(result === ""){
        print("NO RESULT");
    }
    else if(result === "Upper"){
        inpt = to_upper_case(inpt);
        allow = true;
    }
    else if(result === "Lower"){
        inpt = to_lower_case(inpt);
        allow = true;
    }
    else if(result === "Ignore"){
        allow = true;
    }
    else{
        print("NO RESULT");
    }
}
else if(choice === 3 || choice === 4 || choice === 5){
    keyboard.setHeader("How many HEX sets :");

    let temp = keyboard.text(100, "", true);

    keyboard.setHeader(title[choice]);

    let result = keyboard.byte(parse_int(temp));

    let data = Uint8Array(result);
    result = "";
    for (let i = 0; i < data.byteLength; i++) {
        if (data[i] < 0x10) result += "0";
        result += to_hex_string(data[i]);
    }
    inpt = result;
    allow = true
}
else if(choice === 6 || choice === 7 || choice === 8){
    keyboard.setHeader(title[choice]);

    inpt = keyboard.text(100, "", true);

    for(let i = 0; i < (inpt.length % 4); i ++){
        inpt = "0" + inpt;
    }

    allow = true;

    for(let i = 0; i < inpt.length; i++){
        if(inpt[i] !== "1" && inpt[i] !== "0"){
            allow = false;
        }
    }
}
else if(choice === 9 || choice === 10){
    keyboard.setHeader(title[choice]);

    inpt = keyboard.text(100, "", true);
    allow = true;   
}

if(allow === true){
    if(inpt === undefined){
        print("NO RESULT");
    }
    else{
        if(choice === 0){
            for(let i = 0; i < inpt.length; i ++){
                let num = inpt.charCodeAt(i);   
                FINISH = FINISH + decToHex(num);
            }
        }
        else if(choice === 1){
            for(let i = 0; i < inpt.length; i ++){
                let num = inpt.charCodeAt(i);  
                FINISH = FINISH + decToBin(num) + " ";
            }
        }
        else if(choice === 2){
            let total = 0;
            for(let i = 0; i < inpt.length; i ++){
                let num = inpt.charCodeAt(i);  
                total = total + num;
            }
            FINISH = to_string(total);
        }
        else if(choice === 3){
            
            for(let i = 0; i < inpt.length; i = i + 2){
                FINISH = FINISH + hexToTxt(inpt[i], inpt[i + 1]);     
            }
        }
        else if(choice === 4){
            
            for(let i = 0; i < inpt.length; i = i + 2){
                FINISH = FINISH + hexToBin(inpt[i], inpt[i + 1]) + " ";     
            }
        }
        else if(choice === 5){
            for(let i = 0; i < inpt.length; i = i + 2){
                FINISH = to_string(parse_int(FINISH) + hexToDec(inpt[i], inpt[i + 1]));     
            }
        }
        else if(choice === 6){
            for(let i = 0; i < (inpt.length % 8); i ++){
                inpt = "0" + inpt;
            }
            FINISH = bintoHex(inpt);
        }
        else if(choice === 7){
            let temp = "";
            for(let i = 0; i < (inpt.length % 8); i ++){
                inpt = "0" + inpt;
            }
            FINISH = bintoHex(inpt);
        }
        else if(choice === 8){
            FINISH = bintoDec(inpt);
        }
        else if(choice === 9){
            FINISH = decToHex(parse_int(inpt));
        }
        else if(choice === 10){
            FINISH = DecToBin(inpt);    
        }
        else{
            print("NOT DONE YET");
        }

        print(inpt);
        print("=========================");
        if(FINISH === ""){
            FINISH = "*NULL*";
        }
        print(FINISH);
    }
}
else{
    print("INPUT ERROR");
}
