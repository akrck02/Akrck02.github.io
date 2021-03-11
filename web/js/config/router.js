import * as welcome from '../ui/views/welcome.js'; 
import * as home from '../ui/views/home.js'; 
import * as not_found from '../ui/views/not_found.js'; 
import * as lss from '../ui/views/router_lss.js'; 


export const PATHS = {
    home:       {show: (params) => show(home,params)},
    not_found:  {show: (params) => show(not_found,params)},
    bubble:     {show: (params) => {}},
    welcome:    {show: () => welcome.show()},
    lss:        {show: (params) => lss.load(params)},
    sotchapp:   {show: (params) => window.location = 'http://sotchapp.site'}
};

export function load(){
    const path  = window.location.hash.slice(1).toLowerCase()
    const params = get_params( window.location.hash.slice(1).toLowerCase());

    document.body.innerHTML = '';
    document.body.className = '';

    if(window.localStorage.getItem('akr-b') != 'celeste'){
        PATHS.welcome.show();
        return;
    } 

    switch(params[0]){
        case "dark":       
            document.documentElement.dataset.theme = 'dark';
            window.location = '/#/';
            load();  
        break;    
        case undefined:     
        case "":            PATHS.home.show(params.slice(1));         break;
        case "lss":         PATHS.lss.show(params.slice(1));          break;
        case "bubble":      PATHS.bubble.show(params.slice(1));       break;
        case "sotchapp":    PATHS.sotchapp.show(params.slice(1));     break;
        default:            PATHS.not_found.show(params.slice(1));    break;
    }
}

function get_params(url){
    const params = url.split('/');
    return params.slice(1);
}

function show(view,params){
    document.title = view.title;
    window.title = view.title;
    view.show(params);
}