import { CONFIG } from "../../config/config.js";

export default function codeV(params :  string[]) : void {

    let title = CONFIG.APP_NAME + " - Code";
    document.title = title;

    console.log('codeV');
    
}