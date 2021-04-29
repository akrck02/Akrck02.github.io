import { settings, setUser } from "../../config/settings.js";
import { getProperty, isLogged, loginInApp } from "../../config/userSettings.js";
import { create } from "../../lib/GTD_Component.js";
import { isEmpty } from "../../lib/GTD_DataTools.js";

/**
 * Show the login view
 * @param {array} params 
 */
export const loginView = (params) => {

    if(isLogged()){
        setUser(getProperty("user"));
        location.href = settings().URL + "home/"
    }

    const web_tittle = "Countless - Login";
    window.title = web_tittle;
    document.title = web_tittle;
    
    const view = create({
        type : 'view',
        classes : ['main','box-column','box-center'],
        styles : {
            height : '100vh',
            width : '100vw'
        }, 
    });
    view.appendTo(document.body);

    const form = create({
        type : 'form',
        classes : ['minimal_login']
    });

    const logo = create({
        type    :   'h1',
        text    :   'Countless'
    });

    const username = create({
        type : 'input',
        id   : 'username',
        classes : ['login_input','left_text'],
        options : { placeholder : 'Username' }
    });

    const password = create({
        type : 'input',
        id   : 'password',
        classes : ['login_input','left_text'],
        options : {
            type : 'password',
            autocomplete : 'true',
            placeholder : 'Password' 
        }
    });

    const login_button = create({
        type    : 'loginbutton',
        text    : 'Login',  
        classes : ['framed_btn', 'center_text'],
        styles  : {'min-width' : '80px'},
        events  : {
            click : () => 
            loginInApp(
                username.element.value,
                password.element.value,
                isEmpty(localStorage.getItem("CLSS_Token")) ? '' : localStorage.getItem("CLSS_Token")
            )
        }
    });

    logo.appendTo(form.element);
    username.appendTo(form.element);
    password.appendTo(form.element);
    login_button.appendTo(form.element);
    
    form.appendTo(view.element);
}