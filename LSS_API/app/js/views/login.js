import { create } from "../lib/component.js";
import { login } from "../connectors/access.js"
import { error_message } from "../components/error_message.js"
import { settings } from "../config/settings.js";

let content;

export const show = () =>{

    window.title = 'LSS Maker - Login';
    document.title ='LSS Maker - Login';

    const main = create({
        type: 'view',
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
        type: 'box',
        classes : ['button_bar','box-center']
    });
    button_bar.appendTo(form.element);

    const login_btn = create({
        type: 'login',
        text: 'Login', 
        classes : ['accent_btn','box-center'],
        styles : {
            color:'#fff'
        },
        options: {type:'submit',value: 'Login'},
        events : {
            click : () =>{
                alert('Click on login :)');
                login(
                    (response) =>{
                        alert('response');
                        if(response.success)
                            if(response.content.accepted || settings.ENVIROMENT == 'DEVELOPMENT'){
                                localStorage.setItem('Lssmk:usr',username.element.value);
                                window.location = settings.PATH + "projects/"
                            }
                            else error_message("Invalid user", form.element);
                        else error_message("Sorry, there is an error in our servers :(", form.element);
                    },
                    username.element.value,
                    password.element.value
                );
            }
        }
    });
    login_btn.appendTo(button_bar.element);

    const register_btn = create({
        type: 'Back',
        text: 'I\'m new here', 
        classes : ['minimal_btn','text_center','box-center'],
        events : {
            click : () => window.location = settings.PATH + "register/"
        }
    });
    register_btn.appendTo(button_bar.element);

    const back = create({
        type: 'img',
        styles: {
            position : 'fixed',
            top : '25px',
            left: '25px',
            width: '25px',
            height: '25px',
            cursor: 'pointer'
        },
        options: {src : settings.ICONS + 'light/back.svg'},
        events : {click : () => location = settings.WEB_PATH + '#/lss/'}
    });
    back.appendTo(main.element);

}