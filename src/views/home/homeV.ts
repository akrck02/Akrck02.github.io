import { CONFIG } from "../../config/config.js";

export default function show() : void {

    let title = CONFIG.APP_NAME;
    document.title = title;

}