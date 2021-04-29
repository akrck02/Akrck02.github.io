import { load } from "./config/router.js";
import { setSettings, settings } from "./config/settings.js";
import { getParametersByIndex } from "./lib/GTD_UrlTools.js";
import { executeAsync } from "./lib/GTD_TimeTools.js";
import { removeAll } from "./lib/GTD_Component.js";

setSettings();
executeAsync(
    () => {
        //console.warn("Checking notifications...")
    },
    2500
)

const loadFromURL = () => {
    const params = getParametersByIndex(window.location.hash.slice(1).toLowerCase(),1);
    //if(token) check token 

    if(params[0] == undefined){
        location.href = settings().URL;
        load([""]);
    }
    else load(params);
}

window.onresize = () =>{
    //resize events
    removeAll(".inputHandler");
}

window.onload = loadFromURL;
window.onhashchange = loadFromURL;
window.addEventListener('offline', () => console.log('Became offline'));