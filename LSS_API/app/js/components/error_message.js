import { create } from "../lib/component.js";

export const error_message = (msg,append) => {
    if(document.querySelector('.error_log') == null)
        create({
            type: 'error',
            text: msg,
            styles:{ margin : '10px' }, 
            classes  : ['error_log','txt_error','italic']
        }).appendTo(append);
    else document.querySelector('.error_log').innerHTML = msg;
};

export const error_banner = (msg) =>  create({
    text: msg,
    type: 'error',
    styles:{ margin : '10px' }, 
    classes  : ['error_banner']
});