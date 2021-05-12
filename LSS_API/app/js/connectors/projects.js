import { settings } from "../config/settings.js";

export function get_projects(funct,user){
    let request = {
        content: {
            username: user
        }
     }

    fetch(settings.BACKEND_PATH +'?get_projects=' + JSON.stringify(request),
    {method: 'GET'})
    .then((response) => {
        if(response.ok)     return response.json();
        else                return "Error en la llamada Ajax";
    })
    .then((json) => {funct(json);})
    .catch(function(err) {alert('Runtime error >> '+ err);});
}

export function get_project(funct,id){
    let request = {
        content: {
            id: id
        }
     }

    fetch(settings.BACKEND_PATH +'?get_project=' + JSON.stringify(request),
    {method: 'GET'})
    .then((response) => {
        if(response.ok)     return response.json();
        else                return "Error en la llamada Ajax";
    })
    .then((json) => {funct(json);})
    .catch(function(err) {alert('Runtime error >> '+ err);});
}
