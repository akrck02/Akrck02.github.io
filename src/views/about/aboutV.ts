import { CONFIG } from "../../config/config.js";

export default function aboutV(params :  string[]) : void {
    let title = CONFIG.APP_NAME + " - About me";
    document.title = title;

    console.log("aboutV");
}