import { CONFIG, PATHS, setUpConfigurations } from './config/config.js';
import { load } from './views/router.js';

const loadFromUrl = () => {
    // get the url paramaters or routes and load the page
    const params = [] // getParametersByIndex(window.location.hash.slice(1).toLowerCase(),1);
    //if(token) check token 

    if(params[0] == undefined){
        location.href = CONFIG.URL + "#/";
        load([""]);
    }
    else {
        console.log(CONFIG);
        console.log(PATHS);
         load(params);
    }
}

window.addEventListener('hashchange',() =>{
    
    loadFromUrl();
});

window.onload = () => {  
    setUpConfigurations();
    loadFromUrl();
}