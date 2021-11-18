import { CONFIG } from "../../config/config.js";

export default function mediaV () :void {
    let title = CONFIG.APP_NAME;
    document.title = title;
} 