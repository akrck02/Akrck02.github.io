import { orElse } from "../lib/GTD_DataTools.js";
import { VanillaQR } from "../lib/VanillaQR.js";

export const createQR = (properties) => {
    let qr = new VanillaQR({

        url: orElse(properties.url,'http://akrck02.com'),
        size: 280,
    
        colorLight: "#ffffff",
        colorDark: "#000000",
    
        //output to table or canvas
        toTable: false,
    
        //Ecc correction level 1-4
        ecclevel: 1,
    
        //Use a border or not
        noBorder: false,
    
        //Border size to output at
        borderSize: 0
    
    });
    return qr.toImage("png").src;
}