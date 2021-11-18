import { CONFIG, PATHS, setUpConfigurations, VIEWS } from './config/config.js';
import { getParametersByIndex } from './lib/gtd/data/urltools.js';
import { load } from './views/router.js';

const loadFromUrl = () => {
    // get the url paramaters or routes and load the page
    const params = getParametersByIndex(window.location.hash.slice(1).toLowerCase(),1);
    
    console.log(params[0] == "");
    
    //if(token) check token 
    if(params[0] == ""){
        location.href = VIEWS.HOME;
    }
    else {
        console.log(CONFIG);
        console.log(PATHS);
        load(params);
    }
}

window.addEventListener('hashchange',loadFromUrl);

window.onload = () => {  
    setUpConfigurations();
    loadFromUrl();
}


