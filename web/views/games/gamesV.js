import { SETTINGS } from "../../settings/settings.js";

export const gamesV = (params) => {
    let title = SETTINGS.APP_NAME + " - Games";
    window.title = title;
    document.title = title;
}