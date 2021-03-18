import * as maker from "../views/maker.js";
import * as projects from "../views/projects.js";
import * as login from "../views/login.js";
import * as register from "../views/register.js";
import * as not_found from "../views/not_found.js";


export const current_view = {name: ''};

export const PATHS = {
    maker :         {show: () => maker.show()},
    projects :      {show: () => projects.show()},
    login :         {show: () => login.show()},
    register :      {show: () => register.show()},
    not_found :     {show: () => not_found.show()},
};

export function firstload(params){
    const styles = document.createElement('link');
    styles.rel = "stylesheet"
    styles.href = "./LSS_API/app/style.css";
    styles.id = "appStyle";
    if(document.querySelector('#appStyle') == null) document.head.appendChild(styles);

    load(params);
}

export function load(params){
    document.body.innerHTML = '';
    current_view.name = params[0];
    switch(params[0]){
        case "":     
        case undefined:     if(current_view.name != "login") window.location += "login/";                break;
        case "login":       PATHS.login.show();                         break;    
        case "register":    PATHS.register.show();                      break;
        case "projects":    PATHS.projects.show();                      break;
        case "maker":       PATHS.maker.show();                         break;
        default:            PATHS.not_found.show(params.slice(1));      break;
    }

}

function get_params(url){
    const params = url.split('/');
    return params.slice(1);
}

