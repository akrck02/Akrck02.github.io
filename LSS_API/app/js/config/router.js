import * as maker from "../views/maker.js";
import * as projects from "../views/projects.js";
import * as login from "../views/login.js";
import * as register from "../views/register.js";
import * as not_found from "../views/not_found.js";


export const current_view = {name: ''};

export const PATHS = {
    maker :         {show: (params) => show(maker,params)},
    projects :      {show: (params) => show(projects,params)},
    login :         {show: (params) => show(login,params)},
    register :      {show: (params) => show(register,params)},
    not_found :     {show: (params) => show(not_found,params)},
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
    
    //TODO So bad, must change...
    if(localStorage.getItem('Lssmk:usr') == undefined || !validToken()){
        params = ['login'];
    }

    switch(params[0]){
        case "":     
        case undefined:     if(current_view.name != "login") window.location += "login/";                break;
        case "login":       PATHS.login.show(params.slice(1));                         break;    
        case "register":    PATHS.register.show(params.slice(1));                      break;
        case "projects":    PATHS.projects.show(params.slice(1));                      break;
        case "maker":       PATHS.maker.show(params.slice(1));                         break;
        default:            PATHS.not_found.show(params.slice(1));                     break;
    }

}

function validToken(){
    return true;
}

function show(view,params){
    document.title = view.title;
    window.title = view.title;
    view.show(params);

    const main = document.querySelector('.main');
    if(main != null){
        main.style.transition = '.75';
        main.style.opacity = '0';
    } 

    setTimeout(() =>{
        const main = document.querySelector('.main');
        if(main != null) main.style.opacity = '1';
    }, 150);
}

function get_params(url){
    const params = url.split('/');
    return params.slice(1);
}

