import { App } from "../app.js";
export default class Utils {
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        alert({
            icon: "content_copy",
            message: App.getBundle().system.COPIED_TO_CLIPBOARD,
        });
    }
}
