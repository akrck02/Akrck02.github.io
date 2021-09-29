import { SETTINGS } from "../../settings/settings.js";

export const errorV = (params) => {

    let title = SETTINGS.APP_NAME + " - Error";
    window.title = title;
    document.title = title;

};