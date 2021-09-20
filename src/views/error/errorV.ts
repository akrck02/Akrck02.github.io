import { CONFIG } from "../../config/config";

export default function show(params : string[]) : void {
    let title = CONFIG.APP_NAME + " - Media";
    document.title = title;
}