import { load } from "./config/router.js";
import { setSettings, settings } from "./config/settings.js";
import { getParametersByIndex } from "./lib/GTD_UrlTools.js";

setSettings();

const loadFromURL = () => {
    const params = getParametersByIndex(window.location.hash.slice(1).toLowerCase(),1);
    //if(token) check token 

    if(params[0] == undefined){
        location.href = settings().URL;
        load([""]);
    }
    else load(params);
}

window.onload = loadFromURL;
window.onhashchange = loadFromURL;
window.addEventListener('offline', () => console.log('Became offline'));