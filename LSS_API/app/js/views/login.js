import { create } from "../lib/component.js";
import * as router from "../config/router.js";
import { settings } from "../config/settings.js";

let content;

export const show = () =>{

    window.title = 'LSS Maker - Login';
    document.title ='LSS Maker - Login';

    const mobile = document.body.dataset.mobile;
    const main = create({
        type: 'div',
        classes : ['main','box-center','no_copy', 'box-column' ],
        styles : {
            width : '100%',
            height: '100%',
            opacity : 0,
            transition : '1s'
        }
    });
    main.appendTo(document.body);


    const form = create({
        type : 'form',
        classes : ['minimal_login']
    });
    form.appendTo(main.element);

    const title = create({
        type: 'h1',
        text: 'LSS Maker'
    });
    title.appendTo(form.element);

    const username = create({
        type: 'input',
        text: 'LSS Maker',
        classes : ['login_input'],
        options : {
            name : 'username',
            placeholder : 'Username'
        }
    });
    username.appendTo(form.element);

    const password = create({
        type: 'input',
        text: 'LSS Maker',
        classes : ['login_input'],
        options : {
            type : 'password',
            name : 'password',
            placeholder : 'Password'
        }
    });
    password.appendTo(form.element);

    const button_bar = create({
        type: 'div',
        classes : ['button_bar']
    });
    button_bar.appendTo(form.element);

    const login = create({
        type: 'div',
        text: 'Login', 
        classes : ['accent_btn'],
        styles : {
            color:'#fff'
        },
        events : {
            click : () => window.location = settings.PATH + "projects/"
        }
    });
    login.appendTo(button_bar.element);

    const register = create({
        type: 'div',
        text: 'Register', 
        classes : ['minimal_btn','text_center','box-center'],
        events : {
            click : () => window.location = settings.PATH + "register/"
        }
    });
    register.appendTo(button_bar.element);

}