import { SETTINGS } from "../../settings/settings.js";

export const mediaV = (params) => {
    let title = SETTINGS.APP_NAME + " - Media";
    window.title = title;
    document.title = title;
}