import { getParametersByIndex } from "./lib/GTD_UrlTools.js";
import { SETTINGS, setUp } from "./settings/settings.js";
import { load } from "./views/router.js";

const loadFromUrl = () => {
    const params = getParametersByIndex(window.location.hash.slice(1).toLowerCase(),1);
    //if(token) check token 

    if(params[0] == undefined){
        location.href = SETTINGS.URL;
        load([""]);
    }
    else load(params);
    
}


window.onhashchange = () => {
    loadFromUrl();
}

window.onload = () => {  
    setUp();
    loadFromUrl();
}