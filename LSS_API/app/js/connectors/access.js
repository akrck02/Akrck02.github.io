import { error_banner } from "../components/error_message.js";
import { settings } from "../config/settings.js";


//GET A FUNTION, A USERNAME AND A PASSWORD AND EXECUTES DE FUNCTION
export function login(funct,user,password){
    alert('requesting login');
    let request = {
        content: {
            username: user,
            password: password
        }
     }

    fetch(settings.BACKEND_PATH +'?login=' + JSON.stringify(request),
    {method: 'GET'})
    .then((response) => {
        if(response.ok)     return response.json();
        else                return "Error en la llamada Ajax";
    })
    .then((json) => {funct(json);})
    .catch(function(err) {alert('Runtime error >> '+ err);});
}

//REGISTER
export function register(funct,user,password,mail){
    let request = {
        content: {
            username: user,
            password: password,
            mail: mail
        }
     }

    fetch(settings.BACKEND_PATH +'?register=' + JSON.stringify(request),
    {method: 'GET'})
    .then((response) => {
        if(response.ok)     return response.json();
        else                return "Error en la llamada Ajax";
    })
    .then((json) => {funct(json);})
    .catch(function(err) {
        console.log('Runtime error >> '+ err);}
    );
}


//NEW TOKEN
export function new_token(funct,user){

    let request = {
        content: {
            username: user
        }
    };

    fetch(settings.BACKEND_PATH +'?new_token=' + JSON.stringify(request),
    {method: 'GET'})
    .then((response) => {
        if(response.ok)     return response.json();
        else                return "Error en la llamada Ajax";
    })
    .then((json) => {funct(json);})
    .catch(function(err) {console.log('Runtime error >> '+ err);});
}


//GET TOKEN
export function get_token(funct,user,token){
    fetch(settings.BACKEND_PATH +'?sch_new_token_username='+ user +'& sch_new_token_token='+ token,
    {method: 'GET'})
    .then((response) => {
        if(response.ok)     return response.json ();
        else                return "Error en la llamada Ajax";
    })
    .then((json) => {funct(json);})
    .catch(function(err) {console.log('Runtime error >> '+ err);});
}